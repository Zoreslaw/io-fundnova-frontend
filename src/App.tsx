import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import "./styles/global.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import CreateProjectPage from "./pages/CreateProjectPage";
import PreviewProjectPage from "./pages/PreviewProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import ViewProjectPage from "./pages/ViewProjectPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
          <ProjectProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="*" element={<NotFound />} />       
              <Route path="/create-project" element={<CreateProjectPage />}/>
              <Route path="/preview-project" element={<PreviewProjectPage />}/>
              <Route path="/edit-project/:projectId" element={<EditProjectPage />} />
              <Route path="/view-project/:projectId" element={<ViewProjectPage />} />
            </Routes>
          </ProjectProvider> 
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
