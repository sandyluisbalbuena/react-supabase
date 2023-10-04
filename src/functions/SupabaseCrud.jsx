import React from 'react'
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

const supabase = createClient(
	'https://jatxzfxogmmsunywewam.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdHh6ZnhvZ21tc3VueXdld2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MDgzMTgsImV4cCI6MjAxMTk4NDMxOH0.51R1YIjEVnP_J2Im_wjasF_NRxMSklo1XNXMvjBQVe4'
);


export default function SupabaseCrud() {

	const createData = async() => {
		const { data, error } = await supabase
		.from('sampleTable')
		.insert([
			{ name: 'Sandy'},
			// Add more rows as needed
		]);

		console.log(error)
	}

	useEffect(() => {
		retrieveData()
	}, [])
	

	const retrieveData = async() => {
		const { data, error } = await supabase
		.from('sampleTable')
		.select('*')

		console.log(data)
		// You can add filters and other query options here
	}

	const updateData = async() => {
		const { data, error } = await supabase
		.from('sampleTable')
		.update({ column1: 'new_value' })
		.eq('id', 1); // You can specify a filter condition
	}

	const  deleteData = async() => {
		const { data, error } = await supabase
		.from('sampleTable')
		.delete()
		.eq('id', 1); // You can specify a filter condition
	}

	return (
		<div></div>
	)
}
