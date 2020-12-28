import React from "react";
import dateFormat from "dateformat";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

export const SightDialog = (props) => {
  const { isOpen, onSubmit, onClose, initialValues, title } = props;

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [timezone, setTimezone] = React.useState("");
  const [price, setPrice] = React.useState(1);

  React.useEffect(() => {
    if (initialValues) {
      const {
        name,
        address,
        startTime,
        endTime,
        timeZone,
        price,
      } = initialValues;

      if (name) setName(name);
      if (address) setAddress(address);
      if (startTime) setStartTime(startTime);
      if (endTime) setEndTime(endTime);
      if (timeZone) setTimezone(timeZone);
      if (price) setPricePerNight(price);
    }
  }, [initialValues]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
            required
          />
          <KeyboardDateTimePicker
            disableToolbar
            format="dd.MM.yyyy hh:mm"
            margin="normal"
            label="Начало"
            value={startTime}
            ampm={false}
            onChange={setStartTime}
            required
          />
          <KeyboardDateTimePicker
            disableToolbar
            format="dd.MM.yyyy hh:mm"
            margin="normal"
            label="Конец"
            value={endTime}
            ampm={false}
            onChange={setEndTime}
            required
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Часовой пояс в GMT</InputLabel>
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <MenuItem value={"GMT-12"}>GMT-12</MenuItem>
              <MenuItem value={"GMT-11"}>GMT-11</MenuItem>
              <MenuItem value={"GMT-10"}>GMT-10</MenuItem>
              <MenuItem value={"GMT-9"}>GMT-9</MenuItem>
              <MenuItem value={"GMT-8"}>GMT-8</MenuItem>
              <MenuItem value={"GMT-7"}>GMT-7</MenuItem>
              <MenuItem value={"GMT-6"}>GMT-6</MenuItem>
              <MenuItem value={"GMT-5"}>GMT-5</MenuItem>
              <MenuItem value={"GMT-4"}>GMT-4</MenuItem>
              <MenuItem value={"GMT-3"}>GMT-3</MenuItem>
              <MenuItem value={"GMT-2"}>GMT-2</MenuItem>
              <MenuItem value={"GMT-1"}>GMT-1</MenuItem>
              <MenuItem value={"GMT+0"}>GMT+0</MenuItem>
              <MenuItem value={"GMT+1"}>GMT+1</MenuItem>
              <MenuItem value={"GMT+2"}>GMT+2</MenuItem>
              <MenuItem value={"GMT+3"}>GMT+3</MenuItem>
              <MenuItem value={"GMT+4"}>GMT+4</MenuItem>
              <MenuItem value={"GMT+5"}>GMT+5</MenuItem>
              <MenuItem value={"GMT+6"}>GMT+6</MenuItem>
              <MenuItem value={"GMT+7"}>GMT+7</MenuItem>
              <MenuItem value={"GMT+8"}>GMT+8</MenuItem>
              <MenuItem value={"GMT+9"}>GMT+9</MenuItem>
              <MenuItem value={"GMT+10"}>GMT+10</MenuItem>
              <MenuItem value={"GMT+11"}>GMT+11</MenuItem>
              <MenuItem value={"GMT+12"}>GMT+12</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="dense"
            id="price"
            label="Цена"
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
            type="number"
            fullWidth
          />
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="dense"
            id="address"
            label="Адрес"
            type="text"
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button
          onClick={() => {
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);

            const startTimeString = dateFormat(startDate, "yyyy-mm-dd HH:MM");
            const endTimeString = dateFormat(endDate, "yyyy-mm-dd HH:MM");

            onSubmit({
              name,
              address,
              startTime: startTimeString,
              endTime: endTimeString,
              startTimezone: timezone,
              endTimezone: timezone,
              price,
            });
          }}
          color="primary"
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
