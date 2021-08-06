import './CardSearch.scss';

import Fuse from 'fuse.js';
import { debounce, difference, filter, find, includes, map, orderBy, uniq } from 'lodash';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Dropdown, { Option } from '../ui/Dropdown';
import Card from './Card';

type ItemSearchProps = {
  items: SearchItem[]
  onSelect: (selectedIds: string[]) => void
}

export type SearchItem = {
  _id: string
  name: string,
  rarity: number,
  keys?: string
}

type DDProps = {
  options: Option[], 
  OptionLabel: (o: Option)=>ReactNode 
}

function ArtifactSets(props: ItemSearchProps) { 
  const options: Option[] = orderBy(map(props.items, (item) => {
    return ({ label: item.name, value: item._id }) as Option
  }),'label', 'asc')

  const OptionLabel = ({ value, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className="item-option-image">
          <img className="item-option-portrait" src={`/assets/artifacts/${value}.webp`} alt={`${label}-portrait`} />
        </div>
        {/* <div className="item-option-label">{label}</div> */}
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"artifacts"} {...props} />
}

function Weapons(props: ItemSearchProps) { 
  const options: Option[] = orderBy(map(props.items, (item) => {
    return { label: item.name, value: item._id }
  }),'label', 'asc')

  const OptionLabel = ({ value, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className="item-option-image">
          <img className="item-option-portrait" src={`/assets/weapons/${value}.webp`} alt={`${label}-portrait`} />
        </div>
        {/* <div className="item-option-label">{label}</div> */}
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"weapons"} {...props} />
}

function CardSearch({ items, imgPath, options, onSelect, OptionLabel }: ItemSearchProps & DDProps & { imgPath: string }) { 
  const [searchedItems, setSearchedItems] = useState<SearchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const maxResults = 10;
  const fuse = new Fuse(items, { threshold: 0.3, keys: [{name: 'name', weight: 1}, {name: 'keys', weight: 0.5}] });

  // Set character search filter
  const handleSearch = (filtered: SearchItem[]) => {
    setSearchedItems(filtered);    
  }

  const handleInput = (input: string) => {
    debounce(() => {
      let searchResults = fuse.search(input);

      // Fuzzy search
      let filtered: string[] = [];

      if (searchResults.length > 0) {
        // Only filter up to maximum number of results
        const max = Math.min(maxResults, searchResults.length);
        for (let i = 0; i < max; i++) {
          filtered.push(searchResults[i].item.name)
        }
      }

      handleSearch(filter(items, (item: SearchItem) => includes(filtered, item.name)));
    }, 150)();
  }

  const handleChange = (selected: Option[]) => {
    setSelectedItems(selected);
    onSelect(map(selected, item => item.value ))
  }

  const handleSelect = (_id: string) => {
    const selectedItem = find(items, { _id });
    if (selectedItem) {
      const newSelected = [...selectedItems, { label: selectedItem.name, value: selectedItem._id }];
      setSelectedItems(newSelected)
      onSelect(map(newSelected, item => item.value ))
    }
  }

  return (
    <div className="cards-container">
      <div className="card-searchbar">
        <Dropdown.SearchSelect
          onChange={handleChange}
          onInput={handleInput}
          options={options}
          optionLabel={OptionLabel}
          showDropdown={false}
          isMulti={true}
          value={selectedItems}
        />
      </div>
      <div className="cards">
        {map(searchedItems, (item, i) => (
          <Card onClick={handleSelect} key={`${item._id}-${i}`} imgPath={imgPath} {...item} />
        ))}
        {map(orderBy(difference(items, searchedItems), 'name', 'asc'), (item, i) => (
          <Card onClick={handleSelect} key={`${item._id}-${i}`} imgPath={imgPath} {...item} faded={!!searchedItems.length} />
        ))}
      </div>
    </div>
  )
}

export default { ArtifactSets, Weapons }
