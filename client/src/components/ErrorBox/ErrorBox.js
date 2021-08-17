import React from 'react';
import './ErrorBox.css';

function ErrorBox(props) {
  return (
    <div className="no-result-box" >
    <h1>
        {props.message}
    </h1>
    <img src={props.emoji} alt="sad emoji" height="64px"/>
    </div>
  );
}
export default ErrorBox;
