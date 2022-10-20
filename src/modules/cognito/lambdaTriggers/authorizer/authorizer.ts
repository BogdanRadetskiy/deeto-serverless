import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { AccountContact, AuthenticatedUser, VendorContact } from '@shared/models';
import { loadJWK } from '@shared/utils';
import { env } from '@shared/config/config';

function AuthPolicy(principal, awsAccountId, apiOptions) {
  this.awsAccountId = awsAccountId;
  this.principalId = principal;
  this.version = '2012-10-17'; // should always be '2012-10-17'
  this.pathRegex = new RegExp('^[/.a-zA-Z0-9-*]+$'); // validate resource path

  this.allowMethods = [];
  this.denyMethods = [];

  if (!apiOptions || !apiOptions.restApiId) {
    this.restApiId = '*';
  } else {
    this.restApiId = apiOptions.restApiId;
  }

  if (!apiOptions || !apiOptions.region) {
    this.region = '*';
  } else {
    this.region = apiOptions.region;
  }

  if (!apiOptions || !apiOptions.stage) {
    this.stage = '*';
  } else {
    this.stage = apiOptions.stage;
  }
}

// A set of existing HTTP verbs supported by API Gateway.
AuthPolicy.HttpVerb = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  ALL: '*',
};

AuthPolicy.prototype = (function AuthPolicyClass() {
  /**
   * Adds a method to the internal lists of allowed or denied methods
   * The condition statement can be null.
   * */
  function addMethod(effect, verb, resource, conditions) {
    if (verb !== '*' && !Object.prototype.hasOwnProperty.call(AuthPolicy.HttpVerb, verb)) {
      throw new Error(`Invalid HTTP verb ${verb}. Allowed verbs in AuthPolicy.HttpVerb`);
    }

    if (!this.pathRegex.test(resource)) {
      throw new Error(`Invalid resource path: ${resource}. Path should match ${this.pathRegex}`);
    }

    let cleanedResource = resource;
    if (resource.substring(0, 1) === '/') {
      cleanedResource = resource.substring(1, resource.length);
    }
    const resourceArn = `arn:aws:execute-api:${this.region}:${this.awsAccountId}:${this.restApiId}/${this.stage}/${verb}/${cleanedResource}`;

    if (effect.toLowerCase() === 'allow') {
      this.allowMethods.push({
        resourceArn,
        conditions,
      });
    } else if (effect.toLowerCase() === 'deny') {
      this.denyMethods.push({
        resourceArn,
        conditions,
      });
    }
  }

  /**
   * Returns an empty statement object prepopulated with the correct action and the
   * desired effect.
   */
  function getEmptyStatement(effect) {
    const statement: any = {};
    statement.Action = 'execute-api:Invoke';
    statement.Effect = effect.substring(0, 1).toUpperCase() + effect.substring(1, effect.length).toLowerCase();
    statement.Resource = [];

    return statement;
  }
  /**This function loops over an array of objects containing a resourceArn and
   * conditions statement and generates the array of statements for the policy.
   */
  function getStatementsForEffect(effect, methods) {
    const statements = [];

    if (methods.length > 0) {
      const statement = getEmptyStatement(effect);

      for (let i = 0; i < methods.length; i++) {
        const curMethod = methods[i];
        if (curMethod.conditions === null || curMethod.conditions.length === 0) {
          statement.Resource.push(curMethod.resourceArn);
        } else {
          const conditionalStatement = getEmptyStatement(effect);
          conditionalStatement.Resource.push(curMethod.resourceArn);
          conditionalStatement.Condition = curMethod.conditions;
          statements.push(conditionalStatement);
        }
      }

      if (statement.Resource !== null && statement.Resource.length > 0) {
        statements.push(statement);
      }
    }

    return statements;
  }

  return {
    constructor: AuthPolicy,
    /**
     * Adds an allow "*" statement to the policy.
     */
    allowAllMethods() {
      addMethod.call(this, 'allow', '*', '*', null);
    },
    /**
     * Adds a deny "*" statement to the policy.
     *
     */
    denyAllMethods() {
      addMethod.call(this, 'deny', '*', '*', null);
    },
    /**
     * Adds an API Gateway method (Http verb + Resource path) to the list of allowed
     * methods for the policy
     */
    allowMethod(verb, resource) {
      addMethod.call(this, 'allow', verb, resource, null);
    },

    /**
     * Adds an API Gateway method (Http verb + Resource path) to the list of denied
     * methods for the policy
     */
    denyMethod(verb, resource) {
      addMethod.call(this, 'deny', verb, resource, null);
    },

    /**
     * Adds an API Gateway method (Http verb + Resource path) to the list of allowed
     * methods and includes a condition for the policy statement
     */
    allowMethodWithConditions(verb, resource, conditions) {
      addMethod.call(this, 'allow', verb, resource, conditions);
    },

    /**
     * Adds an API Gateway method (Http verb + Resource path) to the list of denied
     * methods and includes a condition for the policy statement.
     */
    denyMethodWithConditions(verb, resource, conditions) {
      addMethod.call(this, 'deny', verb, resource, conditions);
    },

    build() {
      if (
        (!this.allowMethods || this.allowMethods.length === 0) &&
        (!this.denyMethods || this.denyMethods.length === 0)
      ) {
        throw new Error('No statements defined for the policy');
      }

      const policy: any = {};
      policy.principalId = this.principalId;
      const doc: any = {};
      doc.Version = this.version;
      doc.Statement = [];

      doc.Statement = doc.Statement.concat(getStatementsForEffect.call(this, 'Allow', this.allowMethods));
      doc.Statement = doc.Statement.concat(getStatementsForEffect.call(this, 'Deny', this.denyMethods));

      policy.policyDocument = doc;

      return policy;
    },
  };
})();

export const authorizer = async (event, _context, _callback) => {
  if (!event.authorizationToken) {
    throw new Error('Authorization token cannot be empty');
  }

  const token = event.authorizationToken;

  // TODO for dev only | remove before prod
  let result, err;
  if (token === 'deeto') {
    result = { username: '832aee14-bcbe-43f7-a0cc-dee8fd8ea089', sub: 'test-deeto' }; // must be uuid
  } else {
    try {
      // load JWK
      const jwk = await loadJWK(env.REGION, env.USER_POOL_ID);
      // jwk[1] related to access token
      const pem = jwkToPem(jwk.keys[1]);
      result = jwt.verify(token, pem, { algorithms: ['RS256'] });
    } catch (e) {
      err = e;
    }
  }

  if (err || !result.username) {
    throw new Error('Unauthorized');
  }

  const principalId = result.sub;

  // build apiOptions for the AuthPolicy
  if (!event.methodArn) {
    // for local
    event.methodArn = 'rn:aws:states:us-east-1:482290209270:stateMachine:testUseLink';
  }

  const apiOptions: any = {};
  const tmp = event.methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');
  const awsAccountId = tmp[4];
  apiOptions.region = tmp[3];
  apiOptions.restApiId = apiGatewayArnTmp[0];
  apiOptions.stage = apiGatewayArnTmp[1];

  const policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
  // allow all method
  policy.allowAllMethods();
  const authResponse = policy.build();

  // get user with all AccountContacts and VendorContacts
  const user = await AuthenticatedUser.findOne({
    where: { cognitoUserId: result.username },
    include: [{ model: AccountContact }, { model: VendorContact }],
  });

  // Authorizer response context values must be of type string, number, or boolean
  const accountContactIds = user?.accountContacts?.map((el) => el.accountContactId);
  const accountContactIdsObject = Object.assign({}, accountContactIds);

  authResponse.context = {
    authenticatedUserId: user.getDataValue('authenticatedUserId'), // $context.authorizer.userId -> result.username
    vendorContactId: user?.vendorContact?.vendorContactId || null,
    vendorId: user?.vendorContact?.vendorId || null,
    //JSON.parse(event.requestContext?.authorizer?.accountContactIds)
    //using lambda proxy integration
    accountContactIds: JSON.stringify(accountContactIdsObject),
  };

  return authResponse;
};
