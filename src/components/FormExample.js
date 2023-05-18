import React, { useState } from 'react';
import img from '../assets/Graphic 2.png';
import marque from '../assets/marque.png';
import '../styles/Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

function Form() {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        plaque: '',
        year: '',
        category: '',
        dateAdded: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.brand === ''|| formData.model=== ''|| formData.category==='' || formData.year === null || formData.dateAdded ==='' || formData.plaque==='') {
            return;
        }
        setVehicles((prevVehicles) => [...prevVehicles, { ...formData }]);
        setFormData({
            brand: '',
            model: '',
            plaque: '',
            year: '',
            category: '',
            dateAdded: '',
        });
    };

    const handleDelete = (index) => {
        setVehicles((prevVehicles) => {
            const updatedVehicles = [...prevVehicles];
            updatedVehicles.splice(index, 1);
            return updatedVehicles;
        });
    };

    const handleEdit = (index) => {
        const vehicle = vehicles[index];
        setFormData({ ...vehicle });
        handleDelete(index);
    };


    return (
        <>
            <h1 className="text-4xl font-bold text-center text-gray-800 text">
                WELCOME TO MY AUTO PARK 🚘
            </h1>
            <div className="flex justify-center items-center">
                <img
                    src={marque}
                    alt="fond1"
                    className="w-auto h-auto font2 mx-auto flex ml-auto"
                />
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <img src={img} alt="fond" className="w-auto h-auto font1 flex ml-auto" />
                </div>
                <div className="w-full md:w-1/3 form flex items-center justify-center">
                    <form className="max-w-screen-lg" onSubmit={handleSubmit}>
                        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                                <div className="relative px-4 py-10 bg-white mx-8 w-full md:mx-0 shadow rounded-3xl sm:p-10">
                                    <div className="max-w-md mx-auto">
                                        <div className="flex items-center space-x-5">
                                            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                                                <FontAwesomeIcon icon={faCar} />
                                            </div>
                                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                                <h2 className="leading-relaxed">AJOUTER UN NOUVEAU VEHICULE</h2>
                                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                                    Entrez les caractéristiques du véhicule et ajouter.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                                <div className="flex flex-col">
                                                    <label className="leading-loose">Marque</label>
                                                    <input
                                                        type="text"
                                                        name="brand"
                                                        id="brandInput"
                                                        value={formData.brand}
                                                        onChange={handleChange}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="Ex: Ferrari"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="leading-loose">Modèle</label>
                                                    <input
                                                        type="text"
                                                        name="model"
                                                        id="modelInput"
                                                        value={formData.model}
                                                        onChange={handleChange}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="Ex: California"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="leading-loose">Plaque</label>
                                                    <input
                                                        type="text"
                                                        name="plaque"
                                                        id="plaqueInput"
                                                        value={formData.plaque}
                                                        onChange={handleChange}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="Ex: 23E44I"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="leading-loose">Année</label>
                                                    <input
                                                        type="number"
                                                        name="year"
                                                        id="yearInput"
                                                        value={formData.year}
                                                        onChange={handleChange}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="Ex: 2024"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="leading-loose">Catégorie</label>
                                                    <input
                                                        type="text"
                                                        name="category"
                                                        id="categoryInput"
                                                        value={formData.category}
                                                        onChange={handleChange}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="Ex: Sport"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex flex-col">
                                                        <label className="leading-loose">Date d'ajout</label>
                                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                                            <input
                                                                type="date"
                                                                name="dateAdded"
                                                                id="dateAddedInput"
                                                                value={formData.dateAdded}
                                                                onChange={handleChange}
                                                                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                                placeholder="25/02/2020"
                                                            />
                                                            <div className="absolute left-3 top-2">
                                                                <svg
                                                                    className="w-6 h-6"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4 flex items-center space-x-4">
                                                <button
                                                   // onClick={handleAdd}
                                                    type="submit"
                                                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 roundedflex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                                                >
                                                    Ajouter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            {/* Affichage des véhicules ajoutés */}
            <div>
                <h2 className="text-4xl font-semibold text-center text-gray-800 text liste">
                    Liste de vos voitures
                </h2>
                { vehicles && vehicles.length? '' : <h2 className="text-2xl font-normal text-center text-gray-600 text liste2">
                    Aucune voiture pour l'instant 😕!!
                </h2> }
                {vehicles.map((vehicle, index) => (
                    <div key={index} className="my-20 bg-blue-100 shadow rounded-2xl justify-center flex flex-col  px-4 py-10 card">
                        <span className="Number font-bold "> Voiture N°{index +1}</span>
                        <h3 className="text-lg font-bold mb-2">Marque: <span className="text-xl font-semibold text-gray-600">{vehicle.brand}</span></h3>
                        <h3 className="text-lg font-bold mb-2">Modèle: <span className="text-xl font-semibold text-gray-600">{vehicle.model}</span></h3>
                        <h3 className="text-lg font-bold mb-2">Plaque: <span className="text-xl font-semibold text-gray-600">{vehicle.plaque}</span></h3>
                        <h3 className="text-lg font-bold mb-2">Année: <span className="text-xl font-semibold text-gray-600">{vehicle.year}</span></h3>
                        <h3 className="text-lg font-bold mb-2">Catégorie: <span className="text-xl font-semibold text-gray-600">{vehicle.category}</span></h3>
                        <h3 className="text-lg font-bold mb-2">Date d'ajout: <span className="text-xl font-semibold text-gray-600">{vehicle.dateAdded}</span></h3>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleEdit(index)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}

export default Form;
