import React, {useState, useEffect} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from './styles';
import memories from '../../images/memories.png';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const NavBar = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))); 
    const location = useLocation();

    console.log(user);

    useEffect(() => {
        const token = user?.token;

        //JWT...

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [localStorage.getItem("profile")]);

    const logout = () => {
        dispatch({ type: LOGOUT });

        history.push("/");

        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" width="100" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.response.name} src={user.response.imageUrl}>{user.response.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant={"h6"}>{user.response.name}</Typography>
                        <Button variant="contained" className={classes.logout} color={"secondary"} onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;