import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { FiPlus } from "react-icons/fi";

import SideBar from '../../components/sidebar/SideBar';
import mapIcon from '../../utils/mapIcon';

import './create-orphanage-styles.css';
import api from "../../services/api";



export default function CreateOrphanage() {
      const history = useHistory();

      const [position, setPosition] = useState({latitude:0, longitude:0});
      const [name,setName] = useState('');
      const [about,setAbout] = useState('');
      const [instructions,setInstructions] = useState('');
      const [opening_hours,setOpeningHours] = useState('');
      const [open_on_weekends,setOpenOnWeekends] = useState(true);
      const [images, setImages] = useState<File[]>([]);
      const [previewImages, setPreviewImages] = useState<string[]>([]);
        

  function handleMapClick(event :LeafletMouseEvent){
    const { lat, lng } = event.latlng;
      setPosition({
        latitude:lat,
        longitude:lng,
      });
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault();
    const {latitude, longitude} = position;
    const data = new FormData();

    data.append('name', name );
    data.append('latitude', String(latitude) );
    data.append('longitude', String(longitude) );
    data.append('about', about);
    data.append('instructions',instructions );
    data.append('opening_hours',opening_hours );
    data.append('open_on_weekends', String(open_on_weekends) );
    images.forEach(image =>{
      data.append('images', image );
    });

   let response =  await api.post('orphanages', data)
   alert(response.data.message);
   history.push('/app');
    
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files)
    if(!event.target.files) return;

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image)
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <SideBar></SideBar>
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
                center={[-22.7485634,-47.3491724]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                onclick={handleMapClick}
                
            >
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {position.latitude !== 0 &&
                 <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
                }
               
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event=>{setName(event.target.value)}}  />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={event=>{setAbout(event.target.value)}}  />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map(previewImage=>{
                  return(
                    <img key={previewImage} src={previewImage} alt={name} />
                  );
                })}
              <label className="new-image" htmlFor='images'>
                <FiPlus size={24} color="#15b6d6" />
              </label>
              </div>
                <input id='images' multiple onChange={handleSelectedImages} type="file"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event=>{setInstructions(event.target.value)}}  />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event=>{setOpeningHours(event.target.value)}}  />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends? 'active' : ''}
                  onClick={()=>setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  className={!open_on_weekends? 'active' : ''}
                  onClick={()=>setOpenOnWeekends(false)}
                  >
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
