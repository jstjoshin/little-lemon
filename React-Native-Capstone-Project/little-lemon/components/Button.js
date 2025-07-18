import React from 'react';
import { Button } from 'react-native-paper';

const PrimaryButton = ({
  icon = '',
  labelStyle,
  style,
  mode = 'contained',
  onPress = '',
  text = 'button text',
  loading = false,
  disabled = false,
  textColor = '#000000',
  ...rest
}) => {
  const computedLabelStyle = {
    fontSize: 21,
    color: textColor,
    fontFamily: 'Karla',
    fontWeight: '800',
    marginVertical: 21,
    marginHorizontal: 16,
    flexGrow: 1,
    ...(labelStyle || {}),
  };
  const computedStyle = {
    borderRadius: 16,
    backgroundColor: '#F4CE14',
    flexGrow: 1,
    ...(style || {}),
  };
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      style={[computedStyle, style]}
      loading={loading}
      disabled={disabled}
      labelStyle={computedLabelStyle}
      {...rest}
    >
      {text}
    </Button>
  );
};

const SecondaryButton = ({
  icon = '',
  labelStyle,
  style,
  mode = 'contained',
  onPress = '',
  text = 'button text',
  loading = false,
  disabled = false,
  textColor = '#ffffff',
  ...rest
}) => {
  const computedLabelStyle = {
    fontSize: 20,
    color: textColor,
    fontFamily: 'Karla',
    fontWeight: '700',
    marginVertical: 21,
    marginHorizontal: 12,
    flexGrow: 1,
    ...(labelStyle || {}),
  };
  const computedStyle = {
    borderRadius: 16,
    flexGrow: 1,
    ...(style || {}),
  };
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      style={[computedStyle, style]}
      loading={loading}
      disabled={disabled}
      labelStyle={computedLabelStyle}
      {...rest}
    >
      {text}
    </Button>
  );
};

const TertiaryButton = ({
  icon = '',
  labelStyle,
  style,
  mode = 'contained',
  onPress = '',
  text = 'button text',
  loading = false,
  disabled = false,
  textColor = '#495E57',
  bgColor = '#EDEFEE',
  ...rest
}) => {
  const computedLabelStyle = {
    fontSize: 20,
    color: textColor,
    fontFamily: 'Karla',
    fontWeight: '700',
    marginVertical: 21,
    marginHorizontal: 12,
    flexGrow: 1,
    ...(labelStyle || {}),
  };
  const computedStyle = {
    borderRadius: 16,
    backgroundColor: bgColor,
    flexGrow: 1,
    ...(style || {}),
  };
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      style={computedStyle}
      loading={loading}
      disabled={disabled}
      labelStyle={computedLabelStyle}
      {...rest}
    >
      {text}
    </Button>
  );
};

export { PrimaryButton, SecondaryButton, TertiaryButton };