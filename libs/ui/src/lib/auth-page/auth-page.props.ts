import { authActions, authSelectors, RootState } from "@aztro-daily-horoscope/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

const mapStateToProps = (rootState: RootState) => {
  return {
    authLoadingStatus: authSelectors.getAuthLoadingStatus(rootState),
    authAccessToken: authSelectors.getAuthAccessToken(rootState),
    authRefeshToken: authSelectors.getAuthRefeshToken(rootState),
    authAccessTokenExpirationDate: authSelectors.getAuthAccessTokenExpirationDate(rootState),
  }
};

const mapDispathToProps = (dispath: ThunkDispatch<RootState, void, any>) => {
  return {
    authorize: (config: any) => { dispath(authActions.doAuthorize({ config })) },
    refresh: (config: any, refreshToken: string) => { dispath(authActions.doRefresh({ config, refreshToken })) },
    logout: (config: any, accessToken: string) => { dispath(authActions.doRevoke({ config, accessToken })) },
  }
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispathToPropsType = ReturnType<typeof mapDispathToProps>;
type AuthPageProps = mapStateToPropsType & mapDispathToPropsType;


export { mapStateToProps, mapDispathToProps, AuthPageProps };
