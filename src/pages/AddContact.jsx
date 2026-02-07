import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { createContact, updateContact, loadContacts } from "../store"; // Asegúrate de exportar loadContacts en store.js
import ContactForm from "../components/ContactForm"; // Importamos el componente visual

export const AddContact = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const { store, dispatch } = useGlobalReducer();

    // Estado local solo para el formulario
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // EFECTO 1: Cargar contactos si refresco la página y el store está vacío
    useEffect(() => {
        if (id && store.contacts.length === 0) {
            loadContacts(dispatch);
        }
    }, [id, store.contacts.length, dispatch]);

    // EFECTO 2: Rellenar el formulario cuando tengamos los datos
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            // Usamos parseInt(id) porque useParams devuelve string y a veces los IDs son números
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
            success = await updateContact(dispatch, id, contact);
        } else {
            success = await createContact(dispatch, contact);
        }
        
        if (success) {
            navigate("/");
        } else {
            alert("Error al guardar. Revisa la consola.");
        }
    };

    // Renderizado limpio: Delegamos la visualización al componente ContactForm
    return (
        <ContactForm 
            contact={contact}
            handleChange={handleChange}
            handleSubmit={handleSave}
            title={id ? "Editar Contacto" : "Agregar Nuevo Contacto"}
            buttonLabel={id ? "Actualizar" : "Guardar"}
        />
    );
};