import React from "react";
import { Typography, Grid, Button, makeStyles, List } from "@material-ui/core";
import TripService from "../services/TripService";
import { HotelDialog } from "../components/HotelDialog";
import { EventService } from "../services/EventService";
import { SightDialog } from "../components/SightDialog";
import { TransferDialog } from "../components/TransferDialog";
import { SightCard } from "../components/SightCard";
import { TransferCard } from "../components/TransferCard";
import { HotelCard } from "../components/HotelCard";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 2),
  },
  title: {
    padding: theme.spacing(2, 0),
  },
  list: {
    padding: theme.spacing(0, 2, 0, 0),
  },
}));

export const TripPage = (props) => {
  const { currentTrip } = props;
  const classes = useStyles();

  const [createHotelDialogIsOpen, setCreateHotelDialogIsOpen] = React.useState(
    false
  );
  const [updateHotelDialogIsOpen, setUpdateHotelDialogIsOpen] = React.useState(
    false
  );
  const [hotelToUpdate, setHotelToUpdate] = React.useState(null);

  const [createSightDialogIsOpen, setCreateSightDialogIsOpen] = React.useState(
    false
  );
  const [updateSightDialogIsOpen, setUpdateSightDialogIsOpen] = React.useState(
    false
  );
  const [sightToUpdate, setSightToUpdate] = React.useState(null);

  const [
    createTransferDialogIsOpen,
    setCreateTransferDialogIsOpen,
  ] = React.useState(false);
  const [
    updateTransferDialogIsOpen,
    setUpdateTransferDialogIsOpen,
  ] = React.useState(false);
  const [transferToUpdate, setTransferToUpdate] = React.useState(null);

  const [tripData, setTripData] = React.useState({
    name: "",
    totalPrice: 0,
    hotels: [],
    transfers: [],
    sights: [],
  });

  const fetchTripData = async () => {
    if (currentTrip) {
      try {
        const response = await TripService.getTrip(currentTrip.pk);

        if (response.ok) {
          const result = await response.json();

          const events = JSON.parse(result.events_data);

          const sights = JSON.parse(result.sights_data).map((sightData) => {
            const event = events.find(
              (eventData) => eventData.pk === sightData.pk
            );

            return {
              pk: sightData.pk,
              fields: {
                ...event.fields,
                ...sightData.fields,
              },
            };
          });

          const transfers = JSON.parse(result.transfers_data).map(
            (transferData) => {
              const event = events.find(
                (eventData) => eventData.pk === transferData.pk
              );

              return {
                pk: transferData.pk,
                fields: {
                  ...event.fields,
                  ...transferData.fields,
                },
              };
            }
          );

          setTripData({
            name: result.name,
            totalPrice: result.totalPrice,
            hotels: JSON.parse(result.hotels_data),
            sights,
            transfers,
          });
        } else {
          alert(await response.text());
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const createHotel = async (hotelData) => {
    try {
      const response = await EventService.createHotel(
        currentTrip.pk,
        hotelData
      );

      if (response.ok) {
        setCreateHotelDialogIsOpen(false);
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const createSight = async (sightData) => {
    try {
      const response = await EventService.createSight(
        currentTrip.pk,
        sightData
      );

      if (response.ok) {
        setCreateSightDialogIsOpen(false);
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const createTransfer = async (transferData) => {
    try {
      const response = await EventService.createTransfer(
        currentTrip.pk,
        transferData
      );

      if (response.ok) {
        setCreateTransferDialogIsOpen(false);
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const updateTransfer = async (transferData) => {
    try {
      const response = await EventService.updateTransfer(
        currentTrip.pk,
        transferToUpdate.pk,
        transferData
      );

      if (response.ok) {
        setUpdateTransferDialogIsOpen(false);
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const updateHotel = async (hotelData) => {
    try {
      console.log(hotelToUpdate);
      const response = await EventService.updateHotel(
        currentTrip.pk,
        hotelToUpdate.pk,
        hotelData
      );

      if (response.ok) {
        setUpdateHotelDialogIsOpen(false);
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const updateSight = async (sightData) => {
    try {
      const response = await EventService.updateSight(
        currentTrip.pk,
        sightToUpdate.pk,
        sightData
      );

      if (response.ok) {
        setUpdateSightDialogIsOpen(false);
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteTransfer = async (transferId) => {
    try {
      const response = await EventService.deleteTransfer(transferId);

      if (response.ok) {
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteSight = async (sightId) => {
    try {
      const response = await EventService.deleteSight(sightId);

      if (response.ok) {
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteHotel = async (hotelId) => {
    try {
      const response = await EventService.deleteHotel(hotelId);

      if (response.ok) {
        fetchTripData();
      } else {
        alert(await response.text());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  React.useEffect(() => {
    fetchTripData();
  }, [currentTrip]);

  if (!currentTrip) {
    return null;
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4">{tripData.name}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Передвижения</Typography>
          <List className={classes.list}>
            {tripData.transfers.map((transfer) => (
              <TransferCard
                onDelete={deleteTransfer}
                key={transfer.pk}
                transfer={transfer}
                openUpdateModal={() => {
                  console.log(transfer);
                  setTransferToUpdate(transfer);
                  setUpdateTransferDialogIsOpen(true);
                }}
              />
            ))}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setCreateTransferDialogIsOpen(true);
              }}
            >
              Добавить
            </Button>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Отели</Typography>
          <List className={classes.list}>
            {tripData.hotels.map((hotel) => (
              <HotelCard
                openUpdateModal={() => {
                  setHotelToUpdate(hotel);
                  setUpdateHotelDialogIsOpen(true);
                }}
                onDelete={deleteHotel}
                key={hotel.pk}
                hotel={hotel}
              />
            ))}
            <Button
              variant="outlined"
              onClick={() => {
                setCreateHotelDialogIsOpen(true);
              }}
              fullWidth
            >
              Добавить
            </Button>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5">События</Typography>
          <List className={classes.list}>
            {tripData.sights.map((sight) => (
              <SightCard
                openUpdateModal={() => {
                  setSightToUpdate(sight);
                  setUpdateSightDialogIsOpen(true);
                }}
                key={sight.pk}
                sight={sight}
                onDelete={deleteSight}
              />
            ))}
            <Button
              variant="outlined"
              onClick={() => {
                setCreateSightDialogIsOpen(true);
              }}
              fullWidth
            >
              Добавить
            </Button>
          </List>
        </Grid>
      </Grid>
      <HotelDialog
        isOpen={createHotelDialogIsOpen}
        onSubmit={createHotel}
        title={"Добавить место пребывания"}
        onClose={() => setCreateHotelDialogIsOpen(false)}
      />
      <SightDialog
        isOpen={createSightDialogIsOpen}
        onSubmit={createSight}
        title={"Добавить достопримечательность"}
        onClose={() => setCreateSightDialogIsOpen(false)}
      />
      <TransferDialog
        isOpen={createTransferDialogIsOpen}
        onSubmit={createTransfer}
        title={"Добавить передвижение"}
        onClose={() => setCreateTransferDialogIsOpen(false)}
      />
      <HotelDialog
        isOpen={updateHotelDialogIsOpen}
        onSubmit={updateHotel}
        title={"Обновить место пребывания"}
        onClose={() => setUpdateHotelDialogIsOpen(false)}
        hotelToUpdate={hotelToUpdate}
      />
      <SightDialog
        isOpen={updateSightDialogIsOpen}
        onSubmit={updateSight}        
        title={"Обновить достопримечательность"}
        onClose={() => setUpdateSightDialogIsOpen(false)}
        sightToUpdate={sightToUpdate}
      />
      <TransferDialog
        isOpen={updateTransferDialogIsOpen}
        onSubmit={updateTransfer}
        title={"Обновить передвижение"}
        onClose={() => setUpdateTransferDialogIsOpen(false)}
        transferToUpdate={transferToUpdate}
      />
    </>
  );
};
