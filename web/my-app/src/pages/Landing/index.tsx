import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom';


import './styles.css';
import '../../assets/global.css';
import Logo from '../../assets/icons/Logo.svg';


function Landing(){

    return (
        <div id="landing-page">
            <div className="content-wrapper">
                <img src={Logo} alt="logotipo happy"/>
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia
                        de muitas crianças.</p>
                    <div className="location">
                        <strong>Americana</strong>
                        <span>São Paulo</span>
                    </div>
                    <Link to="/orphanages" className="enter-app"> 
                    <FiArrowRight className='icon' size={26} color="rgba(0,0,0,0.6)" />
                    </Link>
                </main>
            </div>
        </div>
        
    );
}
export default Landing;

