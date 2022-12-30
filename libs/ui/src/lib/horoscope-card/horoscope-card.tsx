import React, { useEffect } from 'react';
import { Card, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from 'react-native-style-tachyons';
import { connect } from 'react-redux';
import { HoroscopeCardProps, mapDispathToProps, mapStateToProps } from './horoscope-card.props';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';
import { AdhHoroscopeDayEnum } from '@aztro-daily-horoscope/models';
import { LoadingStatusEnum } from 'libs/store/src/lib/models/loading-status.type';


export function HoroscopeCard({
  horoscope,
  zodiacItem,
  loadingStatus,
  fetchHoroscope
}: HoroscopeCardProps) {

  useEffect(() => {
    if (zodiacItem?.zodiacSign) {
      fetchHoroscope(zodiacItem.zodiacSign, AdhHoroscopeDayEnum.Today)
    }
  }, [zodiacItem, fetchHoroscope]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          {
            zodiacItem && (<>
              <Card.Title>
                <Icon name={zodiacItem?.icon} size={40} />
              </Card.Title>
              <Card.Title>{zodiacItem?.zodiacSign}</Card.Title>
            </>)
          }

          <Card.Divider />
          <Text h4 style={{ width: '100%', textAlign: 'center' }}>
            Your Horoscope for Today
          </Text>

          {
            loadingStatus === LoadingStatusEnum.Loaded && horoscope
              ? (<>
                <Text style={[styles.mt2, styles.f4]}>
                  {horoscope.description}
                </Text>
                <Text style={[styles.mt2]}>Mood: {horoscope.mood}</Text>
                <Text style={[styles.mt2]}>Color: {horoscope.color}</Text>
                <Text style={[styles.mt2]}>
                  Compatibility: {horoscope.compatibility}
                </Text>
                <Text style={[styles.mt2]}>
                  Lucky Number: {horoscope.luckyNumber}
                </Text>
                <Text style={[styles.mt2]}>
                  Lucky Time: {horoscope.luckyTime}
                </Text>
              </>)
              : loadingStatus === LoadingStatusEnum.Error
                ? (<Text h2>
                  Oops! Something went wrong. Plz chec again.
                </Text>
                )
                : (<ActivityIndicator size={'large'} />)
          }
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HoroscopeCard;

export const HoroscopeCardContainer = connect(mapStateToProps, mapDispathToProps)(HoroscopeCard);