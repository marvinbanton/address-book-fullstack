import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Column, Row } from "simple-flexbox";
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/addressBookStyle';

class addressBook extends Component {

    render() {

        const { classes } = this.props

        return (
            <React.Fragment>

                <Dialog open={this.props.createContact} onClose={this.props.createContactDialog} aria-labelledby="form-dialog-title">
                    <ToastContainer
                        enableMultiContainer
                        position={toast.POSITION.TOP_RIGHT}
                    />

                    <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
                    <div className={this.props.showSpinner ? classes.loader : classes.hideLoader}>
                        <Column horizontal="center" style={{ marginTop: '213px', marginLeft: '308px' }}>

                            <Row item xs={12} sm={6} className={classes.loader} horizontal="center" >
                                <CircularProgress className={classes.spinner} />
                            </Row>

                        </Column>
                    </div>
                    <form onSubmit={this.props.createContactFunc}>
                        <DialogContent>
                            <Grid container alignItems='center'>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="First Name"
                                        onChange={(e) => this.props.handleChange('firstName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="name"
                                        label="Last Name"
                                        onChange={(e) => this.props.handleChange('lastName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        style={{ marginBottom: '32px' }}
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        required
                                        InputLabelProps={{ required: false }}
                                        type="email"
                                        onChange={(e) => this.props.handleChange('email', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        style={{ marginLeft: '-10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="mobilenumber"
                                        label="Mobile Number"
                                        onChange={(e) => this.props.handleChange('mobileNumber', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="homePhone"
                                        label="Home Phone"
                                        onChange={(e) => this.props.handleChange('homePhone', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="workPhone"
                                        label="Work Phone"
                                        onChange={(e) => this.props.handleChange('workPhone', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="city"
                                        label="City"
                                        onChange={(e) => this.props.handleChange('city', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="state"
                                        label="State or Province"
                                        onChange={(e) => this.props.handleChange('state', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="postalCode"
                                        label="Postal Code"
                                        onChange={(e) => this.props.handleChange('postalCode', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="country"
                                        label="Country"
                                        onChange={(e) => this.props.handleChange('country', e)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.props.createContactDialog} color="primary">
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
