import React, { Component } from 'react';
import { Column, Row } from "simple-flexbox";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles/addressBookStyle';



class RemoveContact extends Component {

    render() {

        const { classes } = this.props

        return (
            <React.Fragment>
                <Dialog
                    fullWidth
                    open={this.props.deleteContact}
                    onClose={this.props.removeContact}
                    aria-labelledby="alert-dialog-title"
                >
                    <ToastContainer
                        enableMultiContainer
                        position={toast.POSITION.TOP_RIGHT}
                    />
                    <DialogTitle id="alert-dialog-title">{"Delete this contact?"}</DialogTitle>
                    <div className={this.props.showSpinner ? classes.loader : classes.hideLoader}>
                        <Column horizontal="center" style={{ marginTop: '35px', marginLeft: '308px' }}>

                            <Row item xs={12} sm={6} className={classes.loader} horizontal="center" >
                                <CircularProgress className={classes.spinner} />
                            </Row>

                        </Column>
                    </div>
                    <DialogActions>
                        <Button onClick={this.props.removeContact} color="primary" autoFocus>
                            Cancel
                    </Button>
                        <Button onClick={() => this.props.deleteContactfunc(this.props.row)} color="primary" >
                            Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(RemoveContact)