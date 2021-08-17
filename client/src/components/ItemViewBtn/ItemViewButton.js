
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './itemViewButton.css';
function ItemViewButton(props) {
  const {id} = props;
  return (
    <Link to={`/dfd/${id}`} className="dfd-view-btn" >View</Link>
  );
}

export default ItemViewButton;
