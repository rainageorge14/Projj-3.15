import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  // Add item
  const addItem = () => {
    if (!name) return;

    const newItem = {
      id: Date.now(),
      name,
      status: "available",
      claimedBy: null,
      expiry: null,
    };

    setItems([...items, newItem]);
    setName("");
  };

  // Claim item
  const claimItem = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.status !== "available") {
            alert("Item not available");
            return item;
          }

          // set expiry (30 sec)
          const expiryTime = Date.now() + 30000;

          // Ghost buyer timer
          setTimeout(() => {
            setItems((current) =>
              current.map((i) => {
                if (i.id === id && i.status === "claimed") {
                  return {
                    ...i,
                    status: "available",
                    claimedBy: null,
                    expiry: null,
                  };
                }
                return i;
              })
            );
          }, 30000);

          return {
            ...item,
            status: "claimed",
            claimedBy: "User",
            expiry: expiryTime,
          };
        }
        return item;
      })
    );
  };

  // Confirm pickup
  const confirmPickup = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "sold" } : item
      )
    );
  };

  // Seller override
  const markSold = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "sold" } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dorm Marketplace</h1>

      {/* Add Item */}
      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <hr />

      {/* Item List */}
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            margin: 10,
            padding: 10,
          }}
        >
          <h3>{item.name}</h3>
          <p>Status: {item.status}</p>

          {/* Available */}
          {item.status === "available" && (
            <button onClick={() => claimItem(item.id)}>
              Claim Item
            </button>
          )}

          {/* Claimed */}
          {item.status === "claimed" && (
            <>
              <p>Claimed by: {item.claimedBy}</p>
              <button onClick={() => confirmPickup(item.id)}>
                Confirm Pickup
              </button>
            </>
          )}

          {/* Seller Controls */}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => markSold(item.id)}>
              Mark Sold
            </button>
            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}