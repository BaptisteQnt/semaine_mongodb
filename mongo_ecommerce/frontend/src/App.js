import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'; // <--- Important !

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} /> {/* <--- ICI */}
      <Route path="/cart/:id" element={<CartScreen />} /> {/* facultatif si tu dispatch dans CartScreen */}
    </Routes>
  );
}

export default App;
