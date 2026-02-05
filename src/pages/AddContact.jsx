import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const AddContact = () => {
    const {dispatch}=useGlobalReducer();
    const [contact, setContact]=useState({
        full_name:"",
        email:"",
        phone:"",
        addres:"",
        phone:""
    });

    const handleChange = (e) => {
        setContact({...contact,[e.target.name]: e.target.value});
    };

    const handleSave = () => {
        console.log(`guardando contacto`, contact)
    };
    
    return (
        <div className="container mt-5">
            <h1 className="text-center">Agregar nuevo contacto</h1>
            
            <form className="container">
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" name="full_name" placeholder="Full Name" onChange={handleChange} value={contact.full_name} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} value={contact.email} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="phone" placeholder="Enter phone" onChange={handleChange} value={contact.phone} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="address" placeholder="Enter address" onChange={handleChange} value={contact.address} />
                </div>
                
                <button type="button" className="btn btn-primary w-100" onClick={handleSave}>
                    Guardar
                </button>
            </form>

            <div className="mt-3">
                <Link to="/">o volver a la lista</Link>
            </div>
        </div>
    )
}