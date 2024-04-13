import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
const Map = () => {
	// useNavigate returns the navigate function
	const navigate = useNavigate();
	const { cities } = useCities();
	const [mapPostition, setMapPosition] = useState([40, 0]);

	const [searchParams, setSearchParams] = useSearchParams();

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={mapPostition}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{city.emoji}</span><span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default Map;
