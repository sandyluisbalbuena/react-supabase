import React from 'react'
import { useDataStore } from '../context/DataStoreContext'
import { useQuery } from '@tanstack/react-query';

export default function ModalComponent({ supabaseClient }) {
	const { modalState, setModalState } = useDataStore()

	const retrieveOneData = async () => {
		const { data, error } = await supabaseClient
			.from('sampleTable')
			.select('*')
			.eq('id', modalState) // Replace 'id' with the actual name of your ID column
			.single(); // Use .single() to retrieve only one row

		return data
	}

	const {data, isLoading} = useQuery({queryKey:['retrieveOneData', modalState], queryFn:retrieveOneData, enabled: !!modalState,})

	return (
		<dialog id="my_modal_2" className={`modal ${modalState?'modal-open':''}`}>
				<div className="modal-box">
					{!isLoading?(
						<>
							<h3 className="font-bold text-lg">{ data.name }</h3>
							<p className="py-4">{ data.birthday }</p>
						</>
					):null}
				</div>
		
			<form method="dialog" className="modal-backdrop">
				<button onClick={ ()=>{setModalState(null)} }>close</button>
			</form>
		</dialog>
	)
}
