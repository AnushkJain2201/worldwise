import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
const Map = () => {
	// useNavigate returns the navigate function
	const { cities } = useCities();
	const [mapPostition, setMapPosition] = useState([40, 0]);

	const [searchParams, setSearchParams] = useSearchParams();

	const mapLat = searchParams.get("lat");
	const mapLng = searchParams.get("lng");
	useEffect(() => {
		if(mapLat && mapLng) {
			setMapPosition([mapLat, mapLng]);
		}
	}, [mapLat, mapLng])

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={mapPostition}
				// center={[mapLat, mapLng]}
				zoom={6}
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
				<ChangeCenter position={mapPostition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
};


function ChangeCenter({position}) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvent({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
		}
	})
}
export default Map;
