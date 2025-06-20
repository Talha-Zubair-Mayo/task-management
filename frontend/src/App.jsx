import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import TaskList from './pages/TaskList';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

const App = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <Router>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/tasks" />} />
                            <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/tasks" />} />
                            <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/tasks" element={<TaskList />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </ErrorBoundary>
        </Router>
    );
};

export default App;