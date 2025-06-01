import React from 'react';

export default function Login() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-yellow-600 hover:text-yellow-500">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
