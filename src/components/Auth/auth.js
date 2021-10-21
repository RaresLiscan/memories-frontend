import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './input';
import Icon from './icon';

const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const [isSignUp, setIsSignUp] = useState(false);
    const handleSubmit = (e) => {

    }

    const handleChange = () => {

    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const switchMode = () => {
        setIsSignUp((prevValue) => !prevValue);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const response = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { response, token }});

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google sign in was unsucessfull. Try again later");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign Up' : "Sign In"}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && (
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                            )
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId="862294085234-r7jq453qip5c7bsft5b1nhj86v1fio8m.apps.googleusercontent.com" 
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}

export default Auth;