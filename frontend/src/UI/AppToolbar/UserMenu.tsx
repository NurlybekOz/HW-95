import {Button, Grid} from "@mui/material";
import { User } from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {logout} from "../../features/users/usersThunk.ts";
import {unsetUser} from "../../features/users/usersSlice.ts";
import {NavLink} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
    }
    return (
            <Grid
                color="inherit"
                alignItems='center'
                fontSize='15px'
            >
                Hello, <b>{user.displayName}</b>! {user.image ? <img src={`${apiUrl + '/' + user.image}`} alt='avatar' style={{width: '35px', height: '35px', borderRadius: '50%', verticalAlign: "bottom"}} /> : null} <Button component={NavLink} to='/mycocktails' color='inherit' sx={{textTransform: "none", padding: '3px 6px 5px 5px', textDecoration: 'underline'}}>My cocktails</Button> | <Button component={NavLink} to='/cocktails/new' color='inherit' sx={{textTransform: "none", padding: '3px 6px 5px 5px', textDecoration: 'underline'}}>Add new cocktail</Button> or <Button sx={{textTransform: "none", padding: '3px 6px 5px 5px', textDecoration: 'underline'}} onClick={handleLogout} color='inherit'>Logout</Button>
            </Grid>
    );
};

export default UserMenu;