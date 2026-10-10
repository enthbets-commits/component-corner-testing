import { useParams, Link } from "react-router-dom";

function ProductDetailsPage({ products, addToCart }) {
  const { productId } = useParams();

  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (!product) {
    return (
      <main className="product-details">
        <h2>Product Not Found</h2>
        <p>Sorry, we could not find that product.</p>

        <Link to="/products">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details">
      <img
        src={product.image}
        alt={product.name}
        className="product-details-image"
      />

      <div className="product-details-info">
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <h3>${product.price.toFixed(2)}</h3>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <br />
        <br />

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    </main>
  );
}

export default ProductDetailsPage;