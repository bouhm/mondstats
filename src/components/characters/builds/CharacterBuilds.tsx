import './CharacterBuilds.css';

import AmberSad from '/assets/amberSad.webp';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ElementColors } from '../../../data/constants';
import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../../../data/types';
import { getCharacterFileName } from '../../../scripts/util';
import { selectCharacter, setElementColor } from '../../../Store';
import { useAppDispatch, useAppSelector } from '../../../useRedux';
import F2P from '../../filters/F2P';
import useFilters from '../../filters/useFilters';
import Loader from '../../ui/Loader';
import Toggle from '../../ui/Toggle';
import BuildSelector from './BuildSelector';
import CharacterTeams from './CharacterTeams';
import Constellations from './Constellations';

function CharacterBuilds() {  
  const { shortName } = useParams<{ shortName: string }>();

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const dbLoaded = useAppSelector((state) => state.data.dbLoaded)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(true);
  const [characterBuild, setCharacterBuild] = useState<ICharacterBuild | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const {
    filters,
    handleFilterChange
  } = useFilters();

  const charId = characterIdMap[shortName]

  useEffect(() => {
    fetch(`https://api.github.com/repos/bouhm/favonius-server/contents/data/characters/${shortName}.json`, {
      headers: {
        authorization: `token ${import.meta.env.VITE_GH_PAT}`,
        'accept': 'application/vnd.github.v3.raw+json'
      },
    })
      .then(res => res.json())
      .then(data => {
        setCharacterBuild(data)
        setIsLoading(false)
      })
  }, [setCharacterBuild, setIsLoading])

  useEffect(() => {
    if (!_.isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      
      dispatch(selectCharacter(charId))
      dispatch(setElementColor(ElementColors[char.element.toLowerCase()]))
    }
  }, [setCharacter, dispatch, charId, characterDb, ElementColors, elementColor])

  if (isLoading || !dbLoaded) {
    return <div>
      <Loader />
    </div>
  }

  if (!character || !characterBuild) {
    return <div>
      <div className="its-empty"><img src={AmberSad} alt="empty" /></div>
    </div>
  }

  return (
    <div className="character-page">
      <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} />
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuild.total} {character.name} Builds</span>
      </div>
      <div className="character-page-controls">
        <F2P onChange={handleFilterChange} f2p={filters.f2p} max5={filters.max5} color={elementColor} />
      </div>

      {characterBuild.builds &&
        <>
          <BuildSelector
            builds={_.take(characterBuild.builds, 8)}
            total={characterBuild.total}
            filters={filters}
          />
          <Constellations constellations={characterBuild.constellations} total={characterBuild.total} />
          <CharacterTeams filters={filters} teams={characterBuild.teams} />
        </>
      }
    </div>
  )
}

export default CharacterBuilds