import React, {useEffect, useMemo, useCallback} from 'react';
import {View, Text, FlatList, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {styles, styleDriverItem} from './DriverList.style';
import {
  loadDriversThunk as loadDrivers,
  nextDriversThunk as nextDrivers,
  prevDriversThunk as prevDrivers,
} from '../redux/drivers.operations';
import {ScreenName} from '../navigation/routes';

export default connect(
  state => ({
    driversState: state.driversState,
  }),
  {
    loadDrivers,
    nextDrivers,
    prevDrivers,
  },
)(
  ({
    driversState: {
      data,
      currentPage,
      countPage,
      total,
      loading,
      error,
      next,
      prev,
    },
    loadDrivers,
    nextDrivers,
    prevDrivers,
    navigation,
  }) => {
    useEffect(() => {
      loadDrivers();
    }, []);

    useEffect(() => {
      error && Alert.alert('', 'Error load drivers');
    }, [error]);

    const ListFooterComponent = useMemo(
      () => (
        <View style={styles.linkContainer}>
          <View>
            {next && (
              <TouchableOpacity onPress={nextDrivers}>
                <Text style={styles.linkPage}>Page Down</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            {prev && (
              <TouchableOpacity onPress={prevDrivers}>
                <Text style={styles.linkPage}>Page Up</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
      [next, prev, nextDrivers, prevDrivers],
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
      ({item}) => (
        <DriverItem
          info={item}
          raceResult={() => {
            navigation.navigate(ScreenName.DRIVERRACERESULTS, {
              driver: item,
            });
          }}
          driverInfo={() => {
            navigation.navigate(ScreenName.DRIVERINFO, {
              driver: item,
            });
          }}
        />
      ),
      [],
    );

    return (
      <View style={styles.container}>
        <FlatList
          refreshing={loading}
          onRefresh={loadDrivers}
          data={data}
          keyExtractor={item => item.driverId.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View>{error && <Text>Error load drivers</Text>}</View>
          )}
          ListHeaderComponent={HeaderTableComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    );
  },
);

const DriverItem = ({
  info: {
    dateOfBirth,
    driverId,
    familyName,
    givenName,
    nationality,
    url,
    permanentNumber,
  },
  driverInfo,
  raceResult,
}) => {
  return (
    <View style={styleDriverItem.containter}>
      <View style={styleDriverItem.left}>
        <Text style={styleDriverItem.textName}>
          {givenName} {familyName} {permanentNumber}
        </Text>
        <Text style={styleDriverItem.textNationality}>{nationality}</Text>
      </View>
      <View style={styleDriverItem.right}>
        <Text style={styleDriverItem.textDateOfBirth}>{dateOfBirth}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <TouchableOpacity onPress={driverInfo}>
              <Text style={styleDriverItem.linkBiography}>Biography</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={raceResult}>
              <Text style={styleDriverItem.linkBiography}>Race result</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
