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

export const loadContacts = async (dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/carlos_avila/contacts`);
        if (!response.ok) throw new Error("No se pudo cargar la agenda");
        const data = await response.json();
        
        dispatch({ type: "load_contacts", payload: data.contacts });
    } catch (error) {
        console.error(error);
    }
}

export const createContact = async (dispatch, newContact) => {
  try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/carlos_avila/contacts`, {
            method: "POST",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("No se pudo crear el contacto");
        
        const data = await response.json();
        dispatch({ type: "add_contact", payload: data });
        return true; 
    } catch (error) {
        console.error(error);
        return false;
    };
}

export const deleteContact = async (dispatch, id) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/carlos_avila/contacts/${id}`, {
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
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/carlos_avila/contacts/${id}`, {
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