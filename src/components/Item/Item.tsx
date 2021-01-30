import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IProductItem } from '../../interfaces/IProducts';
import EditProduct from '../AddProduct/EditPoduct';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { fetchDeleteProduct } from '../../store/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 700,
    },
    image: {
      width: 200,
      height: 200,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      margin: theme.spacing(1),
      width: '100%',
    },
  }),
);

const ComplexGrid: React.FC<IProductItem & RouteComponentProps<any>> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(fetchDeleteProduct(props.id));
    props.history.push('/products');
  }
  console.log(props.id)
  const { id, name, price, description, category } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://picsum.photos/200" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Product id: {props.id}
                </Typography>
                <Typography gutterBottom variant="body2">
                  Product name: {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Product description: {props.description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Price: {props.price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Category: {props.category.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Product created: {props.createdAt}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Product updated: {props.updatedAt}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ArrowBackIosIcon />}
                onClick={() => props.history.push(`/products`)}
              >
                Back
              </Button>
              <Grid item>
                <EditProduct className={classes.button} props={{ id, name, price, description, categoryName: category.name }} />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={deleteProduct}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withRouter(ComplexGrid);