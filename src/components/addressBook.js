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
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/addressBookStyle';
import decode from 'jwt-decode';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';


class addressBook extends Component {
   constructor() {
      super();
      this.state = {
         open: false,
         showSpinner: false,
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
         uid: ' ',
         contacts: []
      }
   }

   getAllContacts() {
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
         this.handleClose()
      }, 3000)


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
         .then(this.getAllContacts())
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

      const { classes } = this.props

      return (
         <React.Fragment>
            <div className={classes.root}>

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
                                    <Button variant="contained" color="primary" className={classes.addUser} onClick={this.handleClickOpen}>
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
                                 {this.state.contacts.map(row => (
                                    <TableRow key={row.first_name}>
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
                                          >
                                             <MoreVertIcon />
                                          </IconButton>
                                       </TableCell>
                                    </TableRow>
                                 ))}
                              </TableBody>
                           </Table>

                        </div>
                     </Paper>
                  </Row>
               </Column>

               {/* End Table  */}

               <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <ToastContainer
                     enableMultiContainer
                     position={toast.POSITION.TOP_RIGHT}
                  />
                  <div className={this.state.showSpinner ? classes.loader : classes.hideLoader}>
                     <Column horizontal="center" style={{ marginTop: '90px' }}>

                        <Row item xs={12} sm={6} className={classes.loader} horizontal="center" >
                           {/* <span className={classes.loginMessage}>Creating your account...</span> */}
                           <CircularProgress className={classes.spinner} />
                        </Row>

                     </Column>
                  </div>

                  <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
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
                           <Grid item xs={4}>
                              <TextField
                                 style={{ marginRight: '10px', marginBottom: '32px' }}
                                 margin="dense"
                                 id="mobilenumber"
                                 label="Mobile Number"
                                 onChange={(e) => this.handleChange('mobileNumber', e)}
                                 fullWidth
                              />
                           </Grid>
                           <Grid item xs={4}>
                              <TextField
                                 style={{ marginRight: '10px', marginBottom: '32px' }}
                                 margin="dense"
                                 id="homePhone"
                                 label="Home Phone"
                                 onChange={(e) => this.handleChange('homePhone', e)}
                                 fullWidth
                              />
                           </Grid>
                           <Grid item xs={4}>
                              <TextField
                                 style={{ marginRight: '10px', marginBottom: '32px' }}
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
                        <Button onClick={this.handleClose} color="primary">
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
