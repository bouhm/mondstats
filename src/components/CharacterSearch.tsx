import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile from './CharacterTile'
import characterDb from '../data/characters.json'
import data from "../sample.json"
import './CharacterSearch.css'
import Searchbar from './ui/Searchbar'


function CharacterSearch() {
  return (
    <div className="character-search">
      <Searchbar list={_.map(characterDb, character => character.name)} />
      <div className="character-tiles-container">
        {_.map(_.keys(data), id => {
          return (
            <Link key={id} to={`/characters/${_.find(characterDb, { id: parseInt(id) })!.name.toLowerCase().replace(" ", "")}`}>
              <CharacterTile id={parseInt(id)} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CharacterSearch;