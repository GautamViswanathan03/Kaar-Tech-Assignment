import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
