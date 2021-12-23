import './WeaponPage.scss';

import { find, isEmpty, orderBy, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getShortName } from '../../scripts/util';
import { setColorClass } from '../../Store';
import Button from '../controls/Button';
import useApi from '../hooks/useApi';
import useExpand from '../hooks/useExpand';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import UsageStats from '../stats/UsageStats';
import HorizontalBarChart, { IBarChartData } from '../ui/HorizontalBarChart';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Loader from '../ui/Loader';

function WeaponPage() { 
  const { shortName } = useParams();
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const weapon = find(weaponDb, weapon => getShortName(weapon) === shortName)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (weapon) {
      dispatch(setColorClass(weapon.type_name))
    }
  }, [weapon])
  
  if (!weapon) return null;

  const weaponStats = useApi(`/weapons/${weapon._id}.json`)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const max = 10;
  
  if (!weaponStats || isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />

  const charsTotal = reduce(weaponStats.characters, (sum, curr) => sum + curr.count, 0)

  return (
    <div className="weapon-page">
      <UsageStats count={weaponStats.count} total={weaponStats.typeTotal} abyssCount={weaponStats.abyssCount} abyssTotal={weaponStats.abyssTypeTotal} />
      <div className="weapon-charts">
        <div className="weapon-characters">
          <h1>Characters</h1>
          <HorizontalBarChart data={take(orderBy(weaponStats.characters, 'count', 'desc'), expanded ? max : 5) as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} />
          <br />
          {weaponStats.characters > 5 && (
            <Button className="weapons-show-more" onClick={handleExpand}>
              {!expanded ? <>Show more <ChevronDown size={20}/></> : <>Show less <ChevronUp size={20} /></>}
            </Button>
          )}
        </div>
        <div className="weapon-detail">
          <h1>Weapon</h1>
          <div className="weapon-info-container">
            <div className="weapon-info">
              <img src={`/assets/weapons/${weapon._id}.webp`} />
              <div className="weapon-info-stats">
                <div className="weapon-info-stat-title">Base Atk:</div>
                <div className="weapon-info-stat-value">{weapon.baseAtk}</div>
                <div className="weapon-info-stat-title">{weapon.subStat}:</div>
                <div className="weapon-info-stat-value">{weapon.subValue}</div>
              </div>
            </div>
            <div className="weapon-info-effect">{weapon.effect}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeaponPage