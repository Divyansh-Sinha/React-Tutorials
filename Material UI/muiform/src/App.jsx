import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setName, setUsers } from  './redux/action';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const { users,user, name } = useSelector((state) => state);

  useEffect(() => {
    // Fetch users and set them in the state
    fetchUsers()
      .then((users) => {
        // Set users in the state
        dispatch(setUsers(users));
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

    
  const fetchUsers = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
    return axios.get(apiUrl)
      .then((response) => {
        // Extract user data from the response
        const users = response.data;
        return users;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        return [];
      });
  };

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    dispatch(setUser(selectedUserId));
  
    // Simulate API call to get user details based on user ID
    // Replace this with your actual API call
    fetchUserDetails(selectedUserId)
      .then((userDetails) => {
        // Set user name based on the response
        dispatch(setName(userDetails.name));
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };
  


  const fetchUserDetails = (userId) => {
    
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
  
    return axios.get(apiUrl)
      .then((response) => {
        // Extract user data from the response
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        return {};
      });
  };


  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    handleDialogOpen();
  };

  return (
    <div style={{ padding: '20px' }}>
      <FormControl fullWidth>
        <InputLabel>User ID</InputLabel>
        <Select value={user} onChange={handleUserChange}>
          {users.map((userData) => (
            <MenuItem key={userData.id} value={userData.id}>
              {`User ${userData.id}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="User Name"
        value={name}
        disabled={!user}
        style={{ marginTop: '20px' }}
      />

      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmit}>
        Submit
      </Button>

      {/* Dialog box */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <p>User ID: {user}</p>
          <p>User Name: {name}</p>
          {/* Display additional user details here if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
