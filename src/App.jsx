import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import Joblisting from './pages/job-listing';
import JobPage from './pages/job';
import PostJob from './pages/post-job';
import SavedJobs from './pages/saved-job';
import Myjobs from './pages/my-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/', 
          element: <LandingPage />
        },
        {
          path: '/onboarding', 
          element: (
            <ProtectedRoute>
 <Onboarding />
            </ProtectedRoute>
         

          ),
        },
        {
          path: '/jobs', 
        
          element: (
          <ProtectedRoute>
            <Joblisting />
            </ProtectedRoute>
          ),
        },
        {
          path: '/job/:id', 
          element: (
            <ProtectedRoute>
              <JobPage />
              </ProtectedRoute>),
        },
        {
          path: '/post-job', 
          element: (
            <ProtectedRoute>
               <PostJob/>
            </ProtectedRoute>),
        },
        {
          path: '/saved-jobs', 
          element:(
            <ProtectedRoute>
<SavedJobs />
            </ProtectedRoute> 
          ),
        },
        {
          path: '/my-jobs', 
          element: 
          (<ProtectedRoute>
            <Myjobs />
            </ProtectedRoute>
          ),
        },
        
      ]
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
    <RouterProvider router={router} />
  </ThemeProvider>
  );
}

export default App;
