import React, { Component } from "react";
import "./App.css";

import firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { TextField, List, ListItem, ListItemText } from "@material-ui/core";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { naszTekst: "", wiadomosc: [] };
  }
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBe_ISyxr5fvn5cF4YXNfkCJUJ35Lxb7uk",
      authDomain: "prosta-baza.firebaseapp.com",
      databaseURL: "https://prosta-baza.firebaseio.com",
      projectId: "prosta-baza",
      storageBucket: "prosta-baza.appspot.com",
      messagingSenderId: "1076631759459"
    };
    firebase.initializeApp(config);
    this.odbierzZbazy();
  }
  onSubmit = event => {
    if (event.charCode === 13 && this.state.naszTekst.trim() !== "") {
      this.zapiszDoBazy(this.state.naszTekst);
      this.setState({ naszTekst: "" });
    }
  };
  zapiszDoBazy = message => {
    firebase
      .database()
      .ref("wiadomosc/")
      .push({
        naszTekst: message
      });
  };
  odbierzZbazy = () => {
    var messagesDB = firebase.database().ref("wiadomosc/");
    messagesDB.on("value", snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        var message = child.val();
        newMessages.push({ id: child.key, naszTekst: message.naszTekst });
      });
      this.setState({ wiadomosc: newMessages });
    });
  };
  renderMessages = () => {
    return this.state.wiadomosc.map(message => {
      const { id, naszTekst } = message;
      return (
        <ListItem key={id}>
          <ListItemText primary={naszTekst} />
        </ListItem>
      );
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={ Home} />
        </div>
      </Router>
    );
  }
}
export default App;
