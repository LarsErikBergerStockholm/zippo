import React, { useState } from "react";

export default function Home({ initialData }) {
  const [userQuery, setUserQuery] = useState("");
  const [data, setData] = useState(initialData);

  const updateUserQuery = (event) => {
    setUserQuery(event.target.value);
  };
  const fetchData = async () => {
    const req = await fetch(`http://api.zippopotam.us/se/${userQuery}`);
    const newData = await req.json();
    return setData(newData);
  };
  const handleClick = (event) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <div>
      <h1>Zippopotamus</h1>
      <div>
        {data.places.map((place, i) => {
          return (
            <ul key={i}>
              <li>LATITUD: {place.latitude}</li>
              <li>LONGITUD: {place.longitude}</li>
              <li>
                PLATS: {place["place name"]}, {data.country}
              </li>
            </ul>
          );
        })}
        <input
          value={userQuery}
          placeholder="Sök på postnummer..."
          onChange={updateUserQuery}
        ></input>
        <button onClick={handleClick}>Sök</button>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`http://api.zippopotam.us/se/40530`);
  const data = await res.json();
  return {
    props: {
      initialData: data,
    },
  };
};
