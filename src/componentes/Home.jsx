import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = React.useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('https://www.designdekko.com/uploads/project/1562934549_IMG20190711WA0009.jpg')" }}
    >
      <div className="flex-grow flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bienvenido a Aleluya</h1>
          <p className="text-xl text-white mb-8">Explora nuestras funcionalidades y más.</p>
          <Link 
            to="/login" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Comenzar
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {recipes.map((Recipe) => (
          <button
            key={Recipe._id}
            onClick={() => {/* Agrega aquí la lógica de clic si es necesario */}}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {Recipe.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {Recipe.category} 
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {Recipe.ingredients} 
            </p>
            <h5 className="font-normal text-gray-700 dark:text-gray-400">
              {Recipe.intructions}
            </h5>
            <small className="text-gray-500 dark:text-gray-400">
              Fecha de creación: {new Date(Recipe.fechaCreacion).toLocaleDateString()}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
