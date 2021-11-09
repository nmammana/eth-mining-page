import React from 'react';

import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Error404 from './pages/Error404/Error404';

import './styles/Reset.scss';
import './styles/Global.scss';


import AuthContextProvider from './contexts/AuthContext';
import UsersContextProvider from './contexts/UsersContext';
import MiningContextProvider from './contexts/MiningContext';
import CoinsContextProvider from './contexts/CoinsContext';

import Loading from './components/Loading/Loading';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <AuthContextProvider>
      <UsersContextProvider>
        <CoinsContextProvider>
        <MiningContextProvider>
          <BrowserRouter>
            <Suspense>
              <Switch fallback={<Loading />}>
                <PublicRoute exact path="/login" component={Login}/>
                <PrivateRoute exact path="/" component={Home}/>
                <Route path="*" component={Error404}/>
              </Switch>
            </Suspense>
          </BrowserRouter>
        </MiningContextProvider>
        </CoinsContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  );
}
