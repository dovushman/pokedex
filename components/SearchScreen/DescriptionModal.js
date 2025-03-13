import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';

const DescriptionModal = ({ visible, onClose }) => {
  const [description, setDescription] = useState('');
  const [identifiedPokemon, setIdentifiedPokemon] = useState(null);

  const handleDescriptionSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/description', { description });
      console.log('Response from backend:', response.data);
      setIdentifiedPokemon(response.data.identifiedPokemon);
    } catch (error) {
      console.error('Error sending description to backend:', error);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Describe your Pokémon"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Submit" onPress={handleDescriptionSubmit} />
          <Button title="Cancel" onPress={onClose} />
          {identifiedPokemon && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Identified Pokémon:</Text>
              <Text style={styles.resultText}>{JSON.stringify(identifiedPokemon, null, 2)}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: 'green',
  },
});

export default DescriptionModal;
