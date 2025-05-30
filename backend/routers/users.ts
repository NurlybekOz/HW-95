import express from "express";
import {Error} from 'mongoose';
import User from "../modules/User";
import {imagesUpload} from "../middleware/multer";

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = new User({
            password: req.body.password,
            displayName: req.body.displayName,
            email: req.body.email,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        user.generateToken();
        await user.save();
        res.send({user, message: 'user registered successfully.'});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/sessions', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({error: 'email and password must be in req'});
        return;
    }

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        res.status(404).send({error: "Email not found"});
        return;
    }

    const isMath = await user.checkPassword(req.body.password);

    if (!isMath) {
        res.status(400).send({error: 'Password is incorrect'});
        return;
    }

    user.generateToken();
    await user.save();

    res.send({message: 'Email and password is correct', user});
});

usersRouter.delete('/sessions', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.send({message: 'Success logout'});
        return
    }
    try {
        const user = await User.findOne({token});

        if (user) {
            user.generateToken()
            await user.save();
        }

        res.send({message: 'Success logout'});

    } catch (error) {
        next(error);
    }

});



export default usersRouter;