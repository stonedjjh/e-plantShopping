import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;    
    cart.forEach(item => {
      total += item.quantity * parseFloat(item.cost.substring(1));
    });
    return total;    
  };

  // Navigates back to the product listing page
  const handleContinueShopping = (e) => {
    e.preventDefault(); // Detiene cualquier recarga automática del navegador
    onContinueShopping(e);
  };

  // Triggers an alert message indicating future checkout implementation
  const handleCheckoutShopping = (e) => {
    alert('Checkout functionality is under development. Thank you for shopping with Paradise Nursery!');
  };

  // Dispatches action to increment the quantity of a specific item in the cart
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Dispatches action to decrement the item quantity or removes it entirely if it reaches zero
  const handleDecrement = (item) => {
    if (item.quantity - 1 > 0){
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
        handleRemove(item);
    }        
  };

  // Dispatches action to completely remove an item from the global cart state
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const total = item.quantity * parseFloat(item.cost.substring(1));
    return total;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
