import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Ability = ({ styles }) => {
  return (
    <View style={styles.halfWidth}>
      <Text style={styles.detailLabel}>Ability</Text>
      <TextInput
        style={styles.input}
        value="Static"
        editable={false}
      />
    </View>
  );
};

export default Ability;