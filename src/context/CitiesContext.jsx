import { createContext, useContext, useEffect, useReducer } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
	cities: [],
    isLoading: false,
    currentCity: {},
	error: ''
}

const reducer = (state, action) => {
	switch(action.type) {

		case 'loading': 
			return {
				...state,
                isLoading: true,
			}

		case 'cities/loaded':
			return {
				...state,
				cities: action.payload,
                isLoading: false,
			}
		
		case 'cities/get': 
			return {
				...state,
                currentCity: action.payload,
                isLoading: false,
			}

		case 'cities/created':
			return {
				...state,
                cities: [...state.cities, action.payload],
                isLoading: false,
				currentCity: action.payload
			}

		case 'cities/deleted': 
			return {
				...state,
                cities: state.cities.filter(city => city.id!== action.payload),
                isLoading: false,
				currentCity: {}
			}

		case 'rejected': 
			return {
                ...state,
                error: action.payload,
				setLoading: false
            }


		default:
			throw new Error("Unknown action type: " + action.type);
	}
}

const CitiesProvider = ({ children }) => {
	const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const fetchCities = async () => {
			dispatch({type: 'loading'})
			
			try {
				const res = await fetch(`${BASE_URL}/cities`);

				const data = await res.json();
				
				dispatch({type: 'cities/loaded', payload: data});
			} catch {
				dispatch({type: 'rejected', payload: "There is an error loading the data"});
			} 
		};

		fetchCities();
	}, []);

	const getCurrentCity = async (id) => {
		if(Number(id) === currentCity.id) {
			return;
		}

		dispatch({type: 'loading'})

		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);

			const data = await res.json();
			
			dispatch({type: 'cities/get', payload: data});
		} catch {
			dispatch({type: 'rejected', payload: "There is an error loading the data"});
		} 
	};

	const createCity = async (newCity) => {
		dispatch({type: 'loading'})
		try {
			
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newCity),
			})

			const data = await res.json();
			
			dispatch({type: 'cities/created', payload: data});
		} catch (err) {
			dispatch({type: 'rejected', payload: "There is an error creating the data"});
		} 
	}

	const deleteCity = async (id) => {
		dispatch({type: 'loading'})
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			dispatch({type: 'cities/deleted', payload: id});
		} catch(err) {
			dispatch({type: 'rejected', payload: "There is an error deleting the data"});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
                getCurrentCity,
				createCity,
				deleteCity
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
};

const useCities = () => {
	const context = useContext(CitiesContext);
	if (context === undefined) {
		throw new Error("useCities must be used within a CitiesProvider");
	}
	return context;
};

export { CitiesProvider, useCities };
