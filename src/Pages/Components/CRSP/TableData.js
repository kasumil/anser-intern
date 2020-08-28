import React, { useState } from "react";

const TableData = ({ data, allCheck }) => {
  const [eachCheck, setEachCheck] = useState(false);

  const handleEachCheck = () => {
    setEachCheck(!eachCheck);
  };

  return (
    <tr>
      <td className="thCheck">
        <input
          type="checkbox"
          checked={allCheck || eachCheck}
          onChange={handleEachCheck}
        />
      </td>
      <td className="companyName">{data.ENTITY_NAME}</td>
      <td className="general">{data.TICKER}</td>
      <td className="general">{data.CUSIP_FULL}</td>
      <td className="general">{data.PERMNO}</td>
      <td className="general">{data.PERMCO}</td>
      <td className="general">{data.FIRST_DATE}</td>
      <td className="general">{data.LAST_DATE}</td>
    </tr>
  );
};

export default TableData;
