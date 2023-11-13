import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';

const DetalleProducto = () => {
  const [producto, setProducto] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://bazarapi-tn52.onrender.com/api/items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
        } else {
          console.error('Error al obtener los detalles del producto');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleCompra = () => {
    const didPurchase = window.confirm('¿Desea comprar este producto?');

    if (didPurchase) {
      alert('¡Gracias por elegir nuestro bazar! Regrese pronto.');
      navigate('/');
    } else {
      alert('La compra ha fallado.');
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    if (currentImageIndex < producto.images?.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

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
      if (data.length > 0) {
        navigate(`/resultados/${term}`);
      }
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  }, [navigate]);

  const handleSearch = () => {
    fetchSearchResults(searchInput);
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <div className="col-md-6 detalle">
          <div className="slider" style={{ position: 'relative' }}>
            <img src={producto.images?.[currentImageIndex]} alt={producto.title} className="img-fluid" />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className='btn btn-primary' style={{ position: 'absolute', left: 0 }} onClick={prevImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
              </button>
              <button className='btn btn-primary' style={{ position: 'absolute', right: 0 }} onClick={nextImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </button>
            </div>
          </div> <br /> <br />
        </div>
        <div className="col-md-6 detalle">
          <h1 className='titulo'>{producto.title}</h1>
          <h4 className='text-primary'>{producto.category}</h4>
          <h3 className=''>Marca: <b className='text-warning'>{producto.brand}</b></h3>
          <p>{producto.description}</p>
          <h3>Disponibles: <b>{producto.stock}</b></h3>
          <h2><b>${producto.price ? producto.price.toLocaleString('es-MX') : ''}</b></h2>
    <h2 className='text-danger'><b>-{producto.discountPercentage ? producto.discountPercentage.toLocaleString('es-MX') : ''}</b></h2>
          <div className="rating">
            <h3>{getRatingStars(producto.rating)}</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={handleCompra}>
              Comprar
            </button>
          </div> <br />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
