import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

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
					<Route index element={<CityList cities={cities}  isLoading={isLoading}/>} />
					<Route path='cities' element={<CityList cities={cities}  isLoading={isLoading}/>} />
					<Route path='countries' element={<p>Countries</p>} />
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
