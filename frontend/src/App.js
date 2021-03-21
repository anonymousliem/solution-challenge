import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const ListBook = React.lazy(() => import('./views/Pages/Book/ListBook'))
const MyBook = React.lazy(() => import('./views/Pages/MyBook/ListBook'))
const MyAccount = React.lazy(()=> import('./views/Pages/Account/MyAccount'))
const HomePage = React.lazy(()=> import('./views/Pages/HomePage/Index'))
class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
            <Route exact path="/books/list" name="List Books Page" render={props => <ListBook {...props}/>} />
            <Route exact path="/books/mybook" name="List MY Books Page" render={props => <MyBook {...props}/>} />
            <Route exact path="/account/myaccount" name="List MY Books Page" render={props => <MyAccount {...props}/>} />

            {/* <Route exact path="/account/editaccount/:id" name="Edit Account Page" render={props => <Editaccount {...props}/>} /> */}

              
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <HomePage {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
