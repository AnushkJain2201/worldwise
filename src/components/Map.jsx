import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button"
import { useUrlPosition } from "../hooks/useUrlPosition";
const Map = () => {
	// useNavigate returns the navigate function
	const { cities } = useCities();
	const [mapPostition, setMapPosition] = useState([40, 0]);

	const [mapLat, mapLng] = useUrlPosition();
	const {isLoading: isLoadingPosition, position: geoLocationPosition, getPosition} = useGeolocation();
	useEffect(() => {
		if(mapLat && mapLng) {
			setMapPosition([mapLat, mapLng]);
		}
	}, [mapLat, mapLng])

	useEffect(() => {
		if(geoLocationPosition) {
			setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
		}
	}, [geoLocationPosition])

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && <Button type='position' onClick={getPosition} >
				{isLoadingPosition ? 'Loading...' : 'Use your position'}
			</Button>}
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
