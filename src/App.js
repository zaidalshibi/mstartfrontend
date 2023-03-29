import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Pages/Home/Card/Card';
import Footer from './Components/SharedComponents/Footer/Footer';
import Navbar from './Components/SharedComponents/NavBar/NavBar';

function App() {
  const [deals, setDeals] = useState([]);
  const getDeals = async () => {
    if(!localStorage.getItem('token')) return;
    await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/getDeals`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setDeals(res.data.deals);
        if(res.data.deals.length > 3) {
          document.getElementById('divcard').className = "card-container-grid-app-2"
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect( () => {
    getDeals()
  }, []);
  return (
    <div className="App">
      <Navbar />
      <div className='card-container-grid-app' id='divcard'>
      {localStorage.getItem('token')? deals?.length > 0 ? deals.map(deal => {
        return (
          <Card
            key={deal.id}
            id={deal.id}
            name={deal.name}
            description={deal.description}
            currency={deal.currency}
            amount={deal.amount}
            getDeals={getDeals}
          />
        );
      })
        : <h1>No Deals Available to Claim</h1>
        : <h1>Please Login to View and Claim Deals</h1>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
