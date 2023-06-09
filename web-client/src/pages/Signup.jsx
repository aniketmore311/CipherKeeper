import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useSignupMutation from "../hooks/useSignupMutation";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useSignupMutation();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess: () => {
          navigate("/login");
          toast("signup successful login to continue", {
            type: "success",
          });
        },
      }
    );
    // Add your login logic here
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-4"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "loading..." : "sign up"}
            </Button>
            <div className="mt-3">
              <p>
                already have an account? <Link to={"/login"}>login</Link>{" "}
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignupPage;
