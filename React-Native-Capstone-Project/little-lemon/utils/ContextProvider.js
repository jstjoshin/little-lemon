
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    const loadProfileData = async () => {
      const uri = await AsyncStorage.getItem('@profileImage');
      const first = await AsyncStorage.getItem('@firstName');
      const last = await AsyncStorage.getItem('@lastName');
      if (first) setFirstName(first);
      if (last) setLastName(last);
      if (uri) {
        setProfileImage(uri);
      }
    };
    loadProfileData();
  }, []);

  useEffect(() => {
    const initials =
      (firstName?.[0] || '').toUpperCase() + (lastName?.[0] || '').toUpperCase();
    setUserInitials(initials);
  }, [firstName, lastName]);

  return (
    <ProfileImageContext.Provider
      value={{ profileImage, setProfileImage, userInitials, setFirstName, setLastName }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};