

export interface ILotteryItem {
  id: number,
  createdAt: string,
  updatedAt: string,
  start: string,
  finish: string,
  title: string,
  description: string,
  productId: number,
  winnerId: number,
  active: boolean
}

export interface ILotteryArrayData {
  list: Array<ILotteryItem>;
  loading: boolean;
  error: string | null;
}

export interface LotteryTableProps {
  list: ILotteryItem[];
  activeColumns: string[];
}

export interface IAddLotteryItem {
  start: string,
  finish: string,
  title: string,
  description: string,
}

export interface IInnerLotteryFormProps {
  handleClose: () => void;
}

