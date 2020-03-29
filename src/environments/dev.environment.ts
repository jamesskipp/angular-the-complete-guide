import { Environment } from '../app/models/Environment';

const firebaseKey = 'AIzaSyDrNcw1RPBVf9zoZVopMYY3mFNWYhQGGYI';
const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

export const environment: Environment = {
  production: false,
  baseUrl: 'localhost:8080',
  auth: {
    signupUrl: `${firebaseUrl}signUp?key=${firebaseKey}`,
    loginUrl: `${firebaseUrl}signInWithPassword?key=${firebaseKey}`,
  },
};
