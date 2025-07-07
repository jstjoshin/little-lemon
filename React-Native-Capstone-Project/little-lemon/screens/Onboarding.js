import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ValidateEmail, ValidateName } from '../utils';
import { PrimaryButton } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileImageContext } from '../utils/ContextProvider';
import InputText from '../components/InputText';

const Onboarding = ({ setIsOnboardingCompleted }) => {
  const [email, onChangeEmail] = useState('');
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const { setFirstName: setCtxFirstName, setLastName: setCtxLastName } = useContext(ProfileImageContext);


  const onboardingComplete = async () => {
    await AsyncStorage.multiSet([
      ['@isOnboardingCompleted', 'true'],
      ['@email', email],
      ['@firstName', firstName],
      ['@lastName', lastName],
    ]);
    setCtxFirstName(firstName);
    setCtxLastName(lastName);
    setIsOnboardingCompleted(true);
  };

  const handleSubmit = () => {
    onboardingComplete()
  };

  return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView style={styles.innerContainer}>
      <View style={styles.vStack}>
        <Text style={styles.headerText}>Join now to place your order</Text>
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
        </View>
        <View style={styles.buttonStack}>
          <PrimaryButton
            onPress={async () => {
                await handleSubmit();
                }}
            disabled={!ValidateEmail(email) || !ValidateName(firstName) || !ValidateName(lastName)}
            textColor={!ValidateEmail(email) || !ValidateName(firstName) || !ValidateName(lastName) ? '#ACACAC' : '#000000'}
            style={[
            { backgroundColor: !ValidateEmail(email) || !ValidateName(firstName) || !ValidateName(lastName) ? '#f7f7f7' : '#F4CE14' }
            ]}
            text='Sign Up'
          />
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    padding: 20,
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
  headerText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'left',
    paddingTop: 30,
    fontFamily: 'Karla',
    fontWeight: '800',
  },
  iconImage: {
    width: 147.5,
    height: 40,
    marginBottom: 30,
    alignSelf: 'center',
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  button: {
    fontSize: 22,
    padding: 10,
    backgroundColor: '#495e57',
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: '0.2',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  errorText: {
    color: '#B3271E',
    fontSize: 14,
    marginTop: -27,
    marginBottom: -26,
    fontFamily: 'Karla',
    fontWeight: '500',
  }
});

