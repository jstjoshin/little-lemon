import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValidateEmail, ValidateName, ValidatePhone } from '../utils';
import { PrimaryButton, SecondaryButton, TertiaryButton } from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { ProfileImageContext } from '../utils/ContextProvider';
import CustomCheckbox from '../components/Checkbox';
import InputText from '../components/InputText';
import { dropMenuTable } from '../utils/db';

const Profile = ({ navigation, setIsOnboardingCompleted }) => {
  const {
    profileImage,
    setProfileImage,
    userInitials,
    setFirstName: setCtxFirstName,
    setLastName: setCtxLastName
  } = useContext(ProfileImageContext);
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [notifyOrderStatus, setNotifyOrderStatus] = useState(false);
  const [notifyPasswordChange, setNotifyPasswordChange] = useState(false);
  const [notifySpecialOffers, setNotifySpecialOffers] = useState(false);
  const [notifyNewsletter, setNotifyNewsletter] = useState(false);
  const [originalValues, setOriginalValues] = useState({});
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const loadData = async () => {
    const stored = {
      firstName: await AsyncStorage.getItem('@firstName') || '',
      lastName: await AsyncStorage.getItem('@lastName') || '',
      email: await AsyncStorage.getItem('@email') || '',
      phoneNumber: await AsyncStorage.getItem('@phoneNumber') || '',
      notifyOrderStatus: (await AsyncStorage.getItem('@notifyOrderStatus')) === 'true',
      notifyPasswordChange: (await AsyncStorage.getItem('@notifyPasswordChange')) === 'true',
      notifySpecialOffers: (await AsyncStorage.getItem('@notifySpecialOffers')) === 'true',
      notifyNewsletter: (await AsyncStorage.getItem('@notifyNewsletter')) === 'true',
    };

    onChangeFirstName(stored.firstName);
    onChangeLastName(stored.lastName);
    onChangeEmail(stored.email);
    onChangePhoneNumber(stored.phoneNumber);
    setNotifyOrderStatus(stored.notifyOrderStatus);
    setNotifyPasswordChange(stored.notifyPasswordChange);
    setNotifySpecialOffers(stored.notifySpecialOffers);
    setNotifyNewsletter(stored.notifyNewsletter);

    setOriginalValues(stored);
  };

  useEffect(() => {
    loadData();
  }, []);

  const isChanged =
    firstName !== originalValues.firstName ||
    lastName !== originalValues.lastName ||
    email !== originalValues.email ||
    phoneNumber !== originalValues.phoneNumber ||
    notifyOrderStatus !== originalValues.notifyOrderStatus ||
    notifyPasswordChange !== originalValues.notifyPasswordChange ||
    notifySpecialOffers !== originalValues.notifySpecialOffers ||
    notifyNewsletter !== originalValues.notifyNewsletter;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await AsyncStorage.setItem('@profileImage', uri);
      setProfileImage(uri);
    }
  };

  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return input;

    const [, area, prefix, line] = match;
    if (area && prefix && line) return `(${area}) ${prefix}-${line}`;
    if (area && prefix) return `(${area}) ${prefix}`;
    if (area) return `(${area}`;
    return '';
  };

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView style={styles.innerContainer}>
        <View style={styles.vStack}>
          <Text style={styles.headerText}>Personal information</Text>
          <View style={styles.hStack}>
            <View style={styles.avatarContainer}>
              <Text style={{fontFamily: 'Karla', fontWeight: '500', fontSize: 19}}>Avatar</Text>
              <View style={styles.iconContainer}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.image} />
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: '#495E57',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#ffffff', fontFamily: 'Karla', fontWeight: '500', fontSize: 52 }}>{userInitials}</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.profileButtonContatiner}>
              <SecondaryButton
                text="Change"
                onPress={pickImage}
              />
              <TertiaryButton
                text="Remove"
                onPress={async () => {
                  await AsyncStorage.multiRemove(['@profileImage']);
                  setProfileImage(null);
                }}
              />
            </View>
          </View>
          <View style={styles.inputFieldStack}>
            <InputText
              value={firstName}
              onChangeText={onChangeFirstName}
              onBlur={() => setFirstNameTouched(true)}
              label='First Name *'
              mode='outlined'
              error={firstNameTouched && !ValidateName(firstName)}
            />
            {firstNameTouched && !ValidateName(firstName) && (
              <Text style={styles.errorText}>First name is required and must be at least 2 letters.</Text>
            )}
            <InputText
              value={lastName}
              onChangeText={onChangeLastName}
              onBlur={() => setLastNameTouched(true)}
              label='Last Name *'
              mode='outlined'
              error={lastNameTouched && !ValidateName(lastName)}
            />
            {lastNameTouched && !ValidateName(lastName) && (
              <Text style={styles.errorText}>Last name is required and must be at least 2 letters.</Text>
            )}
            <InputText
              value={email}
              onChangeText={onChangeEmail}
              onBlur={() => setEmailTouched(true)}
              keyboardType={'email-address'}
              label='Email *'
              mode='outlined'
              error={emailTouched && !ValidateEmail(email)}
            />
            {emailTouched && !ValidateEmail(email) && (
              <Text style={styles.errorText}>Email is required and must be valid.</Text>
            )}
            <InputText
              value={phoneNumber}
              onChangeText={(text) => {
                const formatted = formatPhoneNumber(text);
                onChangePhoneNumber(formatted);
              }}
              onBlur={() => setPhoneTouched(true)}
              keyboardType="phone-pad"
              label="Phone Number"
              mode="outlined"
              error={phoneTouched && !ValidatePhone(phoneNumber)}
            />
            {phoneTouched && !ValidatePhone(phoneNumber) && (
              <Text style={styles.errorText}>Phone number must be valid.</Text>
            )}
          </View>
          <View style={styles.vStack}>
            <Text style={styles.headerText}>Email notifications</Text>
            <View style={styles.checkboxStack}>
              <CustomCheckbox
                label="Order statuses"
                value={notifyOrderStatus}
                onValueChange={setNotifyOrderStatus}
              />
              <CustomCheckbox
                label="Password changes"
                value={notifyPasswordChange}
                onValueChange={setNotifyPasswordChange}
              />
              <CustomCheckbox
                label="Special offers"
                value={notifySpecialOffers}
                onValueChange={setNotifySpecialOffers}
              />
              <CustomCheckbox
                label="Newsletter"
                value={notifyNewsletter}
                onValueChange={setNotifyNewsletter}
              />
            </View>
          </View>
          <View style={styles.buttonStack}>
            <View style={styles.hStack}>
              <TertiaryButton
                text="Undo Changes"
                onPress={loadData}
              />
              <SecondaryButton
                text="Save"
                onPress={async () => {
                  try {
                    await AsyncStorage.multiSet([
                      ['@firstName', firstName],
                      ['@lastName', lastName],
                      ['@email', email],
                      ['@phoneNumber', phoneNumber],
                      ['@notifyOrderStatus', notifyOrderStatus.toString()],
                      ['@notifyPasswordChange', notifyPasswordChange.toString()],
                      ['@notifySpecialOffers', notifySpecialOffers.toString()],
                      ['@notifyNewsletter', notifyNewsletter.toString()],
                    ]);
                    setCtxFirstName(firstName);
                    setCtxLastName(lastName);
                    navigation.popToTop();
                  } catch (e) {
                    Alert.alert('Error', 'Failed to save changes.');
                  }
                }}
                disabled={!isChanged || !ValidateEmail(email) || !ValidateName(firstName) || !ValidateName(lastName) || !ValidatePhone(phoneNumber)}
                textColor={!isChanged || !ValidateEmail(email) || !ValidateName(firstName) || !ValidateName(lastName) || !ValidatePhone(phoneNumber)  ? '#ACACAC' : '#ffffff'}
                style={[
                { backgroundColor: !isChanged || !ValidateEmail(email) || !ValidateName(firstName) || !ValidateName(lastName) || !ValidatePhone(phoneNumber) ? '#F7F7F7' : '#495e57', minWidth: 150 }
                ]}
              />
            </View>
            <PrimaryButton
              text="Log Out"
              onPress={async () => {
                await AsyncStorage.multiRemove([
                  '@isOnboardingCompleted',
                  '@profileImage',
                  '@firstName',
                  '@lastName',
                  '@email',
                  '@phoneNumber',
                  '@notifyOrderStatus',
                  '@notifyPasswordChange',
                  '@notifySpecialOffers',
                  '@notifyNewsletter'
                ]);
                // await dropMenuTable();
                setProfileImage(null);
                setIsOnboardingCompleted(false);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  hStack: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  vStack: {
    flexDirection: 'column',
    gap: 20,
  },
  avatarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -10,
  },
  buttonStack: {
    flexDirection: 'column',
    gap: 30,
    paddingTop: 30,
    paddingBottom: 60,
  },
  inputFieldStack: {
    flexDirection: 'column',
    gap: 36,
  },
  checkboxStack: {
    flexDirection: 'column',
    gap: 8,
  },
  iconContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'left',
    paddingTop: 30,
    fontFamily: 'Karla',
    fontWeight: '800'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  errorText: {
    color: '#B3271E',
    fontSize: 13,
    marginTop: -26,
    marginBottom: -25,
    fontFamily: 'Karla',
    fontWeight: '500',
  },
  profileButtonContatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
    flexShrink: 1,
  }
});