import React from "react";
import { Link } from "react-router-dom";

import { TextField, List, ListItem, ListItemText } from "@material-ui/core";

const Home = () => {
  return (
    <React.fragment>
      <List>{this.renderMessages()}</List>
      <TextField
        autoFocus={true}
        multiline={true}
        rowsMax={3}
        placeholder="Wpisz tekst do bazy"
        onChange={event => this.setState({ naszTekst: event.target.value })}
        value={this.state.naszTekst}
        onKeyPress={this.onSubmit}
        style={{ width: "600px" }}
      />
      {/* <span ref={el => (this.bottomSpan = el)} /> */}
    </React.fragment>
  );
};
export default Home;
