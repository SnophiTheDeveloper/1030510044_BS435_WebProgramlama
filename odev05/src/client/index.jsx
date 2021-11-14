import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import {Route, Routes} from "react-router";
import {Game} from "./Game";
import {Home} from "./home";

export const App = () => {
    return (
        <HashRouter>
            <div>
                <Routes>
                    <Route exact path='cards' element={<Game />}/>
                    <Route exact path='/' element={<Home />}/>
                    <Route path="*" element={<div> <h2>Sayfa Bulunamadı: 404</h2></div>}/>
                </Routes>
            </div>
        </HashRouter>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));

