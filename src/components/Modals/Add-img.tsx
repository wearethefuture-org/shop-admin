import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUploadImagesProduct } from '../../store/actions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '100%',
      margin: theme.spacing(2),

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
      color: theme.palette.primary.contrastText,
      fontWeight: 100
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.5) 100%)',
    },
  }),
);

interface IimgState {
  selectedFiles: Array<any>,
  previewImages: Array<any>,
}

interface IProductId {
  id: number,
}

const ProductAddImages: React.FC<IProductId> = ({ id}) => {

  const classes = useStyles();
  const [imgState, setImgState] = useState<IimgState>({
    selectedFiles: [],
    previewImages: [],
  })

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    let images = [];

    for (let i = 0; i < event.target.files!.length; i++) {
      images.push({ imgUrl: URL.createObjectURL(event.target.files![i]), imgName: event.target.files![i].name });
    }

    setImgState({
      selectedFiles: Array.from(event.target.files!),
      previewImages: images
    });

  }


  const { selectedFiles, previewImages } = imgState;


  const dispatch = useDispatch();

  const handleClose = () => {
    setImgState({
      selectedFiles: [],
      previewImages: []
    });
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
      selectedFiles: [],
      previewImages: []
    });
  }

  const deleteImg = (event: React.MouseEvent<HTMLButtonElement>) => {

    setImgState({
      selectedFiles: Array.from(selectedFiles!).filter(file => file.name !== event.currentTarget.id),
      previewImages: previewImages.filter(img => img.imgName !== event.currentTarget.id)
    });
  }
  const disabled = selectedFiles.length > 0 ? true : null;
  return (
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
              Завантажити зображення
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
                Вибрати зображення
                    </Button>
            </label>
          </Grid>

          {previewImages && <Grid item >
            <div className={classes.gridListRoot}>
              <GridList className={classes.gridList} cols={2.5}>
                {previewImages.map((img, i) => (
                  <GridListTile key={i}>
                    <img src={img.imgUrl} alt={img.imgName} />
                    <GridListTileBar
                      title={img.imgName}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <Button aria-label={`delete ${img.imgName}`} id={img.imgName} onClick={deleteImg}>
                          <DeleteIcon className={classes.title} />
                        </Button>
                      }
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
              component="span"
              disabled={!disabled}
              onClick={uploadImages}>
              Завантажити
                  </Button>
            {disabled && <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
            >
              Відмінити
                  </Button>}

          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default ProductAddImages;