export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    image: string | null;

}

export interface User {
    _id: string;
    displayName: string;
    role: string;
    image: string | null;
    email: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface CocktailMutation {
    name: string;
    image: string | null;
    recipe: string;
    ingredients:
        {
            title: string,
            amount: string,
        }[]
}

export interface ICocktail {
    _id: string;
    user: User;
    name: string;
    image: string;
    isPublished: boolean;
    recipe: string;
    ingredients: [
        {
            title: string,
            amount: string,
        }
    ]
}