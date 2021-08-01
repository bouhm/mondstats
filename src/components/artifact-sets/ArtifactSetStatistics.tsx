import './ArtifactSetStatistics.css';

import { map } from 'lodash';
import React, { useEffect, useState } from 'react';

import ItemSearch, { SearchItem } from '../filters/ItemSearch';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSets = map(artifactSetDb, (set) => ({
    _id: set._id,
    name: set.name,
    rarity: set.rarity,
    imgUrl: `/assets/artifacts/${set.oid}.webp`
  }));
  const artifactSetStats = useApi(`https://api.github.com/repos/bouhm/favonius-data/contents/artifacts/top-artifactsets.json`)
  console.log(artifactSetStats)

  const handleSelect = () => {

  }
  
  return (
    <div className="artifact-set-stats-container">
      <ItemSearch items={artifactSets} onSelect={handleSelect} />
      <div className="artifact-set-top">
      </div>
    </div>
  )
}

export default ArtifactSetStatistics
