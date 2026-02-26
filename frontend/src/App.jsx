import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function GlobalErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: "2rem", textAlign: "center", marginTop: "10vh" }}>
      <h2>Oops, something went wrong.</h2>
      <pre style={{ color: "red", marginTop: "1rem" }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{ padding: "10px 20px", marginTop: "15px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
      >
        Try Again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback} onReset={() => window.location.reload()}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;