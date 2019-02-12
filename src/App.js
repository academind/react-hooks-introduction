import React, { Component } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

class App extends Component {
  state = {
    selectedCharacter: 1,
    side: 'light'
  };

  sideHandler = side => {
    this.setState({ side: side });
  };

  charSelectHandler = event => {
    const charId = event.target.value;
    this.setState({ selectedCharacter: charId });
  };

  render() {
    return (
      <React.Fragment>
        <CharPicker
          side={this.state.side}
          selectedChar={this.state.selectedCharacter}
          onCharSelect={this.charSelectHandler}
        />
        <Character selectedChar={this.state.selectedCharacter} />
        <button onClick={this.sideHandler.bind(this, 'light')}>Light Side</button>
        <button onClick={this.sideHandler.bind(this, 'dark')}>Dark Side</button>
      </React.Fragment>
    );
  }
}

export default App;
