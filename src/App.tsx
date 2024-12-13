import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import "./styles/global.css"; // Global styles for the app
import { AuthProvider } from "./contexts/AuthContext";
import UserProfile from "./pages/UserProfile";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* Header visible on all pages */}
          <Header />

          {/* Main content area */}
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile" element={<UserProfile/>} />
              {/* <Route path="/profile" element={<Homepage />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
