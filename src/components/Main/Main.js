/* eslint-disable object-curly-newline */
import { useState, useCallback, useRef } from 'react';

import useFetch from '../../hooks/useFetch';

function Main() {
  const [page, setPage] = useState(1);
  const { coins, hasMore, loading, error } = useFetch(page);

  const observer = useRef();
  const loadingRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
          console.log(coins);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="main">
      {coins.map((coin, index) => {
        if (coins.length === index + 1) {
          return (
            <div ref={loadingRef} key={coins.indexOf(coin)}>
              {coin.id}
            </div>
          );
        }
        return <div key={coins.indexOf(coin)}>{coin.id}</div>;
      })}
      <div>{loading && 'Loading more coins!'}</div>
      <div>{error && 'Error occured while fetching!'}</div>
    </div>
  );
}

export default Main;
