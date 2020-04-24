import React from 'react';

const Ad = ({ad}) => {
    return (
        <section className="movie-ad" >
            <p>Don't miss! <span id="ad-text">Ad</span></p>
              {ad}
        </section>
    )
}
export default Ad;