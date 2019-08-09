import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
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
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/addressBookStyle';
import decode from 'jwt-decode';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactDetails from './contactDetails';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactIcon from '@material-ui/icons/Contacts';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Filter from '@material-ui/icons/KeyboardArrowDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import GroupAdd from '@material-ui/icons/Group';
import Navbar from './navbar';
import AddContact from './addContact';
import EditContact from './editContact';
import DeleteContact from './deleteContact';
import AddToGroup from './addToGroup';

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
      editContact: false,
      addToGroup: false,
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
      id: '',
      contacts: [],
      search: '',
      activeContact: []
    }
  }

  getAllContacts = () => {
    const id = decode(localStorage.getItem('token')).userId;
    fetch(`/contacts/${id}`, {
      method: 'GET',
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
    fetch(`/contacts/${id}`, {
      method: 'GET',
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

  createContactFunc = (e) => {
    e.preventDefault();

    this.setState({
      showSpinner: true
    })

    setTimeout(() => {
      this.setState({ showSpinner: false });
      this.createContactDialog()
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

  deleteContactFunc = (row) => {

    this.setState({
      showSpinner: true
    })

    setTimeout(() => {
      this.setState({ showSpinner: false });
      this.getAllContacts()
      this.removeContact()
    }, 2000)

    fetch(`/remove/${row.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        toast.info("Successfully Deleted!", {
          hideProgressBar: true,
          draggable: false,
        }))
  }

  editContactFunc = (e, row) => {
    e.preventDefault();

    this.setState({
      showSpinner: true
    })

    setTimeout(() => {
      this.setState({ showSpinner: false });
      this.editContactDialog()
      this.getAllContacts()
    }, 2000)

    fetch(`/update-contact`, {
      method: 'POST',
      body: JSON.stringify(row),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        toast.info("Successfully Updated!", {
          hideProgressBar: true,
          draggable: false,
        }))
  }

  sortByFunc = () => {
    this.setState({
      contacts: this.state.contacts.reverse()
    })
  }

  addToGroupDialog = () => {
    this.setState({ addToGroup: !this.state.addToGroup })
    this.setState({ anchorEl: null });
  }

  editContactDialog = () => {
    this.setState({ editContact: !this.state.editContact })
    this.setState({ anchorEl: null });
    if (this.state.editContact) {
      this.setState({ activeContact: '' });
    }
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
    this.setState({ createContact: !this.state.createContact });
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
    this.setState({ activeContact: '' });
  }

  render() {

    const { classes } = this.props
    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* Navbar Component  */}

          <Navbar
            viewContact={this.state.viewContact}
            viewContactDetails={this.viewContactDetails}
            activeContact={this.state.activeContact}
          />

          {/* Table Header  */}

          <Column flexGrow={1}>

            <Row horizontal="center">
              <Paper className={classes.paper}>
                <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                  <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item={true}>
                        <SearchIcon className={classes.block} color="inherit" />
                      </Grid>
                      <Grid item sm>
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
                        <TableCell className={classes.filter}>
                          Last name
                          <Tooltip title="Sort by Last name" placement="top">
                            <Filter
                              className={classes.toggle}
                              onClick={this.sortByFunc}
                            />

                          </Tooltip>
                        </TableCell>
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
                                <TableCell component="th" scope="row" className={classes.filter}>
                                  <AccountCircle style={{ color: '#077ce8', fontSize: '40px', margin: '10px' }} />
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
                                    <StyledMenuItem onClick={this.viewContactDetails}>
                                      <ListItemIcon>
                                        <ContactIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Contact Details" />
                                    </StyledMenuItem>

                                    <StyledMenuItem onClick={this.addToGroupDialog}>
                                      <ListItemIcon>
                                        <GroupAdd />
                                      </ListItemIcon>
                                      <ListItemText primary="Add To Group" />
                                    </StyledMenuItem>

                                    <StyledMenuItem onClick={this.editContactDialog} >
                                      <ListItemIcon>
                                        <EditIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Edit" />
                                    </StyledMenuItem>

                                    <StyledMenuItem onClick={this.removeContact}>
                                      <ListItemIcon>
                                        <DeleteIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Delete" />
                                    </StyledMenuItem>

                                  </StyledMenu>
                                </TableCell>
                              </TableRow>
                            )
                          }
                        } else {
                          return (
                            <TableRow key={row.first_name} className={classes.contacts}>
                              <TableCell component="th" scope="row" className={classes.filter}>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '40px', margin: '10px' }} />
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
                                  <StyledMenuItem onClick={this.viewContactDetails}>
                                    <ListItemIcon>
                                      <ContactIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Contact Details" />
                                  </StyledMenuItem>

                                  <StyledMenuItem onClick={this.addToGroupDialog}>
                                    <ListItemIcon>
                                      <GroupAdd />
                                    </ListItemIcon>
                                    <ListItemText primary="Add To Group" />
                                  </StyledMenuItem>

                                  <StyledMenuItem onClick={this.editContactDialog} >
                                    <ListItemIcon>
                                      <EditIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit" />
                                  </StyledMenuItem>

                                  <StyledMenuItem onClick={this.removeContact}>
                                    <ListItemIcon>
                                      <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete" />
                                  </StyledMenuItem>
                                </StyledMenu>
                              </TableCell>
                            </TableRow>
                          )
                        }
                      })}
                    </TableBody>
                  </Table>
                  {/* End Table  */}

                </div>
                {/* End Content Wrapper  */}

              </Paper>
            </Row>
          </Column>
          {/* End Table Header */}

        </div>


        {/* Add Contacts Component */}

        <AddContact
          createContact={this.state.createContact}
          createContactFunc={this.createContactFunc}
          showSpinner={this.state.showSpinner}
          handleChange={this.handleChange}
          createContactDialog={this.createContactDialog}
        />

        {/* Contact Details Component */}

        <ContactDetails
          viewContact={this.state.viewContact}
          viewContactDetails={this.viewContactDetails}
          activeContact={this.state.activeContact}
        />

        {/* Delete Contact Component */}

        <DeleteContact
          deleteContactFunc={this.deleteContactFunc}
          deleteContact={this.state.deleteContact}
          showSpinner={this.state.showSpinner}
          removeContact={this.removeContact}
          row={this.state.activeContact}
        />

        {/* Edit Contact Component */}

        {this.state.activeContact != '' ?
          <EditContact
            editContactFunc={this.editContactFunc}
            editContactDialog={this.editContactDialog}
            editContact={this.state.editContact}
            showSpinner={this.state.showSpinner}
            handleChange={this.handleChange}
            row={this.state.activeContact}
          />
          :
          null
        }

        {/* Add To Group Component */}

        <AddToGroup
          addToGroup={this.state.addToGroup}
          addToGroupDialog={this.addToGroupDialog}
        />



      </React.Fragment >
    )
  }
}
export default withStyles(styles)(addressBook);
