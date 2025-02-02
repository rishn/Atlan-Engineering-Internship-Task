import React, { useState } from 'react';
import { Button, Input, Typography, ConfigProvider, Card, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

const VehicleList = ({ vehicles }) => {
  useTitle('Vehicles | Good to Go!');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  const handleRowClick = (vehicle) => {
    navigate(`/atlan/vehicles/${vehicle.split(' ').join('')}`); // Routing to EditVehicle component based on vehicleId
  };
  
  const handleAddVehicleClick = () => {
    navigate('/atlan/vehicles/new'); // Routing to AddVehicle component
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      vehicle.licensePlate.toLowerCase().includes(lowerSearchTerm) ||
      vehicle.type.toLowerCase().includes(lowerSearchTerm) 
    );
  });

  const sortedVehicles = filteredVehicles.sort((a, b) => a.licensePlate.localeCompare(b.licensePlate)); // Sort by licensePlate

  // Get the current page's vehicles
  const paginatedVehicles = sortedVehicles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalVehicles = sortedVehicles.length; // Total number of vehicles

  return (
    <ConfigProvider theme={{
      components: {
        Input: {
          colorBgContainer: '#2d2d2d', 
          colorText: "#fff", // White text
        },
        Card: {
          colorBgContainer: 'rgba(100, 100, 100, 0.4)',
          colorText: '#fff',
          colorTextHeading: '#fff', 
          colorBorder: 'transparent'
        }
      },
      token: {
        colorTextPlaceholder: "#aaa"
      }
    }}>
      <div style={{ padding: '20px 40px' }}>
        <Typography.Title style={{ color: '#fff' }} level={3}>
          Vehicles
        </Typography.Title>
        <Input
          placeholder="Search by license plate or vehicle type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }} 
        />
        <div className="vertical-vehicle-list">
          {paginatedVehicles.map((vehicle) => (
            <Card
              hoverable
              key={vehicle.licensePlate}
              style={{ marginBottom: 16, color: '#fff', cursor: 'pointer' }}
              onClick={() => handleRowClick(vehicle.licensePlate)} // Routing on click
            >
              <Typography.Title level={5} style={{ color: '#fff' }}>
                {vehicle.licensePlate}
              </Typography.Title>
              <Typography.Paragraph style={{ color: '#fff' }}>
                Type: {vehicle.type}
              </Typography.Paragraph>
            </Card>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalVehicles}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Optionally hide the size changer
          style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }} // Center the pagination
        />

        <Button 
          type="primary" 
          onClick={handleAddVehicleClick} 
          style={{ marginTop: 16 }}
        >
          Add Vehicle
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default VehicleList;
