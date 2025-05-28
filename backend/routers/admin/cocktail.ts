import express from "express";
import {Error} from "mongoose";
import Cocktail from "../../modules/Cocktail";

const adminCocktailRouter = express.Router();


adminCocktailRouter.delete('/:id', async (req, res, next) => {

    try {
        const cocktailId = req.params.id;
        const cocktail = await Cocktail.findOne({_id: cocktailId})
        if (!cocktail) {
            res.send("Cocktail not found");
        }
        await Cocktail.deleteOne({_id: cocktailId});
        res.send('Cocktail deleted successfully')
    } catch (e) {
        next(e)
    }

})

adminCocktailRouter.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Cocktail id must be in req params'});
            return;
        }

        const cocktail = await Cocktail.findById(id)

        if (!cocktail) {
            res.status(404).send({error: 'cocktail not found'});
            return;
        }

        if (cocktail.isPublished === true) {
            res.status(400).send({error: 'Cocktail is already published'});
            return
        }

        cocktail.isPublished = !cocktail.isPublished

        await cocktail.save();
        res.send(cocktail);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
})
export default adminCocktailRouter;