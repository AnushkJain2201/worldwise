import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

function City() {
	// In order to get the useParam hook to get data from the URL and this hook is provided to us by react router
	// It returns the object of all the parameters the we passed in the URL
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	// TEMP DATA
	const currentCity = {
		cityName: "Lisbon",
		emoji: "🇵🇹",
		date: "2027-10-31T15:59:59.138Z",
		notes: "My favorite city so far!",
	};

	const { cityName, emoji, date, notes } = currentCity;

	return (
		<>
			<h1>City {id}</h1> <p>Position: {lng}, {lat}</p>
		</>
	);

	// return (
	//   <div className={styles.city}>
	//     <div className={styles.row}>
	//       <h6>City name</h6>
	//       <h3>
	//         <span>{emoji}</span> {cityName}
	//       </h3>
	//     </div>

	//     <div className={styles.row}>
	//       <h6>You went to {cityName} on</h6>
	//       <p>{formatDate(date || null)}</p>
	//     </div>

	//     {notes && (
	//       <div className={styles.row}>
	//         <h6>Your notes</h6>
	//         <p>{notes}</p>
	//       </div>
	//     )}

	//     <div className={styles.row}>
	//       <h6>Learn more</h6>
	//       <a
	//         href={`https://en.wikipedia.org/wiki/${cityName}`}
	//         target="_blank"
	//         rel="noreferrer"
	//       >
	//         Check out {cityName} on Wikipedia &rarr;
	//       </a>
	//     </div>

	//     <div>
	//       {/* <ButtonBack /> */}
	//     </div>
	//   </div>
	// );
}

export default City;
