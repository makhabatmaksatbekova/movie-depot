import React from 'react';

const ShowMore = ({loadMoreMovies}) => {
    return (
      <div className="load-more">
        <p onClick={loadMoreMovies}>show more</p>
      </div>
    )
}
export default ShowMore;