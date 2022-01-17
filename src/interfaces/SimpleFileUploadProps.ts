import { FieldProps } from 'formik';
import { InputProps } from '@material-ui/core/Input';

export interface SimpleFileUploadProps extends FieldProps {
  label: string;
  accept: string;
  fieldId: string;
  disabled?: boolean;
  InputProps?: Omit<InputProps, 'name' | 'type' | 'label'>;
  caption?: string;
}
