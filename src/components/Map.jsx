import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
const Map = () => {
	// useNavigate returns the navigate function
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	
	return (
		<div className={styles.mapContainer} onClick={() => navigate("form")}>
			<h1>Map</h1>
			<h1>
				Position: {lat}, {lng}
			</h1>

			{/* <button onClick={() => {
				setSearchParams({lat: 23, lng: 50})
			}}>Clcick hwere</button> */}
		</div>
	);
};

export default Map;
