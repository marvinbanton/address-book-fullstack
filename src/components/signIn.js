import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const styles = {
    paper: {
        marginTop: 40,
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
        marginTop: 7,
        backgroundColor: '#196bd4'
    },
    link: {
        marginTop: 10,
    }
};


class signIn extends Component {
    constructor() {
        super()
        this.state = {
            username: ' ',
            password: ' ',
        }
    }

    inputChecker = (value, option) => {
        if (option == 'username') {
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
            <Container component="main" maxWidth="xs" mt={100} >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
        </Typography>
                    <form className={classes.form}>
                        <TextField
                            style={{ marginBottom: '-3px' }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            error={this.state.username == '' ? true : false}
                            helperText={this.state.username == '' ? 'Username is required' : ' '}
                            InputLabelProps={{ required: false }}
                            onBlur={e => this.inputChecker(e.target.value, 'username')}
                            onChange={e => this.inputChecker(e.target.value, 'username')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={this.state.password == '' ? true : false}
                            helperText={this.state.password == '' ? 'Password is required' : ' '}
                            InputLabelProps={{ required: false }}
                            onBlur={e => this.inputChecker(e.target.value, 'password')}
                            onChange={e => this.inputChecker(e.target.value, 'password')}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
          </Button>
                        <Grid container>
                            <Grid item className={classes.link}>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(signIn)
