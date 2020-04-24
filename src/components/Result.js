import React from 'react';

const Result = ({totalResults, data}) => {
    return (

        <section className="container">
          <div className="total-results">
          {
            totalResults && <p> Total results: <span style={{color: "red"}}>{totalResults}</span></p> 
          }
          </div>
          <div className="movies-container">
            {
              data
            }
          </div>
        </section>
    )
}
export default Result;

