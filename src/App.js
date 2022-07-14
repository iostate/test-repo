import { Routes, Route } from 'react-router-dom';
import SignIn from './routes/sign-in/sign-in.component';

import Home from './routes/home/home.component';
import Navigation from './routes/home/navigation/navigation.component';

const Shop = () => {
  return (
    <>
      <h2>I am the shop page</h2>
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
