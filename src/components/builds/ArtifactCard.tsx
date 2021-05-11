import React from 'react'
import _ from 'lodash'
import { IArtifact } from '../../data/types'

function ArtifactCard({ rarity, icon, name, set, affixes, activation }: IArtifact & { activation: number, affixes: { activation_number: number, effect: string }[] }) {
  return (
    <div className={`artifact-card`}>
      <div className="artifact-header">
        <img className={`rarity-${rarity}`} src={icon} alt={name} />
        <div className="artifact-detail">
          <div className="artifact-name">
            {activation}x {set.name}
          </div>
        </div>
      </div>
      <tbody className="artifact-effects">
        {_.map(affixes, (affix, i) => {
          console.log(activation, affix.activation_number)
          if (activation < affix.activation_number) return null;

          return (
            <tr key={`affix-${set.id}-${i}`}>
              <td><b>{affix.activation_number}-Piece: </b></td>
              <td>{affix.effect}</td>
            </tr>
          )
        })}
      </tbody>
    </div>
  )
}

export default ArtifactCard