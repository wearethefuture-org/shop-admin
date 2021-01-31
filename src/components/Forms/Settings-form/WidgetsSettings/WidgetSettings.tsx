import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { ISettingsItem } from "../../../../interfaces/ISettings";
import { fetchUpdateSettings } from "../../../../store/actions";
import useSnackBar from "../../../../hooks/useSnackbar";

interface WidgetFormProps {
  data: ISettingsItem;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      width: "210px",
      marginRight: "10px",
    },
    input: {
      width: "150px",
    },
    buttonContainer: {
      textAlign: "end",
    },
    button: {
      margin: "20px",
    },
    secondaryHeading: {
      flexGrow: 1,
      marginLeft: "30px",
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    errorMessage: {
      color: "red",
    },
  })
);

const validationSchema = yup.object({
  quantityNewArrivals: yup
    .number()
    .min(4, "Min value can be 4")
    .max(20, "Max value can be 20")
    .required("Is required"),
  quantityPopularItems: yup
    .number()
    .min(4, "Min value can be 4")
    .max(20, "Max value can be 20")
    .required("Is required"),
});

const WidgetSettingsForm: React.FC<WidgetFormProps> = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleClick } = useSnackBar();
  const {
    name,
    settings: { quantityNewArrivals, quantityPopularItems },
  } = data;

  const formik = useFormik({
    initialValues: {
      quantityNewArrivals,
      quantityPopularItems,
    },
    validationSchema: validationSchema,
    onSubmit: (values: object) => {
      handleClick();
      dispatch(fetchUpdateSettings(name, values));
    },
  });

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.inputContainer}>
          <Typography className={classes.title}>
            Слайдер нових товарів:
          </Typography>
          <TextField
            className={classes.input}
            type="number"
            id="quantityNewArrivals"
            name="quantityNewArrivals"
            label="Кількість"
            value={formik.values.quantityNewArrivals}
            onChange={formik.handleChange}
            error={
              formik.touched.quantityNewArrivals &&
              Boolean(formik.errors.quantityNewArrivals)
            }
            helperText={
              formik.touched.quantityNewArrivals &&
              formik.errors.quantityNewArrivals
            }
          />
          <Typography className={classes.secondaryHeading}>
            Кількість слайдів: 4-20
          </Typography>
        </div>
        <div className={classes.inputContainer}>
          <Typography className={classes.title}>
            Слайдер популярних товарів:
          </Typography>
          <TextField
            className={classes.input}
            type="number"
            id="quantityPopularItems"
            name="quantityPopularItems"
            label="Кількість"
            value={formik.values.quantityPopularItems}
            onChange={formik.handleChange}
            error={
              formik.touched.quantityPopularItems &&
              Boolean(formik.errors.quantityPopularItems)
            }
            helperText={
              formik.touched.quantityPopularItems &&
              formik.errors.quantityPopularItems
            }
          />
          <Typography className={classes.secondaryHeading}>
            Кількість слайдів: 4-20
          </Typography>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className={classes.button}
          >
            Зберегти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WidgetSettingsForm;
