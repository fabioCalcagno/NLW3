import React from 'react';
import { useHistory } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";

import logoMap from '../../assets/icons/logoMap.svg';
import './sidebar-styles.css'


export default function SideBar() {
    const { goBack } = useHistory();

    return(
        <aside className="app-sidebar" >
        <img src={logoMap} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}