import React from 'react'
import { Container } from 'react-bootstrap'
import MainNavbar from './navbar/MainNavbar'

const Success: React.FC = () => {
    return (
        <Container>
            <MainNavbar />
            <h1>Your Order has been placed successfully</h1>
        </Container>
    )
}

export default Success