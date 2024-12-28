import React, { useState } from "react";
import DashboardInputs from "./DashboardInputs";
import DataGraph from "./DataGraph";
import PaginatedDataTable from "./PaginatedDataTable";
import LoadingSpinner from "./LoadingSpinner";

const WeatherDashboard = () => {
  const [inputs, setInputs] = useState({
    latitude: "",
    longitude: "",
    startDate: "",
    endDate: "",
  });
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const fetchCoordinates = async (locationName) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          locationName
        )}`
      );
      if (!response.ok) throw new Error("Error fetching coordinates");
      const data = await response.json();
      if (data?.results?.length > 0) {
        const { latitude, longitude } = data.results[0];
        return { latitude, longitude };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleFetchData = async () => {
    // Validate latitude and longitude
    const isValidLatitude = inputs.latitude !== "" && !isNaN(inputs.latitude) && inputs.latitude >= -90 && inputs.latitude <= 90;
    const isValidLongitude = inputs.longitude !== "" && !isNaN(inputs.longitude) && inputs.longitude >= -180 && inputs.longitude <= 180;
  
    if (!isValidLatitude || !isValidLongitude) {
      alert("Please enter valid latitude (-90 to 90) and longitude (-180 to 180).");
      return;
    }
  
    if (!inputs.startDate || !inputs.endDate) {
      alert("Please select both start and end dates.");
      return;
    }
  
    let userLocation = location;
    if (!location) {
      userLocation = prompt("Enter the location:");
      if (!userLocation) {
        alert("Location is required.");
        return;
      }
      setLocation(userLocation);
    }
  
    setLoading(true);
  
    try {
      const coordinates = await fetchCoordinates(userLocation);
      if (!coordinates) {
        alert("Could not fetch location data.");
        setLoading(false);
        return;
      }
  
      const { latitude, longitude } = coordinates;
      const { startDate, endDate } = inputs;
  
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`
      );
      if (!response.ok) throw new Error("Error fetching weather data");
      const weatherDataResponse = await response.json();
      if (weatherDataResponse?.daily) {
        const formattedData = weatherDataResponse.daily.time.map((date, index) => ({
          date,
          maxTemp: weatherDataResponse.daily.temperature_2m_max[index],
          minTemp: weatherDataResponse.daily.temperature_2m_min[index],
          meanTemp: weatherDataResponse.daily.temperature_2m_mean[index],
          maxApparentTemp: weatherDataResponse.daily.apparent_temperature_max[index],
          minApparentTemp: weatherDataResponse.daily.apparent_temperature_min[index],
          meanApparentTemp: weatherDataResponse.daily.apparent_temperature_mean[index],
        }));
        setWeatherData(formattedData);
      } else {
        alert("No weather data found.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-300 to-blue-100 text-gray-800 p-6">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Weather Dashboard
        </h1>
        <p className="text-lg mt-2 text-white">
          View Weather Data for any Location
        </p>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <DashboardInputs
          inputs={inputs}
          setInputs={setInputs}
          handleFetchData={handleFetchData}
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          weatherData.length > 0 && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Weather Trends</h2>
                <DataGraph data={weatherData} />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Weather Data</h2>
                <PaginatedDataTable
                  data={weatherData}
                  rowsPerPageOptions={[10, 20, 50]}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
