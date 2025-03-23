import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PokemonDeleteConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="cancel" size={36} color="#f15e5e" />
            </View>
            <Text style={styles.modalTitle}>Are you sure?</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>Do you really want to delete this Pokémon? This process cannot be undone.</Text>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.modalButton, styles.btnSecondary]} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.btnDanger]} onPress={onConfirm}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20, // Add padding to ensure the modal is centered and has space around it
  },
  modalContent: {
    width: '80%', // Adjust the width to not take up the full screen
    maxWidth: 400, // Set a maximum width for larger screens
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalHeader: {
    borderBottom: 'none',
    position: 'relative',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f15e5e',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 26,
    margin: 30,
  },
  modalBody: {
    color: '#999',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 4,
    minWidth: 120,
    minHeight: 40,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  btnSecondary: {
    backgroundColor: '#c1c1c1',
  },
  btnDanger: {
    backgroundColor: '#f15e5e',
  },
});

export default PokemonDeleteConfirmationModal;