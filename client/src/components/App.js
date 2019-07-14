import React from "react";
import { Switch, Route } from "react-router-dom";
import SongList from "./SongList";
import CreateSong from "./CreateSong";
import SongDetail from "./SongDetail";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={SongList} />
        <Route exact path="/create" component={CreateSong} />
        <Route exact path="/songs/:id" component={SongDetail} />
      </Switch>
    </div>
  );
}

export default App;
