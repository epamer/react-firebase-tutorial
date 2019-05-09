import React, { Component } from 'react';
import './App.css';
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import firebase from "firebase"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { naszTekst: "", wiadomosc: [] }
  }
  componentDidMount(){
    var config = {
    apiKey: "AIzaSyBe_ISyxr5fvn5cF4YXNfkCJUJ35Lxb7uk",
    authDomain: "prosta-baza.firebaseapp.com",
    databaseURL: "https://prosta-baza.firebaseio.com",
    projectId: "prosta-baza",
    storageBucket: "prosta-baza.appspot.com",
    messagingSenderId: "1076631759459"
  }
  firebase.initializeApp(config);
  this.odbierzZbazy()
  }
  onSubmit = (event) => {
    if (event.charCode === 13 && this.state.naszTekst.trim() !== "") {
      this.zapiszDoBazy(this.state.naszTekst)
      this.setState({ naszTekst: "" })
    }
  }
  zapiszDoBazy = message => {
    firebase
      .database()
      .ref("wiadomosc/")
      .push({
        naszTekst: message
      })
  }
  odbierzZbazy = () => {
    var messagesDB = firebase
      .database()
      .ref("wiadomosc/")
    messagesDB.on("value", snapshot => {
      let newMessages = []
      snapshot.forEach(child => {
        var message = child.val()
        newMessages.push({ id: child.key, naszTekst: message.naszTekst })
      })
      this.setState({ wiadomosc: newMessages })
    })
  }
  renderMessages = () => {
    return this.state.wiadomosc.map(message => (
      <ListItem>
        <ListItemText
          primary={message.naszTekst}
        />
      </ListItem>
    ))
  }
  render() {
    return (
      <div className="App">
      <List>{this.renderMessages()}</List>
      <TextField
          autoFocus={true}
          multiline={true}
          rowsMax={3}
          placeholder="Wpisz tekst do bazy"
          onChange={event => this.setState({ naszTekst: event.target.value })}
          value={this.state.naszTekst}
          onKeyPress={this.onSubmit}
          style={{ width: "600px"}}
          />
          <span ref={el => (this.bottomSpan = el)} />
      </div>
    );
  }
} export default App;