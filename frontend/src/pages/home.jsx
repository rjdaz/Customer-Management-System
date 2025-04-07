import React from 'react';

function Home(props) {
  return (
    <>
      <h2>Home Page</h2>
      <p>
        {props.data}
      </p>
    </>
  );
}

export default Home;