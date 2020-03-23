import { Container, Row, Col, Card } from 'react-bootstrap'

import LoginForm from '../components/loginForm'

const Login = () => {


    return (
        <div className="mt-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" lg="8" xl="6">
                        <Card border="primary">
                            <Card.Body>
                                <div className="text-center">
                                    <h3>Login</h3>
                                </div>
                                <LoginForm />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login