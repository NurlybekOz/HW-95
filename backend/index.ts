import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import usersRouter from "./routers/users";
import config from "./config";
import adminRouter from "./routers/admin";
import cocktailRouter from "./routers/cocktail";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/admin', adminRouter)
app.use('/cocktails', cocktailRouter)


const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

