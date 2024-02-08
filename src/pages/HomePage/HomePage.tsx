import { useState, useEffect } from 'react';

import { createCar, getUserCars, deleteCar, updateCar } from '../../ApiServices/CarService';
import { getUser } from '../../ApiServices/UserService';

import Navbar from '../../components/Navbar/Navbar';

import './HomePage.css';

const HomePage = () => {
  const [newMakeValue, setNewMakeValue] = useState('');
  const [newModelValue, setNewModelValue] = useState('');
  const [newYearValue, setNewYearValue] = useState('');

  const [editCarId, setEditCarId] = useState(null);
  const [currentMakeEditing, setCurrentMakeEditing] = useState('');
  const [currentModelEditing, setCurrentModelEditing] = useState('');
  const [currentYearEditing, setCurrentYearEditing] = useState('');

  const [userIsAdmin, setUserIsAdmin] = useState(0);

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const user = getUser();
    console.log(user)

    setUserIsAdmin(user.userIsAdmin);

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

  const handleEditCar = (car: any) => {
    setCurrentMakeEditing(car.make);
    setCurrentModelEditing(car.model);
    setCurrentYearEditing(car.year);
    setEditCarId(car.id);
  }

  const saveCarChanges = (car: any) => {
    updateCar({
      id: car.id,
      make: currentMakeEditing,
      model: currentModelEditing,
      year: currentYearEditing
    });

    setEditCarId(null);
    fetchCars();
  }

  const renderEditSaveCarButton = (car: any) => {
    if (car.id === editCarId) {
      return (
        <button onClick={() => saveCarChanges(car)}>Save</button>
      )
    } else {
      return (
        <button onClick={() => handleEditCar(car)}>Edit</button>
      )
    }
  }

  const renderCarsList = () => {
    const carsElements: any = [];

    cars.forEach((car: any, index: any) => {
      carsElements.push(
        <div className='car-list-item' key={`${index}${car.id}`}>

          <div className='car-list-item-labels'>
            <p>Make:</p>
            <p>Model:</p>
            <p>Year:</p>
          </div>

          {car.id === editCarId ? 
          <div className='car-list-item-inner-container'>
            <input 
              onChange={(e) => setCurrentMakeEditing(e.target.value)}className='car-list-item-edit' 
              defaultValue={car.make} />
            <input 
              onChange={(e) => setCurrentModelEditing(e.target.value)} className='car-list-item-edit' 
              defaultValue={car.model} />
            <input 
              onChange={(e) => setCurrentYearEditing(e.target.value)} className='car-list-item-edit' 
              defaultValue={car.year} />
          </div> : 
          <div className='car-list-item-inner-container'>
            <p className='car-list-item-field'>{car.make}</p>
            <p className='car-list-item-field'>{car.model}</p>
            <p className='car-list-item-field'>{car.year}</p>
          </div>}

          <button onClick={() => handleDeleteCar(car.id)}>Delete</button>

          {renderEditSaveCarButton(car)}
        </div>
      );
    });

    return carsElements;
  }

  return (
    <div>
      <Navbar />

      <div className='content-container'>
        {userIsAdmin ? <p>You are a admin!</p> : <></>}

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
