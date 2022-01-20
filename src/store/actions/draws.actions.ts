import { IActions } from '../../interfaces/actions';

import {
  ADD_DRAW_ERROR,
  ADD_DRAW_REQUEST,
  ADD_DRAW_SUCCESS,
  GET_DRAWS_ERROR,
  GET_DRAWS_REQUEST,
  GET_DRAWS_SUCCESS,
  DELETE_DRAW_ERROR,
  DELETE_DRAW_REQUEST,
  DELETE_DRAW_SUCCESS,
  UPDATE_DRAW_REQUEST,
  UPDATE_DRAW_SUCCESS,
  UPDATE_DRAW_ERROR,
} from '../types';

import { IDraw, IDrawReqAdd } from '../../interfaces/IDraw';

export const addDrawRequest = (drawValues: IDrawReqAdd): IActions => ({
  type: ADD_DRAW_REQUEST,
  data: { drawValues },
});

export const addDrawSuccess = (draw: IDraw): IActions => ({
  type: ADD_DRAW_SUCCESS,
  data: draw,
});

export const addDrawError = (message: string): IActions => ({
  type: ADD_DRAW_ERROR,
  data: message,
});

export const updateDrawRequest = (id: number, drawValues: IDrawReqAdd): IActions => ({
  type: UPDATE_DRAW_REQUEST,
  data: { id, drawValues },
});

export const updateDrawSuccess = (draw: IDraw): IActions => ({
  type: UPDATE_DRAW_SUCCESS,
  data: draw,
});

export const updateDrawError = (message: string): IActions => ({
  type: UPDATE_DRAW_ERROR,
  data: message,
});

export const getDrawsRequest = (page: number, limit: number): IActions => ({
  type: GET_DRAWS_REQUEST,
  data: { page, limit },
});

export const getDrawsSuccess = (draws: IDraw[]): IActions => ({
  type: GET_DRAWS_SUCCESS,
  data: draws,
});

export const getDrawsError = (message: string): IActions => ({
  type: GET_DRAWS_ERROR,
  data: message,
});

export const deleteDrawRequest = (id: number): IActions => ({
  type: DELETE_DRAW_REQUEST,
  data: id,
});

export const deleteDrawSuccess = (id: number): IActions => ({
  type: DELETE_DRAW_SUCCESS,
  data: id,
});

export const deleteDrawError = (message: string): IActions => ({
  type: DELETE_DRAW_ERROR,
  data: message,
});
