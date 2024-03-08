import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CharacterType} from '../../api/getCharacters';
import {RootStackParamList} from '../../navigation/MainStackNavigator';

const LISTHEADERTITLE = 'Characters';

type PropsType = {
  characterList: CharacterType[];
};

const CharacterFlatList = ({characterList}: PropsType) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (id: number) => {
    navigation.navigate('CharacterDetail', {id: id});
  };

  const renderItem = React.useCallback(
    ({item}: {item: CharacterType}) => (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => handlePress(item.id)}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <View style={styles.itemInfoWrapper}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.itemStatusWrapper}>
            <View
              style={[
                styles.itemStatus,
                {
                  backgroundColor:
                    item.status === 'Alive'
                      ? '#8CD790'
                      : item.status === 'Dead'
                      ? 'red'
                      : '#dfa316',
                },
              ]}></View>
            <Text style={styles.itemStatusText}>
              {item.status} - {item.species}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const keyExtractor = React.useCallback(
    (item: CharacterType) => `character-id-${item.id}`,
    [],
  );

  const listHeader = React.useCallback(
    () => <Text style={styles.listHeaderText}>{LISTHEADERTITLE}</Text>,
    [],
  );

  return (
    <FlatList
      data={characterList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      horizontal={false}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={styles.listHeader}
      stickyHeaderIndices={[0]}
      initialNumToRender={8}
      windowSize={5}
      maxToRenderPerBatch={6}
    />
  );
};

export default CharacterFlatList;

const styles = StyleSheet.create({
  listHeader: {
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  listHeaderText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  itemWrapper: {
    width: '47%',
    backgroundColor: '#1D1D1B',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemImage: {
    flex: 1,
    maxWidth: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  itemInfoWrapper: {
    gap: 8,
  },
  itemName: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemStatusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemStatus: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#8CD790',
  },
  itemStatusText: {
    fontWeight: '700',
    fontSize: 10,
    color: '#FFFFFF',
  },
});
