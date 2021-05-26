import React from 'react';
import Select from 'react-select';

export type Option = { value: string, label: string }

type DropdownProps = {
  options: Option[]
  onChange: (e: any) => void
  defaultValue?: Option[] | Option
  isMulti?: boolean
}

function Dropdown({ options, onChange, isMulti=false, defaultValue=options.slice(0,1) }: DropdownProps) {
  return (
    <div className="dropdown">
      <Select 
        options={options} 
        onChange={onChange} 
        defaultValue={defaultValue} 
        isMulti={isMulti} 
        isSearchable={false}
        styles={{ 
          container: base => ({ ...base, minWidth: "15rem" }),
          singleValue: base => ({ ...base, color: "white" }),
          valueContainer: base => ({ ...base, backgroundColor: "#2A2C3A",  border: "2px solid rgba(0,0,0,0.1)", height: "3rem", fontSize: "1.2rem"}),
          control: base =>  ({ ...base, borderColor: "none" }),
          indicatorsContainer: base => ({ ...base, backgroundColor: "rgba(0,0,0,0.9)" }),
          menu: base => ({ ...base, backgroundColor: "#21232D", color: "white",  }),
          option: base => ({ ...base, backgroundColor: "#21232D !important", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6) !important" }}),

        }}
      />
    </div>
  )
}

export default Dropdown