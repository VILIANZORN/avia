import React from 'react';

import CardList from '../cardList/cardList';
import Transfers from '../transfers/transfers';
import Tabs from '../tabs/tabs';

import Logotip from './Logo.svg';
import classes from './app.module.scss';

function App() {
  return (
    <div className="App">
      <img className={classes.logo} src={Logotip} alt="logo" />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Transfers />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Tabs />
          <CardList />
        </div>
      </div>
    </div>
  );
}

export default App;
