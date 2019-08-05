import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/addressBookStyle';

class addressBook extends Component {
    constructor() {
        super();
        this.state = {
            open: false,

            firstName: ' ',
            lastName: ' ',
            email: ' ',
            mobileNumber: ' ',
            homePhone: ' ',
            workPhone: ' ',
            city: ' ',
            state: ' ',
            postalCode: ' ',
            country: ' ',
        }
    }

    createContact = (e) => {
        console.log(this.state)
        e.preventDefault();

        fetch('/create-contact', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            toast.info("Successfully created!", {
                hideProgressBar: true,
                draggable: false,
            })
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (label, e) => {
        this.setState({ [label]: e.target.value })
    }
    render() {

        return (
            <React.Fragment>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <ToastContainer
                        enableMultiContainer
                        position={toast.POSITION.TOP_RIGHT}
                    />
                    <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
                    <form onSubmit={this.createContact}>
                        <DialogContent>
                            <Grid container alignItems='center'>
                                <Grid item xs={12} sm={6} mb={20}>
                                    <TextField
                                        style={{ marginRight: '10px' }}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="First Name"
                                        onChange={(e) => this.handleChange('firstName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}
                                    type="number" sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px' }}
                                        margin="dense"
                                        id="name"
                                        label="Last Name"
                                        onChange={(e) => this.handleChange('lastName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        onChange={(e) => this.handleChange('email', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        style={{ marginRight: '100px' }}
                                        margin="dense"
                                        id="mobilenumber"
                                        label="Mobile Number"
                                        onChange={(e) => this.handleChange('mobileNumber', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        style={{ marginRight: '100px' }}
                                        margin="dense"
                                        id="homePhone"
                                        label="Home Phone"
                                        onChange={(e) => this.handleChange('homePhone', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        margin="dense"
                                        id="workPhone"
                                        label="Work Phone"
                                        onChange={(e) => this.handleChange('workPhone', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px' }}
                                        margin="dense"
                                        id="city"
                                        label="City"
                                        onChange={(e) => this.handleChange('city', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px' }}
                                        margin="dense"
                                        id="state"
                                        label="State or Province"
                                        onChange={(e) => this.handleChange('state', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px' }}
                                        margin="dense"
                                        id="postalCode"
                                        label="Postal Code"
                                        onChange={(e) => this.handleChange('postalCode', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px' }}
                                        margin="dense"
                                        id="country"
                                        label="Country"
                                        onChange={(e) => this.handleChange('country', e)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                            <Button type="submit" color="primary">
                                Save
                                </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </React.Fragment >
        )
    }
}


export default withStyles(styles)(addressBook);
