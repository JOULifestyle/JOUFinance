import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { signIn } from "../../api/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user, token } = await signIn(email, password);
      // Store token
      localStorage.setItem('token', token);
      // Store user data
      localStorage.setItem('updatedUserData', JSON.stringify({ user, role: "user", timestamp: Date.now() }));
      // Clear the logout flag
      localStorage.removeItem('hasLoggedOut');
      // Set user in store
      setUser(user, "user");
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials. Please use the demo account credentials shown above.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-joublue to-joupurple p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-joublue to-joupurple rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-300">Sign in to your JOU Finance account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent transition-all duration-200 outline-none text-gray-900 dark:text-white"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-joublue focus:border-transparent transition-all duration-200 outline-none text-gray-900 dark:text-white"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-joublue to-joupurple text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-joublue"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">Demo Account</p>
              <p className="text-xs text-blue-600 dark:text-blue-300">
                Email: john.doe@example.com<br />
                Password: password123
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/auth/signup"
                className="text-joublue hover:text-joupurple font-semibold transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-sm">
              <Link
                to="/auth/forgot-password"
                className="text-gray-500 dark:text-gray-400 hover:text-joublue transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
