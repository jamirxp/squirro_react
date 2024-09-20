import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // declared variables to store data
  const [stores, setStores] = useState([]); // API data storage
  const [includedData, setIncludedData] = useState([]); 
  const [countryFlags, setCountryFlags] = useState({}); 

  useEffect(() => {
    // API to fetch country flag based on country code
    axios.get('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json')
      .then(response => {
        const flags = {};
        // get the flag image location based on country.code
        response.data.forEach(country => {
          flags[country.code] = country.image;
        });
        setCountryFlags(flags); 
      })
      .catch(error => {
        console.error('Error fetching country flags:', error);
      });

    // API to fetch stores data from localhost:3000/stores
    axios.get('http://localhost:3000/stores')
      .then(response => {
        setStores(response.data.data); 
        setIncludedData(response.data.included); 
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  }, []); 

  // function to get books associated with a specific store
  const getBooksForStore = (storeId) => {
    const store = stores.find(store => store.id === storeId); // find the store by ID
    return store?.relationships?.books?.data || []; // return books data or an empty array
  };

  // function to get details of a specific book
  const getBookDetails = (bookId, bookType) => {
    const matchingBook = includedData.find(item => item.id === bookId && item.type === bookType); // find the book
    if (matchingBook) {
      const authorData = matchingBook.relationships?.author?.data; 
      const authorId = authorData?.id; 
      const authorType = authorData?.type;

      let fullName = null; 
      if (authorId && authorType) {
        // Find the matching author
        const matchingAuthor = includedData.find(author => author.id === authorId && author.type === authorType);
        if (matchingAuthor) {
          fullName = matchingAuthor.attributes.fullName; // get the full name of the author
        }
      }

      return {
        name: matchingBook.attributes.name, // return book details
        copiesSold: matchingBook.attributes.copiesSold,
        fullName,
      };
    }
    return null;
  };

  // function to render star ratings
  const renderStars = (rating) => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? 'star highlighted' : 'star'}>★</span>
        ))} 
      </div>
    );
  };

  return (
    <div className="App">
      {stores.map(store => (
        <div key={store.id} className="store-box">
          <div className="store-content">
            <img src={store.attributes.storeImage} alt={store.attributes.name} className="store-image" />
            <div className="store-info">
              <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0' }}>
                <div style={{ flexShrink: 0 }}>{store.attributes.name}</div>
                <div>{renderStars(store.attributes.rating)}</div>
              </h2>
              <h3 style={{ textAlign: 'left' }}>Best-selling books</h3>
              <table>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Copies Sold</th>
                    <th>Author</th>
                  </tr>
                </thead>
                <tbody>
                  {getBooksForStore(store.id)
                    .map(book => getBookDetails(book.id, book.type)) 
                    .filter(bookDetails => bookDetails) 
                    .sort((a, b) => b.copiesSold - a.copiesSold) 
                    .slice(0, 2) 
                    .map((bookDetails, index) => (
                      <tr key={index}>
                        <td>{bookDetails.name}</td>
                        <td>{bookDetails.copiesSold}</td>
                        <td>{bookDetails.fullName || 'Unknown'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {getBooksForStore(store.id).length === 0 && <p>No data available</p>}
              <div className="store-details" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>
                  {new Date(store.attributes.establishmentDate).toLocaleDateString('en-GB')} - 
                  <a href={store.attributes.website} target="_blank" rel="noopener noreferrer"> {store.attributes.website}</a>
                </p>
                <span>
                  {countryFlags[includedData.find(country => country.id === store.relationships.countries.data.id)?.attributes.code] ? (
                    <img
                      src={countryFlags[includedData.find(country => country.id === store.relationships.countries.data.id)?.attributes.code]}
                      alt="Country Flag"
                      style={{ width: '50px', marginLeft: '5px' }}
                    />
                  ) : (
                    'N/A' 
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
