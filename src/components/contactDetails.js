import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import LocationIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountCircle from '@material-ui/icons/AccountCircle'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    editButton: {
        position: 'absolute',
        right: theme.spacing(6),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, EnableEdit } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <Tooltip title="Close" placement="top">
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
            {onClose ? (
                <Tooltip title="Edit Contact" placement="top">
                    <IconButton
                        aria-label="more"
                        aria-haspopup="true"
                        className={classes.editButton}
                        onClick={EnableEdit}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function ContactDetails(props) {

    const [edit, setedit] = React.useState(false);
    const [firstName, setfirstName] = React.useState('');

    function EnableEdit() {
        setedit(!edit)
        setfirstName(props.activeContact.first_name)
    }
    return (

        <React.Fragment>
            <Dialog fullWidth onClose={props.viewContactDetails} aria-labelledby="customized-dialog-title" open={props.viewContact}>
                <DialogTitle EnableEdit={EnableEdit} id="customized-dialog-title" onClose={props.viewContactDetails}>
                    <ListItem>
                        <ListItemAvatar>
                            <AccountCircle style={{ color: '#077ce8', fontSize: '45px' }} />
                        </ListItemAvatar>
                        {edit ?
                            <Grid container alignItems='center' spacing={3}>
                                <Grid item={true} xs={8} sm={4}>
                                    <TextField
                                        value={firstName}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="First Name"
                                        onChange={(e) => this.props.handleChange('firstName', e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item={true} xs={8} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Last Name"
                                        onChange={(e) => this.props.handleChange('lastName', e)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            :
                            <ListItemText>{props.activeContact.first_name} {props.activeContact.last_name}</ListItemText>}

                    </ListItem>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Contact Details
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <EmailIcon style={{ color: '#077ce8' }} />
                            </ListItemAvatar>
                            <ListItemText>{props.activeContact.email}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <PhoneIcon style={{ color: '#077ce8' }} />
                            </ListItemAvatar>
                            <ListItemText>{props.activeContact.mobile_phone}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <LocationIcon style={{ color: '#077ce8' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                {props.activeContact.city},
                                {props.activeContact.state_or_city}
                                {props.activeContact.country}
                            </ListItemText>
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}