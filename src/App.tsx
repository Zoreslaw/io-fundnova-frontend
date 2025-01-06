import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import "./styles/global.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import CreateProjectPage from "./pages/CreateProjectPage";
import PreviewProjectPage from "./pages/PreviewProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import ViewProjectPage from "./pages/ViewProjectPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { CreateProjectProvider } from "./contexts/CreateProjectContext";
import Searchpage from "./pages/SearchPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
        <Header />
          <main>
            <ProjectProvider>
              <CreateProjectProvider>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/create-project"
                    element={
                      <ProtectedRoute>
                        <CreateProjectPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/search" element={<Searchpage />}/>
                  <Route path="/preview" element={<PreviewProjectPage />} />
                  <Route path="/edit-project/:projectId" element={<EditProjectPage />} />
                  <Route path="/projects/:projectId" element={<ViewProjectPage />} />
                </Routes>
              </CreateProjectProvider>
            </ProjectProvider>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
