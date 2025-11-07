import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Button, ProgressBar, ListGroup, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => clearInterval(timer);
  }, []);

  const membershipDays = user?.createdAt 
    ? Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))
    : 0;

  const activities = [
    { action: 'Profile viewed', time: '2 hours ago', icon: '👤' },
    { action: 'Password updated', time: '3 days ago', icon: '🔒' },
    { action: 'Account created', time: `${membershipDays} days ago`, icon: '🎉' },
  ];

  const programmingLanguages = [
    { name: 'JavaScript', level: 85, color: 'warning' },
    { name: 'Python', level: 70, color: 'info' },
    { name: 'Java', level: 60, color: 'danger' },
    { name: 'C++', level: 45, color: 'secondary' },
  ];

  return (
    <Container className="py-5">
      {/* Welcome Header */}
      <div className="mb-4">
        <h1 className="display-5 mb-2">{greeting}, {user?.name}! 👋</h1>
        <p className="text-muted">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <Row>
        {/* Left Column */}
        <Col lg={8}>
          {/* Stats Cards Row */}
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className="text-center h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="display-6 mb-2">📚</div>
                  <h3 className="mb-1">12</h3>
                  <p className="text-muted mb-0">Courses Enrolled</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="text-center h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="display-6 mb-2">✅</div>
                  <h3 className="mb-1">8</h3>
                  <p className="text-muted mb-0">Completed</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="text-center h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="display-6 mb-2">🏆</div>
                  <h3 className="mb-1">{membershipDays}</h3>
                  <p className="text-muted mb-0">Days Active</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Profile Information */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📋 Profile Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="me-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                        <span className="d-block text-center">👤</span>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Full Name</small>
                      <strong>{user?.name}</strong>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="me-3">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                        <span className="d-block text-center">📧</span>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Email Address</small>
                      <strong className="text-break">{user?.email}</strong>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="me-3">
                      <div className="bg-info bg-opacity-10 rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                        <span className="d-block text-center">🎭</span>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Account Type</small>
                      <Badge bg="success" className="mt-1">{user?.role}</Badge>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="me-3">
                      <div className="bg-warning bg-opacity-10 rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                        <span className="d-block text-center">📅</span>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Member Since</small>
                      <strong>{new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Programming Skills */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">💻 Programming Language Proficiency</h5>
            </Card.Header>
            <Card.Body>
              {programmingLanguages.map((lang, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span><strong>{lang.name}</strong></span>
                    <span className="text-muted">{lang.level}%</span>
                  </div>
                  <ProgressBar 
                    now={lang.level} 
                    variant={lang.color} 
                    style={{ height: '8px' }}
                  />
                </div>
              ))}
              <Alert variant="info" className="mb-0 mt-3">
                <small>
                  <strong>💡 Tip:</strong> Complete more courses to improve your proficiency levels!
                </small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col lg={4}>
          {/* Quick Actions */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">⚡ Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" className="text-start">
                  <span className="me-2">👤</span> View Profile
                </Button>
                <Button 
                  variant="outline-warning" 
                  className="text-start"
                  as={Link}
                  to="/change-password"
                >
                  <span className="me-2">🔒</span> Change Password
                </Button>
                <Button variant="outline-info" className="text-start">
                  <span className="me-2">📚</span> Browse Courses
                </Button>
                <Button variant="outline-success" className="text-start">
                  <span className="me-2">📊</span> View Progress
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Recent Activity */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">🕐 Recent Activity</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {activities.map((activity, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center">
                    <span className="me-3" style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
                    <div className="flex-grow-1">
                      <div className="mb-0">{activity.action}</div>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* System Status */}
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">🖥️ System Status</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Server Status</span>
                <Badge bg="success">Online</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Database</span>
                <Badge bg="success">Connected</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>API Services</span>
                <Badge bg="success">Operational</Badge>
              </div>
              <hr />
              <small className="text-muted">
                Last checked: {currentTime.toLocaleTimeString()}
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
