import {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {toast} from "react-toastify";
import FileInput from "../../../../UI/FileInput/FileInput.tsx";
import {CocktailMutation} from "../../../../types";

interface Props {
    onSubmitCocktail: (cocktail: CocktailMutation) => void;
}

const CocktailForm: React.FC<Props> = ({onSubmitCocktail}) => {
    const [form, setForm] = useState<CocktailMutation>({
        name: '',
        image: '',
        recipe: '',
        ingredients: [
            {
                title: '',
                amount: '',
            }
        ]
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name.trim() || !form.recipe.trim() || !form.image ) {
            toast.error('All fields are required');
            return;
        }
        onSubmitCocktail({...form})
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target

        if (files) {
            setForm(prevState => ({...prevState, [name]: files[0]}))
        }
    }


    const onIngredientChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setForm(prevForm => {
            const ingredients = [...prevForm.ingredients];
            if (name.endsWith('title')) {
                ingredients[index].title = value;
            } else if (name.endsWith('amount')) {
                ingredients[index].amount = value;
            }
            return { ...prevForm, ingredients };
        });
    }

    const addIngredientHandler = () => {
        setForm(prevForm => ({
            ...prevForm,
            ingredients: [...prevForm.ingredients, { title: '', amount: '' }],
        }));
    };

    const removeIngredientHandler = (indexToRemove: number) => {
        setForm(prevForm => {
            const ingredients = prevForm.ingredients.filter((_, index) => index !== indexToRemove);
            return { ...prevForm, ingredients };
        });
    };

    return (
        <form onSubmit={onSubmit} style={{ width: "75%", margin: "0 auto"}}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="name"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid sx={{display: "flex", flexDirection: "column", gap: "10px"}} size={{sm: 12, md: 6, lg: 6}}>
                    {form.ingredients.map((ingredient, index) => (
                        <Grid key={index} sx={{display: "flex", gap: "20px", alignItems: "center"}}>
                            <TextField
                                label="Ingredient name"
                                name={`ingredients.${index}.title`}
                                value={ingredient.title}
                                onChange={(e) => onIngredientChange(e, index)}
                            />
                            <TextField
                                label="Ingredient amount"
                                name={`ingredients.${index}.amount`}
                                value={ingredient.amount}
                                onChange={(e) => onIngredientChange(e, index)}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removeIngredientHandler(index)}
                                style={{ height: '50px' }}
                                type="button"
                            >
                                x
                            </Button>
                        </Grid>
                    ))}
                    <Button type="button" onClick={addIngredientHandler}>Add ingredient</Button>
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="recipe"
                        label="Recipe"
                        name="recipe"
                        multiline rows={3}
                        value={form.recipe}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;