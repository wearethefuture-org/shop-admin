import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUploadImagesProduct } from '../../store/actions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Modal,
  Button,
  Paper,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
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
      minHeight: '350px'
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
  }),
);

interface IimgState {
  selectedFiles: FileList | null,
  previewImages: Array<any>,
}

interface IProductId {
  id: number
}

const ProductAddImagesModal: React.FC<IProductId> = ({ id }) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [imgState, setImgState] = useState<IimgState>({
    selectedFiles: null,
    previewImages: [],
  })

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    let images = [];

    for (let i = 0; i < event.target.files!.length; i++) {
      images.push(URL.createObjectURL(event.target.files![i]))
    }

    setImgState({
      selectedFiles: event.target.files,
      previewImages: images
    });
  }


  const { selectedFiles, previewImages } = imgState;
  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    setImgState({
      selectedFiles: null,
      previewImages: []
    });
    setOpen(false);
  };

  const uploadImages = () => {
    if (!selectedFiles) {
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedFiles!.length; i++) {
      formData.append('images', selectedFiles![i], selectedFiles![i].name);
    }
    dispatch(fetchUploadImagesProduct(formData, id));
    setImgState({
      selectedFiles: null,
      previewImages: []
    });
    setOpen(false);
  }

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={`${classes.margin}`}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        add images
      </Button>
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
                  Upload Images
                </Typography>
              </Grid>
              <Grid item >
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={selectFiles}
                  />

                  <Button color="primary" variant="outlined" component="span">
                    Chooice Picture
                    </Button>
                </label>
              </Grid>

              {previewImages && <Grid item >
                <div className={classes.gridListRoot}>
                  <GridList className={classes.gridList} cols={2.5}>
                    {previewImages.map((img, i) => (
                      <GridListTile key={i}>
                        <img src={img} alt={"image-" + i} />
                        <GridListTileBar
                          title={"image-" + i}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
              </Grid>}
              <Grid
                item
                container
                xs
                justify="space-around"
                alignItems="center"
                spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span" disabled={!selectedFiles}
                  onClick={uploadImages}>
                  Upload
                  </Button>
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

export default ProductAddImagesModal;