import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";

export const UpdateTripDialog = (props) => {
  const { isOpen, onSubmit, onClose, tripToUpdate } = props;

  const [tripName, setTripName] = React.useState("");

  React.useEffect(() => {
    setTripName(tripToUpdate.fields.name);
  }, [tripToUpdate]);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Обновить путешествие</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Введите новое название путешествия
        </DialogContentText>
        <TextField
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          autoFocus
          margin="dense"
          id="name"
          label="Новое название"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button
          onClick={() => onSubmit(tripToUpdate.pk, tripName)}
          color="primary"
        >
          Обновить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
