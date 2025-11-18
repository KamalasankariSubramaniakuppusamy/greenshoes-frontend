import { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminInventoryPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const updateStock = (productId, variant, qty) => {
    API.put(`/admin/inventory/${productId}`, {
      size: variant.size,
      color: variant.color,
      quantity: qty
    }).then(() => alert("Updated"));
  };

  return (
    <div className="admin-inventory">
      <h1>Manage Inventory</h1>

      {products.map((p) => (
        <div key={p._id}>
          <h2>{p.name}</h2>
          {p.variants.map((v) => (
            <div key={v._id}>
              <p>{v.size} / {v.color}: {v.quantity}</p>
              <input type="number" onChange={(e) => updateStock(p._id, v, e.target.value)}/>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminInventoryPage;
