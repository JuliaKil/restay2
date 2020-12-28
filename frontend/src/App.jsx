import React from "react";
import { Navbar } from "./common/Navbar.jsx";
import { TripDrawer } from "./components/TripDrawer";
import { makeStyles } from "@material-ui/core";
import { CreateTripDialog } from "./components/CreateTripDialog";
import { UpdateTripDialog } from "./components/UpdateTripDialog";
import TripService from "./services/TripService";
import { TripPage } from "./pages/TripPage.jsx";

const useStyles = makeStyles(() => ({
  rootContainer: {
    display: "flex",
  },
  contentBox: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
  },
}));

export const App = () => {
  const classes = useStyles();

  const [trips, setTrips] = React.useState([]);
  const [currentTrip, setCurrentTrip] = React.useState(null);

  const [createTripModalIsOpen, setCreateTripModalIsOpen] = React.useState(
    false
  );

  const [tripToUpdate, setTripToUpdate] = React.useState({
    fields: {
      name: "",
    },
    pk: 0,
  });
  const [updateModelTripIsOpen, setUpdateModelTripIsOpen] = React.useState(
    false
  );

  const fetchTrips = async () => {
    try {
      const response = await TripService.getTrips();
      const result = await response.json();
      setTrips(JSON.parse(result.data));
    } catch (err) {
      alert(err.message);
    }
  };

  const createTrip = async (tripName) => {
    try {
      const response = await TripService.createTrip(tripName);
      if (response.ok) {
        setCreateTripModalIsOpen(false);
        fetchTrips();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const updateTrip = async (tripId, tripName) => {
    try {
      const response = await TripService.updateTrip(tripId, tripName);
      if (response.ok) {
        setUpdateModelTripIsOpen(false);
        fetchTrips();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      const response = await TripService.deleteTrip(tripId);
      if (response.ok) {
        fetchTrips();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  React.useEffect(() => {
    if (currentTrip) {
      setCurrentTrip(trips.find((trip) => trip.pk === currentTrip.pk));
    }
  }, [trips]);

  React.useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <>
      <div className={classes.rootContainer}>
        <TripDrawer
          trips={trips}
          openCreateTripDialog={() => setCreateTripModalIsOpen(true)}
          openUpdateTripDialog={(trip) => {
            setTripToUpdate(trip);
            setUpdateModelTripIsOpen(true);
          }}
          setCurrentTrip={setCurrentTrip}
          deleteTrip={deleteTrip}
        />
        <div className={classes.contentBox}>
          <Navbar />
          <TripPage currentTrip={currentTrip} />
        </div>
      </div>
      <CreateTripDialog
        onSubmit={createTrip}
        isOpen={createTripModalIsOpen}
        onClose={() => setCreateTripModalIsOpen(false)}
      />
      <UpdateTripDialog
        tripToUpdate={tripToUpdate}
        onSubmit={updateTrip}
        isOpen={updateModelTripIsOpen}
        onClose={() => setUpdateModelTripIsOpen(false)}
      />
    </>
  );
};
