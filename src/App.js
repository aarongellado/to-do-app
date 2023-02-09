import * as React from 'react';
import Home from './screens/homePage'
import Details from './screens/detailsPage';
import { Routes, Route, Link, } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='details' element={<Details></Details>} />
    </Routes>
  );
}

export default App;
