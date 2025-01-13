import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import OrderList from './components/OrderList.tsx';
import OrderDetail from './components/OrderDetail.tsx';
import OrderForm from './components/OrderForm.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/create-order" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
