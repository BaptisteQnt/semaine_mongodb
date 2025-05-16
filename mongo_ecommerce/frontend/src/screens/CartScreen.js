import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen() {
  const { id: productId } = useParams(); // Récupère l'ID depuis l'URL
  const [searchParams] = useSearchParams(); // Pour lire ?qty=1
  const qty = Number(searchParams.get('qty')) || 1;

  const dispatch = useDispatch();

  // Récupère le panier depuis Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log('CartScreen → cartItems :', cartItems); // 🧪 Pour test

  // Si on arrive sur /cart/:id?qty=1 → ajoute au panier
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // Supprimer un article du panier
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

    console.log("✅ Redux cart state:", cartItems);
    console.log("📦 localStorage cartItems:", localStorage.getItem('cartItems'));


  return (
    <div>
      <h1>🛒 Mon panier</h1>

      {cartItems.length === 0 ? (
        <p>
          Votre panier est vide. <Link to="/">Retour à la boutique</Link>
        </p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product}>
              <strong>{item.name}</strong> — {item.qty} × {item.price} € ={' '}
              <strong>{item.qty * item.price} €</strong>
              <br />
              <button onClick={() => removeFromCartHandler(item.product)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <Link to="/shipping">
          <button>Passer à la livraison</button>
        </Link>
      )}
    </div>
  );
}

export default CartScreen;
