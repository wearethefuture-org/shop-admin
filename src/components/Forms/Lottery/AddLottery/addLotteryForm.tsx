import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import InnerForm from './innerForm';
import { addLotteryRequest } from '../../../../store/actions/lottery.actions';
import { IAddLotteryItem } from '../../../../interfaces/ILottery';
import { LotteryValidationShema } from '../../../../pages/Lottery/lotteryValidationShema';

interface AddLotteryFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialStart?: string;
  initialFinish?: string;
  initialTitle?: string;
  initialDescription?: string;
}

const AddLotteryForm = withFormik<AddLotteryFormProps, IAddLotteryItem>({
  mapPropsToValues: (props) => {
    return {
      start: props.initialStart || '',
      finish: props.initialFinish || '',
      title: props.initialTitle || '',
      description: props.initialDescription || '',
    };
  },
  validationSchema: LotteryValidationShema,
  handleSubmit: (values: IAddLotteryItem, { setSubmitting, props }) => {
    setSubmitting(false);

    const { start, finish, title, description } = values;
    props.dispatch(addLotteryRequest({ start, finish, title, description  }));
    props.handleClose();
  },
})(InnerForm);

export default AddLotteryForm;
