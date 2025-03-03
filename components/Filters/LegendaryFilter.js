import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LegendaryFilter = ({ filterLegendary, setFilterLegendary, toggleFilterSection, expandedFilter }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => toggleFilterSection('legendary')} style={styles.filterToggle}>
        <Text style={styles.filterText}>Filter by Legendary</Text>
      </TouchableOpacity>
      {expandedFilter === 'legendary' && (
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.legendaryButton,
              filterLegendary === true && { backgroundColor: '#FFD700' }
            ]}
            onPress={() => setFilterLegendary(true)}
          >
            <Text style={[
              styles.legendaryText,
              filterLegendary === true && { color: 'white' }
            ]}>
              Legendary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.legendaryButton,
              filterLegendary === false && { backgroundColor: '#FFD700' }
            ]}
            onPress={() => setFilterLegendary(false)}
          >
            <Text style={[
              styles.legendaryText,
              filterLegendary === false && { color: 'white' }
            ]}>
              Non-Legendary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.legendaryButton,
              filterLegendary === null && { backgroundColor: '#FFD700' }
            ]}
            onPress={() => setFilterLegendary(null)}
          >
            <Text style={[
              styles.legendaryText,
              filterLegendary === null && { color: 'white' }
            ]}>
              All
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  legendaryButton: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  legendaryText: {
    fontWeight: 'bold',
    color: '#000',
  },
  filterToggle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    marginBottom: 8,
  },
  filterText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LegendaryFilter;