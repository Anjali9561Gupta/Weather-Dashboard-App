import React from 'react';

const DashboardInputs = ({ inputs, setInputs, handleFetchData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation for latitude and longitude
    if ((name === "latitude" || name === "longitude") && value !== "" && isNaN(value)) {
      alert(`${name} must be a valid number.`);
      return;
    }

    // Ensure values are within valid ranges for latitude and longitude
    if (name === "latitude" && (value < -90 || value > 90)) {
      alert("Latitude must be between -90 and 90.");
      return;
    }
    if (name === "longitude" && (value < -180 || value > 180)) {
      alert("Longitude must be between -180 and 180.");
      return;
    }

    setInputs({ ...inputs, [name]: value });
  };

  // Input field validation when 'Fetch Data' is clicked
  const handleSubmit = () => {
    const { latitude, longitude, startDate, endDate } = inputs;

    if (!latitude || !longitude || !startDate || !endDate) {
      alert("Please fill out all fields.");
      return;
    }

    handleFetchData();
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Latitude Input Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="latitude" className="font-semibold text-gray-700">
          Latitude:
        </label>
        <input
          type="number"
          name="latitude"
          id="latitude"
          value={inputs.latitude}
          onChange={handleChange}
          placeholder="Latitude (-90 to 90)"
          min="-90"
          max="90"
          
          className="border rounded px-3 py-2 w-full" 
        />
      </div>

      {/* Longitude Input Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="longitude" className="font-semibold text-gray-700">
          Longitude:
        </label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          value={inputs.longitude}
          onChange={handleChange}
          placeholder="Longitude (-180 to 180)"
          min="-180"
          max="180"
         
          className="border rounded px-3 py-2 w-full" 
        />
      </div>

      {/* Start Date Input Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="startDate" className="font-semibold text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={inputs.startDate}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* End Date Input Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="endDate" className="font-semibold text-gray-700">
          End Date:
        </label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={inputs.endDate}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Fetch Data Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded px-4 py-2 mt-4 w-full"
      >
        Fetch Data
      </button>
    </div>
  );
};

export default DashboardInputs;

