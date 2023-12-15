import React, { useState, useEffect } from "react";
import "./Panel.css";
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";

function Panel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false); 

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [refreshPage]);

  const handleDeleteRow = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setRows((prevRows) => prevRows.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditRow = (userId) => {
    setRowToEdit(userId);
    setModalOpen(true);
  };

  const handleSubmit = (newUser) => {
    const method = rowToEdit === null ? "POST" : "PUT";
    const endpoint = rowToEdit === null ? "http://localhost:5000/api/users" : `http://localhost:5000/api/users/${rowToEdit}`;

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (rowToEdit === null) {
          setRows((prevRows) => [...prevRows, { id: data.id, ...newUser }]);
        } else {
          setRows((prevRows) =>
            prevRows.map((user) => (user.id === rowToEdit ? { ...user, ...newUser } : user))
          );
        }
        setModalOpen(false);
        setRowToEdit(null);
        setRefreshPage(true);
      })
      .catch((error) => console.error("Error saving user:", error));
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows.find((user) => user.id === rowToEdit)}
        />
      )}
    </div>
  );
}

export default Panel;
