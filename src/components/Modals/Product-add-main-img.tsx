import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUploadPrewiesProduct } from '../../store/actions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Modal,
  Button,
  Paper,
  Typography,
  Grid,
  GridList,
  GridListTile,
  ButtonBase
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '100%',
      maxWidth: '600px',
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginLeft: theme.spacing(1),
    },
    gridListRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    image: {
      width: 120,
      marginTop: 20,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);


interface IProductId {
  id: number,
  files: Array<any> | undefined,
  mainImg: any
}

const ProductAddMainImagesModal: React.FC<IProductId> = ({ id, files, mainImg }) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const images = files?.filter((img) => /^cropped-/.test(img.name));
  return (
    <Fragment>
      {mainImg ?
        <ButtonBase className={classes.image} onClick={handleOpen}>
          <img className={classes.img} alt="complex" src={`http://localhost:4000/product/img/${mainImg.name}`} />
        </ButtonBase> :
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={`${classes.margin}`}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add main images
      </Button>}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        <Paper className={classes.paper}>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  upload Main image
                </Typography>
              </Grid>

              {images && <Grid item >
                <div className={classes.gridListRoot}>
                  <GridList className={classes.gridList} cols={2.5}>
                    {images.map((img, i) => (
                      <GridListTile key={img.id} onClick={() => {
                        const productId = id;
                        const imgName = img.name;
                        dispatch(fetchUploadPrewiesProduct(productId, imgName))
                        setOpen(false);
                      }}>
                        <img src={`http://localhost:4000/product/img/${img.name}`} alt={"image-" + i} />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
              </Grid>}
              <Grid
                item
                container
                xs
                justify="center"
                alignItems="center"
                spacing={2}>

                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                  </Button>
              </Grid>
            </Grid>

          </Grid>
        </Paper>
      </Modal>
    </Fragment >
  );
};

export default ProductAddMainImagesModal;