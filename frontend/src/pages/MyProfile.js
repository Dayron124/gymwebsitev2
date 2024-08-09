import React, { useState, useRef } from 'react';
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Button,
  Typography,
  TextField,
  Tabs,
  Tab,
  Box,
  //IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  goals: Yup.string().required('Goals are required'),
});

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [openCropper, setOpenCropper] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const cropperRef = useRef(null);

  const initialValues = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    contactPreference: 'Email',
    goals: 'Lose 10 pounds',
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setOpenCropper(true);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
    setCroppedImage(croppedDataUrl);
    setOpenCropper(false);
  };

  const handleSubmit = async (values) => {
    try {
      // Upload cropped image
      if (croppedImage) {
        const blob = await fetch(croppedImage).then(res => res.blob());
        const formData = new FormData();
        formData.append('profileImage', blob, 'profile.png');

        const response = await axios.post('/api/profile/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        values.profileImage = response.data.profileImage;
      }

      // Update profile information
      await axios.put('/api/profile', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt="Profile Picture"
              src={croppedImage || profileImage || '/default-avatar.png'}
              sx={{ width: 150, height: 150, marginBottom: 2 }}
            />
            <label htmlFor="upload-button">
              <input
                accept="image/*"
                id="upload-button"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Profile Information" />
              <Tab label="Account Settings" />
              <Tab label="Goals" />
            </Tabs>
            <Box hidden={activeTab !== 0} sx={{ marginTop: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <TextField
                      label="Name"
                      name="name"
                      fullWidth
                      margin="normal"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      fullWidth
                      margin="normal"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      fullWidth
                      margin="normal"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                    <TextField
                      label="Contact Preference"
                      name="contactPreference"
                      fullWidth
                      margin="normal"
                      select
                      SelectProps={{
                        native: true,
                      }}
                      value={values.contactPreference}
                      onChange={handleChange}
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="Text">Text</option>
                    </TextField>
                    <TextField
                      label="Goals"
                      name="goals"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      value={values.goals}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.goals && Boolean(errors.goals)}
                      helperText={touched.goals && errors.goals}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      type="submit"
                      sx={{ marginTop: 2 }}
                    >
                      Save Changes
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Image Cropper Dialog */}
      <Dialog open={openCropper} onClose={() => setOpenCropper(false)}>
        <DialogTitle>Crop Profile Picture</DialogTitle>
        <DialogContent>
          <Cropper
            src={profileImage}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            dragMode="move"
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            toggleDragModeOnDblclick={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCropper(false)}>Cancel</Button>
          <Button onClick={handleCrop} variant="contained" color="primary">
            Crop & Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
