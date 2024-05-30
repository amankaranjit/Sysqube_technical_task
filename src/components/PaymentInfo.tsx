import React from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import MainNavbar from './navbar/MainNavbar';
import MainFooter from './footer/MainFooter';
import { useLocation } from 'react-router-dom';
import { useCart } from '../components/cart/CartContext';
import CartCard from './CartCard';
import PaymentForm from './forms/PaymentForm';

const PaymentInfo: React.FC = () => {
    const { cartProducts, setCartProducts } = useCart();

    const handleRemoveProduct = (id: number) => {
        setCartProducts(cartProducts.filter(product => product.id !== id));
    };

    const parsePrice = (price: string): number => {
        return parseFloat(price.replace(/[^0-9.-]+/g, ""));
    };

    const totalPrice = cartProducts.reduce((total, product) => {
        return total + parsePrice(product.price) * product.quantity;
    }, 0);

    const location = useLocation();
    const formData = location.state?.formData;
    const shippingDetails = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phoneNumber: formData.phoneNumber
    };
    return (
        <Container>
            <MainNavbar />
            <h1>Shipping Information</h1>
            <Row>
                <Col lg="12" md="12">
                    {cartProducts.map(product => (
                        <CartCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            desc={product.desc}
                            price={product.price}
                            imageURL={product.imageURL}
                            quantity={product.quantity}
                            category={product.category}
                            onRemove={handleRemoveProduct}
                        />
                    ))}
                    <p style={{ float: 'right' }}> Total: ${totalPrice} </p>
                </Col>
                <Col lg="6" md="6">
                    <div className="shippingForm">
                        <h2>Shipping Details</h2>
                        <Row>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.fullName} disabled
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
                                    value={formData.address} disabled
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
                                    value={formData.city} disabled
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
                                    value={formData.state} disabled
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
                                    value={formData.zipCode} disabled
                                    name="zipCode" // Add name attribute
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the zip code.
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
                                    value={formData.country} disabled
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
                                        value={formData.phoneNumber} disabled
                                        name="phoneNumber" // Add name attribute
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your phone number.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </div>
                </Col>
                <Col lg="6" md="6">
                    <PaymentForm shippingDetails={shippingDetails} />
                </Col>
            </Row>
            <MainFooter
                next_display="block"
                prev_display="none"
                prevNavigate='/shipping_info'
                nextNavigate='/payment_info'
            />
        </Container>
    );
};

export default PaymentInfo;
