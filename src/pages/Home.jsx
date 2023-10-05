import React from 'react'
import TableComponent from '../components/TableComponent'
import { useQuery } from '@tanstack/react-query'
import ModalComponent from '../components/ModalComponent'

export default function Home({ supabaseClient }) {

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
				<TableComponent data={ data }/>
			):(
				<div className="h-[80vh] flex justify-center items-center">
					<span className="loading loading-bars loading-lg"></span>
				</div>
			)}
			<ModalComponent supabaseClient={ supabaseClient }/>
		</>		
	)
}
