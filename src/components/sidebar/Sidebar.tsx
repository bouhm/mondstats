import './Sidebar.scss';

import { map } from 'lodash';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Hamburger } from '../ui/Icons';

interface IMenuItem {
  name: string
  linkto: string
  icon: string
}

const menuItems: IMenuItem[] = [
  // { name: "Builds", linkto: "/builds", icon: "builds.webp" },
  { name: "Spiral Abyss", linkto: "/abyss", icon: "spiralAbyss.webp" },
  { name: "Characters", linkto: "/characters", icon: "characters.webp" },
  { name: "Artifacts", linkto: "/artifacts", icon: "artifacts.webp" },
  { name: "Weapons", linkto: "/weapons", icon: "weapons.webp" },
  { name: "Charts", linkto: "/charts", icon: "charts.webp"}
]

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation();

  const handleBurgerClick = () => {
    setIsOpen(!isOpen)  
  }

  const renderMenu = () => {
    return (
      <div className="sidebar-menu">
        {map(menuItems, menuItem => {
          return <Link key={menuItem.name} to={menuItem.linkto}>
            <div className={`sidebar-menuItem ${location.pathname.startsWith(menuItem.linkto) ? 'asActive' : ''}`} onClick={() => setIsOpen(false)}>
              <img src={`/assets/icons/${menuItem.icon}`} />
              <span className="menuItem-name">{menuItem.name}</span>
            </div>
          </Link>
        })}
      </div>
    )
  }

  return (
    <>
     <div className="sidebar-collapsible">
        <div className="sidebar-menu-burger" onClick={handleBurgerClick}>
          <Hamburger color={'#c3b0e4'} size={30} />
        </div>
        {isOpen && renderMenu()}
      </div>
      <div className="sidebar">
       {renderMenu()}
      </div>
    </>
  )
}

export default Sidebar;