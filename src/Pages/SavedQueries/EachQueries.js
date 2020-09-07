import React, { useState } from "react";
import { Link } from "react-router-dom";

const EachQueries = ({
  item,
  deleteItem,
  setDeleteItem,
  allChecked,
  deleteQuery,
}) => {
  const [eachCheck, setEachCheck] = useState(false);
  const checkItem = (item) => {
    setEachCheck(!eachCheck);
    deleteItem.includes(item)
      ? setDeleteItem(deleteItem.filter((el) => el !== item))
      : setDeleteItem([...deleteItem, item]);
  };

  return (
    <tr>
      <td className="checkboxColumn">
        <input
          type="checkbox"
          checked={allChecked || eachCheck}
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
        <button
          onClick={() => {
            deleteQuery(item.query_name);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EachQueries;
