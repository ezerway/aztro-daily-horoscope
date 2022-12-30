import {
  AdhZodiacSignItem,
  AdhZodiacSignList,
} from '@aztro-daily-horoscope/models';
import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, useDispatch } from 'react-redux';
import { mapDispathToProps, ZodiacSignListProps } from './zodiac-sign-list.props';
import { useNavigation } from '@react-navigation/native';

export function ZodiacSignList({ setUserZodiacSignItem }: ZodiacSignListProps) {

  const navigation = useNavigation();
  const keyExtractor = (item: AdhZodiacSignItem) => item.zodiacSign;
  const zodiacListItemPress = (item: AdhZodiacSignItem) => {
    navigation.navigate('Horoscope Card' as never);
    setUserZodiacSignItem(item);
  }

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={AdhZodiacSignList}
      renderItem={({ item }) => (
        <ListItem bottomDivider
        onPress={() => zodiacListItemPress(item)}
        >
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.zodiacSign}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
    />
  );
}

export const ZodiacSignListContainer = connect(null, mapDispathToProps)(ZodiacSignList);