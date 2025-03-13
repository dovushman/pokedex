import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Stats = ({ styles }) => {
  return (
    <View style={styles.tabContent}>
      <View style={styles.evHeader}>
        <Text style={styles.evText}>EV</Text>
      </View>
      {[
        { name: 'HP', value: 35 },
        { name: 'Atk', value: 55 },
        { name: 'Def', value: 40 },
        { name: 'SpA', value: 50 },
        { name: 'SpD', value: 50 },
        { name: 'Spe', value: 90 }
      ].map((stat) => (
        <View key={stat.name} style={styles.statRow}>
          <Text style={styles.statName}>{stat.name}</Text>
          <View style={styles.statBarContainer}>
            <View 
              style={[styles.statBar, { width: `${stat.value / 2}%` }]} 
            />
          </View>
        </View>
      ))}
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
  evHeader: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  evText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    width: 40,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  statBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#f0f4f8',
    borderRadius: 4,
  },
  statBar: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 4,
  },
});

export default Stats;