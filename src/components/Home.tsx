import './Home.scss';

import Logo from '/assets/logo_sm2.webp';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './controls/Button';
import useApi from './hooks/useApi';
import StatsTable from './stats/StatsTable';
import LLImage from './ui/LLImage';
import Loader from './ui/Loader';
import Notice from './ui/Notice';

interface IFeatured {
  player_total: number,
  character_total: number
}

function Home() {
  const topCharacters = useApi(`/characters/stats/top-characters.json`)
  const topArtifactSetBuilds = useApi(`/artifactSets/stats/top-artifact-set-builds.json`)
  const topWeapons = useApi(`/weapons/stats/top-weapons.json`)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    if (topCharacters && topArtifactSetBuilds && topWeapons) {
      setIsLoading(false)
    }
  }, [topCharacters, topArtifactSetBuilds, topWeapons])

  return (
    <div className="home">
      <div className="home-logo">
        <LLImage src={Logo} alt="logo" />
      </div>
      <Notice>
        HoYoLAB no longer includes data for Abyss teams or owned characters.<br />
        Data cannot be updated until this issue is resolved by miHoYo.<br />
      </Notice>
      <div className="home-top-charts">
        {isLoading ? <Loader /> : 
          <>
            <div className="home-top-chart">
              <StatsTable.Characters data={topCharacters} isPreview={true} /> 
            </div>
            <div className="home-top-chart">
              <StatsTable.ArtifactSetBuilds data={topArtifactSetBuilds} isPreview={true} />
            </div>
            <div className="home-top-chart">
              <StatsTable.Weapons data={topWeapons} isPreview={true} />
            </div>
          </>
        }
      </div>
      <div>
        <Button onClick={() => navigate('/charts')}><>Show All</></Button>
      </div>
    </div>
  )
}

export default Home;