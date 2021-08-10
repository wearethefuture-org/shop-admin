import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getLotteryRequest } from '../store/actions/lottery.actions';
import { ILotteryArrayData } from '../interfaces/ILottery';

const useLottery = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getLotteryRequest());
  }, [dispatch]);

  const { list, loading }: Partial<ILotteryArrayData> = useSelector(
    (state: RootState) => state.lottery,
  );

  return { list, loading };
};

export default useLottery;
