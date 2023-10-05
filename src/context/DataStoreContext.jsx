import React, { createContext, useContext, useState } from 'react';

const DataStoreContext = createContext();

export function DataStoreProvider({ children }) {
	const [ modalState, setModalState ] = useState(null)

	const [ theme, setTheme ] = useState(
		localStorage.getItem('localTheme') || 'wireframe'
	);

	const themes = [
		"light",
		"dark",
		"cupcake",
		"bumblebee",
		"emerald",
		"corporate",
		"synthwave",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter",
	];

	return (
		<DataStoreContext.Provider value={{ 
			theme, 
			setTheme, 
			themes, 
			modalState, 
			setModalState,
		}}>
			{children}
		</DataStoreContext.Provider>
	);
}

export function useDataStore() {
	return useContext(DataStoreContext);
}
