import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";

const Productos = () => {
  const [Recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await apiClient.get("/recipes");
        setRecipes(response.data);
      } catch (err) {
        setError("Error al cargar los productos");
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="p-8 bg-gray-200"> {/* Se agrega el fondo gris aquí */}
  <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4 text-center">Lista de Productos</h1>
  </div>
  {error && <p className="text-red-500">{error}</p>}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Recipes.map((Recipe) => (
      <div
        key={Recipe.id}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold">{Recipe.nombre}</h2>
        <p className="text-gray-600">Precio: ${Recipe.precio}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default Productos;