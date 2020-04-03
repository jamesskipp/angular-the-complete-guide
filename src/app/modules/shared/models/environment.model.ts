export interface Environment {
  production: boolean;
  urls: {
    recipe: {
      base: string;
    };
    logging: {
      base: string;
    };
    auth: {
      signUp: string;
      login: string;
    };
  };
}
