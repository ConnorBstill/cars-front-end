import { useState, useEffect } from 'react';

import { createCar, getUserCars, deleteCar } from '../../ApiServices/CarService';

import Navbar from '../../components/Navbar/Navbar';

import './HomePage.css';

const HomePage = () => {
  const [newMakeValue, setNewMakeValue] = useState('');
  const [newModelValue, setNewModelValue] = useState('');
  const [newYearValue, setNewYearValue] = useState('');

  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const fetchedCars = await getUserCars();

    setCars(fetchedCars.cars);
  }
  
  const handleCreateCar = async () => {
    await createCar({ 
      newMakeValue,
      newModelValue,
      newYearValue
    });

    fetchCars();
  }

  const handleDeleteCar = async (carId: any) => {
    await deleteCar(carId);

    fetchCars();
  }

  const renderCarsList = () => {
    const carsElements: any = [];

    cars.forEach((car: any, index: any) => {
      carsElements.push(
        <div className='car-list-item' key={`${index}${car.id}`}>
          <p className='car-list-item-field'>{car.make}</p>
          <p className='car-list-item-field'>{car.model}</p>
          <p className='car-list-item-field'>{car.year}</p>

          <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
        </div>
      );
    });

    return carsElements;
  }

  return (
    <div>
      <Navbar />

      <div className='content-container'>
        <div>
          <label htmlFor='new-car-make-input'>Make:</label>
          <input 
            onChange={(event: any) => setNewMakeValue(event.target.value)} id='new-car-make-input' 
            type='text' />
        </div>

        <div>
          <label htmlFor='new-car-model-input'>Model:</label>
          <input 
            onChange={(event: any) => setNewModelValue(event.target.value)} id='new-car-model-input'
            type='text' />
        </div>

        <div>
          <label htmlFor='new-car-year-input'>Year:</label>
          <input 
            onChange={(event: any) => setNewYearValue(event.target.value)} id='new-car-year-input' 
              type='text' />
        </div>

        <button onClick={handleCreateCar}>Add Car</button>

        {renderCarsList()}
      </div>
    </div>
  )
}

export default HomePage;
