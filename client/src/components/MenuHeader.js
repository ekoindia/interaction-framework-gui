
import React from 'react';
import './MenuItem/MenuItem.css';
function MenuHeader(props) {
  return (
    <div className="menu-item header-row" >
      <div className="menu-item__data-container button-col">
      </div>
      <div className="menu-item__data-container id-col">Interaction ID</div>
      <div className="menu-item__data-container label-col">Label</div>
      <div className="menu-item__data-container context-col">Interaction Context</div>
      <div className="menu-item__data-container isvisible-col">Visible To Customer</div>
    </div>
  );
}
export default MenuHeader;
