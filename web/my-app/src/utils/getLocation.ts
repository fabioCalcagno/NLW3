

export default {

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition((position)=>{
            if(position.coords) {
                return [{latitude: position.coords.latitude}, {longitude: position.coords.longitude}];
            } else {
                return [0,0]
            }
        }, (error)=>{
            if(error.code) alert('Para uma melhor experiência habilite sua localização')
        });
    }

}