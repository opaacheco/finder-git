import React from "react";

import "./styles.css";

function ItemList({ title, description, language }) {
  return (
    <div className="item-list">
      <strong>{title}</strong>
      <p>{description}</p>
      <p>{language}</p>
      <hr />
      <br />
    </div>
  );
}

export default ItemList;
