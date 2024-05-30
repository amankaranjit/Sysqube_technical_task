import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainNavbar from './navbar/MainNavbar';
import MainFooter from './footer/MainFooter';
import { useCart } from '../components/cart/CartContext';
import CartCard from './CartCard';
import ShippingForm from './forms/ShippingForm';
const ShippingInfo: React.FC = () => {
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

    return (
        <Container>
            <MainNavbar />
            <h1>Shipping Information</h1>
            <Row>
                <Col lg="6" md="6">
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
                    <ShippingForm />
                </Col>
            </Row>
            <MainFooter
                next_display="block"
                prev_display="block"
                prevNavigate='/'
                nextNavigate='/payment_info'
            />
        </Container>
    );
};

export default ShippingInfo;
