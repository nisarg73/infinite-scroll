import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(page) {
  const [coins, setCoins] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page,
          per_page: 100,
        },
        cancelToken: new axios.CancelToken((c) => {
          cancel = c;
        }),
      })
      .then((res) => {
        setCoins((prevCoins) => {
          console.log([...prevCoins, ...res.data]);
          return [...prevCoins, ...res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page]);

  return {
    loading,
    error,
    coins,
    hasMore,
  };
}
