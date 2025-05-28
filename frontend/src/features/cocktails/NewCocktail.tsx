import {Typography} from "@mui/material";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import CocktailForm from "./components/CocktailForm/CocktailForm.tsx";
import {CocktailMutation} from "../../types";
import {createCocktail} from "./cocktailThunk.ts";

const NewCocktail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewCocktail = async (cocktail: CocktailMutation) => {
        try {
            await dispatch(createCocktail(cocktail)).unwrap();
            toast.warning("Your cocktail is under moderation review");
            navigate('/');
        } catch (e) {
            toast.error("Cocktail was not successfully created");
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Cocktail
            </Typography>
            <CocktailForm onSubmitCocktail={onCreateNewCocktail}/>
        </>
    );
};

export default NewCocktail;