import React, { Component } from 'react';

import './CharPicker.css';

class CharPicker extends Component {
  state = { characters: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        this.setState({
          characters: selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          })),
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let content = <p>Loading characters...</p>;

    if (
      !this.state.isLoading &&
      this.state.characters &&
      this.state.characters.length > 0
    ) {
      content = (
        <select
          onChange={this.props.onCharSelect}
          value={this.props.selectedChar}
          className={this.props.side}
        >
          {this.state.characters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !this.state.isLoading &&
      (!this.state.characters || this.state.characters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  }
}

export default CharPicker;
