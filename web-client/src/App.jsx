import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/publicRoute";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.body.classList.add("bg-light");
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route
              path="/signup"
              element={
                <PublicRoute failureRedirect={"/home"}>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute failureRedirect={"/home"}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute failureRedirect={"/login"}>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
