import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import '../App.css';
import Navbar from './Navbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Prompt from './Prompt';
import { del, get, post, put } from '../service';

// const API_BASE_URL = 'http://localhost:3030/api';

const Admin = () => {

  const fetchInfo = async () => {
    const { data } = await get('/employeelist');
    setData(data);
  };

  const submitForm = async (e) => {

    e.preventDefault();
    
    if (formData._id) {
      var { resp } = await put("/employeelist", formData);
    } else {
      var { resp } = await post("/employeelist", formData);
    }

    // const resp = await fetch(`${API_BASE_URL}/employeelist`, {
    //   method: formData._id ? "PUT" : "POST",
    //   body: JSON.stringify(formData),
    //   headers:{"Content-Type":"application/json"}
    // })

    if (resp.status === 200) {
      setFormData({
        name: '',
        location: '',
        position: '',
        salary: ''
      });
      setFormVisibility(false);
      fetchInfo();
    }

  };

  const deleteForm = async () => {
    if (!idToDelete) {
      return;
    }

    // const resp = await fetch(`${API_BASE_URL}/employeelist/${idToDelete}`, {
    //   method:'DELETE'
    // });

    const { resp } = await del(`/employeelist/${idToDelete}`);

    const index = data.findIndex(item => item._id === idToDelete);
    data.splice(index, 1);
    setData([...data]);
  };

  const updateForm = async (data) => {
    setFormVisibility(true);
    setFormData(data);

  }
  const [data, setData] = useState([]);

  const [isFormVisible, setFormVisibility] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    position: '',
    salary: ''
  });


  useEffect(() => {
    fetchInfo();
  }, []);

  return (

    <div>
      <Navbar />
      <br />
      <div>
        <Button class="btn" onClick={(e) => setFormVisibility(!isFormVisible)}>
          <AddCircleIcon sx={{ fontSize: 16 }} /> Create New User
        </Button>
      </div>
      <br />
      <div style={{ display: isFormVisible ? "block" : "none" }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              variant='outlined'
              label="name"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
              }}
              value={formData.name}
            />
            <TextField
              variant='outlined'
              label="location"
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value })
              }}
              value={formData.location}
            />
            <TextField
              variant='outlined'
              label="position"
              onChange={(e) => {
                setFormData({ ...formData, position: e.target.value })
              }}
              value={formData.position}
            />
            <TextField
              variant='outlined'
              label="salary"
              onChange={(e) => {
                setFormData({ ...formData, salary: e.target.value })
              }}
              value={formData.salary}
            />

            <Button onClick={submitForm}>Submit</Button>
          </div>

        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={800} fontSize={14}>No.</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Names</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Location</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Position</Typography></TableCell>
              <TableCell><Typography fontWeight={800} fontSize={14}>Salary</Typography></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataObj, i) => (
              <TableRow
                key={dataObj.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell >{dataObj.name}</TableCell>
                <TableCell >{dataObj.location}</TableCell>
                <TableCell >{dataObj.position}</TableCell>
                <TableCell >{dataObj.salary}</TableCell>

                <TableCell>
                  <Button onClick={e => updateForm(dataObj)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={e => {
                    //deleteForm(dataObj._id)
                    setShowPrompt(true);
                    setIdToDelete(dataObj._id);
                  }}>Delete</Button>
                </TableCell>
                {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Prompt show={showPrompt}
        onClose={() => {
          setShowPrompt(false);
          setIdToDelete(null);
        }}
        onConfirm={deleteForm}
      >
      </Prompt>

    </div>
  )
}

export default Admin
