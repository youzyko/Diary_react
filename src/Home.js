import React from "react";
import A from "./A";
import B from "./B";

const Home=()=>{
    return (
      <div style={{border:'solid 1px red'}}>
        <h3>Home</h3>
        <A />
        <B />
      </div>
    );
}

export default Home;