import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const SellerDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  
  const { user } = useContext(AuthContext);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      // Sending all fields required by your backend
      await axios.post('http://localhost:5000/api/products', 
        { name, description, price, category, imageUrl, stock },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Product added successfully!");
      // Optional: Clear form here
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to add product"));
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Seller Dashboard</h1>
      <form onSubmit={addProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
        <input placeholder="Price" type="number" onChange={(e) => setPrice(e.target.value)} required />
        <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} required />
        <input placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)} required />
        <input placeholder="Stock Quantity" type="number" onChange={(e) => setStock(e.target.value)} required />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Add Product</button>
      </form>
    </div>
  );
};

export default SellerDashboard;