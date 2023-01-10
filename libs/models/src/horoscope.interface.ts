import { AdhZodiacSign } from './zodiac-sign.enum';

export interface AdhHoroscope {
  id: string;
  currentDate: string;
  description: string;
  compatibility: AdhZodiacSign;
  mood: string;
  color: string;
  luckyNumber: number;
  luckyTime: string;
}