import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';
import {NavStack} from './app/navigation/routes';
import store from './app/redux/store';

const AppContainer = createAppContainer(NavStack);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
