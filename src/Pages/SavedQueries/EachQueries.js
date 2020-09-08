import React, { useState } from "react";
import { Link } from "react-router-dom";

const EachQueries = ({ item, deleteItem, setDeleteItem }) => {
  const checkItem = (item) => {
    deleteItem.includes(item)
      ? setDeleteItem(deleteItem.filter((el) => el !== item))
      : setDeleteItem([...deleteItem, item]);
  };

  return (
    <tr>
      <td className="checkboxColumn">
        <input
          type="checkbox"
          checked={deleteItem.includes(item.query_name)}
          onChange={() => {
            checkItem(item.query_name);
          }}
        />
      </td>
      <td>{item.query_name}</td>
      <td>{item.data_set}</td>
      <td>{item.created_at.substring(0, 10)}</td>
      <td>
        <Link to={"/CRSP"}>
          <button>Rerun</button>
        </Link>
      </td>
    </tr>
  );
};

export default EachQueries;
