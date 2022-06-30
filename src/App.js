import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlurbFeed from './components/BlurbFeed';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/UserProvider';
import SignUp from './components/SignUp';
import { BlurpProvider } from './contexts/BlurpProvider';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';
import EditBlurp from './components/EditBlurp';

function App() {
  return (
    <UserProvider>
    <BlurpProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element = {<Home/>}>
            <Route index element={<BlurbFeed/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/edit/:id" element={<EditBlurp/>}/>
            <Route path='/profile/:id' element={<UserProfile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </BlurpProvider>
    </UserProvider>
  );
}

export default App;