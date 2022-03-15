import React from "react";
import Form from "./components/form-login-logout/Form";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {UserPage} from "./pages/UserPage";
import {NavBar} from "./components/NavBar";
import {MainPage} from "./pages/MainPage";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes >
                <Route path={"/"} element={<Form/>}/>
                <Route path={"/userPage"} element={<UserPage/>}/>
                <Route path={"/mainPage"} element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
