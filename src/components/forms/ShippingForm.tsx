import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShippingForm: React.FC = () => {
    const navigate = useNavigate();

    // State to store form data and validation status
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
    });

    const [validated, setValidated] = useState(false);
    // const [submitDisabled, setSubmitDisabled] = useState(true); // Disable submit button initially

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        // Perform form validation
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        // If form is valid, update state with form data
        const newFormData = new FormData(form);
        const formDataObject = {
            fullName: newFormData.get('fullName') as string,
            address: newFormData.get('address') as string,
            city: newFormData.get('city') as string,
            state: newFormData.get('state') as string,
            zipCode: newFormData.get('zipCode') as string,
            country: newFormData.get('country') as string,
            phoneNumber: newFormData.get('phoneNumber') as string
        };

        // Send form data to another page
        console.log("Form Data:", formDataObject);
        navigate('/payment_info', { state: { formData: formDataObject } });
    };

    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        // Validate zip code to be a 6-digit number
        if (/^\d{6}$/.test(value)) {
            setFormData({ ...formData, zipCode: value });
            setValidated(true); // Set validated to true when zip code is valid
        } else {
            setValidated(false);
        }
   
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        // Validate phone number to be exactly 10 digits starting from 98
        if (/^98\d{8}$/.test(value)) {
            setFormData({ ...formData, phoneNumber: value });
            setValidated(true); // Set validated to true when phone number is valid
        } else {
            setValidated(false);
        }
      
    };

 
    return (
        <div className="shippingForm">
            <Container>
                <h2>Shipping Details</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Full Name"
                                name="fullName" // Add name attribute
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your full name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Address"
                                name="address" // Add name attribute
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your address.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="City"
                                name="city" // Add name attribute
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the city.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="State/Province"
                                name="state" // Add name attribute
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the state/province.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Zip Code"
                                maxLength={6}
                                minLength={6}
                                name="zipCode"
                                onChange={handleZipCodeChange}
                                pattern="[0-9]*" // Allow only numbers
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid 6-digit zip code.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="12" controlId="validationCustom06">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Country"
                                name="country" // Add name attribute
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the country.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom07">
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    maxLength={10}
                                    minLength={10}
                                    onChange={handlePhoneNumberChange}
                                    pattern="[0-9]*" // Allow only numbers
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid 10-digit phone number.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Col className="text-end">
                            <Button type="submit" >Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default ShippingForm;
