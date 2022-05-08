/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(page, table, setTable, search, setSearch) {
  const [coins, setCoins] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterCryptos, setFilterCryptos] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: `${table.currency}`,
          order: `${table.order}_${table.sorton}`,
          page,
          per_page: `${table.per_page}`,
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

  const handleSort = (currColumn) => () => {
    if (currColumn !== table.clickedColumn) {
      setTable((prev) => ({
        ...prev,
        clickedColumn: currColumn,
        direction: 'ascending',
        sorton: 'asc',
        order: currColumn,
        page: 1,
      }));
    } else {
      setTable((prev) => ({
        ...prev,
        direction: prev.direction === 'ascending' ? 'descending' : 'ascending',
        sorton: prev.direction === 'ascending' ? 'desc' : 'asc',
        page: 1,
      }));
    }
  };

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: `${table.currency}`,
          order: `${table.order}_${table.sorton}`,
          page: 1,
          per_page: table.per_page,
        },
      })
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [table]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let filteredCryptos = coins;
    if (search.length > 0) {
      filteredCryptos = filteredCryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterCryptos(filteredCryptos);
    } else {
      filteredCryptos = coins;
      setFilterCryptos(filteredCryptos);
    }
  }, [search, coins]);

  return {
    loading,
    error,
    coins,
    filterCryptos,
    hasMore,
    handleSort,
    handleSearch,
  };
}
