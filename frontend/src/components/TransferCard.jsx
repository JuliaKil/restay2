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

export const TransferCard = (props) => {
  const classes = useStyles();
  const { transfer, onDelete, openUpdateModal } = props;
  const { fields } = transfer;

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {fields.number}
        </Typography>
        <Typography color="textSecondary">{fields.transferType}</Typography>
        <Typography variant="body2" component="p">
          Из {fields.departurePoint} в {fields.arrivalPoint}
        </Typography>
        <Typography variant="body2" component="p">
          Отбытие:{" "}
          {formatDate(new Date(fields.startTime), "hh:MM dd.mm.yy")}
        </Typography>
        <Typography variant="body2" component="p">
          Прибытие:{" "}
          {formatDate(new Date(fields.endTime), "HH:MM dd.mm.yy")}
        </Typography>
        <Typography variant="body2" component="p">
          Стоимость - {fields.price} руб.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={openUpdateModal} color="primary" size="small">
          Изменить
        </Button>
        <Button
          onClick={() => onDelete(transfer.pk)}
          color="secondary"
          size="small"
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};
