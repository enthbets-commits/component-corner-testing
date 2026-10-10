import { Link } from "react-router-dom";
import "./Header.css";

function Header({ storeName, cartCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="store-name">
          {storeName}
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>

        <div className="cart-container">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;