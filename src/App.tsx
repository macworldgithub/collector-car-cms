import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateCarPage from './pages/Cars/CreateCarPage';
import EditCarPage from './pages/Cars/EditCarPage';
import ViewCarPage from './pages/Cars/ViewCarPage';
import LoadingSpinner from './components/UI/LoadingSpinner';
import TestimonialForm from './components/Forms/TestimonialForm';
import TestimonialsManagement from './pages/Testimonials/TestimonialsManagement';
import Drafts from './pages/Drafts/DraftCars';
function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars/create" element={<CreateCarPage />} />
          <Route path="cars/:id" element={<ViewCarPage />} />
          <Route path="cars/:id/edit" element={<EditCarPage />} />
          <Route path="testimonials" element={<TestimonialsManagement />} />
          <Route path="testimonials/create" element={<TestimonialForm />} />
          <Route path="testimonials/:id/edit" element={<TestimonialForm />} />
          <Route path="drafts" element={<Drafts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;