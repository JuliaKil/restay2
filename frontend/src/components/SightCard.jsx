import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Button,
} from "@material-ui/core";
import formatDate from "dateformat";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const SightCard = (props) => {
  const classes = useStyles();
  const { sight, onDelete, openUpdateModal } = props;
  const { fields } = sight;

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {fields.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {fields.address}
        </Typography>
        <Typography variant="body2" component="p">
          Начало:{" "}
          {formatDate(new Date(fields.startTime), "HH:MM dd.mm.yy")}
        </Typography>
        <Typography variant="body2" component="p">
          Конец: {formatDate(new Date(fields.endTime), "HH:MM dd.mm.yy")}
        </Typography>
        <Typography variant="body2" component="p">
          Цена: {fields.price} руб.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={openUpdateModal} color="primary" size="small">
          Изменить
        </Button>
        <Button
          onClick={() => onDelete(sight.pk)}
          color="secondary"
          size="small"
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};
