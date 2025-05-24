
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx'
import './index.css'

// Get the publishable key from environment variables
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we have a valid key (starts with 'pk_test_' or 'pk_live_')
const isValidClerkKey = 
  CLERK_PUBLISHABLE_KEY && 
  (CLERK_PUBLISHABLE_KEY.startsWith('pk_test_') || 
   CLERK_PUBLISHABLE_KEY.startsWith('pk_live_'));

// Render the app with or without Clerk based on key availability
createRoot(document.getElementById("root")!).render(
  isValidClerkKey ? (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  ) : (
    // Fallback when no valid key is available
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Required</h1>
        <p className="mb-4">
          Clerk authentication requires a valid publishable key. 
          Please set the <code className="bg-gray-100 px-2 py-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> 
          environment variable with a valid key.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          You can get your key at the <a href="https://dashboard.clerk.com/last-active?path=api-keys" 
          className="text-blue-600 underline" target="_blank" rel="noreferrer">Clerk Dashboard</a>
        </p>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            After setting the key, refresh the page to continue.
          </p>
        </div>
      </div>
    </div>
  )
);
