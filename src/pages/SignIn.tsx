
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <img 
            src="/lovable-uploads/c7b2b957-6a5d-4e2f-838a-da932b7cc591.png" 
            alt="TechKnots Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-techknot-blue">Sign In</h2>
        </div>
        
        <ClerkSignIn 
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-none",
              formButtonPrimary: "bg-techknot-blue hover:bg-techknot-purple",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
