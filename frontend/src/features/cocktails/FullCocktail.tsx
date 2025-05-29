import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Container, Grid, Typography} from "@mui/material";
import {selectCocktailById, selectCocktailsLoading} from "./cocktailSlice.ts";
import {fetchCocktailById} from "./cocktailThunk.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import {apiUrl} from "../../../globalConstants.ts";


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
        <Container >
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && cocktail ?
               <Grid>
                   <Grid sx={{display: "flex", gap: "15px"}}>
                       <img src={apiUrl + '/' + cocktail.image} alt={cocktail.name} style={{width: '250px', height: '400px', borderRadius: "15px", marginBottom: '10px'}}/>
                       <Grid sx={{display: "flex", flexDirection: "column"}}>
                            <h2 style={{margin: "0px"}}>{cocktail.name}</h2>
                           <ul style={{padding: '5px', margin: "0px 0px 0px 10px"}}>
                               <h3 style={{marginTop: '0px'}}>Ingredients:</h3>
                               {cocktail.ingredients.map((ingredient, index) => (
                                   <li key={index}>{ingredient.title} - {ingredient.amount}</li>
                                   ))
                               }
                           </ul>
                       </Grid>
                   </Grid>
                   <Grid sx={{display: "flex", flexDirection: "column"}}>
                        <b>Recipe:</b>
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