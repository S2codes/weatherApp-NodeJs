const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const get_city = document.getElementById('get_city');
const main_temp = document.getElementById('Main_temp');
const min_max = document.getElementById('min_max_temp');
const weather_status = document.getElementById('weathercon');
const alert_error = document.getElementById('alert_error');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === '') {
        alert_error.innerHTML = `<div class="alert alert-info alert-dismissible fade show ps-5" role="alert">
        <strong>Note! </strong> City Name Must Be filled.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=4278483973952962fb645fc565d5b2cc`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            document.getElementById('main_container').classList.remove('.data-hide');
            get_city.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            main_temp.innerText = `${arrData[0].main.temp} °c`;
            min_max.innerText = `Min  ${arrData[0].main.temp_min} °c | Max  ${arrData[0].main.temp_max} °c`;
            const Wstatus = arrData[0].weather[0].main;
            tempStatus(Wstatus);
            alert_error.innerHTML = '';
        }
        catch {
            alert_error.innerHTML = `<div class="alert alert-danger alert-dismissible fade show ps-5" role="alert">
        <strong>Error! </strong> ${'Enter the City Name Properly.'}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
        }

    }
}
submitBtn.addEventListener('click', getInfo);

// date time 
let dayStamp = document.getElementById('date');
const getCurrentDay = () => {
    const weekend = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const mnth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let currentTIme = new Date();
    var w = weekend[currentTIme.getDay()];
    var d = currentTIme.getDate();
    var m = mnth[currentTIme.getMonth()];
    var y = currentTIme.getFullYear();
    var currentDay = `${w} | ${d} ${m} | ${y}`;
    return currentDay;
}
dayStamp.innerHTML = getCurrentDay();


// icon check
const tempStatus = (tempStatus) => {
    if (tempStatus == 'Sunny') {
        weather_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i></div>';
    }
    else if (tempStatus == 'Clouds') {
        weather_status.innerHTML = '<i class="fas fa-cloud" style="color: #fff;"></i></div>';
    }
    else if (tempStatus == 'Rainy') {
        weather_status.innerHTML = '<i class="fas fa-cloud-rain" style="color: #0054ab;"></i></div>';
    }
    else if (tempStatus == 'Rain') {
        weather_status.innerHTML = '<i class="fas fa-cloud-showers-heavy" style="color: #0054ab;"></i></div>';
    }
    else if (tempStatus == 'Haze') {
        weather_status.innerHTML = '<i class="fas fa-smog" style="color: #d7d4d5;"></i></div>';
    } else {
        weather_status.innerHTML = '<i class="fas fa-cloud" style="color: #fff;"></i></div>';
    }
}

