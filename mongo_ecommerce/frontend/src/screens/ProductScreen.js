import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

function ProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const addToCartHandler = () => {
    console.log("Ajout au panier:", product._id, qty);
    dispatch(addToCart(product._id, qty));
    navigate('/cart');
  };


  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p><strong>Marque :</strong> {product.brand}</p>
      <p><strong>Prix :</strong> {product.price} €</p>
      <p><strong>Stock :</strong> {product.countInStock}</p>

      {product.countInStock > 0 && (
        <div>
          <label>Quantité :</label>
          <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {product.countInStock > 0 ? (
        <button onClick={addToCartHandler}>Ajouter au panier</button>
      ) : (
        <button disabled>En rupture de stock</button>
      )}
    </div>
  );
}

export default ProductScreen;
