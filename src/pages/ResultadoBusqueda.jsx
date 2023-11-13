import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ResultadoBusqueda = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchTerm: searchParam } = useParams();
  const navigate = useNavigate();

  const fetchSearchResults = useCallback(async (term) => {
    try {
      const response = await fetch(
        `https://bazarapi-tn52.onrender.com/api/items/search?q=${term}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-requested-with': 'text/plain',
          },
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    if (searchParam) {
      setSearchTerm(searchParam);
      fetchSearchResults(searchParam);
    }
  }, [fetchSearchResults, searchParam]);

  const getRatingStars = (rating) => {
    const starArray = Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < Math.floor(rating);
      const color = isFilled ? 'gold' : 'lightgray';

      return (
        <span key={index} style={{ color }}>
          {isFilled ? '★' : '☆'}
        </span>
      );
    });

    return <div>{starArray}</div>;
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      fetchSearchResults(searchTerm);
    }
  };

  const handlePush = (itemId) => {
    if (searchTerm.trim() !== '') {
      navigate(`/detalle/${itemId}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-warning mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-bag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
          </svg>
        </Link>
        <h1>Bazar Online</h1>
      </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <h3>Resultados de la búsqueda de {searchTerm}: <b className='text-danger'>{searchResults.length}</b></h3>
        {searchResults.length > 0 ? (
          <div className="row">
            {searchResults.map((item) => (
              <button key={item.id} onClick={() => handlePush(item.id)}>
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.thumbnail} alt={item.title} className="img-fluid" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h1 className="card-title">{item.title}</h1>
                      <h3 className="card-text categoria text-primary">{item.category}</h3>
                      <p className="card-text descripcion text-justify">{item.description}</p>
                      <h2 className="card-text"><b>${item.price.toLocaleString('es-MX')}</b></h2>
                      <div className="rating">
                        <h3>{getRatingStars(item.rating)}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </button>
            ))}
          </div>
        ) : (
          <h1 className='text-danger'>No se encontraron resultados.</h1>
        )}
      </div>
    </div>
  );
};

export default ResultadoBusqueda;
