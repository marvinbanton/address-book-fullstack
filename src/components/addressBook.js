import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import { Column, Row } from "simple-flexbox";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/addressBookStyle';
import decode from 'jwt-decode';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Navbar from './navbar'
import DeleteContact from './deleteContact';
import ContactDetails from './contactDetails';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactIcon from '@material-ui/icons/Contacts';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#077ce8;',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class addressBook extends Component {
  constructor() {
    super()
    this.state = {
      createContact: false,
      viewContact: false,
      deleteContact: false,
      showSpinner: false,
      anchorEl: null,
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      homePhone: '',
      workPhone: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      uid: '',
      contacts: [],
      search: '',
      activeContact: []
    }
  }

  getAllContacts = () => {
    const id = decode(localStorage.getItem('token')).userId;
    fetch(`/contacts/${id}/1`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          contacts: res
        })
      })
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) return this.props.history.push('/signin')
    const id = decode(localStorage.getItem('token')).userId;
    this.setState({
      uid: id
    })
    fetch(`/contacts/${id}/1`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          contacts: res
        })
      })
  }

  createContact = (e) => {
    e.preventDefault();

    this.setState({
      showSpinner: true
    })

    setTimeout(() => {
      this.setState({ showSpinner: false });
      this.createContactDialogClose()
      this.getAllContacts()
    }, 2000)


    fetch('/create-contact', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        toast.info("Successfully created!", {
          hideProgressBar: true,
          draggable: false,
        }))
  }

  deleteContact = () => {
    
  }

  viewContactDetails = () => {
    this.setState({ viewContact: !this.state.viewContact })
    this.setState({ anchorEl: null });
  }

  removeContact = () => {
    this.setState({ deleteContact: !this.state.deleteContact })
    this.setState({ anchorEl: null });
  }

  createContactDialog = () => {
    this.setState({ createContact: true });
  }

  createContactDialogClose = () => {
    this.setState({ createContact: false });
  }

  handleChange = (label, e) => {
    this.setState({ [label]: e.target.value })
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  handleClick = (e, row) => {
    this.setState({ anchorEl: e.currentTarget })
    this.setState({ activeContact: row })
  }

  handleDialogClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {

    const { classes } = this.props

    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* Navbar Component  */}

          <Navbar />

          {/* End Navbar Component */}


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
                          onChange={(e) => this.handleSearch(e)}
                        />
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" className={classes.addUser} onClick={this.createContactDialog}>
                          Create contact
                        </Button>
                      </Grid>
                    </Grid>
                  </Toolbar>
                </AppBar>

                <div className={classes.contentWrapper}>
                  <Typography color="textSecondary" align="center" style={{ display: 'none' }}>
                    Add contacts...
                                </Typography>

                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Phonenumber</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.contacts.map(row => {
                        if (this.state.search) {
                          if (row.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || row.last_name.toLowerCase().includes(this.state.search.toLowerCase())) {
                            return (
                              <TableRow key={row.first_name} className={classes.contacts}>
                                <TableCell component="th" scope="row">
                                  {row.first_name}
                                </TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.mobile_phone}</TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, row)}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>

                                  <StyledMenu
                                    id="customized-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleDialogClose}
                                  >
                                    <StyledMenuItem>
                                      <ListItemIcon>
                                        <ContactIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Contact Details"
                                        onClick={this.viewContactDetails}
                                      />
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                      <ListItemIcon>
                                        <EditIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Edit"
                                        onClick={this.handleClickOpen}
                                      />
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                      <ListItemIcon>
                                        <DeleteIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Delete"
                                        onClick={this.removeContact}
                                      />
                                    </StyledMenuItem>
                                  </StyledMenu>
                                </TableCell>
                              </TableRow>
                            )
                          }
                        } else {
                          return (
                            <TableRow key={row.first_name} className={classes.contacts}>
                              <TableCell component="th" scope="row">
                                {row.first_name}
                              </TableCell>
                              <TableCell>{row.last_name}</TableCell>
                              <TableCell>{row.mobile_phone}</TableCell>
                              <TableCell>
                                <Tooltip title="More actions" placement="right">
                                  <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClick(e, row)}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                </Tooltip>

                                <StyledMenu
                                  id="customized-menu"
                                  anchorEl={this.state.anchorEl}
                                  keepMounted
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={this.handleDialogClose}
                                >
                                  <StyledMenuItem>
                                    <ListItemIcon>
                                      <ContactIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Contact Details"
                                      onClick={this.viewContactDetails}
                                    />
                                  </StyledMenuItem>
                                  <StyledMenuItem>
                                    <ListItemIcon>
                                      <EditIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Edit"
                                      onClick={this.handleClickOpen}
                                    />
                                  </StyledMenuItem>
                                  <StyledMenuItem>
                                    <ListItemIcon>
                                      <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Delete"
                                      onClick={this.removeContact}
                                    />
                                  </StyledMenuItem>
                                </StyledMenu>
                              </TableCell>
                            </TableRow>
                          )
                        }
                      })}
                    </TableBody>

                    <DeleteContact
                      deleteContact={this.state.deleteContact}
                      removeContact={this.removeContact}
                    />
                    <ContactDetails
                      viewContact={this.state.viewContact}
                      viewContactDetails={this.viewContactDetails}
                      activeContact={this.state.activeContact}
                    />

                  </Table>

                </div>
              </Paper>
            </Row>
          </Column>

          {/* End Table  */}

          <Dialog open={this.state.createContact} onClose={this.createContactDialogClose} aria-labelledby="form-dialog-title">
            <ToastContainer
              enableMultiContainer
              position={toast.POSITION.TOP_RIGHT}
            />

            <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
            <div className={this.state.showSpinner ? classes.loader : classes.hideLoader}>
              <Column horizontal="center" style={{ marginTop: '213px', marginLeft: '308px' }}>

                <Row item xs={12} sm={6} className={classes.loader} horizontal="center" >
                  <CircularProgress className={classes.spinner} />
                </Row>

              </Column>
            </div>
            <form onSubmit={this.createContact}>
              <DialogContent>
                <Grid container alignItems='center'>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ marginRight: '10px', marginBottom: '32px' }}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="First Name"
                      onChange={(e) => this.handleChange('firstName', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ marginLeft: '10px', marginBottom: '32px' }}
                      margin="dense"
                      id="name"
                      label="Last Name"
                      onChange={(e) => this.handleChange('lastName', e)}
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
                      onChange={(e) => this.handleChange('email', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      style={{ marginLeft: '-10px', marginBottom: '32px' }}
                      margin="dense"
                      id="mobilenumber"
                      label="Mobile Number"
                      onChange={(e) => this.handleChange('mobileNumber', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      style={{ marginRight: '10px', marginBottom: '32px' }}
                      margin="dense"
                      id="homePhone"
                      label="Home Phone"
                      onChange={(e) => this.handleChange('homePhone', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      style={{ marginLeft: '10px', marginBottom: '32px' }}
                      margin="dense"
                      id="workPhone"
                      label="Work Phone"
                      onChange={(e) => this.handleChange('workPhone', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ marginRight: '10px', marginBottom: '32px' }}
                      margin="dense"
                      id="city"
                      label="City"
                      onChange={(e) => this.handleChange('city', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ marginLeft: '10px', marginBottom: '32px' }}
                      margin="dense"
                      id="state"
                      label="State or Province"
                      onChange={(e) => this.handleChange('state', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ marginRight: '10px', marginBottom: '32px' }}
                      margin="dense"
                      id="postalCode"
                      label="Postal Code"
                      onChange={(e) => this.handleChange('postalCode', e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ marginLeft: '10px', marginBottom: '32px' }}
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
                <Button onClick={this.createContactDialogClose} color="primary">
                  Cancel
                                </Button>
                <Button type="submit" color="primary">
                  Save
                                </Button>
              </DialogActions>
            </form>
          </Dialog>


        </div>




      </React.Fragment >
    )
  }
}
export default withStyles(styles)(addressBook);
