enum StatusCode {
  success = 200,
}

class Result {
  private readonly statusCode: number;
  private readonly code: number;
  private readonly message: string;
  private readonly data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object): any {
    const result = new Result(StatusCode.success, 0, 'success', data);

    return result.bodyToString();
  }

  static forward(event, data): any {
    event.body.statePack = event.body.statePack ?? {};
    event.body.statePack = Object.assign(event.body.statePack, data);
    return event;
  }

  static error(code: number = 1000, message: string) {
    const result = new Result(code, code, message);

    return result.bodyToString();
  }
}
