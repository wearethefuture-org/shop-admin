import { Dispatch, SetStateAction } from 'react';
import { Common } from './IProducts';

export interface IBaseComment extends Common {
  text: string;
}

export interface IComment extends IBaseComment {
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  product: {
    id: number;
  };
}

export interface ICommentResponse {
  data: IComment[];
  count: number;
  page: number;
  totalPages: number;
}

export interface ICommentsState {
  loading: boolean;
  list: IComment[];
  rangeComments: ICommentsDateRange[] | null;
  count: number;
  page: number;
  totalPages: number;
  error: string | null;
}

export interface ICommentsDateRange {
  date: string;
  creatad: string;
}

export interface CommentsTableProps {
  list: IComment[];
  activeColumns: string[];
  setOpenDeleteCommentDialog: Dispatch<SetStateAction<boolean>>;
  setCommentToDelete: Dispatch<SetStateAction<number>>;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  paginationServer: boolean;
  currentPage: number;
}
