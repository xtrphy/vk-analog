import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { UserProvider } from './contexts/UserContext.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import App from './App.jsx';
import LogIn from './pages/LogIn/LogIn.jsx';
import Profile from './pages/Profile/Profile.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import Friends from './pages/Friends/Friends.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LogIn />
    },
    {
        path: '/feed',
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
    },
    {
        path: '/profile',
        element: (
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        ),
    },
    {
        path: '/edit',
        element: (
            <PrivateRoute>
                <EditProfile />
            </PrivateRoute>
        )
    },
    {
        path: '/user/:id',
        element: (
            <PrivateRoute>
                <UserProfile />
            </PrivateRoute>
        )
    },
    {
        path: '/friends',
        element: (
            <PrivateRoute>
                <Friends />
            </PrivateRoute>
        )
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </StrictMode>
)
