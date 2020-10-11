window.addEventListener("load", () => {
    let lon;
    let lat;
    const degree = document.querySelector(".degree");
    const description = document.querySelector(".description");
    const localTimeZone = document.querySelector(".local-timezone");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${lon}`
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                degree.textContent = Math.floor((temperature - 32) * 5 / 9);
                description.textContent = summary;
                localTimeZone.textContent = data.timezone.slice(5);
                putIcon(icon, document.querySelector('#icon'));
            })
            .catch(error => {
                console.log(error);
            });
        }); 
    }

    function putIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const curIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[curIcon]);
    }
});