document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/');

    

    const positionOptions = {
        enableHighAccuracy: true,
        maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos.coords)
    }, err => {
        console.error(err);
    });
});