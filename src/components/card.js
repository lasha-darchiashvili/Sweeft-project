import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Card(props) {
  const { id, name, lastName, imageUrl, prefix, title } = props.person;
  const sendData = props.sendData;
  const params = useParams();

  // onclick it sends data to parent's parent and then this data is displayed on persons page as link
  function displayName() {
    if (params.id) {
      sendData(
        props.person.prefix,
        props.person.name,
        props.person.lastName,
        props.person.id
      );
    }
  }
  return (
    <div>
      <Link
        to={`/Person/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="card-wrapper" onClick={displayName}>
          <img src={`${imageUrl}/${id}`} className="card-img" />
          <p className="card-name">{`${prefix} ${name} ${lastName} ${id}`}</p>
          <p className="card-title">{lastName}</p>
        </div>
      </Link>
    </div>
  );
}
