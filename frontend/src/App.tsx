import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Usuarios from "./pages/usuarios";
import Explorar from "./pages/explorar";
import Login from "./pages/login";
import RotaProtegida from "./pages/rotaProtegida";
import { AuthProvider } from "../contexts/AuthContext";



function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explorar/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/usuarios" element={<RotaProtegida><Usuarios /></RotaProtegida>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
