import { useEffect, useState } from "react";
import API from "../api/axios";
import AddressCard from "../components/AddressCard";
import { useAuth } from "../context/AuthContext";

const AddressManagerPage = () => {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    line1: "",
    city: "",
    state: "",
    zip: "",
  });

  // FETCH ADDRESSES
  useEffect(() => {
    if (!user) return;

    const fetchAddresses = async () => {
      try {
        const res = await API.get("/user/addresses", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAddresses(res.data);
      } catch (err) {
        console.error("Failed to load addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  // ADD ADDRESS
  const addAddress = async () => {
    try {
      const res = await API.post("/user/addresses", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  // DELETE ADDRESS
  const deleteAddress = async (id) => {
    try {
      const res = await API.delete(`/user/addresses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  // MAKE DEFAULT
  const makeDefault = async (id) => {
    try {
      const res = await API.put(`/user/addresses/default/${id}`, null, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Error setting default:", err);
    }
  };

  if (loading) return <p>Loading addresses...</p>;

  return (
    <div className="address-page">
      <h1>Manage Addresses</h1>

      <section className="address-list">
        {addresses.length === 0 ? (
          <p>No saved addresses yet.</p>
        ) : (
          addresses.map((a) => (
            <AddressCard
              key={a._id}
              address={a}
              onDelete={() => deleteAddress(a._id)}
              onDefault={() => makeDefault(a._id)}
            />
          ))
        )}
      </section>

      <section className="address-form">
        <h2>Add New Address</h2>

        <input
          placeholder="Line 1"
          value={form.line1}
          onChange={(e) => setForm({ ...form, line1: e.target.value })}
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
        <input
          placeholder="Zip"
          value={form.zip}
          onChange={(e) => setForm({ ...form, zip: e.target.value })}
        />

        <button onClick={addAddress}>Add Address</button>
      </section>
    </div>
  );
};

export default AddressManagerPage;
