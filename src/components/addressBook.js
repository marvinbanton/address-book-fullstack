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
import { Column, Row } from "simple-flexbox";
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './addressBookStyle';



class addressBook extends Component {
    constructor() {
        super();
        this.state = {
            setOpen: false,
        }
    }

    handleClickOpen = () => {
        this.setState.setOpen(true);
    }

    handleClose = () => {
        this.setState.setOpen(false);
    }

    render() {

        const { classes } = this.props

        return (
            <React.Fragment>
                <div className={classes.root}>

                    {/* Navbar  */}

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

                    {/* End Navbar  */}


                    {/* Header  */}

                    <Column flexGrow={1}>
                        <Row horizontal="center">
                            <Column horizontal="center" style={{ marginBottom: 30 }}>
                                <Box className={classes.header} mt={4} component="div"
                                    style={{
                                        minHeight: '200px',
                                        maxidth: '1210px',
                                        minWidth: '1210px',
                                        borderRadius: '10px 10px 10px 10px',
                                        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
                                    }} >
                                </Box>
                            </Column>
                        </Row>
                    </Column>

                    {/* End Header  */}


                    {/* Table Header  */}

                    <Column flexGrow={1}>
                        <Row horizontal="center">
                            <Paper className={classes.paper}>
                                <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                                    <Toolbar>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <SearchIcon className={classes.block} color="inherit" />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Search by First name or Last name"
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        className: classes.searchInput,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" className={classes.addUser} >
                                                    Add Contact
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Toolbar>
                                </AppBar>

                                <div className={classes.contentWrapper}>
                                    <Typography color="textSecondary" align="center" style={{ display: 'none' }} onClick={this.handleClickOpen}>
                                        Add contacts...
                                </Typography>

                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>First name</TableCell>
                                                <TableCell>Last name</TableCell>
                                                <TableCell>Phonenumber</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {rows.map(row => (
                                                <TableRow key={row.fname}>
                                                    <TableCell component="th" scope="row">
                                                        {row.fname}
                                                    </TableCell>
                                                    <TableCell>{row.lname}</TableCell>
                                                    <TableCell>{row.phonenumber}</TableCell>
                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>

                                </div>
                            </Paper>
                        </Row>
                    </Column>

                    {/* End Table  */}

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                        </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Subscribe
                        </Button>
                        </DialogActions>
                    </Dialog>


                </div>




            </React.Fragment >
        )
    }
}


export default withStyles(styles)(addressBook);
