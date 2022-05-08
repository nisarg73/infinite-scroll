/* eslint-disable object-curly-newline */
import { useState, useCallback, useRef } from 'react';
import { Table, TableBody, Image, Search } from 'semantic-ui-react';

import useFetch from '../../hooks/useFetch';

import './Main.css';

function Main() {
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({
    order: 'market_cap',
    clickedColumn: 'market_cap',
    direction: 'descending',
    page: 1,
    sorton: 'desc',
    per_page: 100,
    currency: 'usd',
  });
  const [search, setSearch] = useState('');
  const {
    coins,
    filterCryptos,
    hasMore,
    loading,
    error,
    handleSort,
    handleSearch,
  } = useFetch(page, table, setTable, search, setSearch);

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
      <div className="table-margin">
        <Search
          name="search"
          value={search}
          placeholder="Search any coin!"
          open={false}
          fluid
          onSearchChange={handleSearch}
        />
      </div>
      <div className="table-overflow table-margin">
        <Table celled color="black" sortable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Sr.</Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                sorted={table.clickedColumn === 'id' ? table.direction : null}
                onClick={handleSort('id')}
              >
                ID
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>

              <Table.HeaderCell textAlign="center">Image</Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                sorted={
                  table.clickedColumn === 'market_cap' ? table.direction : null
                }
                onClick={handleSort('market_cap')}
              >
                Market Cap
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                sorted={
                  table.clickedColumn === 'volume' ? table.direction : null
                }
                onClick={handleSort('volume')}
              >
                Volume
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TableBody>
            {filterCryptos.map((element) => (
              <Table.Row key={filterCryptos.indexOf(element)}>
                <Table.Cell collapsing textAlign="center">
                  {filterCryptos.indexOf(element) + 1}
                </Table.Cell>
                <Table.Cell collapsing textAlign="center">
                  {element.id}
                </Table.Cell>
                <Table.Cell textAlign="center">{element.name}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Image src={element.image} avatar />
                </Table.Cell>
                <Table.Cell textAlign="center">{element.market_cap}</Table.Cell>
                <Table.Cell textAlign="center">
                  {element.total_volume}
                </Table.Cell>
              </Table.Row>
            ))}
          </TableBody>
        </Table>
        <div>{loading && 'Loading more coins!'}</div>
        <div>{error && 'Error occured while fetching!'}</div>
        <div ref={loadingRef} />
      </div>
    </div>
  );
}

export default Main;
