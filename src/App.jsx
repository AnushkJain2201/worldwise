import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesLIst";

const App = () => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const BASE_URL = "http://localhost:8000";

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

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route index element={<Navigate replace to='cities' />} />
					<Route path='cities' element={<CityList cities={cities}  isLoading={isLoading}/>} />
					<Route path='cities/:id' element={<City />} />
					<Route path='countries' element={<CountriesList cities={cities} />} />
					<Route path='form' element={<Form />} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
