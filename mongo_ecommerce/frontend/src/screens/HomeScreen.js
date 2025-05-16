import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Nos Produits</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <Link to={`/product/${product._id}`}>
                {product.name} - {product.price} €
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomeScreen;
