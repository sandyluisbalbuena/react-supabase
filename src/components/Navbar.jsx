import React from 'react'
import { useDataStore } from '../context/DataStoreContext';
import { Link } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi'


export default function Navbar() {
	const { setTheme, themes, theme:myCurrentTheme } = useDataStore();

	const handleClick = (theme) => {
		localStorage.setItem('localTheme', theme)
		setTheme(theme);
	}

	return (
		<div className="navbar bg-base-300 z-10 fixed bg-opacity-95 px-0 md:px-5">
			<div className="flex-1">
				<Link to='/' className="btn btn-ghost normal-case text-xl">REACT SUPABASE</Link>
			</div>

			<div className="dropdown dropdown-end md:hidden mx-2">
				<button tabIndex={0} className='md:hidden btn mx-2'>
					<BiMenu />
				</button>

				<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-sm bg-base-200 w-fit">

					{/* <>	
						{user?(
							<li><label className='btn' onClick={ handleLogout }>Logout</label></li>
						):(
							<li><a onClick={openModalLogin}>Login</a></li>
						)}
					</> */}
					<li>
						<Link to={ '/file' }>File</Link>
					</li>

					<li>
						<button  className="btn btn-ghost btn-sm">
							<FiSearch />
						</button>
					</li>

				</ul>
			</div>

			<div className="hidden md:flex flex-none">
				<ul className="menu menu-horizontal px-1 gap-2">
					<li>
						<Link to={ '/' }>Home</Link>
					</li>
					<li>
						<Link to={ '/file' }>File</Link>
					</li>
					<li>
						<details>
							<summary>
								Themes
							</summary>
							<ul className="mt-10 p-2 mx-1 h-40 overflow-auto rounded-sm bg-base-200">
								{themes.map((theme)=>(
									<li className={`w-full uppercase  ${myCurrentTheme==theme?'bg-base-300':''}`} key={ theme } onClick={() => handleClick(theme)} ><a>{ theme }</a></li>
								))}
							</ul>
						</details>  
					</li>
				</ul>
				<button className="btn btn-ghost btn-sm me-1">
					<FiSearch />
				</button>
				
				{/* {user?(
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn bg-base-100 btn-circle avatar">
							<div className="w-8 rounded-full">
								<img src={ '/assets/img/userIconsV2/'+user.image+'.png' }/>
							</div>
						</label>
						<ul tabIndex={0} className="mt-5 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-sm bg-base-200 w-fit">
							<li><a onClick={ handleLogout }>Logout</a></li>
						</ul>
					</div>
				):(
					<button onClick={openModalLogin} className="btn btn-ghost btn-sm">
						Sign In
					</button>
				)}*/}

			</div>
		</div>
	)
}
