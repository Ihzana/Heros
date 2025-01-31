import React, { useEffect } from 'react';
import { View, Button, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

async function requestPermissions() {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ]);
}

async function sendEmergencyAlert() {
  Geolocation.getCurrentPosition(
    position => {
      const location = `${position.coords.latitude}, ${position.coords.longitude}`;
      const severity = "High"; // Placeholder for AI severity analysis
      const images = ["https://dummyimage.com/front", "https://dummyimage.com/back"]; // Replace with actual captured image URLs

      axios.post('http://YOUR_BACKEND_URL/api/emergency', {
        phoneNumber: 'USER_PHONE_NUMBER',
        location,
        severity,
        images
      })
        .then(() => Alert.alert('Emergency alert sent successfully'))
        .catch(err => Alert.alert(`Error: ${err.message}`));
    },
    error => Alert.alert(`Location error: ${error.message}`)
  );
}

export default function App() {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Trigger Emergency" onPress={sendEmergencyAlert} />
    </View>
  );
}
