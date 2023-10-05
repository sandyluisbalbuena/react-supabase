import React from 'react'
import { useDataStore } from '../context/DataStoreContext'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function ModalComponent({ supabaseClient, isCreate }) {
	const { modalState, setModalState } = useDataStore()
	const [ inputName, setInputName ] = useState('')
	const [ birthday, setBirthday ] = useState('')

	const retrieveOneData = async () => {
		const { data, error } = await supabaseClient
			.from('sampleTable')
			.select('*')
			.eq('id', modalState) 
			.single();

		return data
	}

	const {data, isLoading, isFetching} = useQuery({queryKey:['retrieveOneData', modalState], queryFn:retrieveOneData, enabled: !!modalState&&!isCreate,})



		const createData = async() => {
			const { data, error } = await supabaseClient
			.from('sampleTable')
			.insert([
				{ name: inputName, birthday: birthday },
			]);
		}

	


	return (
		<dialog id="my_modal_2" className={`modal ${modalState?'modal-open':''}`}>

			<div className="modal-box">


				{!isLoading&&!isFetching?(
					<>
						<h3 className="font-bold text-lg">{ data.name }</h3>
						<p className="py-4">Birthday: { data.birthday }</p>
					</>
				):isFetching?(
					<div className='flex justify-center'>
						<span className="loading loading-bars loading-lg"></span>
					</div>
				):isCreate?(
					<>
						<input type="text" placeholder="Name" className="input input-bordered w-full my-2" onChange={ (e) => setInputName(e.target.value) }/>
						<input type="date" placeholder="" className="input input-bordered w-full my-2"  onChange={ (e) => setBirthday(e.target.value) }/>
						<div className='divider'></div>

						<button onClick={ createData } className='btn btn-primary w-full'>Create</button>
					</>

					
				):null}





			</div>



		
			<form method="dialog" className="modal-backdrop">
				<button onClick={ ()=>{setModalState(null)} }>close</button>
			</form>
		</dialog>
	)
}
