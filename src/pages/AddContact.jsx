import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Importamos el hook global
import { createContact, updateContact } from "../store"; // Importamos las acciones

export const AddContact = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtenemos el ID de la URL si existe
    const { store, dispatch } = useGlobalReducer(); // Necesitamos el dispatch

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Si hay un ID, buscamos el contacto en el store para rellenar el formulario
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(c => c.id == id);
            if (currentContact) {
                setContact({
                    name: currentContact.name,
                    email: currentContact.email,
                    phone: currentContact.phone,
                    address: currentContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        let success = false;
        if (id) {
            // Si hay ID, actualizamos
            success = await updateContact(dispatch, id, contact);
        } else {
            // Si no, creamos
            success = await createContact(dispatch, contact);
        }
        
        if (success) {
            navigate("/");
        } else {
            alert("Error al guardar. Revisa la consola.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Editar Contacto" : "Agregar Nuevo Contacto"}</h1>
            
            <form className="container">
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input 
                        type="text" className="form-control" 
                        name="name" placeholder="Full Name" 
                        onChange={handleChange} value={contact.name} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" className="form-control" 
                        name="email" placeholder="Enter email" 
                        onChange={handleChange} value={contact.email} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                        type="text" className="form-control" 
                        name="phone" placeholder="Enter phone" 
                        onChange={handleChange} value={contact.phone} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                        type="text" className="form-control" 
                        name="address" placeholder="Enter address" 
                        onChange={handleChange} value={contact.address} 
                    />
                </div>
                
                <button type="button" className="btn btn-primary w-100" onClick={handleSave}>
                    Guardar
                </button>
            </form>

            <div className="mt-3">
                <Link to="/">o volver a la lista</Link>
            </div>
        </div>
    );
};