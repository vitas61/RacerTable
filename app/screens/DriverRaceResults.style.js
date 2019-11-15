import {StyleSheet} from 'react-native';

export const styleRaceResultItem = StyleSheet.create({
  containter: {
    backgroundColor: '#ddd',
    marginVertical: 4,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    backgroundColor: '#bbb',
    flex: 1,
    flexDirection: 'row',
  },
  headerPos: {
    flexGrow: 0,
    padding: 3,
    backgroundColor: '#000',
  },
  headerPosText: {
    color: '#fff',
    fontWeight: '600',
  },
  headerName: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNameText: {
    fontWeight: '700',
  },
  body: {flex: 1, flexDirection: 'row'},
  bodyGrid: {flexGrow: 1, padding: 4},
  bodyText: {
    fontSize: 13,
  },
  footer: {
    backgroundColor: '#999',
    flex: 1,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontWeight: '600',
  },
  footerTextConst: {
    fontSize: 12,
  },
});
