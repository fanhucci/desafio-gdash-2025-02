import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Usuarios from "./pages/usuarios";
import Explorar from "./pages/explorar";


function App() {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/explorar" element={<Explorar/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
