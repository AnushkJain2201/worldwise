import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

const CountriesList = ({ cities, isLoading }) => {
	if (isLoading) return <Spinner />;

	if (!cities.length) return <Message message='Not Any Country added' />;

	const countries = cities.reduce((acc, city) => {
		if (!acc.map((el) => el.country).includes(city.country))
			return [...acc, { country: city.country, emoji: city.emoji }];
        else return acc;
	}, []);
	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={Date.now()} />
			))}
		</ul>
	);
};

export default CountriesList;
