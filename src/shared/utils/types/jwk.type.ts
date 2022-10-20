type JwkType = {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
};

export type JwkLoadType = [JwkType];
