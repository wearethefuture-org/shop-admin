import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import EditProduct from '../EditProduct/EditPoduct';
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

interface IComplexGrid {
  id: number,
  name: string,
  price: number,
  description: string,
  category: any,
  url_key: string,
  files: Array<any>,
  mainImg: any,
  createdAt: string,
  updatedAt: string
}
const ComplexGrid: React.FC<IComplexGrid & RouteComponentProps<any>> = (data) => {
  const classes = useStyles();
  const { id, name, price, description, category, files, url_key, mainImg, createdAt, updatedAt, history } = data;
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(fetchDeleteProduct(id));
    history.push('/products')
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {mainImg && <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={`http://localhost:4000/product/img/${mainImg.name}`} />
            </ButtonBase>}

          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Product id: {id}
                </Typography>
                <Typography gutterBottom variant="body2">
                  Product name: {name}
                </Typography>
                <Typography gutterBottom variant="body2">
                  Product key: {url_key}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Product description: {description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Price: {price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Category: {category.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Product created: {createdAt}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Product updated: {updatedAt}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ArrowBackIosIcon />}
                onClick={() => { history.push('/products') }}
              >
                Back
              </Button>
              <Grid item>
                <EditProduct className={classes.button} props={{ id, name, price, description, categoryName: category.name, files, url_key, mainImg }} />
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