import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { createContact } from "../store"; // Importamos la acción nueva

export const AddContact = () => {
    const navigate = useNavigate(); // Esto sirve para cambiar de página programáticamente
    
    // Corregí 'addres' y cambié 'full_name' por 'name' para la API
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        console.log("Enviando:", contact);
        
        // Llamamos a la función del store
        const success = await createContact(contact);
        
        if (success) {
            // Si se guardó bien, volvemos a la lista (Home)
            navigate("/");
        } else {
            alert("Error al guardar. Revisa la consola.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Agregar nuevo contacto</h1>
            
            <form className="container">
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    {/* Cambié el name="full_name" por name="name" */}
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
                    {/* Asegúrate que el name sea "address" */}
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