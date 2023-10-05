import React from 'react'
import TableComponent from '../components/TableComponent'
import { useQuery } from '@tanstack/react-query'
import ModalComponent from '../components/ModalComponent'
import { useDataStore } from '../context/DataStoreContext'
import { useState } from 'react'

export default function Home({ supabaseClient }) {

	const { setModalState } = useDataStore()
	const [ isCreate, setIsCreate ] = useState(false)

	const retrieveData = async() => {
		const { data, error } = await supabaseClient
		.from('sampleTable')
		.select('*')

		return data
	}
	
	const {data,isLoading} = useQuery({queryKey:['retrieveData'], queryFn:retrieveData, refetchInterval:60000})

	return (
		<>
			{!isLoading?(
				<>
					<div className='flex justify-between mt-10'>
						<p>Users</p>
						<button 
							onClick={ ()=>{
								setModalState(true)
								setIsCreate(true)
							} } 
							className='btn btn-primary btn-sm'>
							Create new user
						</button>
					</div>
					<TableComponent data={ data }/>
				</>
			):(
				<div className="h-[80vh] flex justify-center items-center">
					<span className="loading loading-bars loading-lg"></span>
				</div>
			)}
			<ModalComponent supabaseClient={ supabaseClient } isCreate={ isCreate }/>
		</>		
	)
}
