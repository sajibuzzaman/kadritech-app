import React from "react";

export default function Order(props) {
  const { order, handleEditClick } = props;
  return (
    <tr>
      <td>{order.orderId}</td>
      <td>{order.shippingInfo.name}</td>
      <td>{order.shippingInfo.phone}</td>
      <td>{order.totalPrice}</td>
      <td>{order.orderStatus}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, order)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
