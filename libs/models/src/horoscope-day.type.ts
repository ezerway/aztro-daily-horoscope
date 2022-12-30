export enum AdhHoroscopeDayEnum {
    Today = 'today',
    Tomorrow = 'tomorrow',
    Yesterday = 'yesterday'
}

export type AdhHoroscopeDay = AdhHoroscopeDayEnum.Today
| AdhHoroscopeDayEnum.Tomorrow
| AdhHoroscopeDayEnum.Yesterday;