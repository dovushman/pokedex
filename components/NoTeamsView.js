import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NoTeamsView = ({ onCreateTeam }) => {
  return (
    <View style={styles.noTeamsContainer}>
      <Text style={styles.noTeamsHeader}>Create a Team</Text>
      <Text style={styles.noTeamsText}>
        Trying to build the perfect competitive team? Build it here! Choose the moves, natures, stats, and everything else here! Also, it can be exported to Showdown!
      </Text>
      <TouchableOpacity style={styles.newTeamButton} onPress={onCreateTeam}>
        <Text style={styles.newTeamButtonText}>New Team</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noTeamsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTeamsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  noTeamsText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  newTeamButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  newTeamButtonText: {
    fontSize: 16,
    color: '#e5343d',
    fontWeight: 'bold',
  },
});

export default NoTeamsView;