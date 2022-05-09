import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import authAPI from './apis/auth.api';
import AuthContext from './contexts/AuthContext';
import CommonLayout from './layouts/CommonLayout';
import RareLayout from './layouts/RareLayout';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/category/CategoryPage';
import HomePage from './pages/home/HomePage';
import ProductDetail from './pages/home/ProductDetail';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/product/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SettingPage from './pages/SettingPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';

function App() {
  const [authState, setAuthState] = useState({
    status: Boolean(localStorage.getItem('accessToken')),
    user: null,
  });

  const fetchCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setAuthState({ status: true, user: response });
    } catch (error) {
      console.error(error);
      setAuthState({ status: false, user: null });
    }
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ status: false, user: null });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      fetchCurrentUser();
    });
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authState, fetchCurrentUser, logout }}>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="updatePassword" element={<UpdatePasswordPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>
        <Route path="/" element={<RareLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
