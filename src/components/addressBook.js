import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountBox from '@material-ui/icons/AccountBox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Logout from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import Flexbox from 'flexbox-react';
import Box from '@material-ui/core/Box';

const styles = {
    root: {
        flexGrow: 1,
    },
    navbar: {
        backgroundColor: '#092d63',
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
};

class addressBook extends Component {

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppBar className={classes.navbar} position="static">
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
                                <Tooltip title="Sign out" placement="top">
                                    <AccountCircle />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Tooltip title="Sign out" placement="top">
                                    <Logout />
                                </Tooltip>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>

                <Box style={{ justifyContent: "center", marginRight: '330px' }} mt={5}>
                    <Container maxWidth="sm">
                        <Typography component="div"
                            style={{
                                backgroundColor: '#cfe8fc',
                                height: '25vh',
                                width: '100vh',
                            }} />
                    </Container>
                </Box>

            </React.Fragment>
        )
    }
}

export default withStyles(styles)(addressBook);
