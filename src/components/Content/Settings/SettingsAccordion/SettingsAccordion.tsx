import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { ISettingsItem } from '../../../../interfaces/ISettings';
import { firstCharToUpperCase } from '../../../../utils/firstCharToUpperCase';
import DateMoment from '../../../Common/Date-moment';
import SettingsForms from '../../../Forms/Settings-form/Settings-form';

interface SettingsItemProps {
  data: ISettingsItem;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(18),
      marginRight: '10px',
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    dateTitle: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  })
);

const SettingsAccordion: React.FC<SettingsItemProps> = ({
  data: { id, name, updatedAt, settings },
}) => {
  const classes = useStyles();

  return (
    <Accordion key={id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}-header`}
        id={`panel${id}-header`}
      >
        <Typography className={classes.heading} variant="h3">
          {`Налаштування ${firstCharToUpperCase(name)}`}
        </Typography>
        <Typography className={classes.secondaryHeading}>
          <span className={classes.dateTitle}>Оновлено</span>{' '}
          <DateMoment date={updatedAt} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SettingsForms name={name} parameters={settings} />
      </AccordionDetails>
    </Accordion>
  );
};

export default SettingsAccordion;
