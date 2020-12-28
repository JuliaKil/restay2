import React from "react";
import { AppBar, Link } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{justifyContent: 'space-between'}}>
        <Typography variant="h6">
          Restay
        </Typography>
        <Button component={Link} href="/accounts/google/login" color="inherit">Выбрать аккаунт</Button>
      </Toolbar>
    </AppBar>
  );
};
