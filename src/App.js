import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlurbFeed from './components/BlurbFeed';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/UserProvider';
import SignUp from './components/SignUp';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Home/>}>
          <Route index element={<BlurbFeed/>}/>
          <Route path="/signup" element={<SignUp/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;