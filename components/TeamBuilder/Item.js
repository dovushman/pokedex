import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Item = ({ styles }) => {
  return (
    <View style={styles.halfWidth}>
      <Text style={styles.detailLabel}>Item</Text>
      <TextInput
        style={styles.input}
        value=""
        editable={false}
      />
    </View>
  );
};

export default Item;