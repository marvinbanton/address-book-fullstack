import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function RemoveContact(props) {

    return (
        <div>
            <Dialog
                fullWidth
                open={props.deleteContact}
                onClose={props.removeContact}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this contact?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={props.removeContact} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={props.removeContact} color="primary" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}