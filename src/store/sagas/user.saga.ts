import {put, call,} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {IActions} from '../../interfaces/actions';

import {failSnackBar, successSnackBar} from '../actions/snackbar.actions';
import {signInUserError, signInUserSuccess} from "../actions/user.action";
import {apiSignIn, apiSignOut} from "./services/user.service";
import {clearStorage, setToken, setUser} from "../../services/local-storage-controller";


export function* sigInUser(userValues: IActions): SagaIterator {
    try {
        const {email, password} = userValues.data?.payload;
        const user = yield call(apiSignIn, {email, password});

        setToken(user.token);
        setUser(user.user);

        yield put(signInUserSuccess(user));
        yield put(successSnackBar());
    } catch (error) {

        yield put(failSnackBar(error.message));
        yield put(signInUserError(error.message));
    }
}


export function* signOutUser(): SagaIterator {
    try {
        yield call(apiSignOut);

        clearStorage();
        window.location.reload();

    } catch (error) {
    }

}
