import React, { useState, useEffect } from 'react'
import {Link,  useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../Components/Loader'
// import Message from '../Components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../Components/FormContainer'



function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const navigate = useNavigate()
    const dispatch = useDispatch()

    /**
     * Handle the form submission.
     * 
     * @param {Event} e - The form submit event.
     */
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    return (
        <FormContainer>
            <h1 className="mt-5">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-3"
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-3"
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3 mb-5'>
                <Col>
                    Not yet registered? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen