import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ValidateEmail, ValidateName } from '../utils';
import { PrimaryButton } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileImageContext } from '../utils/ContextProvider';
import InputText from '../components/InputText';
import Hero from '../components/Hero';

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
    <ScrollView>
      <View style={styles.heroContainer}>
        <Hero />
      </View>
      <View style={styles.innerContainer}>
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
  heroContainer: {
    borderBottomWidth: 25,
    borderBottomColor: '#495E57',
  },
  innerContainer: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  hStack: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  buttonStack: {
    flexDirection: 'column',
    gap: 30,
    paddingTop: 50,
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
  errorText: {
    color: '#B3271E',
    fontSize: 14,
    marginTop: -27,
    marginBottom: -26,
    fontFamily: 'Karla',
    fontWeight: '500',
  },
});

