import React, { useState } from 'react';
import { Button, Input, Typography, ConfigProvider, Card, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

const AdminList = ({ admins }) => {
  useTitle('Admins | Atlan Application');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  const handleRowClick = (username) => {
    navigate(`/atlan/admins/${username}`); // Routing to EditUser component based on driverNum
  };
  
  const handleAddAdminClick = () => {
    navigate('/atlan/admins/new'); // Routing to AddDriver component
  };

  const filteredAdmins = admins.filter((admin) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      admin.username.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const sortedAdmins = filteredAdmins.sort((a, b) => a.username.localeCompare(b.username)); // Sort by driverNum

  // Get the current page's drivers
  const paginatedAdmins = sortedAdmins.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalAdmins = sortedAdmins.length; // Total number of drivers

  return (
    <ConfigProvider theme={{
      components: {
        Input: {
          colorBgContainer: '#2b2b2b', // Dark background for input
          colorText: "#fff", // White text
        },
        Card: {
          colorBgContainer: '#1f1f1f',
          colorText: '#fff',
          colorTextHeading: '#fff'
        }
      }
    }}>
      <div style={{ padding: '20px 40px' }}>
        <Typography.Title style={{ color: '#fff' }} level={3}>
          Admins
        </Typography.Title>
        <Input
          placeholder="Search by name or driver number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16, backgroundColor: '#2b2b2b', color: '#fff', WebkitTextFillColor: "#aaa" }} // Dark background input
        />
        <div className="vertical-driver-list">
          {paginatedAdmins.map((admin) => (
            <Card
              hoverable
              key={admin.username}
              style={{ marginBottom: 16, color: '#fff', cursor: 'pointer' }}
              onClick={() => handleRowClick(admin.username)} // Routing on click
            >
              <Typography.Title level={5} style={{ color: '#fff' }}>
                {admin.username}
              </Typography.Title>
              <Typography.Paragraph style={{ color: '#fff' }}>
                Admin
              </Typography.Paragraph>
            </Card>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalAdmins}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Optionally hide the size changer
          style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }} // Center the pagination
        />


        <Button 
          type="primary" 
          onClick={handleAddAdminClick} 
          style={{ marginBottom: 16, backgroundColor: '#1890ff', borderColor: '#1890ff' }} // Optional styling
        >
          Add Admin
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default AdminList;
