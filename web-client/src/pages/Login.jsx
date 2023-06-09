import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useLoginMutation from "../hooks/useLoginMutation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess: () => {
          toast("login successful", {
            type: "success",
          });
          navigate("/home");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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

            <Button variant="primary" type="submit" className="w-100 mt-4">
              {loginMutation.isLoading ? "loading..." : "login"}
            </Button>
            <div className="mt-3">
              <p>
                {"don't have an account?"} <Link to={"/signup"}>signup</Link>{" "}
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
