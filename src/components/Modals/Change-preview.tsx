import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUploadPrewiesProduct } from '../../store/actions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  GridList,
  GridListTile,
  ButtonBase
} from '@material-ui/core';
import { imgPath } from '../../api/config';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      margin: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
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
    image: {
      width: 150,
      margin: '20px auto',
      display: 'block'
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
  files: any,
  mainImg: any
}

const ProductAddMainImages: React.FC<IProductId> = ({ id, files, mainImg }) => {

  const classes = useStyles();
  const mystyle = {
    color: "white",
    border: "10px solid DodgerBlue",
    padding: "10px",
  };
  const dispatch = useDispatch();
  const images = files?.filter((img: any) => /^cropped-/.test(img.name));
  return (
    <Paper className={classes.paper}>
      {mainImg ?
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="complex" src={`${imgPath}${mainImg.name}`} />
        </ButtonBase> :
        <Typography gutterBottom variant="subtitle1">
          Змінити головне зображення
          </Typography>}
      {files &&
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
                Змінити головне зображення
                </Typography>
            </Grid>
            {images && <Grid item >
              <div className={classes.gridListRoot}>
                <GridList className={classes.gridList} cols={2.5}>

                  {images.map((img: { id: number; name: string; }) => (
                    <GridListTile key={img.id} onClick={() => {
                      const productId = id;
                      const imgName = img.name;
                      dispatch(fetchUploadPrewiesProduct(productId, imgName))
                    }}
                    >
                      {mainImg
                        ?
                        (mainImg.id === img.id
                          ?
                          <img src={`${imgPath}${img.name}`} alt={img.name} style={mystyle} />
                          : <img src={`${imgPath}${img.name}`} alt={img.name} />)
                        : <img src={`${imgPath}${img.name}`} alt={img.name} />}
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Grid>}
          </Grid>
        </Grid>}
    </Paper>
  );
};

export default ProductAddMainImages;