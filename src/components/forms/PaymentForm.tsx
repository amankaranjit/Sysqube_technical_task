import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface ShippingDetails {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
}

interface PaymentDetails {
    cardHolderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

const PaymentForm: React.FC<{ shippingDetails: ShippingDetails }> = ({ shippingDetails }) => {
    const navigate = useNavigate();
    const [paymentFormData, setFormData] = useState<PaymentDetails>({
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity()) {
            const formDataObject: PaymentDetails = {
                cardHolderName: paymentFormData.cardHolderName,
                cardNumber: paymentFormData.cardNumber,
                expiryDate: paymentFormData.expiryDate,
                cvv: paymentFormData.cvv,
            };
            console.log("Payment Data:", formDataObject);
            navigate('/order_summary', { state: { PaymentFormData: formDataObject, ShippingDetails: shippingDetails } });
        }

        setIsValid(true);
    };

    const formatCardNumber = (number: string) => {
        return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setFormData({ ...paymentFormData, cardNumber: rawValue });
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...paymentFormData, expiryDate: e.target.value });
    };

    const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...paymentFormData, cvv: e.target.value });
    };

    return (
        <div className="paymentForm">
            <Container>
                <h2>Payment Details</h2>
                <Form noValidate validated={isValid} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="12" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={paymentFormData.cardHolderName}
                                onChange={(e) => setFormData({ ...paymentFormData, cardHolderName: e.target.value })}
                                isInvalid={isValid && !paymentFormData.cardHolderName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your full name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Card Number"
                                name="cardNumber"
                                value={formatCardNumber(paymentFormData.cardNumber)}
                                onChange={handleCardNumberChange}
                                isInvalid={isValid && !paymentFormData.cardNumber}
                                maxLength={19}
                                minLength={19}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your card number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" controlId="expiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                required
                                type="month"
                                placeholder="MM/YYYY"
                                name="expiryDate"
                                value={paymentFormData.expiryDate}
                                onChange={handleExpiryDateChange}
                                isInvalid={isValid && !paymentFormData.expiryDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the expiry date.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="CVV"
                                name="cvv"
                                value={paymentFormData.cvv}
                                onChange={handleCVVChange}
                                isInvalid={isValid && !paymentFormData.cvv}
                                maxLength={4}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the CVV.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Col className="text-end">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default PaymentForm;
