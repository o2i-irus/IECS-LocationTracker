document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/');

    socket.emit('_ping');

    socket.on('_pong', () => {
        console.log('got pong');
    });

    const positionOptions = {
        enableHighAccuracy: true,
        maximumAge: 0
    }

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude: lat, longitude: lng } = pos.coords;
            socket.emit('updateLocations', { latitude, lng })
        }, err => {
            console.error(err);
        }, positionOptions);
    }, 2000);
});