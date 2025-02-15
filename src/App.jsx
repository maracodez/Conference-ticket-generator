//import { useState } from 'react'
import '../src/styles/index.css'
import Ticketform from './component/Ticketform';
import Ticketselection from './component/ticketselection';
import { Readyticket } from './component/readyticket';
import { Route, Routes } from 'react-router-dom';
//import { Router } from 'react-router-dom';

export default function App() {
	return (
	
		<Routes>
			<Route path='/' element={ <Ticketselection/> }/>
			<Route  path='/Ticketform' element={ <Ticketform/> }/>
			<Route  path='/readyticket' element={ <Readyticket/> }/>
		</Routes>
	)
}

