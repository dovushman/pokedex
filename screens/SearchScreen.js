import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Foundation from 'react-native-vector-icons/Foundation'; 
import DescriptionModal from '../components/DescriptionModal'; // Import the DescriptionModal

const SearchScreen = () => {
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's That Pokemon!</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <FontAwesome name="image" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Upload Image</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome name="camera" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Camera</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={() => setDescriptionModalVisible(true)}>
          <Ionicons name="text" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Description</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Foundation name="lightbulb" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Recommend</Text>
        </View>
      </View>

      <DescriptionModal
        visible={descriptionModalVisible}
        onClose={() => setDescriptionModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 150, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  cardText: {
    fontSize: 18,
    marginTop: 10, 
  },
  icon: {
    marginBottom: 10, 
  },
});

export default SearchScreen;
