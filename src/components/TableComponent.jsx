import React from 'react'

export default function TableComponent({ data }) {

	return (
		<div className="overflow-x-auto w-full">
			<table className="table">
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<th>Name</th>
						<th>Age</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((row)=>(
						<tr key={ row.id }>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th>
							<td>
								<div className="flex items-center space-x-3">
									<div>
										<div className="font-bold">{ row.name }</div>
										<div className="text-sm opacity-50">{ row.birthday }</div>
									</div>
								</div>
							</td>
							<th>
								<button className="btn btn-ghost btn-xs">details</button>
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
