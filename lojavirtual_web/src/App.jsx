import React from "react";
import Routes from './routes/Routes.jsx';
import  NavBar  from './component/NavBar.jsx'
import { BrowserRouter} from "react-router-dom";


const App = () => {
    return(
        <BrowserRouter>
            <NavBar/>
            <Routes/>
        </BrowserRouter>
    );
}

export default App;
