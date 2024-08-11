import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Workouts from './pages/Workouts';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProfile from './pages/MyProfile';
import Preferences from './pages/Preferences';
import BlogsPage from './components/BlogsPage';
import AdminDashboard from './pages/AdminDashboard';
import EditPage from './pages/EditPage';
import CreatePost from './pages/CreatePost';
import ScheduleEvents from './pages/ScheduleEvents';
import { AuthProvider, useAuth } from './Context/AuthContext';

// Admin route guard component
const AdminRoute = ({ element }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role === 'admin' ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/blogs" element={<BlogsPage />} />
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/admin/edit-page" element={<AdminRoute element={<EditPage />} />} />
          <Route path="/admin/create-post" element={<AdminRoute element={<CreatePost />} />} />
          <Route path="/admin/schedule-events" element={<AdminRoute element={<ScheduleEvents />} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
