import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const BottomSection = ({ pokemon }) => {
  return (
    <View style={styles.tabContent}>
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Level</Text>
          <View style={styles.detailValue}>
            <Text style={styles.detailValueText}>{pokemon.level || 100}</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gender</Text>
          <View style={styles.detailValue}>
            <Text style={styles.detailValueText}>{pokemon.gender || '—'}</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Shiny</Text>
          <View style={styles.detailValue}>
            <Text style={styles.detailValueText}>{pokemon.shiny ? 'Yes' : 'No'}</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tera Type</Text>
          <View style={styles.detailValue}>
            <Text style={styles.detailValueText}>{pokemon.teraType || 'Electric'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.abilityItemContainer}>
        <View style={styles.halfWidth}>
          <Text style={styles.detailLabel}>Item</Text>
          <TextInput
            style={styles.input}
            value={pokemon.item || ''}
            editable={false}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.detailLabel}>Ability</Text>
          <TextInput
            style={styles.input}
            value={pokemon.ability || 'Static'}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.typeTag}>
        <Text style={styles.typeTagText}>{pokemon.types ? pokemon.types.join(', ') : 'ELECTR'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    backgroundColor: '#e5343d', // Adjusted background color
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 12,
    position: 'relative',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  detailItem: {
    width: '25%',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#fff',
  },
  detailValue: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  detailValueText: {
    fontSize: 14,
    color: '#333',
  },
  abilityItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  typeTag: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#ffd700',
    borderWidth: 1,
    borderColor: '#d4af37',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  typeTagText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
});

export default BottomSection;