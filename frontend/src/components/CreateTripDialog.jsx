import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";

export const CreateTripDialog = (props) => {
  const { isOpen, onSubmit, onClose } = props;

  const [tripName, setTripName] = React.useState("");

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Добавить путешествие</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы добавить путешествие, введите его название
        </DialogContentText>
        <TextField
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          autoFocus
          margin="dense"
          id="name"
          label="Название"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={() => onSubmit(tripName)} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
