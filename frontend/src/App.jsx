// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./globals.css";
import { AuthPage } from "./components/Pages/AuthPage";
import { HomePage } from "./components/Pages/HomePage"
import { Layout } from "./components/UI/common/Layout";
import { AddPlacePage } from "./components/Pages/AddPlacePage";

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/add-place" element={<AddPlacePage />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
