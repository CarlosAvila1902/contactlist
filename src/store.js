export const initialStore=()=>{
  return{
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'load_contacts':
      return{
        ...store,
        contacts: action.payload
      }

    default: 
      throw Error('Accion desconocida')
  }    
}

export const createContact = async (newContact) => {
  try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/carlos_avila/contacts`, {
            method: "POST",
            body: JSON.stringify(newContact),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error("No se pudo crear el contacto");
        }
        
        return true; // Retornamos true si todo salió bien
        
    } catch (error) {
        console.error(error);
        return false;
    };
}
