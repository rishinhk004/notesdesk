import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Libraries } from "./pages/index";
import Login from "./components/login/Login";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Libraries />} path='/libraries' />
          <Route element = {<Login />} path='/login' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
