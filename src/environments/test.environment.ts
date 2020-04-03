import { Environment } from '../app/modules/shared/models/environment.model';

const firebaseKey = 'AIzaSyDrNcw1RPBVf9zoZVopMYY3mFNWYhQGGYI';
const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

export const environment: Environment = {
  production: false,
  urls: {
    recipe: {
      base: 'https://ng-course-recipe-book-eb544.firebaseio.com',
    },
    logging: {
      base: 'http://localhost:8080/api',
    },
    auth: {
      signUp: `${firebaseUrl}signUp?key=${firebaseKey}`,
      login: `${firebaseUrl}signInWithPassword?key=${firebaseKey}`,
    },
  },
};
