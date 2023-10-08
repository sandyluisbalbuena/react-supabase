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
				id: file.id,
				name: file.name,
				url: supabaseClient.storage.from('images').getPublicUrl(`${file.name}`) // Construct the URL
			}));
			setImageList(images)
			console.log(images)
		}
	}

	const deleteImageById = async (name) => {
		const { error, data } = await supabaseClient.storage
			.from('images')
			.remove(name)

		if (error) {
			console.error('Error deleting image by ID:', error.message);
		} else {
			console.log('Image deleted successfully by ID:', name);
			setImageList((prevImages) => prevImages.filter((image) => image.name !== name));
		}
		
	};

	return (
		<div className='mx-3 lg:mx-auto'> 
			<input onChange={ (e)=>setImage( e.target.files[0]) } type="file" className="file-input file-input-bordered w-full my-2" />
			<div className='grid grid-cols-2 gap-2 mb-5'>
				<button className='btn btn-success' onClick={ uploadFile }>Upload</button>
				<button className='btn btn-primary' onClick={ fetchImageURL }>Fetch</button>
			</div>
			<div className='divider'></div>



			
			{imageList?(
				<div className='grid grid-cols-2 gap-2'>
					{imageList.map((image) => (
						<div key={ image.id } className='object-contain'>
							<img className='h-full rounded-md' src={image.url.data.publicUrl} alt={`Image ${image.id}`} />
							<button onClick={ ()=>deleteImageById(image.name) } className='btn btn-error btn-xs relative bottom-8 mx-1'>
								delete
							</button>
						</div>
					))}
				</div>
			):null}
			
		</div>
	)
}
