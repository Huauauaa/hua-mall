import { Routes, Route } from 'react-router-dom';
import CommonLayout from './layouts/CommonLayout';
import RareLayout from './layouts/RareLayout';
import CartPage from './pages/CartPage';
import HomePage from './pages/home/HomePage';
import ProductDetail from './pages/home/ProductDetail';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SettingPage from './pages/SettingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order" element={<OrderPage />} />
        </Route>
        <Route path="/" element={<RareLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
    </div>
  );
}

export default App;
