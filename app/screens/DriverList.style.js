import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 10,
  },
  linkPage: {
    fontSize: 16,
    color: '#06c',
  },
});

export const styleDriverItem = StyleSheet.create({
  containter: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
    flexDirection: 'row',
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
  textName: {
    fontSize: 15,
    fontWeight: '600',
  },
  textNationality: {
    fontSize: 12,
    fontWeight: '400',
    color: '#444444',
    marginTop: 8,
  },
  textDateOfBirth: {
    fontSize: 13,
    color: '#333',
    textAlign: 'right',
  },
  linkBiography: {
    //textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 14,
    color: '#06c',
    textAlign: 'right',
  },
  left: {},
  right: {},
});
