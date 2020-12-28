import React from "react";
import {
  Drawer,
  makeStyles,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
} from "@material-ui/core";
import { EditRounded, DeleteRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "300px",
    padding: theme.spacing(2),
  },
  drawerPaper: {
    width: "300px",
    padding: theme.spacing(2),
  },
}));

export const TripDrawer = (props) => {
  const {
    trips,
    openCreateTripDialog,
    openUpdateTripDialog,
    setCurrentTrip,
    deleteTrip,
  } = props;

  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      className={classes.drawer}
      PaperProps={{ className: classes.drawerPaper }}
    >
      <Typography variant="h6">Все путешествия</Typography>
      <Divider />
      <List>
        {trips.map((trip) => (
          <ListItem button onClick={() => setCurrentTrip(trip)} key={trip.pk}>
            <ListItemText primary={trip.fields.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => openUpdateTripDialog(trip)}>
                <EditRounded />
              </IconButton>
              <IconButton onClick={() => deleteTrip(trip.pk)}>
                <DeleteRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button variant="outlined" onClick={openCreateTripDialog}>
        Создать путешествие
      </Button>
    </Drawer>
  );
};
