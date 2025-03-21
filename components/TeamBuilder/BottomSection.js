// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Ability from './Ability';

// const BottomSection = ({ pokemon, onShinyChange, onGenderChange }) => {
//   const [selectedGender, setSelectedGender] = useState(pokemon.gender || 'random');

//   const handleGenderChange = (itemValue) => {
//     setSelectedGender(itemValue);
//     onGenderChange(itemValue);
//   };

//   return (
//     <View style={styles.tabContent}>
//       <View style={styles.detailsGrid}>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Level</Text>
//           <View style={styles.detailValue}>
//             <Text style={styles.detailValueText}>{pokemon.level || 100}</Text>
//           </View>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Gender</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedGender}
//               onValueChange={handleGenderChange}
//               style={styles.picker}
//             >
//               <Picker.Item label="—" value="random" />
//               <Picker.Item label="Male" value="male" />
//               <Picker.Item label="Female" value="female" />
//             </Picker>
//           </View>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Shiny</Text>
//           <Switch
//             value={pokemon.shiny}
//             onValueChange={onShinyChange}
//           />
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Tera Type</Text>
//           <View style={styles.detailValue}>
//             <Text style={styles.detailValueText}>{pokemon.teraType || 'Electric'}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.abilityItemContainer}>
//         <View style={styles.halfWidth}>
//           <Text style={styles.detailLabel}>Item</Text>
//           <TextInput
//             style={styles.input}
//             value={pokemon.item || ''}
//             editable={false}
//           />
//         </View>
//         <Ability pokemon={pokemon} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabContent: {
//     backgroundColor: '#e5343d', // Adjusted background color
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//     padding: 12,
//     position: 'relative',
//   },
//   detailsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 15,
//   },
//   detailItem: {
//     width: '25%',
//     paddingHorizontal: 4,
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 4,
//     color: '#fff',
//   },
//   detailValue: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#a0a8b8',
//     borderRadius: 4,
//     padding: 8,
//     alignItems: 'center',
//     height: 40, // Ensure consistent height
//     justifyContent: 'center', // Center content vertically
//   },
//   detailValueText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#a0a8b8',
//     borderRadius: 4,
//     height: 40, // Ensure consistent height
//     justifyContent: 'center', // Center content vertically
//   },
//   picker: {
//     height: 40,
//     width: '100%',
//   },
//   abilityItemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   halfWidth: {
//     width: '48%',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#a0a8b8',
//     borderRadius: 4,
//     padding: 8,
//     fontSize: 14,
//     color: '#333',
//   },
//   typeTag: {
//     position: 'absolute',
//     right: 12,
//     bottom: 12,
//     backgroundColor: '#ffd700',
//     borderWidth: 1,
//     borderColor: '#d4af37',
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },
//   typeTagText: {
//     fontWeight: 'bold',
//     fontSize: 12,
//     color: '#333',
//   },
// });

// export default BottomSection;


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ability from './Ability';

const BottomSection = ({ pokemon, onShinyChange }) => {
  const [selectedGender, setSelectedGender] = useState(pokemon.gender || 'random');
  const [selectedTeraType, setSelectedTeraType] = useState(pokemon.teraType || 'Electric');
  const [genderOpen, setGenderOpen] = useState(false);
  const [teraTypeOpen, setTeraTypeOpen] = useState(false);

  const genderItems = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Random', value: 'random' },
  ];

  const teraTypeItems = [
    { label: 'Electric', value: 'electric' },
    { label: 'Fire', value: 'fire' },
    { label: 'Water', value: 'water' },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
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
              <DropDownPicker
                open={genderOpen}
                value={selectedGender}
                items={genderItems}
                setOpen={setGenderOpen}
                setValue={setSelectedGender}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                containerStyle={styles.dropdownContainerStyle}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Tera Type</Text>
              <DropDownPicker
                open={teraTypeOpen}
                value={selectedTeraType}
                items={teraTypeItems}
                setOpen={setTeraTypeOpen}
                setValue={setSelectedTeraType}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                containerStyle={styles.dropdownContainerStyle}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Shiny</Text>
              <Switch
                value={pokemon.shiny}
                onValueChange={onShinyChange}
              />
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
            <Ability pokemon={pokemon} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    backgroundColor: '#e5343d', // Adjusted background color
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
    height: 40, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
  },
  detailValueText: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    height: 40, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
  },
  dropdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    maxHeight: 150, // Set a max height to enable scrolling
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownPlaceholder: {
    color: '#a0a8b8',
  },
  dropdownContainerStyle: {
    height: 40, // Ensure consistent height
    borderRadius: 4,
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