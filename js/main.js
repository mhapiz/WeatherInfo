window.addEventListener("load", () => {
  let lat;
  let long;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDesc = document.querySelector(".temperature-desc");
  let canvasIcon = document.querySelector("#canvas-icon");
  let degreeSection = document.querySelector(".degree-section");
  let span = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/71f4ba253c62540d1f9cefe4565c2f3e/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const timezone = data.timezone;
          const { temperature, summary, icon } = data.currently;

          temperatureDegree.innerHTML = temperature;
          temperatureDesc.innerHTML = summary;
          locationTimezone.innerHTML = timezone;

          setIcons(icon, canvasIcon);
          //
          let celsius = ((temperature - 32) * 5) / 9;
          //
          degreeSection.addEventListener("click", () => {
            if (span.textContent === "F") {
              span.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              span.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    console.log(currentIcon);
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
