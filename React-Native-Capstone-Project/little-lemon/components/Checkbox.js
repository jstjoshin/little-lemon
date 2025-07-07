import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

const CustomCheckbox = ({ label, value, onValueChange }) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = typeof value === 'boolean';
  const checked = isControlled ? value : internalChecked;

  const handlePress = () => {
    if (isControlled && onValueChange) {
      onValueChange(!checked);
    } else {
      setInternalChecked(!checked);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={
          checked
            ? require('../assets/checkbox-checked.png')
            : require('../assets/checkbox-unchecked.png')
        }
        style={styles.checkbox}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 28,
    height: 28,
  },
  label: {
    marginLeft: 16,
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Karla', 
    fontWeight: '500',
  },
});

export default CustomCheckbox;