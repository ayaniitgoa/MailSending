import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import FramerTest from "./FramerTest";
import Nav from "./nav.svg";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const emailSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/sendmail", {
        email: email,
        name: name,
        mobile: parseInt(mobile),
        event: event,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "true") {
          setSuccessMsg(true);
        }
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <img className="navbar" src={Nav} alt="navbar" />

      <form action="" onSubmit={emailSubmit}>
        {loading && <h3>Loading..</h3>}
        {successMsg && <h3>Mail sent..</h3>}
        <input
          type="event"
          placeholder="Enter event"
          value={event}
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
      <FramerTest />
    </div>
  );
}

export default App;
