import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Order from "./Order";
import { io } from "socket.io-client";
import EditableRow from "./EditableRow";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [editOrderId, setEditOrderId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    status: "",
  });

  useEffect(() => {
    const socket = io("ws://localhost:5000");

    socket.on("connection", () => {
      console.log("connected to server");
    });

    socket.on("order-added", (newOrders) => {
      setOrders(newOrders);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data.orders));
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("id");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
    console.log(editFormData)
  };

  const handleEditClick = (event, order) => {
    event.preventDefault();
    setEditOrderId(order._id);

    const formValues = {
      status: order.orderStatus,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditOrderId(null);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      status: editFormData.status,
    };

    axios
      .put(`http://localhost:5000/api/orders/${editOrderId}`, editedContact)
      .then((res) => console.log(res.data));

    console.log(editedContact, editOrderId);
    // setContacts(newContacts);
    setEditOrderId(null);
  };

  const orderedItem = orders.filter(
    (order) => order.orderStatus === "ordered"
  ).length;
  const deliveredItem = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;
  const canceledItem = orders.filter(
    (order) => order.orderStatus === "canceled"
  ).length;
  //   console.log(orders);
  return (
    <>
      <div className="grid-container">
        <div class="grid-item">
          Ordered Item:{" "}
          <span style={{ fontWeight: "bold" }}>{orderedItem}</span>
        </div>
        <div class="grid-item">
          Delivered Item:{" "}
          <span style={{ fontWeight: "bold" }}>{deliveredItem}</span>
        </div>
        <div class="grid-item">
          Canceled Item:{" "}
          <span style={{ fontWeight: "bold" }}>{canceledItem}</span>
        </div>
      </div>
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>orderId</th>
                <th>name</th>
                <th>phone</th>
                <th>totalPrice</th>
                <th>orderStatus</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <Fragment>
                    {editOrderId === order._id ? (
                      <EditableRow
                        order={order}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <Order order={order} handleEditClick={handleEditClick} />
                    )}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </form>
      </div>
      {/* <div className="orders-list">
        {orders &&
          orders.map((order) => {
            return (
              <div key={order._id}>
                {" "}
                <Order order={order} />{" "}
              </div>
            );
          })}
      </div> */}
    </>
  );
}
