import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DataGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for the graph.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Weather Trends</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="maxTemp"
            stroke="#ff7300"
            name="Max Temp"
          />
          <Line
            type="monotone"
            dataKey="meanTemp"
            stroke="#387908"
            name="Mean Temp"
          />
          <Line
            type="monotone"
            dataKey="minTemp"
            stroke="#8884d8"
            name="Min Temp"
          />
          <Line
            type="monotone"
            dataKey="maxApparentTemp"
            stroke="#ff0000"
            name="Max Apparent Temp"
          />
          <Line
            type="monotone"
            dataKey="meanApparentTemp"
            stroke="#0000ff"
            name="Mean Apparent Temp"
          />
          <Line
            type="monotone"
            dataKey="minApparentTemp"
            stroke="#00ff00"
            name="Min Apparent Temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataGraph;
