import React, {useEffect} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer();
  const myUserSlug = 'carlos_avila';
  useEffect(()=>{
	fetch(`https://playground.4geeks.com/contact/agendas/${myUserSlug}/contacts`)
		.then(response=>{
			if (!response.ok) throw new Error("no se pudo cargar la agenda");
		return response.json();
		})
		.then(data=>{
			dispatch({
				type: "load_contacts",
				payload: data.contacts
			})
		})
		.catch(error => console.error(error));
  },[])
  return (
	<div className="container mt-5">
		<h1>contactos de {myUserSlug}</h1>

		<ul className="list-group">
			{store.contacts.map((contact,index)=>(
				<li key={index} className="list-group-index">
					{contact.name} - {contact.phone}
				</li>
			))}
		</ul>
		{store.contact.length === 0 && <p>no hay contactos en la agenda</p> }
	</div>
  )
};