import React, {useState, useEffect} from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map,TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import logoMap from '../../assets/icons/logo-map.svg';


import './styles.css';
import '../../assets/global.css';


function OrphanagesMap(){
    const [positions, setPositions] = useState([0,0]);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(showPosition, getGeoError);
    },[])

    function getGeoError(error) {
        if(error.code) {
            alert('Para uma melhor experiência, e poder visualizar os orfanatos mais próximos de você, seria melhor permitir o uso de localização');
            setPositions([-16.6806056,-67.0573532]);
        }
    }

    function showPosition(position){
        setPositions([position.coords.latitude, position.coords.longitude]);
        console.log(position)
        
    }
    
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={logoMap} alt="happy logotipo"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p> Muitas crianças estão esperando a sua visita :)  </p>
                </header>
                <footer>
                    <strong>Americana</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map center={[positions[0] , positions[1]]}
                 zoom={15}
                 style={{  width:'100%', height:'100%'}} >
                     <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                 </Map>

            <Link className='create-arphanage' to='' >
                <FiPlus size='32' color='#FFF' />
            </Link>
        </div>
    );
}

export default OrphanagesMap;