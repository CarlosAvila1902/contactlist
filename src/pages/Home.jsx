import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { loadContacts, deleteContact } from "../store"; 

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    loadContacts(dispatch); 
  }, []);

  const handleDelete = (id) => {
      deleteContact(dispatch, id);
  }

  return (
    <div className="container mt-5">
      <h1>Contactos de carlos_avila</h1>
      <Link to="/add-contact">
        <button className="btn btn-success mb-3">Agregar nuevo contacto</button>
      </Link>

      <ul className="list-group">
        {store.contacts.map((contact) => (
          <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h5 className="mb-1">{contact.name}</h5>
                <p className="mb-1"><i className="fas fa-phone"></i> {contact.phone}</p>
                <small className="text-muted"><i className="fas fa-envelope"></i> {contact.email}</small>
                <br />
                <small className="text-muted"><i className="fas fa-map-marker-alt"></i> {contact.address}</small>
            </div>
            <div>
                {/* Botón Editar */}
                <Link to={`/edit-contact/${contact.id}`} className="btn btn-warning btn-sm me-2">
                    <i className="fas fa-pencil-alt"></i> Editar
                </Link>
                {/* Botón Eliminar */}
                <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(contact.id)}
                >
                    <i className="fas fa-trash-alt"></i> Borrar
                </button>
            </div>
          </li>
        ))}
      </ul>
      {store.contacts.length === 0 && <p className="text-center mt-3">No hay contactos en la agenda</p>}
    </div>
  );
};
