import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 shadow-md">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-100 transition duration-300">
          Aleluya
        </Link>
        <div className="flex items-center space-x-4">
          {location.pathname === "/productos" && usuario ? (
            <>
              <div className="flex items-center space-x-2 bg-blue-700 py-2 px-4 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-blue-200" />
                <span className="text-blue-100">{usuario.nombre}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition duration-300"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

