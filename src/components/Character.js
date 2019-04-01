import React, { useEffect } from 'react';

import Summary from './Summary';
import { useHttp } from '../hooks/http';

const Character = props =>  {
  
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar]);

  let loadedCharacter = null;

  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  useEffect(() => {
    // Clean up function like 'componentWillUnmount' (runs when the component is removed)
    return () => {
      console.log('Cleaning up...');
    };
  }, []);
  
  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

/* Works like 'shouldComponentUpdate' but opposite.
  In the second argument (function):
  return 'true' if you don't want to re-render
  return 'false' if you want to re-render
*/
export default React.memo(Character);
