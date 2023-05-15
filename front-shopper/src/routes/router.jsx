import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Validation } from "../pages/Validation";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/validation" element={<Validation/>}/>
        </Routes>
    )
}