import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlurbFeed from './components/BlurbFeed';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}>
          <Route index element={<BlurbFeed/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;