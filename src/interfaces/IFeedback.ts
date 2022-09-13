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
  totalPages: number;
  error: string | null;
  paginationPage: number;
  paginationLimit: number;
  sort: string;
  sortDirect: string;
}

export interface FeedbacksTableProps {
  activeColumns: string[];
  setOpenDeleteFeedbackDialog: Dispatch<SetStateAction<boolean>>;
  setFeedbackToDelete: Dispatch<SetStateAction<number>>;
}
