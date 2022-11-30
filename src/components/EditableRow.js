import React from "react";

const EditableRow = ({
  order,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{order.orderId}</td>
      <td>{order.shippingInfo.name}</td>
      <td>{order.shippingInfo.phone}</td>
      <td>{order.totalPrice}</td>
      <td>
        {/* <input
          type="text"
          required="required"
          name="status"
          value={editFormData.status}
          onChange={handleEditFormChange}
        ></input> */}
        <select id="status" defaultValue={editFormData.status} onChange={handleEditFormChange}>
          <option value="ordered">Ordered</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
