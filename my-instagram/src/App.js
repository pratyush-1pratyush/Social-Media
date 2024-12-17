import { Route, Routes } from "react-router-dom";
import Authentication from "./Components/authentication";
import Home from "./Components/home";
import { Provider } from "react-redux";
import AppStore from "./Utils/appStore";

function App() {
  return (
    <Provider store={AppStore}>
    <Routes>
      <Route path="/" element={<Authentication/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </Provider>
  
  );
}

export default App;
