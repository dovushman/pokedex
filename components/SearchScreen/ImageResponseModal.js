import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Image } from 'expo-image';
import typeColors from '../../utils/typeColors';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ImageResponseModal = ({ results, isVisible, onClose, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        onClose();
        navigation.navigate('PokemonInformation', { pokemonId: item.id, reopenModal: true });
      }}
    >
      <Image source={{ uri: item.sprite }} style={styles.sprite} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{capitalizeFirstLetter(item.name)}</Text>
        <View style={styles.typeContainer}>
          {item.types.map((type) => (
            <Text key={type} style={[styles.typeBadge, { backgroundColor: typeColors[type] }]}>
              {capitalizeFirstLetter(type)}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {results.length > 0 && (
            <Text style={styles.header}>It's {capitalizeFirstLetter(results[0].name)}!</Text>
          )}
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            style={styles.list}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "86%",
    backgroundColor: "#e5343d",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
    color: "white",
  },
  list: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C62828",
    borderRadius: 12,
    padding: 11,
    marginVertical: 7,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  sprite: {
    width: 75,
    height: 75,
    marginRight: 11,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  typeContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  typeBadge: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 5,
    color: "white",
  },
  primaryButton: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 22,
    marginTop: 18,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ImageResponseModal;