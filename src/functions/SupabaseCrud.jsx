import React from 'react'
import { useEffect } from 'react';


export default function SupabaseCrud({ client }) {

	const createData = async() => {
		const { data, error } = await client
		.from('sampleTable')
		.insert([
			{ name: 'Roy', birthday: '1996-07-12' },
			// Add more rows as needed
		]);

		console.log(error)
	}

	useEffect(() => {
		retrieveData()
	}, [])
	

	const retrieveData = async() => {
		const { data, error } = await client
		.from('sampleTable')
		.select('*')

		console.log(data)
		// You can add filters and other query options here
	}

	const updateData = async() => {
		const { data, error } = await client
		.from('sampleTable')
		.update({ column1: 'new_value' })
		.eq('id', 1); // You can specify a filter condition
	}

	const  deleteData = async() => {
		const { data, error } = await client
		.from('sampleTable')
		.delete()
		.eq('id', 1); // You can specify a filter condition
	}

	return (
		<div></div>
	)
}
