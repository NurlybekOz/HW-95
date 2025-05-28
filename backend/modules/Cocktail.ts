import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: string) => {
                const user = await User.findById(value)
                return !!(user);
            },
            message: 'User not found',
        }
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    ingredients: [
        {
            title: {
                type: String,
                required: true,
            },
            amount: {
                type: String,
                required: true,
            }
        }
    ]
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;