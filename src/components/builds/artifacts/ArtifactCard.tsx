import React from 'react'
import _ from 'lodash'
import { IArtifact } from '../../../data/types'

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
      <table>
        <tbody className="artifact-effects">
          {_.map(affixes, (affix, i) => {
            if (activation < affix.activation_number) return null;

            return (
              <tr key={`affix-${set.id}-${i}`}>
                <td>{affix.activation_number}-Piece: </td>
                <td>{affix.effect}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ArtifactCard