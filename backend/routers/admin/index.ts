import express from "express";
import permit from "../../middleware/permit";
import auth from "../../middleware/auth";
import adminCocktailRouter from "./cocktail";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/cocktails', adminCocktailRouter )




export default adminRouter;