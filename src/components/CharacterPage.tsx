import './CharacterPage.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IBuild, ICharacter, ICharData } from '../data/types';
import { Store } from '../Store';
import Abyss from './Abyss';
import BuildSelector from './builds/BuildSelector';
import elemColors from './builds/colors';

function CharacterPage() {
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, characterBuilds, characterDb, selectedCharacter }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<ICharData | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]

    if (charId) {
      setCharacter(characterDb[charId])
      setCharData(characterBuilds[charId])
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
    }
  }, [setCharacter, setCharData, dispatch, characterIdMap, shortName, characterBuilds])

  if (!character || !charData) return null


  return (
    <div className="character-page" style={{ backgroundImage: `url("${character!.image}")` }}>
      <div className="character-stats-count" style={{ backgroundColor: elemColors[characterDb[selectedCharacter].element.toLocaleLowerCase()] }}>
        <span>Data from {characterBuilds[selectedCharacter].total} players</span>
      </div>
      {charData.builds &&
        <BuildSelector
          builds={_.take(charData.builds, 8)}
          total={charData.total}
        />
      }
      {charData.abyss &&
        <Abyss {...charData.abyss} />
      }
    </div>
  )
}

export default CharacterPage
