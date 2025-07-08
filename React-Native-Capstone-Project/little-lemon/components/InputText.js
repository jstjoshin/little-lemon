import React from 'react';
import { TextInput } from 'react-native-paper';

const InputText = (props) => (
  <TextInput
    {...props}
    contentStyle={{ fontFamily: 'Karla', fontWeight: 500, marginVertical: 2 }}
    style={[{ fontSize: 21 }, props.style]}
  />
);

export default InputText;