export interface Environment {
  baseUrl: string;
  production: boolean;
  auth: {
    signupUrl: string;
    loginUrl: string;
  };
}
