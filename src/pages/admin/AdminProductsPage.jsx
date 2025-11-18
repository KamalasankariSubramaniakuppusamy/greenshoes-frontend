import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="admin-products">
      <h1>All Products</h1>

      {products.map((p) => (
        <div key={p._id} className="admin-product-card">
          <p>{p.name}</p>
          <Link to={`/admin/products/${p._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default AdminProductsPage;
