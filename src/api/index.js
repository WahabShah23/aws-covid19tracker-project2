import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// we are exporting it so we can call it inside app.js
export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
      changeableUrl = `${url}/countries/${country}`;
    }


    try {
        // previously it was response but using destructuring we can directly access the response parts i.e. data in this case
        const { data : { confirmed, deaths, recovered, lastUpdate } } = await axios.get(changeableUrl);

        // We can configure the response however we want using like following
        // response.data

        // But we can use destructuring

        const modifiedResponse = {
            // Previously we prepended with data but after further DS on line 9 we don't need that
            // OLD Step 1 confirmed: data.confirmed,
            // OLD Step 2 confirmed: confirmed,
            confirmed,
            deaths,
            recovered,
            lastUpdate
        }


        // we can console log it but return is better, we can also return the object directly and no need to store it
        return modifiedResponse;

    } catch (error) {

    }
}


export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);

      return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
      return error;
    }
  };

  export const fetchCountries = async () => {
    try {
      const { data: { countries } } = await axios.get(`${url}/countries`);

      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };
