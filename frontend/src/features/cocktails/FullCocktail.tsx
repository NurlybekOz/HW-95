import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Container, Grid, Typography} from "@mui/material";
import {selectCocktailById, selectCocktailsLoading} from "./cocktailSlice.ts";
import {fetchCocktailById} from "./cocktailThunk.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";


const FullCocktail = () => {
    const dispatch = useAppDispatch();
    const cocktail = useAppSelector(selectCocktailById);
    const fetchLoading = useAppSelector(selectCocktailsLoading);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchCocktailById(id));
        }
    }, [id, dispatch]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && cocktail ?
               <Grid>
                   <Grid sx={{display: "flex", gap: "15px"}}>
                       <img src={cocktail.image} alt={cocktail.name} style={{width: '200px', height: '500px'}}/>
                       <Grid sx={{display: "flex", flexDirection: "column"}}>
                            <h2 style={{marginBottom: "0px"}}>{cocktail.name}</h2>
                           <ul style={{padding: '0px', margin: "0px"}}>
                               <h3>Ingredients:</h3>
                               {cocktail.ingredients.map((ingredient, index) => (
                                   <li key={index}>{ingredient.title} - {ingredient.amount}</li>
                                   ))
                               }
                           </ul>
                       </Grid>
                   </Grid>
                   <Grid sx={{display: "flex", flexDirection: "column"}}>
                        <b>Recipe</b>
                        <span>{cocktail.recipe}</span>
                   </Grid>
               </Grid>
                :
                <Typography variant="h6">Not found cocktail</Typography>
            }
        </Container>
    );
};

export default FullCocktail;