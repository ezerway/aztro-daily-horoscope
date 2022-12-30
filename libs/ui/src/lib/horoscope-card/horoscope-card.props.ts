import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { horoscopeActions, RootState, horoscopeSelectors } from "@aztro-daily-horoscope/store";
import { AdhHoroscopeDay, AdhZodiacSign } from "@aztro-daily-horoscope/models";


const mapStateToProps = (state: RootState) => {
  return {
    horoscope: horoscopeSelectors.getUserHoroscope(state),
    zodiacItem: horoscopeSelectors.getUserZodiacItem(state),
    loadingStatus: horoscopeSelectors.getHoroscopeLoadingStatus(state),
  }
}

const mapDispathToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
  return {
    fetchHoroscope: (zodiacSign: AdhZodiacSign, day: AdhHoroscopeDay) => {
      dispatch(horoscopeActions.fetchHoroscope({ zodiacSign, day }))
    }
  }
}

type mapDispathToPropsType = ReturnType<typeof mapDispathToProps>;
type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type HoroscopeCardProps = mapDispathToPropsType & mapStateToPropsType;

export { mapStateToProps, mapDispathToProps, HoroscopeCardProps }