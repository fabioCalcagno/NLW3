import React, {useState, useEffect} from 'react';
import { FiPlus, FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map,TileLayer, Marker, Popup } from 'react-leaflet';

import Api from '../../services/api';
import logoMap from '../../assets/icons/logoMap.svg';
import mapIcon from '../../utils/mapIcon';
import './orphanage-map-styles.css';
import OrphanageModel from '../../models/Orphanage';
import getLocation from '../../utils/getLocation';


function OrphanagesMap(){
   // const [currentLocation, setCurrentLocation] = useState<geoLocation>();

    const [orphanages, setOrphanages] = useState <OrphanageModel[]> ([])

    useEffect(()=>{
       Api.get('/orphanages').then(response =>{
        setOrphanages(response.data)
       });
    },[])
    
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

            <Map center={[-22.7528481,-47.3380935]} zoom={15}  style={{  width:'100%', height:'100%'}}>
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {orphanages.map(orphanage=>{
                        return(
                        <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon}  >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                                   {orphanage.name}
                                   <Link to={`/orphanages/${orphanage.id}`}>
                                       <FiArrowRight size={20} color='#FFF' />
                                   </Link>
                            </Popup>
                        </Marker>);
                    })}
            </Map>

            <Link to='/orphanages/create' className='create-orphanage'  >
                <FiPlus size={32} color='#FFF' />
            </Link>
        </div>
    );
}

export default OrphanagesMap;