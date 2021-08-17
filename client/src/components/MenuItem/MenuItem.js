
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InvisibleIcon from '../assets/icons8-invisible-48.png'
import BulbIcon  from '../assets/bulb.png';
import './MenuItem.css';
import ItemViewButton from '../ItemViewBtn/ItemViewButton';
function MenuItem(props) {
  const {id, label, is_customer_visible, context} = props.data;
  const VisibilityIcon = (is_customer_visible == 0)?InvisibleIcon:BulbIcon;
  return (
    <div className="menu-item" >
      <div className="menu-item__data-container button-col">
        <ItemViewButton id={id}/>
      </div>
      <div className="menu-item__data-container id-col">{id}</div>
      <div className="menu-item__data-container label-col">{label}</div>
      <div className="menu-item__data-container context-col">{context?context:"Not Avaiable"}</div>
      <div className="menu-item__data-container isvisible-col">
        <img src={VisibilityIcon}></img>
      </div>
    </div>
  );
}
export default MenuItem;
