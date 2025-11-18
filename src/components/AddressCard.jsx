const AddressCard = ({ address, onSelect, onDelete, onDefault }) => {
  return (
    <div className="address-card">
      <p>{address.line1}</p>
      <p>{address.city}, {address.state} {address.zip}</p>

      <button onClick={onSelect}>Use This Address</button>
      <button onClick={onDelete}>Delete</button>

      {!address.isDefault && (
        <button onClick={onDefault}>Set Default</button>
      )}
    </div>
  );
};

export default AddressCard;
