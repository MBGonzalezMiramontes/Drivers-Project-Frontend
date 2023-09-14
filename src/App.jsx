import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Create from "./views/create/create";
import Landing from "./views/landing/landing";
import NavBar from "./components/navbar/navbar";


function App() {
  const { pathname } = useLocation();
  const routesForNavBar = ["/home", "/home/:id", "/form"]; 
  const renderNavBar = routesForNavBar.some((route) =>
    pathname.startsWith(route)
  );
  return (
    <div className="App">
      {renderNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
