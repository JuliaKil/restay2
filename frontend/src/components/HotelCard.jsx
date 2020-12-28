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

export const HotelCard = (props) => {
  const classes = useStyles();
  const { hotel, onDelete, openUpdateModal } = props;
  const { fields } = hotel;

  console.log(props);

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {fields.name}
        </Typography>
        <Typography variant="body2" component="p">
          Заселение {formatDate(new Date(fields.startTime), "HH:MM dd.mm.yy")}
        </Typography>
        <Typography variant="body2" component="p">
          Выезд {formatDate(new Date(fields.endTime), "HH:MM dd.mm.yy")}
        </Typography>
        <Typography variant="body2" component="p">
          Адрес: {fields.address}
        </Typography>
        <Typography variant="body2" component="p">
          Номер: {fields.room}
        </Typography>
        <Typography variant="body2" component="p">
          Стоимость: {fields.price} руб.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => openUpdateModal()} color="primary" size="small">
          Изменить
        </Button>
        <Button
          onClick={() => onDelete(hotel.pk)}
          color="secondary"
          size="small"
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};
