import React from 'react';
import { HomeIcon, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Glitch effect for 404 */}
        <div className="relative">
          <h1 className="font-extrabold text-9xl text-gray-900 tracking-widest animate-pulse">
            404
          </h1>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-9xl font-extrabold text-blue-500 opacity-30 animate-ping">
              404
            </span>
          </div>
        </div>

        {/* Error message */}
        <h2 className="mt-4 text-3xl font-semibold text-gray-900 tracking-tight">
          Oops! Page not found
        </h2>
        <p className="mt-4 text-base text-gray-600 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all duration-200"
          >
            <HomeIcon className="h-4 w-4" />
            Back to Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        {/* Visual elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      </div>
    </div>
  );
};

export default NotFound;