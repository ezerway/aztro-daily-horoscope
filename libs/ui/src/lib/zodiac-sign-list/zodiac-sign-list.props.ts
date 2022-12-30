import { AdhZodiacSignItem } from "@aztro-daily-horoscope/models";
import { horoscopeActions } from "@aztro-daily-horoscope/store";
import { Dispatch } from "@reduxjs/toolkit";

const mapDispathToProps = (dispath: Dispatch) => {
  return {
    setUserZodiacSignItem(zodiacSignItem: AdhZodiacSignItem) {
      dispath(horoscopeActions.setUserZodiacSignItem(zodiacSignItem));
    }
  }
}

type mapDispathToPropsType = ReturnType<typeof mapDispathToProps>;
type ZodiacSignListProps = mapDispathToPropsType;

export { mapDispathToProps, ZodiacSignListProps };