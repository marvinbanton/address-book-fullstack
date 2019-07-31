import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = {
   paper: {
      marginTop: 80,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: 5,
      backgroundColor: '#196bd4',
   },
   form: {
      width: '100%',
      marginTop: 18,
   },
   submit: {
      marginTop: 25,
      backgroundColor: '#196bd4'
   },
   link: {
      marginTop: 10,
   },
   hideLoader: {
      display: 'none',
   },
   loginMessage: {
      marginBottom: '8px',
      fontSize: '16px',
      color: '#00000099',
   },
   loader: {
      position: 'absolute',
      margin: '125px -12px',
   },
   loaderOverlay: {
      height: '100%',
      width: '100%',
      position: 'absolute',
   },

};



class SignUp extends Component {
   constructor() {
      super();
      this.state = {
         firstName: ' ',
         lastName: ' ',
         email: ' ',
         username: ' ',
         password: ' ',
         showSpinner: false
      }
   }

   createAccount = (e) => {
      e.preventDefault();

      this.setState({
         showSpinner: true
      })

      setTimeout(() => {
         this.setState({ showSpinner: false });
         this.props.history.push('./addressbook')
      }, 3000)

      fetch('/signup', {
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
         });
      })

   }

   inputChecker = (value, option) => {
      if (option === 'firstName') {
         this.setState({
            firstName: value,
         })
      } else if (option === 'lastName') {
         this.setState({
            lastName: value,
         })
      } else if (option === 'email') {
         this.setState({
            email: value,
         })
      } else if (option === 'username') {
         this.setState({
            username: value,
         })
      } else {
         this.setState({
            password: value,
         })
      }
   }

   render() {
      const { classes } = this.props

      return (
         <Container component="main" maxWidth="xs" >
            <ToastContainer
               enableMultiContainer
               position={toast.POSITION.TOP_RIGHT}
            />
            <CssBaseline />

            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign up
            </Typography>

               <div className={this.state.showSpinner ? classes.loader : classes.hideLoader}>
                  <div className={classes.loaderOverlay}>

                     <Grid item xs={12} sm={6} className={classes.loader}>
                        {/* <span className={classes.loginMessage}>Creating your account...</span> */}
                        <CircularProgress className={classes.spinner} />
                     </Grid>

                  </div>
               </div>

               <form className={classes.form} onSubmit={this.createAccount}>
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           style={{ marginBottom: '-3px' }}
                           name="firstName"
                           variant="outlined"
                           required
                           fullWidth
                           id="fname"
                           label="First Name"
                           error={this.state.firstName === '' ? true : false}
                           helperText={this.state.firstName === '' ? 'First Name is required' : ' '}
                           InputLabelProps={{ required: false }}
                           onBlur={e => this.inputChecker(e.target.value, 'firstName')}
                           onChange={e => this.inputChecker(e.target.value, 'firstName')}

                        />
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           style={{ marginBottom: '-3px' }}
                           variant="outlined"
                           required
                           fullWidth
                           id="lname"
                           label="Last Name"
                           name="lastName"
                           error={this.state.lastName === '' ? true : false}
                           helperText={this.state.lastName === '' ? 'Last Name is required' : ' '}
                           InputLabelProps={{ required: false }}
                           onBlur={e => this.inputChecker(e.target.value, 'lastName')}
                           onChange={e => this.inputChecker(e.target.value, 'lastName')}

                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           style={{ marginBottom: '-3px' }}
                           variant="outlined"
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           error={this.state.email === '' ? true : false}
                           helperText={this.state.email === '' ? 'Email is required' : ' '}
                           InputLabelProps={{ required: false }}
                           onBlur={e => this.inputChecker(e.target.value, 'email')}
                           onChange={e => this.inputChecker(e.target.value, 'email')}

                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           style={{ marginBottom: '-3px' }}
                           variant="outlined"
                           required
                           fullWidth
                           id="username"
                           label="Username"
                           name="username"
                           error={this.state.username === '' ? true : false}
                           helperText={this.state.username === '' ? 'Username is required' : ' '}
                           InputLabelProps={{ required: false }}
                           onBlur={e => this.inputChecker(e.target.value, 'username')}
                           onChange={e => this.inputChecker(e.target.value, 'username')}

                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           style={{ marginBottom: '-13px' }}
                           variant="outlined"
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           error={this.state.password === '' ? true : false}
                           helperText={this.state.password === '' ? 'Password is required' : ' '}
                           InputLabelProps={{ required: false }}
                           onBlur={e => this.inputChecker(e.target.value, 'password')}
                           onChange={e => this.inputChecker(e.target.value, 'password')}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Sign Up
              </Button>
                  <Grid container>
                     <Grid item className={classes.link}>
                        <Link href="/signin" variant="body2">
                           Already have an account? Sign in
                  </Link>
                     </Grid>
                  </Grid>
               </form>
            </div>
         </Container>
      );
   }

}

export default withStyles(styles)(SignUp);