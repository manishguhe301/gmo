import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Filter from './Filter';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 500 },
  { field: 'body', headerName: 'Body', width: 500 },
];

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Data Grid</h3>
      <div style={{ height: 400, padding: '40px' }}>
        <DataGrid rows={data} columns={columns} pageSize={5} />
      </div>
      <Filter />
    </>
  );
};

export default TableComponent;
