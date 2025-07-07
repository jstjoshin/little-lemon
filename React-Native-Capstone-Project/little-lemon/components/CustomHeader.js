import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileImageContext } from '../utils/ContextProvider';


const CustomHeader = ({ navigation, route, options }) => {
  const insets = useSafeAreaInsets();
  const { profileImage, userInitials } = useContext(ProfileImageContext);
  return (
    <View
      style={{
        paddingTop: insets.top,
        height: 65 + insets.top,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#dfdfdf',
      }}
    >
      <View style={{ width: 40 }}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require('../assets/back-btn.png')} // Replace with your path
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
      </View>
      <Image
        source={require('../assets/little-lemon-logo.png')} // Replace with your path
        style={{ width: 147.5, height: 40, resizeMode: 'contain' }}
      />
      <View style={{ width: 40, alignItems: 'flex-end' }}>
        {route.name !== 'Onboarding' && route.name !== 'Profile'  && (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#495E57',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontFamily: 'Karla', fontWeight: '700', fontSize: 21 }}>{userInitials}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;