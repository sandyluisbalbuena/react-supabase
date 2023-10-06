import React from 'react'
import { useState } from 'react';

export default function File({ supabaseClient }) {

	const [ image, setImage ] = useState(null)

	const uploadFile = async() => {
		if (image) {
			// const jwtToken = 'rJyqB7Ngziis0+lAVBcjmTMux8rJpJQ+2UIfKlAYqaXShH9n61zFBt+G9PEA6tAn0a7zS74TqaMZ87L9bh/KnQ=='; // Replace with your actual JWT token
			// const headers = {
			// Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the 'Authorization' header
			// };

			const { data, error } = await supabaseClient.storage
			.from('images') // Replace with your bucket name
			.upload('sampleFile', image); // Pass the headers with the JWT token

		
			if (error) {
				console.error('Error uploading file:', error);
			} else {
				console.log('File uploaded successfully:', data);
			}
		}
	}

	return (
		<div className='mx-3 lg:mx-0'>
			<input onChange={ (e)=>setImage( e.target.files[0]) } type="file" className="file-input file-input-bordered w-full my-2" />
			<button className='btn btn-success w-full' onClick={ uploadFile }>Upload</button>
		</div>
	)
}
