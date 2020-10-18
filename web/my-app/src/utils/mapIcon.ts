
import L from 'leaflet';
import logoMap from '../assets/icons/logoMap.svg';

const mapIcon = L.icon({
    iconUrl: logoMap,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

  export default mapIcon;