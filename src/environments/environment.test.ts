import { Environment } from '../app/models/Environment';

export const environment: Environment = {
  production: false,
  baseUrl: 'https://ng-course-recipe-book-eb544.firebaseio.com',
  authUrl:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDrNcw1RPBVf9zoZVopMYY3mFNWYhQGGYI',
};
