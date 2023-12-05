// MyForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyForm() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);

    // Handle form submission logic, e.g., send data to the server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Employee ID"
            name="employeeId"
            {...register('employeeId', { required: 'Employee ID is required' })}
            error={!!errors.employeeId}
            helperText={errors.employeeId && errors.employeeId.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            {...register('firstName', { required: 'First name is required' })}
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Date of Birth"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              {...register('gender', { required: 'Gender is required' })}
              error={!!errors.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Organization Unit"
            name="orgUnit"
            {...register('orgUnit', { required: 'Organization Unit is required' })}
            error={!!errors.orgUnit}
            helperText={errors.orgUnit && errors.orgUnit.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Submit
      </Button>
    </form>
  );
}

export default MyForm;
