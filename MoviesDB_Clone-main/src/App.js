import './App.css';
import Home from './home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Moviesdetails from './components/MoviesDetails';
import Searchpage from './components/searchPage';
import Login from './components/Loginpage';
import Movies from './components/MoviesPage';






function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/movie/:movieid" component={Moviesdetails}/>
        <Route path="/movie" component={Movies}/>
        <Route path="/search/:searchquery" component={Searchpage}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
