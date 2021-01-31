import React from "react";
import { ISettingsItem } from "../../../interfaces/ISettings";
import { firstCharToUpperCase } from "../../../utils/firstCharToUpperCase";
import DateMoment from "../../Common/Date-moment";
import SettingsForms from "../../Forms/Settings-form/Settings-form";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface SettingsDataProps {
  data: Array<ISettingsItem>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "95%",
      margin: "10px auto",
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      marginRight: "10px",
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    dateTitle: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

const SettingsContent: React.FC<SettingsDataProps> = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {data.map((item) => {
        return (
          <Accordion
            expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
            key={item.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${item.id}-header`}
              id={`panel${item.id}-header`}
            >
              <Typography className={classes.heading} variant="h3">
                {`Налаштування ${firstCharToUpperCase(item.name)}`}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                <span className={classes.dateTitle}>Оновлено</span>{" "}
                <DateMoment date={item.updatedAt} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SettingsForms data={item} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default SettingsContent;
