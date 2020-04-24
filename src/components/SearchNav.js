
import React from 'react';

const SearchNav = ({handleChange, handleClick, title, error}) => {
    return (
        <section>
          <div className="search-div">
            <input type="text" id="search"  onChange={handleChange} value={title}/>
            <button onClick={handleClick}>Search</button> 
          </div>

          <div className="error-display">
            <span>{error}</span>
          </div>
        </section>    
    )
}
export default SearchNav;
