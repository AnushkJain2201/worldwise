import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";
const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

const CityItem = ({ city }) => {
	const { cityName, emoji, date, id, position } = city;
	const {currentCity} = useCities();
	const {lat, lng} = position;

	return (
		<li>
			<Link  className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active']:""}`} to={`${id}?lat=${lat}&lng=${lng}`}>
				<span className={styles.emoji}>{emoji}</span>

				<h3 className={styles.name}>{cityName}</h3>

				<time className={styles.date}>{formatDate(date)}</time>

				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	);
};

export default CityItem;
