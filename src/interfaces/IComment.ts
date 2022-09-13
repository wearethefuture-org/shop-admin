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
  list: IComment[];
  loading: boolean;
  error: string | null;
  count: number;
  totalPages: number;
  rangeComments: ICommentsDateRange[] | null;
  paginationPage: number;
  paginationLimit: number;
  sort: string;
  sortDirect: string;
}

export interface ICommentsDateRange {
  date: string;
  creatad: string;
}

export interface CommentsTableProps {
  activeColumns: string[];
  setOpenDeleteCommentDialog: Dispatch<SetStateAction<boolean>>;
  setCommentToDelete: Dispatch<SetStateAction<number>>;
}
