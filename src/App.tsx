import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import "./styles/global.css"; // Global styles for the app
import { AuthProvider } from "./Contexts/AuthContext";

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
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
