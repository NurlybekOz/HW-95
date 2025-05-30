import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import AppToolbar from "./UI/AppToolbar/AppToolbar.tsx";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import NewCocktail from "./features/cocktails/NewCocktail.tsx";
import FullCocktail from "./features/cocktails/FullCocktail.tsx";
import MyCocktails from "./features/cocktails/MyCocktails.tsx";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";
import {selectUser} from "./features/users/usersSlice.ts";
import {useAppSelector} from "./app/hooks.ts";


const App = () => {
    const user = useAppSelector(selectUser);
    return (
        <>
            <CssBaseline />
            <ToastContainer/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<Cocktails/>}/>
                        <Route path="/cocktails" element={<Cocktails/>}/>
                        <Route path="/mycocktails" element={
                            <ProtectedRoute isAllowed={Boolean(user)}>
                                <MyCocktails/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/cocktails/new" element={
                            <ProtectedRoute isAllowed={Boolean(user)}>
                                <NewCocktail/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/cocktails/:id" element={<FullCocktail/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
