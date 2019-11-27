import {combineReducers} from 'redux';
import {driversState} from './drivers.reducer';
import {raceResultState} from './raceresult.reducer';

const root = combineReducers({driversState, raceResultState});

export default root;
