import { Dispatch, SetStateAction } from 'react';
import { Common } from './IProducts';

export interface IBaseFeedback extends Common {
  text: string;
}

export interface IFeedback extends IBaseFeedback {
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface IFeedbackResponse {
  data: IFeedback[];
  count: number;
  page: number;
  totalPages: number;
}

export interface IFeedbacksState {
  loading: boolean;
  list: IFeedback[];
  count: number;
  page: number;
  totalPages: number;
  error: string | null;
}

export interface FeedbacksTableProps {
  list: IFeedback[];
  activeColumns: string[];
  setOpenDeleteFeedbackDialog: Dispatch<SetStateAction<boolean>>;
  setFeedbackToDelete: Dispatch<SetStateAction<number>>;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  paginationServer: boolean;
  currentPage: number;
}
