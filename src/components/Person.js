import React from "react";
import { useParams } from "react-router-dom";
import Peoplelist from "../components/Peoplelist";
import { Link } from "react-router-dom";

export default function Person() {
  const [person, setPerson] = React.useState({});

  const [people, setPeople] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loadingData, setLoadingData] = React.useState(false);
  const [oldHeightY, setOldHeightY] = React.useState(0);

  let loadingDataRef = React.useRef(null);
  let oldHeightYRef = React.useRef({});
  let peopleRef = React.useRef({});
  let pageRef = React.useRef({});

  peopleRef.current = people;
  pageRef.current = page;
  oldHeightYRef.current = oldHeightY;

  // using "useParams" to detect person ID and pass that ID to fetch function
  let params = useParams();

  // cardNames takes all cards that were rendered as list, names of these cards are displayed later on screen
  const cardNames = React.useRef([]);

  let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.id}`;
  // fetching data function
  function getPerson(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPerson(data);

          // this part of code adds only firs render card name in "cardNames" list, others are added from "Card" component, via click
          if (cardNames.current.length === 0) {
            cardNames.current.push({
              name: `${data.prefix} ${data.name} ${data.lastName}`,
              id: `${data.id}`,
            });
          }
        }
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    getPerson(url);
  }, [params.id]);

  // this function is sent to the childs child component(Card). this function adds cards names in "cardNames", afrer card is clicked
  function sendData(prefix, name, lastName, id) {
    cardNames.current.push({
      name: `${prefix} ${name} ${lastName}`,
      id: `${id}`,
    });
  }

  //   ------------------------------  friends list -------------------------

  // handle infinite scroll
  React.useEffect(() => {
    getPeople();
    setPage(pageRef.current + 1);

    const observer = new IntersectionObserver(observerFunction, {
      threshold: 1.0,
    });
    observer.observe(loadingDataRef.current);
  }, []);

  const observerFunction = (entries, observer) => {
    const height = entries[0].boundingClientRect.y;

    if (oldHeightYRef.current > height) {
      getPeople();
      setPage(pageRef.current + 1);
    }

    setOldHeightY(height);
  };

  // fetching data function
  function getPeople() {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.id}/friends/${pageRef.current}/20`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPeople([...peopleRef.current, ...data.list]);
          setLoadingData(true);
          console.log(pageRef.current);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="info-page-wrapper">
      <div className="info-block-wrapper">
        <div className="person-img-wrapper">
          <img src={`${person.imageUrl}/${person.id}`} className="card-img" />
        </div>
        <div className="person-info">
          <fieldset>
            <legend className="legend">info</legend>

            <p className="card-name">{`${person.prefix} ${person.name} ${person.lastName}`}</p>
            <p className="card-title card-title-person">{person.title}</p>
            <p className="contact-info">
              <span className="info-names">Email</span>: {person.email}
            </p>
            <p className="contact-info">
              <span className="info-names">Ip Address</span>: {person.ip}
            </p>
            <p className="contact-info">
              <span className="info-names">Ip Address</span>: {person.ip}
            </p>
            <p className="contact-info">
              <span className="info-names">Job Area</span>: {person.jobArea}
            </p>
            <p className="contact-info">
              <span className="info-names">Job Type</span>: {person.jobType}
            </p>
          </fieldset>
        </div>

        <div className="person-address">
          <fieldset className="ads">
            <legend className="legend">Address</legend>

            <p className="card-name">{`${person?.company?.name} ${person?.company?.suffix}`}</p>
            <p className="contact-info">
              <span className="info-names">City</span>: {person?.address?.city}
            </p>
            <p className="contact-info">
              <span className="info-names">Country</span>:{" "}
              {person?.address?.country}
            </p>
            <p className="contact-info">
              <span className="info-names">State</span>:{" "}
              {person?.address?.state}
            </p>
            <p className="contact-info">
              <span className="info-names">Street Adress</span>:{" "}
              {person?.address?.streetAddress}
            </p>
            <p className="contact-info">
              <span className="info-names">ZIO</span>:{" "}
              {person?.address?.zipCode}
            </p>
          </fieldset>
        </div>
      </div>
      <div className="card-names">
        {cardNames.current.map((cardName, index) => {
          return (
            <span key={index}>
              {index === 0 || <span> &#62; </span>}
              <Link to={`/Person/${cardName.id}`}>{`${cardName.name}`}</Link>
            </span>
          );
        })}
      </div>
      <h1>Friends:</h1>
      <Peoplelist
        people={people}
        loadingDataRef={loadingDataRef}
        loadingData={loadingData}
        sendData={sendData}
      ></Peoplelist>
    </div>
  );
}
