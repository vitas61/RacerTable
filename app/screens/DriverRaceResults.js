import React, {useEffect, useMemo, useCallback} from 'react';
import {View, Text, FlatList, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './DriverList.style';
import {styleRaceResultItem} from './DriverRaceResults.style';
import {
  loadRaceResultThunk as load,
  nextRaceResultThunk as nextPage,
  prevRaceResultThunk as prevPage,
} from '../redux/raceresult.operations';
import {reset as resetResult} from '../redux/raceresult.actions';

export default connect(
  state => ({
    raceResult: state.raceResultState,
  }),
  {
    load,
    resetResult,
    nextPage,
    prevPage,
  },
)(
  ({
    raceResult: {
      data,
      currentPage,
      countPage,
      total,
      loading,
      error,
      next,
      prev,
    },
    resetResult,
    load,
    nextPage,
    prevPage,
    navigation,
  }) => {
    const {driverId} = navigation.getParam('driver');

    useEffect(() => {
      const {givenName, familyName} = navigation.getParam('driver');
      navigation.setParams({
        driverName: `${givenName} ${familyName}`,
      });
      load(driverId);
      return () => {
        resetResult();
      };
    }, []);

    useEffect(() => {
      error && Alert.alert('', 'Error load race result');
    }, [error]);

    const handleOnRefresh = useCallback(() => {
      load(driverId);
    }, [driverId, load]);

    const ListFooterComponent = useMemo(
      () => (
        <View style={styles.linkContainer}>
          <View>
            {next && (
              <TouchableOpacity onPress={nextPage}>
                <Text style={styles.linkPage}>Page Down</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            {prev && (
              <TouchableOpacity onPress={prevPage}>
                <Text style={styles.linkPage}>Page Up</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
      [next, prev, nextPage, prevPage],
    );

    const HeaderTableComponent = useMemo(
      () => (
        <View style={styles.linkContainer}>
          <View>
            <Text>
              Page {currentPage} of {countPage}
            </Text>
          </View>
          <View>
            <Text>Results {total}</Text>
          </View>
        </View>
      ),
      [currentPage, countPage, total],
    );

    const renderItem = useCallback(
      ({item}) => <RaceResultItem info={item} />,
      [],
    );

    return (
      <View style={styles.container}>
        <FlatList
          refreshing={loading}
          onRefresh={handleOnRefresh}
          data={data}
          keyExtractor={(item, index) => `${item.season}${item.round}_${index}`}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View>{error && <Text>Error load result</Text>}</View>
          )}
          ListHeaderComponent={HeaderTableComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    );
  },
);

const RaceResultItem = ({
  info: {
    raceName,
    season,
    Results: [
      {
        position = 0,
        points = 0,
        number,
        status,
        laps,
        grid,
        Time: {time, milles} = {},
        Constructor: {name: constructorName} = {},
      },
    ] = [],
  },
}) => {
  return (
    <View style={styleRaceResultItem.containter}>
      <View style={styleRaceResultItem.header}>
        <View style={styleRaceResultItem.headerPos}>
          <Text style={styleRaceResultItem.headerPosText}>Pos {position}</Text>
        </View>
        <View style={styleRaceResultItem.headerName}>
          <Text style={styleRaceResultItem.headerNameText}>
            {season} {raceName}
          </Text>
        </View>
      </View>
      <View style={styleRaceResultItem.body}>
        <View style={styleRaceResultItem.bodyGrid}>
          <Text style={styleRaceResultItem.bodyText}>No: {number}</Text>
        </View>
        <View style={styleRaceResultItem.bodyGrid}>
          <Text style={styleRaceResultItem.bodyText}>Laps: {laps}</Text>
          <Text style={styleRaceResultItem.bodyText}>Grid: {grid}</Text>
        </View>
        <View style={styleRaceResultItem.bodyGrid}>
          <Text style={styleRaceResultItem.bodyText}>Time: {time}</Text>
          <Text style={styleRaceResultItem.bodyText}>Points: {points}</Text>
        </View>
      </View>
      <View style={styleRaceResultItem.footer}>
        <Text style={styleRaceResultItem.footerText}>Status: {status}</Text>
        <Text style={styleRaceResultItem.footerTextConst}>
          Constructor: {constructorName}
        </Text>
      </View>
    </View>
  );
};
