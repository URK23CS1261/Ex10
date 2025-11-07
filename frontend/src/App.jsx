import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import ChangePassword from './components/ChangePassword';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminOperations from './components/AdminOperations';
import ProtectedRoute from './components/ProtectedRoute';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => (
  <Container className="py-5">
    <div className="text-center mb-5">
      <h1 className="display-4 mb-3">Programming Language Overview</h1>
      <p className="lead text-muted">Understanding the Evolution and Diversity of Programming Languages</p>
    </div>

    <Row className="mb-5">
      <Col md={12}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <h3 className="mb-4">What Are Programming Languages?</h3>
            <p className="text-justify">
              Programming languages are formal languages comprising instructions that produce various kinds of output. 
              They are used to implement algorithms and control the behavior of machines, particularly computers. 
              Programming languages serve as a bridge between human logic and machine execution, enabling developers 
              to create software applications, websites, and systems that power modern technology.
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="mb-5">
      <Col md={6} className="mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <h4 className="mb-3">Types of Programming Languages</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Low-Level Languages:</strong> Assembly, Machine Code</li>
              <li className="mb-2"><strong>High-Level Languages:</strong> Python, Java, JavaScript</li>
              <li className="mb-2"><strong>Procedural:</strong> C, Pascal, Fortran</li>
              <li className="mb-2"><strong>Object-Oriented:</strong> Java, C++, C#</li>
              <li className="mb-2"><strong>Functional:</strong> Haskell, Lisp, Erlang</li>
              <li className="mb-2"><strong>Scripting:</strong> JavaScript, PHP, Ruby</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} className="mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <h4 className="mb-3">Popular Programming Languages</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Python:</strong> Data Science, AI, Web Development</li>
              <li className="mb-2"><strong>JavaScript:</strong> Web Development, Frontend & Backend</li>
              <li className="mb-2"><strong>Java:</strong> Enterprise Applications, Android</li>
              <li className="mb-2"><strong>C/C++:</strong> System Programming, Game Development</li>
              <li className="mb-2"><strong>Go:</strong> Cloud Services, Distributed Systems</li>
              <li className="mb-2"><strong>Rust:</strong> Systems Programming, Performance</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="mb-5">
      <Col md={12}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <h4 className="mb-3">Key Characteristics of Programming Languages</h4>
            <Row>
              <Col md={4} className="mb-3">
                <h6>Syntax & Semantics</h6>
                <p className="small text-muted">Rules governing structure and meaning of statements</p>
              </Col>
              <Col md={4} className="mb-3">
                <h6>Type Systems</h6>
                <p className="small text-muted">Static vs Dynamic, Strong vs Weak typing</p>
              </Col>
              <Col md={4} className="mb-3">
                <h6>Paradigms</h6>
                <p className="small text-muted">Programming styles and methodologies</p>
              </Col>
              <Col md={4} className="mb-3">
                <h6>Compilation</h6>
                <p className="small text-muted">Interpreted, Compiled, or JIT compilation</p>
              </Col>
              <Col md={4} className="mb-3">
                <h6>Memory Management</h6>
                <p className="small text-muted">Manual, Automatic, or Garbage Collection</p>
              </Col>
              <Col md={4} className="mb-3">
                <h6>Abstraction Level</h6>
                <p className="small text-muted">Distance from hardware operations</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col md={12}>
        <Card className="shadow-sm border-primary">
          <Card.Body className="p-4">
            <h4 className="mb-3">Evolution & Future</h4>
            <p>
              Programming languages continue to evolve with technological advances. Modern languages focus on 
              developer productivity, security, concurrency, and performance. The future includes greater emphasis 
              on domain-specific languages, AI-assisted coding, and languages designed for quantum computing and 
              distributed systems.
            </p>
            <p className="mb-0">
              <strong>This application demonstrates the MERN stack</strong> - a combination of MongoDB, Express.js, 
              React.js, and Node.js - showcasing how JavaScript has evolved to power full-stack development.
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);


const UnauthorizedPage = () => (
  <Container className="py-5 text-center">
    <h1 className="display-4 text-danger">403 - Unauthorized</h1>
    <p className="lead">You don't have permission to access this page</p>
  </Container>
);

function App() {  
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/operations"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminOperations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
