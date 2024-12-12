import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar usuario al cambiar de ruta
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="bg-blue-300 text-gray-800 py-6">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Aleluya</h1>
        <div className="flex space-x-4 items-center">
          {location.pathname === "/productos" && usuario ? (
            // Mostrar solo en /productos
            <>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-800" />
                <span className="text-gray-600">{usuario.nombre}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-300 ml-4"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-800">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;