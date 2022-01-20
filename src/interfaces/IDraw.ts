import { Dispatch, SetStateAction } from 'react';
import { Common } from './IProducts';

export interface IBaseDraw extends Common {
  text: string;
  conditions: string;
  totalAmount: number;
  numOfWinners: number;
}

export interface IDraw extends IBaseDraw {}

export interface IDrawReqAdd {
  text: string;
  conditions: string;
  totalAmount: number;
  numOfWinners: number;
}

export interface IDrawResponse {
  data: IDraw[];
  count: number;
  page: number;
  totalPages: number;
}

export interface IDrawsState {
  loading: boolean;
  list: IDraw[];
  count: number;
  page: number;
  totalPages: number;
  error: string | null;
}

export interface DrawsTableProps {
  list: IDraw[];
  activeColumns: string[];
  setOpenDeleteFeedbackDialog: Dispatch<SetStateAction<boolean>>;
  setFeedbackToDelete: Dispatch<SetStateAction<number>>;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  paginationServer: boolean;
  openDialogDrawCard: (x: any) => void;
}
