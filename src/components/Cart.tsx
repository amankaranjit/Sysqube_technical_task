import React from 'react';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartCard from "./CartCard";
import MainFooter from './footer/MainFooter';
import MainNavbar from './navbar/MainNavbar';
import { useCart } from '../components/cart/CartContext';

const Cart: React.FC = () => {
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
    <div className='cart__wrapper'>
      <Container>
        <MainNavbar />
        <h1>Your Cart</h1>
        <Row className="mb-3">
          {cartProducts.map((product) => (
            <Col key={product.id} lg='6' md='6'>
              <CartCard
                id={product.id}
                name={product.name}
                desc={product.desc}
                price={product.price}
                imageURL={product.imageURL}
                quantity={product.quantity}
                category={product.category}
                onRemove={handleRemoveProduct}
              />
            </Col>
          ))}
        </Row>
        <p>Total: ${totalPrice} </p>
        <MainFooter
          next_display="block"
          prev_display="block"
          prevNavigate='/'
          nextNavigate='/shipping_info'
        />
      </Container>
    </div >
  );
};

export default Cart;
