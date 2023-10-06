import React from 'react'
import { useDataStore } from '../context/DataStoreContext'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ModalComponent({ supabaseClient, isCreate }) {
	const { modalState, setModalState } = useDataStore()
	const [ inputName, setInputName ] = useState('')
	const [ birthday, setBirthday ] = useState('')
	const [ update, setUpdate ] = useState(false)

	const retrieveOneData = async () => {
		const { data, error } = await supabaseClient
			.from('sampleTable')
			.select('*')
			.eq('id', modalState) 
			.single();

		return data
	}

	const {data, isLoading, isFetching} = useQuery({queryKey:['retrieveOneData', modalState], queryFn:retrieveOneData, enabled: !!modalState&&!isCreate,})

	useEffect(() => {
		!isLoading?setInputName(data.name):null
		!isLoading?setBirthday(data.birthday):null
	}, [data,isLoading])
	

	const createData = async() => {
		console.log('wew')
		const { data, error } = await supabaseClient
		.from('sampleTable')
		.insert([
			{ name: inputName, birthday: birthday },
		]);
		setModalState(false)
		error==null?toast.success('Data created successfully!'):toast.error('Something went wrong!')
	}

	const mutateCreate = useMutation({mutationFn: async() => {
		const { data, error } = await supabaseClient
		.from('sampleTable')
		.insert([
			{ name: inputName, birthday: birthday },
		]);
		setModalState(false)
		error==null?toast.success('Data created successfully!'):toast.error('Something went wrong!')
	},onSuccess: data => {
		queryClient.setQueryData(['retrieveData'], data)
	}})

	const updateData = async() => {
		const { data, error } = await supabaseClient
		.from('sampleTable')
		.update({ name: inputName, birthday: birthday })
		.eq('id', modalState); // You can specify a filter condition
		setModalState(false)
		error==null?toast.success('Data updated successfully!'):toast.error('Something went wrong!')
	}

	const deleteData = async() => {
		const { data, error } = await supabaseClient
		.from('sampleTable')
		.delete()
		.eq('id', modalState);
		setModalState(false)
		error==null?toast.success('Data deleted successfully!'):toast.error('Something went wrong!')
	}

	return (
		<dialog id="my_modal_2" className={`modal ${modalState?'modal-open':''}`}>
			<div className="modal-box">
				{!isLoading&&!isFetching?(
					<>
						<div className='flex justify-end mb-5'>
							<button onClick={()=>setUpdate(true)} className="btn btn-success btn-sm mx-1">
								<AiFillEdit />
							</button>
							<button onClick={()=>deleteData()} className="btn btn-error btn-sm mx-1">
								<BsFillTrashFill />
							</button>
						</div>
						
						<input type="text" placeholder="Name" value={ inputName } className="input input-bordered w-full my-2" onChange={ (e) => setInputName(e.target.value) } required disabled={ !update }/>
						<input type="date" value={ birthday } className="input input-bordered w-full my-2"  onChange={ (e) => setBirthday(e.target.value) } required disabled={ !update }/>
						{update?(
							<button onClick={ updateData } className='btn btn-success w-full'>Update</button>
						):null}
					</>
				):isFetching?(
					<div className='flex justify-center'>
						<span className="loading loading-bars loading-lg"></span>
					</div>
				):isCreate?(
					<>
						<input type="text" placeholder="Name" className="input input-bordered w-full my-2" onChange={ (e) => setInputName(e.target.value) }/>
						<input type="date" className="input input-bordered w-full my-2"  onChange={ (e) => setBirthday(e.target.value) }/>
						<button onClick={ ()=>mutateCreate.mutate() } className='btn btn-primary w-full'>Create</button>
					</>
				):null} 
			</div>

			<form method="dialog" className="modal-backdrop">
				<button onClick={ ()=>{
					setModalState(null)
					setUpdate(false)} 
				}>
					close
				</button>
			</form>

		</dialog>
	)
}
