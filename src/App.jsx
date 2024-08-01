import Home from "./routes/home/home.component";
import {Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./components/sign-in/sign-in.component";

const App = () => {

    const Shop = () => {
        return (
            <h1>I am the shop</h1>
        )
    }


    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index={true} element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="signIn" element={<SignIn/>}/>
            </Route>

        </Routes>
    )
}

export default App;
