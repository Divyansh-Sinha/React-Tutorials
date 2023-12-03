// Import necessary components from Material-UI and other libraries
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Step, StepLabel, Stepper, Typography, TextField } from '@mui/material';

// Initial form values
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
};

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Required'),
});

// Steps for the stepper
const steps = ['Personal Info', 'Account Setup', 'Contact Info'];

// Main component
const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Formik hook to manage form state, validation, and submission
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  // Function to handle the next button click
  const handleNext = () => {
    if (formik.isValidating) {
      // If the form is currently validating, wait for validation to complete
      return;
    }
  
    formik.validateForm().then((errors) => {
      const noErrors = Object.keys(errors).length === 0;
  
      if (noErrors) {
        if (activeStep === steps.length - 1) {
          formik.submitForm();
        } else {
          setActiveStep((prevStep) => prevStep + 1);
        }
      }
    });
  };

  // Function to handle the back button click
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={formik.handleSubmit}>
        {/* Step 1 */}
        {activeStep === 0 && (
          <div>
            <Typography variant="h6">Personal Information</Typography>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        )}

        {/* Step 2 */}
        {activeStep === 1 && (
          <div>
            <Typography variant="h6">Account Setup</Typography>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
        )}

        {/* Step 3 */}
        {activeStep === 2 && (
          <div>
            <Typography variant="h6">Contact Information</Typography>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </div>
        )}

        {/* Navigation buttons */}
        <div>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={handleNext} type="submit" variant="contained" color="primary">
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
