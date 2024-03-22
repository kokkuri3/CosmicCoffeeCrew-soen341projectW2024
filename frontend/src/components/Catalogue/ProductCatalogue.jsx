import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCatalogue.css';

const ProductCatalogue = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('/api/vehicles');
                if (response.ok) {
                    const json = await response.json();
                    setVehicles(json);
                } else {
                    throw new Error('Failed to fetch vehicles');
                }
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);
     //navigate(`/vehicle/${vehicleId}`);

     const viewDetails = (vehicleId) => {
        navigate(`/vehicles/${vehicleId}`);
        //navigate(`/vehicle/${vehicle._id}`, { state: { vehicle } });
    };
    
    return (
        <div className="catalogue-container">
            <h1 className="catalogue-title">Catalogue</h1>
            <div className="catalogue-grid">
                {vehicles.map((vehicle) => (
                    <div key={vehicle._id} className="vehicle-card" data-aos="fade-up" data-aos-delay={vehicle.aosDelay}>
                        <h2 className="vehicle-make">{vehicle.make}</h2>
                        <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="vehicle-image" />
                        <div className="vehicle-info">
                            <h3 className="vehicle-model">{`${vehicle.model} (${vehicle.year})`}</h3>
                            <p className="vehicle-type">{vehicle.type}</p>
                            <p className="vehicle-mileage">{`${vehicle.mileage} km`}</p>
                            <p className="vehicle-location">{vehicle.location}</p>
                            <p className="vehicle-price">{`$${vehicle.pricePerDay} / day`}</p>
                        </div>
                        <button className="view-details-button" onClick={() => viewDetails(vehicle._id)}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalogue;