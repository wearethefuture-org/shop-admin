import {
  alpha,
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  ThemeOptions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  fetchChangeActiveSliderAnimation,
  fetchSliderAnimations,
} from '../../store/actions/sliderAnimations.actions';
import useModal from '../../hooks/useModal';
import SlidesGallery from '../SlidesGallery/SlidesGallery';
import styles from './SliderAnimations.module.scss';
import { COLORS } from '../../values/colors';
import classNames from 'classnames';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      radio: {
        '&$checked': {
          color: COLORS.primaryGreen,
        },
        '&:hover': {
          backgroundColor: COLORS.secondaryOttoman,
        },
      },
      radioDark: {
        '&$checked': {
          color: COLORS.darkGreen,
        },
        '&:hover': {
          backgroundColor: alpha(COLORS.darkGreen, theme.palette.action.hoverOpacity),
        },
      },
      checked: {},
      btn: {
        height: '50px',
        borderRadius: '30px',
        padding: '6px 15px 6px 15px',
        color: COLORS.primaryLight,
      },
      btnSaveLight: {
        'backgroundColor': COLORS.primaryGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryGreen,
        },
      },
      btnSaveDark: {
        'backgroundColor': COLORS.secondaryDarkGreen,
        '&:hover': {
          backgroundColor: COLORS.darkGreen,
        },
      },
      btnAnimsLight: {
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
      btnAnimsDark: {
        'backgroundColor': COLORS.secondaryDarkBlue,
        '&:hover': {
          backgroundColor: COLORS.darkBlue,
        },
      },
    })
);

const SliderAnimations: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const animationsData = useSelector((state: RootState) => state.sliderAnimations);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const { handleClickOpen, isOpened, handleClose } = useModal();
  const [effect, setEffect] = useState<object | null>(null);

  const isAnimationChange = animationsData.id !== effect?.id;

  async function fetchData() {
    await dispatch(fetchSliderAnimations());
  }

  useEffect(() => {
    if (animationsData.animations.length === 0) {
      fetchData();
    }
  }, [animationsData.animations]);

  useEffect(() => {
    setEffect(animationsData);
  }, [animationsData]);

  function handleChangeActiveAnim(e) {
    const newActiveAnim = animationsData.animations.find((a) => a.animation === e.target.value);
    setEffect(newActiveAnim);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (isAnimationChange) {
      await dispatch(fetchChangeActiveSliderAnimation(effect?.id, true));
      await dispatch(fetchChangeActiveSliderAnimation(animationsData.id, false));
    }
  }

  function handleEmptyChangeClose() {
    setEffect(animationsData);
    handleClose();
  }

  return (
    <div className={styles.wrapper}>
      <Button
        className={classNames(classes.btn, darkMode ? classes.btnAnimsDark : classes.btnAnimsLight)}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Анімації слайдів
      </Button>
      <Dialog
        open={isOpened}
        onClose={handleEmptyChangeClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Вибір анімації слайдів</DialogTitle>
        <DialogContent dividers>
          <SlidesGallery customAnimation={effect?.animation} />
          <div className={styles.wrapper}>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Анімації слайдів</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={effect?.animation}
                  onChange={handleChangeActiveAnim}
                >
                  {animationsData.animations
                    .sort((a, b) => a.animation.localeCompare(b.animation))
                    .map((a) => (
                      <FormControlLabel
                        key={a.id}
                        value={a.animation}
                        control={
                          <Radio
                            classes={{
                              root: darkMode ? classes.radioDark : classes.radio,
                              checked: classes.checked,
                            }}
                          />
                        }
                        label={a.animation}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
              <DialogActions>
                <Button
                  style={{ display: 'block', marginLeft: 'auto' }}
                  className={classNames(
                    classes.btn,
                    darkMode ? classes.btnSaveDark : classes.btnSaveLight
                  )}
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  type="submit"
                  disabled={isAnimationChange ? false : true}
                >
                  Зберегти
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SliderAnimations;
