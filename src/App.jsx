import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Salades from "./screens/Salades";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Salades />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
