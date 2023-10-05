import React from 'react'
import TableComponent from '../components/TableComponent'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

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
		</>		
	)
}
