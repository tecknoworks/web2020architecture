import React from 'react';

// Style
import './App.scss';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import PageList from './components/PageList';
import NavBar from './components/NavBar';
import AddPage from './components/AddPage';
import Page from './components/Page';
import { GlobalErrors } from './components/GlobalErrors';

function App() {
  return (
    <Router>
      <NavBar />

      <GlobalErrors />

      <Switch>
        <Route path="/" exact component={PageList} />
        <Route path="/pages/add" component={AddPage} />
        <Route path="/pages/:id" component={Page} />
      </Switch>
    </Router>
  );
}

export default App;
