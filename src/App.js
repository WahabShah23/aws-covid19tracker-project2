import React from 'react';
// import logo from './logo.svg';
import styles from './App.module.css';


// Hard way
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';


// Smart way
import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';

// import image from './images/image.png';
// import image from './images/corona.png';
import image from './images/coronavirus.png';


class App extends React.Component {

  // This automagically calls constructor as well

  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });

    console.log({fetchedData});
  }


  handleCountryChange = async (country) => {
    console.log({country});
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  }


  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }

}

export default App;
