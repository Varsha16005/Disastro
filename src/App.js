import Login from './Login';
import Signup from './Signup';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RescueForm from './RescueForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Homes from './Home';
import LocationInfo from './LocationInfo';
import Products from './Products';
import Cart from './Cart';
import NGOCards from './NGOCards';
import RadioPlayer from './RadioPlayer';
import Payment from './Payment';
import FeaturesGrid from './FeaturesGrid';

function App() {
  return (
    <div className="App">
    
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homes />} />
          <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="rescueform" element={<RescueForm />} />
        <Route path="/locinfo/:name" element={<LocationInfo />} />
        <Route path="/products/:formName" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ngo" element={<NGOCards />} />
        <Route path="/radio" element={<RadioPlayer />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/about" element={<FeaturesGrid />} />


      </Routes>

    </div>
  );
}

export default App;