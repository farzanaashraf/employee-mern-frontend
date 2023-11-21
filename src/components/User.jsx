import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { get } from '../service';
import Navbar from './Navbar';

const User = () => {
  const fetchInfo = async () => {
    const { data } = await get('/employeelist');
    setData(data);
  };
    
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchInfo();
    }, []);
  
  return (
    <div>
      <Navbar/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell><Typography fontWeight={800} fontSize={14}>No.</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Names</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Location</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Position</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Salary</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataObj,i) => (
            <TableRow
              key={dataObj.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell >{dataObj.name}</TableCell>
                <TableCell >{dataObj.location}</TableCell>
                <TableCell >{dataObj.position}</TableCell>
                <TableCell >{dataObj.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default User
