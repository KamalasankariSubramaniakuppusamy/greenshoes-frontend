import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

const AdminEditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const updateProduct = () => {
    API.put(`/products/${id}`, product).then(() => alert("Updated"));
  };

  return (
    <div>
      <h1>Edit Product</h1>

      <input 
        value={product.name || ""} 
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />

      <textarea
        value={product.description || ""}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
      />

      <button onClick={updateProduct}>Save</button>
    </div>
  );
};

export default AdminEditProductPage;
