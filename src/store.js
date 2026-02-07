export const initialStore = () => {
  return {
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_contacts':
      return {
        ...store,
        contacts: action.payload
      }
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter((item) => item.id !== action.payload)
      }
    case 'add_contact':
        return {
            ...store,
            contacts: [...store.contacts, action.payload]
        }
    case 'update_contact':
        return {
            ...store,
            contacts: store.contacts.map((item) => 
                item.id === action.payload.id ? action.payload : item
            )
        }
    default:
      throw Error('Accion desconocida')
  }
}

// --- ACTIONS ---

const AGENDAS_URL = "https://playground.4geeks.com/contact/agendas";
const MY_USER = "carlos_avila"; 

export const loadContacts = async (dispatch) => {
    try {
        const response = await fetch(`${AGENDAS_URL}/${MY_USER}/contacts`);
        
        // Si el usuario no existe (404), lo creamos
        if (response.status === 404) {
            await createAgenda();
            return;
        }

        if (!response.ok) throw new Error("No se pudo cargar la agenda");
        
        const data = await response.json();
        dispatch({ type: "load_contacts", payload: data.contacts });
        
    } catch (error) {
        console.error("Error loading contacts:", error);
    }
}

// Función auxiliar para crear la agenda si no existe
const createAgenda = async () => {
    try {
        const response = await fetch(`${AGENDAS_URL}/${MY_USER}`, {
            method: "POST"
        });
        if (response.ok) {
            console.log("Agenda creada exitosamente");
        }
    } catch (error) {
        console.error("Error creando agenda:", error);
    }
}

export const createContact = async (dispatch, newContact) => {
    try {
        const response = await fetch(`${AGENDAS_URL}/${MY_USER}/contacts`, {
            method: "POST",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" }
        });
        
        if (!response.ok) throw new Error("No se pudo crear el contacto");
        
        const data = await response.json();
        // La API devuelve el contacto creado completo (con ID)
        dispatch({ type: "add_contact", payload: data });
        return true; 
    } catch (error) {
        console.error(error);
        return false;
    };
}

export const deleteContact = async (dispatch, id) => {
    try {
        const response = await fetch(`${AGENDAS_URL}/${MY_USER}/contacts/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("No se pudo eliminar el contacto");
        
        dispatch({ type: "delete_contact", payload: id });
    } catch (error) {
        console.error(error);
    }
}

export const updateContact = async (dispatch, id, contactData) => {
    try {
        const response = await fetch(`${AGENDAS_URL}/${MY_USER}/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify(contactData),
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("No se pudo actualizar el contacto");
        
        const data = await response.json();
        dispatch({ type: "update_contact", payload: data });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}