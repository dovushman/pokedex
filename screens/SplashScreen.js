// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const SplashScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>PocketDex</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f1f1f1',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
// });

// export default SplashScreen;
// SplashScreen.js
// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.replace('MainTabs');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;