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
    constructor(props) {
        super(props)
        this.state = {
            firstName: props.row.first_name,
            lastName: props.row.last_name,
            email: props.row.email,
            mobileNumber: props.row.mobile_phone,
            homePhone: props.row.home_phone,
            workPhone: props.row.work_phone,
            city: props.row.city,
            state: props.row.state_or_province,
            postalCode: props.row.postal_code,
            country: props.row.country,
        }
    }

    handleChange = (label, e) => {
        this.setState({ [label]: e.target.value })
    }

    render() {

        const { classes } = this.props

        return (
            <React.Fragment>


                {console.log(this.props.row.id)}
                <Dialog open={this.props.editContact} onClose={this.props.editContactDialog} aria-labelledby="form-dialog-title">
                    <ToastContainer
                        enableMultiContainer
                        position={toast.POSITION.TOP_RIGHT}
                    />

                    <DialogTitle id="form-dialog-title">Edit Contact Details

                    </DialogTitle>
                    <div className={this.props.showSpinner ? classes.loader : classes.hideLoader}>
                        <Column horizontal="center" style={{ marginTop: '213px', marginLeft: '308px' }}>

                            <Row item xs={12} sm={6} className={classes.loader} horizontal="center" >
                                <CircularProgress className={classes.spinner} />
                            </Row>

                        </Column>
                    </div>
                    <form onSubmit={this.props.editContactFunc}>
                        <DialogContent>
                            <Grid container alignItems='center'>
                                <Grid item={true} xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        value={this.state.firstName}
                                        label="First Name"
                                        onChange={(e) => this.handleChange('firstName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="name"
                                        value={this.state.lastName}
                                        label="Last Name"
                                        onChange={(e) => this.handleChange('lastName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <TextField
                                        style={{ marginBottom: '32px' }}
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        required
                                        value={this.state.email}
                                        InputLabelProps={{ required: false }}
                                        type="email"
                                        onChange={(e) => this.handleChange('email', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={4}>
                                    <TextField
                                        style={{ marginLeft: '-10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="mobilenumber"
                                        value={this.state.mobileNumber}
                                        label="Mobile Number"
                                        onChange={(e) => this.handleChange('mobileNumber', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={4}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="homePhone"
                                        value={this.state.homePhone}
                                        label="Home Phone"
                                        onChange={(e) => this.handleChange('homePhone', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={4}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="workPhone"
                                        value={this.state.workPhone}
                                        label="Work Phone"
                                        onChange={(e) => this.handleChange('workPhone', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="city"
                                        value={this.state.city}
                                        label="City"
                                        onChange={(e) => this.handleChange('city', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="state"
                                        value={this.state.state}
                                        label="State or Province"
                                        onChange={(e) => this.handleChange('state', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <TextField
                                        style={{ marginRight: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="postalCode"
                                        value={this.state.postalCode}
                                        label="Postal Code"
                                        onChange={(e) => this.handleChange('postalCode', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <TextField
                                        style={{ marginLeft: '10px', marginBottom: '32px' }}
                                        margin="dense"
                                        id="country"
                                        value={this.state.country}
                                        label="Country"
                                        onChange={(e) => this.handleChange('country', e)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.props.editContactDialog} color="primary">
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
