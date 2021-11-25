import { includes, map, orderBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';

import { IWeaponBuild } from '../../../data/types';
import { getPercentage } from '../../../scripts/util';
import Button from '../../controls/Button';
import useExpand from '../../hooks/useExpand';
import { FiltersType } from '../../hooks/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import HorizontalBarChart, { IBarChartData } from '../../ui/HorizontalBarChart';
import { ChevronDown, ChevronUp } from '../../ui/Icons';

type WeaponBuild = {
  weaponBuilds: IWeaponBuild[]
  total: number,
  color: string
}

const BP_WEAPONS = [11409, 12409, 14405, 15409, 13405]

function WeaponBuild({ weaponBuilds, total, filters, color }: WeaponBuild & { filters : FiltersType}) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const max = 10;
  const [filteredWeapons, setFilteredWeapons] = useState<IWeaponBuild[] | []>([]) 
  
  useEffect(() => {
    let orderedWeapons = orderBy(weaponBuilds, 'count', 'desc');

    let weapons: IWeaponBuild[] = []
    let count5 = 0;

    for (let i = 0; i < orderedWeapons.length; i++) {
      if (weaponDb[orderedWeapons[i]._id]) {
        if (weaponDb[orderedWeapons[i]._id].rarity > 4) {
          count5++;      
          
          if (count5 > filters.max5!.value) continue;
        }
  
        if (includes(BP_WEAPONS, weaponDb[orderedWeapons[i]._id].oid)) continue;
  
        weapons.push(orderedWeapons[i]);
        
        if (weapons.length >= max) {
          break;
        }
      }
    }

    setFilteredWeapons(weapons);

  }, [setFilteredWeapons, weaponBuilds, filters])

  return (
    <div className="weapons-list-container">
      <h1>Weapons</h1>
      <HorizontalBarChart data={take(filteredWeapons, expanded ? max : 5) as unknown as IBarChartData[]} path='weapons' db={weaponDb} total={total} color={color}/>
      <br />
      {filteredWeapons.length > 5 && (
        <Button className="weapons-show-more" onClick={handleExpand}>
          {!expanded ? <>Show more <ChevronDown size={20} color={"#202020"} /></> : <>Show less <ChevronUp size={20} color={"#202020"} /></>}
        </Button>
      )}
    </div>
  )
}

export default WeaponBuild