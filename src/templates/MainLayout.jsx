import React from 'react'
import { useDataStore } from '../context/DataStoreContext'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'


export default function MainLayout() {
	const { theme } = useDataStore()


	return (
		<main data-theme={ theme } className='bg-base-100 flex flex-col min-h-screen overflow-x-hidden'>
			<Navbar />
			<Toaster
				position="top-center"
				reverseOrder={false}
			/>
			<div className='flex-1 mx-auto mt-20 mb-5 select-none'>
				<Outlet />
			</div>
			<Footer />
		</main>
	)
}
