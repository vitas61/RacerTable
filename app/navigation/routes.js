import {DriverInfo, DriverList, DriverRaceResults} from '../screens';
import {createStackNavigator} from 'react-navigation-stack';

export const ScreenName = {
  DRIVERLIST: 'DriverList',
  DRIVERINFO: 'DriverInfo',
  DRIVERRACERESULTS: 'DriverRaceResults',
};

export const NavStack = createStackNavigator(
  {
    DriverList: {
      screen: DriverList,
      navigationOptions: () => ({
        title: 'Drivers',
      }),
    },
    DriverInfo: {
      screen: DriverInfo,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        return {
          title: params ? params.driverName : null,
        };
      },
    },
    DriverRaceResults: {
      screen: DriverRaceResults,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        return {
          title: params ? params.driverName : null,
        };
      },
    },
  },
  {
    initialRouteName: ScreenName.DRIVERLIST,
  },
);
