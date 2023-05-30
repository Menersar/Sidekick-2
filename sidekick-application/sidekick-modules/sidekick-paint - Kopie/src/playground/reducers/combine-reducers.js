import {combineReducers} from 'redux';
import intlReducer from './intl';
import {SidekickPaintReducer} from '../..';

export default combineReducers({
    intl: intlReducer,
    sidekickPaint: SidekickPaintReducer
});
