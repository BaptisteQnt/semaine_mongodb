import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div>
      <h2>Adresse de livraison</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        /><br/>
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        /><br/>
        <input
          type="text"
          placeholder="Code postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        /><br/>
        <input
          type="text"
          placeholder="Pays"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        /><br/>
        <button type="submit">Suivant</button>
      </form>
    </div>
  );
};

export default ShippingScreen;
