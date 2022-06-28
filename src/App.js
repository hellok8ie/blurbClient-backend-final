import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BlurbFeed from './components/BlurbFeed';

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