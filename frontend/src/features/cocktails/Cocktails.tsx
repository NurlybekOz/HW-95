import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {useEffect} from "react";
import {selectUser} from "../users/usersSlice.ts";
import {selectCocktails, selectCocktailsLoading} from "./cocktailSlice.ts";
import {deleteCocktail, fetchAllCocktails, patchCocktail} from "./cocktailThunk.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import { Link } from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";


const Cocktails = () => {
    const dispatch = useAppDispatch()
    const cocktails = useAppSelector(selectCocktails)
    const loading = useAppSelector(selectCocktailsLoading)
    const user = useAppSelector(selectUser)


    useEffect(() => {
            dispatch(fetchAllCocktails(null))
    }, [dispatch])

    const isAdmin = user?.role === 'admin';

    const handleDelete = async (CocktailId: string) => {
        await dispatch(deleteCocktail(CocktailId))
        dispatch(fetchAllCocktails(''))
    }
    const handlePatch = async (CocktailId: string) => {
        await dispatch(patchCocktail(CocktailId))
        dispatch(fetchAllCocktails(''))
    }
    return (
        <>
            {loading ? <Spinner /> :
                (cocktails.length === 0 ?
                        <Typography variant='h4' color='textDisabled' mt={2}>No cocktails</Typography> :
                        <Grid container direction='row' spacing={3} mt={2}>
                            {cocktails.map((cocktail, index) => {
                                if (!cocktail.isPublished && !isAdmin) {
                                    return null;
                                }
                                return (
                                    <Card sx={{ minWidth: 250 }} key={index} >
                                        <CardMedia
                                            component="img"
                                            alt={cocktail.name}
                                            height="250"
                                            image={apiUrl + '/' + cocktail.image}
                                        />
                                        <CardContent>
                                            <Button component={Link} to={'/cocktails/' + cocktail._id}>
                                                {cocktail.name}
                                            </Button>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                made by {cocktail.user.displayName}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            {isAdmin && !cocktail.isPublished &&
                                                <Button onClick={() => handlePatch(cocktail._id)} variant='contained' color='success'>Publish</Button>
                                            }
                                            {isAdmin && cocktail.isPublished &&
                                                <Button onClick={() => handleDelete(cocktail._id)} variant='contained' color='error'>Delete</Button>
                                            }
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </Grid>
                )}
        </>
    );
};

export default Cocktails;