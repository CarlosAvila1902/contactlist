// Archivo: src/components/ContactForm.jsx
import React from "react";
import { Link } from "react-router-dom";

const ContactForm = ({ contact, handleChange, handleSubmit, title, buttonLabel }) => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">{title}</h1>
            
            {/* Usamos onSubmit para prevenir la recarga estándar y ejecutar nuestra función */}
            <form className="container" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input 
                        type="text" className="form-control" 
                        name="name" placeholder="Full Name" 
                        onChange={handleChange} value={contact.name} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" className="form-control" 
                        name="email" placeholder="Enter email" 
                        onChange={handleChange} value={contact.email} 
                        required
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
                
                <button type="submit" className="btn btn-primary w-100">
                    {buttonLabel || "Guardar"}
                </button>
            </form>

            <div className="mt-3">
                <Link to="/">o volver a la lista</Link>
            </div>
        </div>
    );
};

export default ContactForm;