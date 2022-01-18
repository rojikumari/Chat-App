import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/Home"
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter>
       <Navbar/>
        <Switch>
           <Route exact path="/register" component={Register}/>
           <Route exact path="/login" component={Login}/>
           <PrivateRoute exact path="/profile" component={Profile}/>
           <PrivateRoute exact path="/" component={Home}/>
        </Switch>
    </BrowserRouter>
  );
}
export default App;
