import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  // Declare state variables for city and weather data
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [shouldFetchWeather, setShouldFetchWeather] = useState(false);

  // Use useEffect hook to fetch weather data when city changes
  useEffect(() => {
    // Only fetch data if city is not empty
    if (city !== '') {
      // Fetch weather data from OpenWeatherMap API
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06d9447e0f4f4be54d99f7e956eee080&units=metric`)
        .then(response => response.json())
        .then(data => setWeather(data))
        .catch(error => console.error(error));
    }
    setShouldFetchWeather(false);
  }, [shouldFetchWeather]);

  // Handle button press to clear weather data
  const handlePress = () => {
    // setWeather(null);
    setShouldFetchWeather(true);
  };

  return (
    <View style={styles.container}>
      {/* Only render weather data if it exists */}
      {weather && weather.weather && (
        <View style={styles.weather}>
          {/* Display city name */}
          <Text style={styles.title}>{weather.name}</Text>
          {/* Display weather description */}
          <Text style={styles.subtitle}>{weather.weather[0].description}</Text>
          {/* Display temperature */}
          <Text style={styles.temp}>{Math.round(weather.main.temp)}&deg;C</Text>
        </View>
      )}
      {/* Input for user to enter city name */}
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={text => setCity(text)}
      />
      {/* Button to fetch weather data */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weather: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 46,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
