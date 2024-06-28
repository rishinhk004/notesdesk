import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Libraries, Subjects, Chapters } from "./pages/index";
import Sections from "./pages/Sections/Sections";
import Dashboard from "./components/Dashboard/Dashboard";
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Dashboard />} path='/dashboard' />
          <Route element={<Libraries />} path='/libraries' />
          <Route element={<Subjects />} path='/libraries/:id' />
          <Route element={<Chapters />} path='/libraries/:id/:subId' />
          <Route element={<Sections />} path='/libraries/:id/:subId/:chapId' />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </>
  )
}

export default App;
