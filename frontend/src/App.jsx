import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./globals.css";
import { AuthPage } from "./components/Pages/AuthPage";
import { HomePage } from "./components/Pages/HomePage"
import { Layout } from "./components/UI/common/Layout";
import { AddPlacePage } from "./components/Pages/AddPlacePage";
import { ProtectedRoutes } from "./components/UI/user-related/ProtectedRoutes";
import { AccessDeniedPage } from "./components/Pages/AccessDeniedPage";
import { DisplayPlacesPage } from "./components/Pages/DisplayPlacesPage";
import { PlaceDetailedPage }from "./components/Pages/PlaceDetailedPage";
import { UserProfilePage } from "./components/Pages/UserProfilePage";

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/places" element={<DisplayPlacesPage />} />
                <Route path="/place/:placeId" element={<PlaceDetailedPage />} />
                <Route element={<ProtectedRoutes />} >
                    <Route path="/add-place" element={<AddPlacePage />} />
                </Route>
                <Route path="/user/:userId" element={<UserProfilePage />} />
                <Route path="/access-denied" element={<AccessDeniedPage />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
