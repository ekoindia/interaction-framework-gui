import React from 'react';
import './SearchBar.css';


const SearchBar = (props) => {
  return (
    <div className="search-bar">
        <svg width="36" height="36" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.16667 9.66667C4.16667 6.90917 6.40917 4.66667 9.16667 4.66667C11.9242 4.66667 14.1667 6.90917 14.1667 9.66667C14.1667 12.4242 11.9242 14.6667 9.16667 14.6667C6.40917 14.6667 4.16667 12.4242 4.16667 9.66667ZM17.2558 16.5775L14.4267 13.7475C15.3042 12.6192 15.8333 11.205 15.8333 9.66667C15.8333 5.99083 12.8425 3 9.16667 3C5.49083 3 2.5 5.99083 2.5 9.66667C2.5 13.3425 5.49083 16.3333 9.16667 16.3333C10.705 16.3333 12.1192 15.8042 13.2475 14.9267L16.0775 17.7558C16.24 17.9183 16.4533 18 16.6667 18C16.88 18 17.0933 17.9183 17.2558 17.7558C17.5817 17.43 17.5817 16.9033 17.2558 16.5775Z" fill="white"/>
<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="16" height="15">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.16667 9.66667C4.16667 6.90917 6.40917 4.66667 9.16667 4.66667C11.9242 4.66667 14.1667 6.90917 14.1667 9.66667C14.1667 12.4242 11.9242 14.6667 9.16667 14.6667C6.40917 14.6667 4.16667 12.4242 4.16667 9.66667ZM17.2558 16.5775L14.4267 13.7475C15.3042 12.6192 15.8333 11.205 15.8333 9.66667C15.8333 5.99083 12.8425 3 9.16667 3C5.49083 3 2.5 5.99083 2.5 9.66667C2.5 13.3425 5.49083 16.3333 9.16667 16.3333C10.705 16.3333 12.1192 15.8042 13.2475 14.9267L16.0775 17.7558C16.24 17.9183 16.4533 18 16.6667 18C16.88 18 17.0933 17.9183 17.2558 17.7558C17.5817 17.43 17.5817 16.9033 17.2558 16.5775Z" fill="white"/>
</mask>
<g mask="url(#mask0)">
<rect y="0.5" width="20" height="20" fill="white"/>
</g>
</svg>
        <input 
     className="search-bar__input"
     key="random1"
     value={props.value}
     placeholder={"Search for interaction id or label"}
     onChange={(e) => props.updateInput(e.target.value)}
    />
    </div>
  );
}

export default SearchBar