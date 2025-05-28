import express from "express";
import {Error} from 'mongoose';
import Cocktail from "../modules/Cocktail";
import User from "../modules/User";
import {imagesUpload} from "../middleware/multer";
import {Ingredients} from "../types";


const cocktailRouter = express.Router();

cocktailRouter.get('/', async (req, res, next) => {
    try {
        const queryUser = req.query.user as string;
        let cocktails = await Cocktail.find().populate("user", "displayName email");
        if (queryUser) {
            cocktails = cocktails.filter(cocktail => cocktail.user.toString() === queryUser);
        }
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});
cocktailRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const cocktails = await Cocktail.findById(id)


        if (!cocktails) {
            res.sendStatus(404)
            return;
        }
        res.send(cocktails)
    } catch (e) {
        next(e);
    }
});
cocktailRouter.post('/',  imagesUpload.single('image'), async (req, res, next) => {
    try {

        const token = req.get('Authorization');

        if (!token) {
            res.status(401).send({error: 'No token provided'});
            return;
        }

        const user = await User.findOne({token}).select('displayName email');

        if (!user) {
            res.status(401).send({error: 'Wrong token'});
            return;
        }
        console.log(req.body)

        let rawIngredients = req.body.ingredients;

        if (typeof rawIngredients === 'string') {
            try {
                rawIngredients = JSON.parse(rawIngredients);
            } catch (e) {
                 res.status(400).send({error: 'Invalid ingredients format'});
                return
            }
        }

        if (!Array.isArray(rawIngredients)) {
             res.status(400).send({error: 'Ingredients must be an array'});
             return;
        }

        const ingredients = rawIngredients.map((ingredient: Ingredients) => ({
            title: ingredient.title?.trim() || '',
            amount: ingredient.amount
        }));

        const newCocktail = {
            name: req.body.name,
            user: user,
            duration: req.body.duration,
            trackCount: req.body.trackCount,
            image: req.file ? 'images/' + req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: ingredients,
        }
        const cocktail = new Cocktail(newCocktail);
        await cocktail.save();
        res.send(cocktail);
    } catch (error) {
        if (error) {
            if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
                res.status(400).send(error)
                return;
            }
            next(error);
        }
    }
});
export default cocktailRouter;