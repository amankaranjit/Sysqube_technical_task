import "./styles/globalStyles.css"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from "./components/Cart";
import ShippingInfo from "./components/ShippingInfo"
import { CartProvider } from "./components/cart/CartContext";
import PaymentInfo from "./components/PaymentInfo";
import OrderSummary from "./components/OrderSummary";
import Success from "./components/Success";
const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Cart />} />
          <Route path="/shipping_info" element={<ShippingInfo />} />
          <Route path="/payment_info" element={<PaymentInfo />} />
          <Route path="/order_summary" element={<OrderSummary shippingDetails={undefined} paymentDetails={undefined} />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
