import "./index.css";
import React from "react";
import axios from "axios";
import Peoplelist from "./components/Peoplelist";

function App() {
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

  React.useEffect(() => {
    getPeople();
    setPage(pageRef.current + 1);

    const observer = new IntersectionObserver(observerFunction, {
      threshold: 1.0,
    });
    observer.observe(loadingDataRef.current);
  }, []);

  // handle infinite scroll
  const observerFunction = (entries, observer) => {
    const height = entries[0].boundingClientRect.y;

    if (oldHeightYRef.current > height) {
      getPeople();
      setPage(pageRef.current + 1);
    }

    setOldHeightY(height);

    // if (entries[0].intersectionRatio > 0) {
    //   getPeople();
    //   setPage(pageRef.current + 1);
    // }

    // setOldHeightY(y);
  };

  // fetching data function
  function getPeople() {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageRef.current}/20`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPeople([...peopleRef.current, ...data.list]);
          setLoadingData(true);
        }
      })
      .catch((err) => console.log(err));
  }

  // renders component "Peoplelist", which then renders "cards"
  return (
    <>
      <Peoplelist
        people={people}
        loadingDataRef={loadingDataRef}
        loadingData={loadingData}
      ></Peoplelist>
    </>
  );
}

export default App;
