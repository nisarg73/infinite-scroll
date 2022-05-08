import { Segment } from 'semantic-ui-react';

import './Header.css';

function Header() {
  return (
    <Segment attached className="header-segment">
      <div className="header-container">
        <h1>Search Cryptos!</h1>
      </div>
    </Segment>
  );
}

export default Header;
