import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);

				const data = await res.json();
				setCities(data);
			} catch {
				alert("There is an error loading the data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchCities();
	}, []);

	const getCurrentCity = async (id) => {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);

			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert("There is an error loading the data");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
                getCurrentCity
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
