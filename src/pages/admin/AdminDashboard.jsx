import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>

      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/inventory">Manage Inventory</Link>
      <Link to="/admin/impact">Manage Impact Data</Link>
    </div>
  );
};

export default AdminDashboard;
