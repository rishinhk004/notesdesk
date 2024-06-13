import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Libraries } from "./pages/index";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Libraries />} path='/libraries' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
