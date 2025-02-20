import React from 'react';
import { View, Text, TouchableOpacity, Animated, SafeAreaView, StyleSheet } from 'react-native';
import TypeFilter from './TypeFilter'; 

const FilterMenu = ({
  isFilterMenuOpen,
  isAnimating,
  slideAnim,
  toggleFilterMenu,
  expandedFilter,
  toggleFilterSection,
  selectedTypes,
  setSelectedTypes,
  filterGeneration,
  setFilterGeneration,
  filterLegendary,
  setFilterLegendary,
  clearFilters,
}) => {
  return (
    (isFilterMenuOpen || isAnimating) && (
      <TouchableOpacity style={styles.overlay} onPress={toggleFilterMenu}>
        <Animated.View style={[styles.sidePanel, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalInnerContent}>
              <Text style={[styles.modalHeader, { marginTop: 60 }]}>Filters</Text>

              {/* Type Filter */}
              <TypeFilter
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                toggleFilterSection={toggleFilterSection}
                expandedFilter={expandedFilter}
              />

              {/* Generation Filter */}
              <TouchableOpacity onPress={() => toggleFilterSection('generation')} style={styles.filterToggle}>
                <Text style={styles.filterText}>Filter by Generation</Text>
              </TouchableOpacity>
              {expandedFilter === 'generation' && (
                <View style={styles.filterOptions}>
                  {['1', '2', '3', '4'].map((gen) => (
                    <TouchableOpacity key={gen} onPress={() => setFilterGeneration(parseInt(gen))} style={styles.filterButton}>
                      <Text style={styles.filterButtonText}>Gen {gen}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Legendary Filter */}
              <TouchableOpacity onPress={() => toggleFilterSection('legendary')} style={styles.filterToggle}>
                <Text style={styles.filterText}>Filter by Legendary</Text>
              </TouchableOpacity>
              {expandedFilter === 'legendary' && (
                <View style={styles.filterOptions}>
                  <TouchableOpacity onPress={() => setFilterLegendary(true)} style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Legendary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFilterLegendary(false)} style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Non-Legendary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFilterLegendary(null)} style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>All</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Apply and Clear Filters */}
              <View style={styles.filterActions}>
                <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFilterMenu} style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidePanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    paddingTop: 48, // Add more padding to the top to avoid the camera notch
    paddingHorizontal: 16,
  },
  modalInnerContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 60, // Add extra margin to the top of the header
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
  filterOptions: {
    marginTop: 8,
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  clearButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#388e3c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default FilterMenu;