import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName,location,image) => dispatch => {
    const placeData = {
        placeName: placeName,
        location: location,
    }
    fetch("https://awesome-places-1534668478672.firebaseio.com/places.json",{
        method: "POST",
        body: JSON.stringify(placeData)
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
        console.log(parsedRes);
    })
}

export const deletePlace = key => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

        
