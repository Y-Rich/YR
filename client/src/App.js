import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './view/components/header/Header';
import { PRIVATE_ROUTE_ARR, PUBLIC_ROUTE_ARR } from './Route';
import { PrivateRoute } from './utils/CustomRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {PUBLIC_ROUTE_ARR.map((route, index) => {
          return (
            <Route path={route.path} element={<route.element />} key={index} />
          );
        })}
        {PRIVATE_ROUTE_ARR.map((route, index) => {
          return (
            <Route
              path={route.path}
              element={
                <div>
                  {/* <PrivateRoute> */}
                  <route.element />
                  {/* </PrivateRoute> */}
                </div>
              }
              key={index}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
