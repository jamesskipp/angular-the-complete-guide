import { Environment } from '../app/models/Environment';

export const environment: Environment = {
  production: false,
  baseUrl: 'localhost:8080',
  authUrl:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDrNcw1RPBVf9zoZVopMYY3mFNWYhQGGYI',
};
