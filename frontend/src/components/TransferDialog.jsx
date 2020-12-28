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

export const TransferDialog = (props) => {
  const { isOpen, onSubmit, onClose, transferToUpdate, title } = props;

  const [startTime, setStartTime] = React.useState(new Date());
  const [startTimezone, setStartTimezone] = React.useState("");
  const [endTime, setEndTime] = React.useState(new Date());
  const [endTimezone, setEndTimezone] = React.useState("");
  const [price, setPrice] = React.useState(1);
  const [transferType, setTransferType] = React.useState("");
  const [departurePoint, setDeparturePoint] = React.useState("");
  const [arrivalPoint, setArrivalPoint] = React.useState("");
  const [number, setNumber] = React.useState("");

  React.useEffect(() => {
    console.log(transferToUpdate);
    if (transferToUpdate) {
      const {
        startTime,
        startTimezone,
        endTime,
        endTimezone,
        price,
        transferType,
        departurePoint,
        arrivalPoint,
        number,
      } = transferToUpdate.fields;

      console.log(endTimezone);

      if (startTime) setStartTime(startTime);
      if (startTimezone) setStartTimezone(startTimezone.split("/")[1]);
      if (endTime) setEndTime(endTime);
      if (endTimezone) setEndTimezone(endTimezone.split("/")[1]);
      if (price) setPrice(price);
      if (transferType) setTransferType(transferType);
      if (departurePoint) setDeparturePoint(departurePoint);
      if (arrivalPoint) setArrivalPoint(arrivalPoint);
      if (number) setNumber(number);
    }
  }, [transferToUpdate]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <TextField
            value={departurePoint}
            onChange={(e) => setDeparturePoint(e.target.value)}
            margin="dense"
            id="address"
            label="Место отбытия"
            type="text"
            fullWidth
            required
          />
          <KeyboardDateTimePicker
            disableToolbar
            format="dd.MM.yyyy hh:mm"
            margin="normal"
            label="Время отбытия"
            value={startTime}
            onChange={setStartTime}
            ampm={false}
            required
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Часовой пояс места отбытия в GMT</InputLabel>
            <Select
              value={startTimezone}
              onChange={(e) => setStartTimezone(e.target.value)}
              required
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
            value={arrivalPoint}
            onChange={(e) => setArrivalPoint(e.target.value)}
            margin="dense"
            id="address"
            label="Место прибытия"
            type="text"
            fullWidth
            required
          />
          <KeyboardDateTimePicker
            disableToolbar
            format="dd.MM.yyyy hh:mm"
            margin="normal"
            label="Время прибытия"
            value={endTime}
            ampm={false}
            onChange={setEndTime}
            required
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Часовой пояс места прибытия в GMT</InputLabel>
            <Select
              value={endTimezone}
              onChange={(e) => setEndTimezone(e.target.value)}
              required
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
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Вид транспорта</InputLabel>
            <Select
              value={transferType}
              onChange={(e) => setTransferType(e.target.value)}
              required
            >
              <MenuItem value={"Самолет"}>Самолет</MenuItem>
              <MenuItem value={"Поезд"}>Поезд</MenuItem>
              <MenuItem value={"Автобус"}>Автобус</MenuItem>
              <MenuItem value={"Личный транспорт"}>Личный транспорт</MenuItem>
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
            required
          />
          <TextField
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            margin="dense"
            id="kek"
            label="Идентификационный номер"
            fullWidth
            required
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
              startTime: startTimeString,
              endTime: endTimeString,
              startTimezone: startTimezone,
              endTimezone: endTimezone,
              price,
              transferType,
              departurePoint,
              arrivalPoint,
              number,
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
