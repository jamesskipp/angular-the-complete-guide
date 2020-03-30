export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }

  get tokenExpiresIn(): number {
    if (!this._tokenExpirationDate) {
      return 0;
    } else {
      const tokenExpiresIn =
        this._tokenExpirationDate.getTime() - new Date().getTime();
      if (tokenExpiresIn < 0) {
        return 0;
      } else {
        return tokenExpiresIn;
      }
    }
  }
}
