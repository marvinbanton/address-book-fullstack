import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Logout from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountBox from '@material-ui/icons/AccountBox';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles/addressBookStyle';
import Typography from '@material-ui/core/Typography';

class Navbar extends Component {

    logout = () => {
        localStorage.clear();
        window.location.href = '/signin'
    }
    render() {

        const { classes } = this.props

        return (
            <AppBar className={classes.navbar} position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <AccountBox />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Address Book
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Tooltip title="Profile" placement="top">
                            <AccountCircle />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.logout}
                    >
                        <Tooltip title="Sign out" placement="top">
                            <Logout />
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar);