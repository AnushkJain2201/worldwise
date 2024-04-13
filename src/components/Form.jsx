// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  // const navigate = useNavigate();

  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(""); //

  useEffect(() => {
    async function fetchCityaData() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError('');
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        const data = await res.json();

        if(!data.countryCode) throw new Error("Doesn't seem to be a country. Click somewhere else");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        
      }
      catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityaData();
  }, [lat, lng])

  if (isLoadingGeocoding) return <Spinner />

  if(geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
