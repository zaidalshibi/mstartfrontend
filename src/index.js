import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/Signup/Signup';
import AddDeal from './Components/Pages/NewDeal/Form';
import UserProfile from './Components/Pages/UserProfile';
import AdminLogin from './Components/Pages/Admin/AdminLogin/Login';
import Users from './Components/Pages/Admin/UsersPage/AdminUsers';
import AdminHome from './Components/Pages/Admin/Home/Home';
import AdminDeals from './Components/Pages/Admin/DealsPage/AdminDeals';
import AdminClaimedDeals from './Components/Pages/Admin/ClaimedDealsPage/AdminClaimedDeals';


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/newdeal" element={<AddDeal />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/users" element={<Users/>} />
      <Route path="/admin/deals" element={<AdminDeals />} />
      <Route path="/admin/claimeddeals" element={<AdminClaimedDeals />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
