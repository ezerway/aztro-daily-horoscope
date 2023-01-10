export interface AdhAuth {
  id?: string;
  hasLoggedInOnce?: boolean,
  accessToken?: string,
  accessTokenExpirationDate?: string,
  refreshToken?: string
}