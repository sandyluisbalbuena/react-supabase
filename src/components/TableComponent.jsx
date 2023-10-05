import React from 'react'
import { useDataStore } from '../context/DataStoreContext';
import { BsFillTrashFill } from 'react-icons/bs'

export default function TableComponent({ data, supabaseClient }) {

	const { setModalState } = useDataStore()

	const calculateAge = (birthdate) => {
		const birthdateArray = birthdate.split('-'); // Split the date string into an array
		const birthYear = parseInt(birthdateArray[0]);
		const birthMonth = parseInt(birthdateArray[1]);
		const birthDay = parseInt(birthdateArray[2]);
	
		const currentDate = new Date(); // Get the current date
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
		const currentDay = currentDate.getDate();
	
		let age = currentYear - birthYear;
	
		// Check if the birthday for this year has already occurred
		if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
		age--; // Subtract 1 from the age if the birthday hasn't occurred yet this year
		}
	
		return age;
	}

	const deleteData = async(id) => {
		const { data, error } = await supabaseClient
		.from('sampleTable')
		.delete()
		.eq('id', id); // You can specify a filter condition
	}


	return (
		<div className="overflow-x-auto w-full mt-5">
			<table className="table">
				<thead>
					<tr>
						{/* <th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th> */}
						<th>Name</th>
						<th>Age</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((row)=>(
						<tr key={ row.id }>
							{/* <th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th> */}
							<td>
								<div className="flex items-center space-x-3">
									<div>
										<div className="font-bold">{ row.name }</div>
									</div>
								</div>
							</td>
							<td>
								<div className="flex items-center space-x-3">
									<div>
										<div className="text-sm opacity-50">{ calculateAge(row.birthday) }</div>
									</div>
								</div>
							</td>
							<th>
								<button onClick={()=>setModalState(row.id)} className="btn btn-ghost btn-xs">details</button>
								<button onClick={()=>deleteData(row.id)} className="btn btn-ghost btn-xs">
									<BsFillTrashFill />
								</button>
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
