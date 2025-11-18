import { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminImpactPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const updateImpact = (id, impact) => {
    API.put(`/admin/impact/${id}`, impact).then(() => alert("Impact Updated"));
  };

  return (
    <div>
      <h1>Environmental Impact Management</h1>

      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>

          <input 
            placeholder="CO₂ Saved" 
            onChange={(e) =>
              updateImpact(p._id, { ...p.environmentalImpact, carbonSaved: e.target.value })
            }
          />

          <input 
            placeholder="Plastic Recycled" 
            onChange={(e) =>
              updateImpact(p._id, { ...p.environmentalImpact, plasticRecycled: e.target.value })
            }
          />

          <input 
            placeholder="Ocean Waste Removed"
            onChange={(e) =>
              updateImpact(p._id, { ...p.environmentalImpact, oceanWasteRemoved: e.target.value })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default AdminImpactPage;
