import {IActions} from '../../interfaces/actions';
import {IUserReqAdd, IUserReqUp, IUserItem} from '../../interfaces/IUsers';
import {
    ADD_USER_ERROR,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "../types";


export const getUsersRequest = (): IActions => ({
    type: GET_USERS_REQUEST,
});

export const getUsersSuccess = (users: IUserItem[]): IActions => ({
    type: GET_USERS_SUCCESS,
    data: users,
});

export const getUsersError = (message: string): IActions => ({
    type: GET_USERS_ERROR,
    data: message,
});

export const addUserRequest = (
    userValues: IUserReqAdd,
): IActions => ({
    type: ADD_USER_REQUEST,
    data: {userValues},
});

export const addUserSuccess = (user: IUserItem): IActions => ({
    type: ADD_USER_SUCCESS,
    data: user,
});

export const addUserError = (message: string): IActions => ({
    type: ADD_USER_ERROR,
    data: message,
});
export const updateUserRequest = (
    id: number,
    userValues: IUserReqUp,
): IActions => ({
    type: UPDATE_USER_REQUEST,
    data: {id, userValues},
});

export const updateUserSuccess = (user: IUserItem): IActions => ({
    type: UPDATE_USER_SUCCESS,
    data: user,
});

export const updateUserError = (message: string): IActions => ({
    type: UPDATE_USER_ERROR,
    data: message,
});
export const deleteUserRequest = (id: any): IActions => {
    return ({
        type: DELETE_USER_REQUEST,
        data: id,
    })
};

export const deleteUserSuccess = (id: number): IActions => ({
    type: DELETE_USER_SUCCESS,
    data: id,
});

export const deleteUserError = (message: string): IActions => ({
    type: DELETE_USER_ERROR,
    data: message,
});
