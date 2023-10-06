import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function File({ supabaseClient }) {

	const [ image, setImage ] = useState(null)
	const [ imageUrl, setImageUrl ] = useState('')

	const uploadFile = async() => {
		if (image) {

			const { data, error } = await supabaseClient.storage
			.from('images') // Replace with your bucket name
			.upload('sampleFile', image); // Pass the headers with the JWT token

		
			if (error) {
				toast.error(error)
				console.error('Error uploading file:', error);
			} else {
				toast.success('File uploaded successfully')
				console.log('File uploaded successfully:', data);
			}
		}
	}

	const fetchImageURL = async () => {
		const imageFileName = 'sampleFile'; // Replace with the actual image file name
		const { data, error } = await supabaseClient.storage
		.from('images')
		.getPublicUrl(`${imageFileName}`);
	
		if (error) {
			console.error('Error fetching image URL:', error.message);
		} else {
			setImageUrl(data.publicUrl)
			console.log('Image URL:', data.publicUrl);
		}
		
	};

	return (
		<div className='mx-3 lg:mx-0'>
			<input onChange={ (e)=>setImage( e.target.files[0]) } type="file" className="file-input file-input-bordered w-full my-2" />
			<button className='btn btn-success w-full my-2' onClick={ uploadFile }>Upload</button>
			<button className='btn btn-primary w-full my-2' onClick={ fetchImageURL }>Fetch</button>

			{!imageUrl==''?(
				<ul>
					<li>
						<img src={ imageUrl } alt="" />
					</li>
				</ul>
			):null}
			
		</div>
	)
}
