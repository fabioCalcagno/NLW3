export default interface OrphanageModel{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
    about: string;
    instructions:string;
    opening_hours:string;
    open_on_weekends:boolean;
    images:[{
        id:number,
        url:string,
    }]
    
}