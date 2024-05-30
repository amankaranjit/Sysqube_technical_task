import React from 'react';

interface CartCardProps {
  id: number;
  name: string;
  desc: string;
  price: string;
  imageURL: string;
  quantity: number;
  category: string;
  onRemove: (id: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({ id, name, desc, price, imageURL, quantity, category, onRemove }) => {
  return (
    <div className='cart__card'>
      <div className="image__wrapper">
        <img src={imageURL} alt="cart_image" />
      </div>
      <div className="desc__wrapper">
        <h2><span>{name}</span>  <span className="price">{price}</span></h2>
        <p className='desc'>{desc}</p>
        <span className='category'>{category}</span>
        <span className="quantity">Quantity of Product: {quantity}</span>
        <button className='delete_btn' onClick={() => onRemove(id)}>Remove This Product</button>
      </div>
    </div>
  );
};

export default CartCard;
