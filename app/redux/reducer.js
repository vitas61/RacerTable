import {combineReducers} from 'redux';
import {driversState} from './drivers';
import {raceResultState} from './raceresult';

const root = combineReducers({driversState, raceResultState});

export default root;
