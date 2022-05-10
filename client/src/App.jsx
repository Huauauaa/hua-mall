import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AuthContext from './contexts/AuthContext';
import CartPage from './pages/cart/CartPage';
import CategoryPage from './pages/category/CategoryPage';
import CommonLayout from './layouts/CommonLayout';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProductDetail from './pages/home/ProductDetail';
import ProductPage from './pages/product/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RareLayout from './layouts/RareLayout';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './layouts/RequireAuth';
import SettingPage from './pages/SettingPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import UserPage from './pages/user/UserPage';
import authAPI from './apis/auth.api';

function App() {
  const [authState, setAuthState] = useState({
    status: Boolean(localStorage.getItem('accessToken')),
    user: null,
  });

  const fetchCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      if (!response) {
        throw new Error(response);
      }
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
          <Route
            path="/product"
            element={
              <RequireAuth>
                <ProductPage />
              </RequireAuth>
            }
          />
          <Route
            path="/category"
            element={
              <RequireAuth>
                <CategoryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/user"
            element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          />
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
