import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './BuyTickets.css';

const BuyTickets = () => {
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketType: 'general',
    quantity: 1
  });
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        const { paymentUrl } = await response.json();
        window.location.href = paymentUrl;
      } else {
        console.error('Error creating order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="buy-tickets-container">
      <h1 className="buy-tickets-title">Buy Tickets for TEDxNITGOA</h1>
      <form onSubmit={handleSubmit} className="buy-tickets-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={ticketData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={ticketData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={ticketData.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticketType">Ticket Type</label>
          <select
            id="ticketType"
            name="ticketType"
            value={ticketData.ticketType}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="general">General Admission</option>
            <option value="vip">VIP</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            value={ticketData.quantity}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BuyTickets;