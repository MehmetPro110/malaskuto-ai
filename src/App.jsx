import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ServerConsole from './pages/ServerConsole';
import CreateServer from './pages/CreateServer';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/server/:uuid"
          element={
            <ProtectedRoute>
              <ServerConsole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-server"
          element={
            <ProtectedRoute>
              <CreateServer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-600/30 selection:text-blue-100">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
