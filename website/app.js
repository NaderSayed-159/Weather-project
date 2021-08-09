/* Global Variables */
const apiKeyWheather = '6a9dad1aabb09a6d7454b4bc936036b0';
const generateBtn = document.getElementById('generate');

// get the date of today dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// create event listener to add data to elements in dom
generateBtn.addEventListener('click', getWeatherData)

function getWeatherData(e) {

    const zCode = document.getElementById('zip').value;
    const nowfellings = document.getElementById('feelings').value;
    let apiBaseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zCode}&appid=${apiKeyWheather}&units=metric`

    fetchData(apiBaseUrl)
        .then((data) => {

            let temp = data.main['temp'];

            dataPost('/postDatas', {
                Date: newDate,
                Temprture: temp,
                fells: nowfellings
            })

        })

        .then(

            getPostData()
        )

}

//function to get the data from api

const fetchData = async (url) => {


    const res = await fetch(url, {
        credentials: 'same-origin',
    });

    const data = await res.json();

    //return the data to use it in chaining to get temp 
    return data;
    // console.log(data);
}



// function to post data  to assign it in endpoint object
const dataPost = async (url, data = {}) => {


    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const storedData = await response.json();
        // console.log(storedData);
        return storedData;
    } catch (error) {
        console.log("error", error);
    }


}



// function to get data from endpoint object

const getPostData = async () => {

    const request = await fetch('/endPointsend');

    try {
        const allData = await request.json();

        console.log(allData);

        document.getElementById('date').innerHTML = "Today's Date:" + allData.Date;
        document.getElementById('temp').innerHTML = "Current Temprture: " + allData.Temprture;
        document.getElementById('content').innerHTML = "What You Fell =>" + allData.Fellings;



    } catch (error) {
        console.log("the error is", error);
    }


}