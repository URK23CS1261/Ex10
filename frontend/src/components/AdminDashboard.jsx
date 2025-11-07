import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header as="h5">Welcome, Administrator!</Card.Header>
            <Card.Body>
              <h5 className="card-title">Hello, {user?.name}!</h5>
              <p className="card-text">
                You are logged in as an <Badge bg="danger">Admin</Badge>
              </p>
              <p>
                As an administrator, you have full access to manage users,
                view all records, and perform administrative operations.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h5">Admin Capabilities</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>User Management</h6>
                  <ul>
                    <li>View all users</li>
                    <li>Add new users</li>
                    <li>Update user details</li>
                    <li>Remove users</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Operations</h6>
                  <ul>
                    <li>Display all records</li>
                    <li>Update functionality</li>
                    <li>Delete functionality</li>
                    <li>Full system access</li>
                  </ul>
                </Col>
              </Row>
              <Link to="/admin/operations" className="btn btn-primary mt-3">
                Go to Operations Console
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Quick Stats</Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Total Users:</strong> <Badge bg="info">View in Operations</Badge>
              </p>
              <p className="mb-2">
                <strong>Admin Users:</strong> <Badge bg="danger">1+</Badge>
              </p>
              <p className="mb-2">
                <strong>Normal Users:</strong> <Badge bg="success">Multiple</Badge>
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header as="h5">System Status</Card.Header>
            <Card.Body>
              <p className="mb-1">
                <Badge bg="success">Online</Badge>
              </p>
              <small className="text-muted">All systems operational</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
