import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function File({ supabaseClient }) {

	const [ image, setImage ] = useState(null)
	const [imageList, setImageList] = useState([]);
	const [ imageUrl, setImageUrl ] = useState('')

	const uploadFile = async() => {
		if (image) {

			console.log(image)

			const { data, error } = await supabaseClient.storage
				.from('images')
				.upload(image.name, image)
		
			if (error) {
				toast.error(error)
			} else {
				toast.success('File uploaded successfully')
			}

		}
	}

	const fetchImageURL = async () => {
		const { data, error } = await supabaseClient.storage
			.from('images')
			.list()
	
		if (error) {
			console.error('Error fetching image URL:', error.message)
		} else {
			const filteredImages = data.filter((file) => file.name !== '.emptyFolderPlaceholder');

			const images = filteredImages.map((file) => ({
				name: file.name,
				url: supabaseClient.storage.from('images').getPublicUrl(`${file.name}`) // Construct the URL
			}));
			setImageList(images)
			console.log(images)
		}
	};

	return (
		<div className='mx-3 lg:mx-auto'>
			<input onChange={ (e)=>setImage( e.target.files[0]) } type="file" className="file-input file-input-bordered w-full my-2" />
			<button className='btn btn-success w-full my-2' onClick={ uploadFile }>Upload</button>
			<button className='btn btn-primary w-full my-2' onClick={ fetchImageURL }>Fetch</button>

			{imageList?(
				<div className='grid grid-cols-2 gap-2'>
					{imageList.map((image, index) => (
						<div key={index} className='object-contain mask-square'>
							<img className='h-full rounded-md' src={image.url.data.publicUrl} alt={`Image ${index}`} />
						</div>
					))}
				</div>
			):null}
			
		</div>
	)
}
