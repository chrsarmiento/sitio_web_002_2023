$.getScript("assets/js/script_key.js", function() {
    getKey();
})

$('#buscar_clima').on('click', function() {
    let ciudad_buscada = $('#ciudad_buscada').val();

    if(ciudad_buscada.trim().length > 0){
        let units = 'metric';
        let lang = 'es';
        let appid = getKey();
        let urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad_buscada}&units=${units}&lang=${lang}&appid=${appid}`;

        $.getJSON(urlClima, function(dataClima) {
            let urlPais = `https://restcountries.com/v3.1/alpha/${dataClima.sys.country}`;
            $.getJSON(urlPais, function(dataPais) {
                let icon_url = `https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`;
                let html_img = `<img src="${icon_url}" alt="${dataClima.weather[0].description}"/>`;

                let html_clima = 
                        `<h4 id="ciudad" class="text-capitalize">${dataClima.name} (${dataPais[0].translations.spa.common}) : ${dataClima.weather[0].description}</h4>
                        <h4 id="temperatura">Temperatura: ${dataClima.main.temp}°C</h4>
                        <h4 id="sensacion_termica">Sensación Termica: ${dataClima.main.feels_like}°C</h4>
                        <h4 id="humedad">Humedad Relativa: ${dataClima.main.humidity}%</h4>
                        <h4 id="coordenadas">Coordenadas: ${dataClima.coord.lat},${dataClima.coord.lon}</h4>`;

                $('#info-clima').html(html_clima);  
                $('#img-clima').html(html_img);
            });
        }).fail(function() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La ciudad ingresada no existe en el mundo mundial!',
                confirmButtonText: 'Continuar'
            });
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes ingresar una ciudad para buscar!',
            confirmButtonText: 'Continuar'
        });
    }
});