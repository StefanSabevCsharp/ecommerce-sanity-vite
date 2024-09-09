import { urlFor } from "../../lib/client";
import Product from "../product/Product";


export default function Home({ products }) {
  return (
    <>
      <div className="products-heading">
        <h2>
          Best Selling Products
          <p>
            Speakers of many variations
          </p>
        </h2>
      </div>
      <div className="products-container">
        {products.map(product => <Product key={product._id} product={product} />)}
      </div>
    </>
  );
}