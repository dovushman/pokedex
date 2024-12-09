// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import DropDownPicker from 'react-native-dropdown-picker'; // Import DropDownPicker
// import { getPokemon, getPokemonSpecies } from '../services/api';
// import PokemonInformationBattle from '../components/PokemonInformationBattle';
// import PokemonInformationAbout from '../components/PokemonInformationAbout';

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const PokemonInformation = ({ route, navigation }) => {
//   const { pokemonId } = route.params;
//   const [pokemonData, setPokemonData] = useState(null);
//   const [speciesData, setSpeciesData] = useState(null);
//   const [error, setError] = useState(null);
//   const [section, setSection] = useState('about'); // State to manage the current section
//   const [selectedForm, setSelectedForm] = useState('default'); // State to manage the selected form
//   const [open, setOpen] = useState(false); // State to manage the dropdown visibility
//   const [items, setItems] = useState([]); // State to manage the dropdown items

//   useEffect(() => {
//     fetchPokemonData(pokemonId, selectedForm);
//   }, [pokemonId, selectedForm]);

//   useEffect(() => {
//     if (speciesData) {
//       const alternateForms = speciesData.varieties.filter(variety => variety.pokemon.name !== pokemonData.name.toLowerCase());
//       const formItems = [
//         { label: 'Default', value: 'default' },
//         ...alternateForms.map(variety => ({
//           label: capitalizeFirstLetter(variety.pokemon.name),
//           value: variety.pokemon.name
//         }))
//       ];
//       setItems(formItems);
//     }
//   }, [speciesData]);

//   const fetchPokemonData = async (id, form) => {
//     try {
//       const data = await getPokemon(id, form);
//       setPokemonData(data);
//       const species = await getPokemonSpecies(id);
//       setSpeciesData(species);
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       console.error('Error fetching Pokémon data:', error);
//       setError('An error occurred while fetching Pokémon data.');
//       setPokemonData(null);
//       setSpeciesData(null);
//     }
//   };

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   if (!pokemonData || !speciesData) {
//     return <Text>Loading...</Text>;
//   }

//   const renderContent = () => {
//     return (
//       <View style={styles.contentContainer}>
//         <Text style={styles.name}>{pokemonData.name}</Text>
//         <Text style={styles.number}>#{pokemonData.id}</Text>
//         <View style={styles.imageContainer}>
//           <Image
//             style={styles.image}
//             source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
//           />
//         </View>
//         {items.length > 1 && (
//           <View style={styles.dropdownContainer}>
//             <DropDownPicker
//               open={open}
//               value={selectedForm}
//               items={items}
//               setOpen={setOpen}
//               setValue={setSelectedForm}
//               setItems={setItems}
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdown}
//             />
//           </View>
//         )}
//         <View style={styles.sectionButtons}>
//           <TouchableOpacity onPress={() => setSection('about')} style={styles.sectionButton}>
//             <Text style={styles.sectionButtonText}>About</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setSection('battle')} style={styles.sectionButton}>
//             <Text style={styles.sectionButtonText}>Battle</Text>
//           </TouchableOpacity>
//         </View>
//         {section === 'about' ? (
//           <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
//         ) : (
//           <PokemonInformationBattle pokemonData={pokemonData} />
//         )}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={[{ key: 'content' }]}
//         renderItem={renderContent}
//         keyExtractor={(item) => item.key}
//         contentContainerStyle={styles.container}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 70, // Adjust this value to move the button down
//     left: 25, // Adjust this value to move the button to the right
//     padding: 0,
//     zIndex: 1, // Ensure the button is on top
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: 'blue', // Set the text color to blue
//   },
//   imageContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20, // Add margin to push the image down
//     marginBottom: 16,
//   },
//   image: {
//     width: 240, // Adjust the size as needed
//     height: 240, // Adjust the size as needed
//     resizeMode: 'contain', // Maintain aspect ratio and fit within the container
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textTransform: 'capitalize',
//     marginTop: 16,
//     color: '#333',
//   },
//   number: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 8,
//     color: '#666',
//   },
//   dropdownContainer: {
//     width: '80%',
//     marginVertical: 16,
//   },
//   dropdown: {
//     backgroundColor: '#fff',
//     borderColor: '#ddd',
//   },
//   sectionButtons: {
//     flexDirection: 'row',
//     marginTop: 16,
//   },
//   sectionButton: {
//     marginHorizontal: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     backgroundColor: '#ddd',
//     borderRadius: 8,
//   },
//   sectionButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default PokemonInformation;import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { getPokemon, getPokemonSpecies } from '../services/api';
import { speakDexEntry } from '../services/textToSpeech';
import PokemonInformationBattle from '../components/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformationAbout';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonInformation = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('about');
  const [selectedForm, setSelectedForm] = useState('default');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPokemonData(pokemonId, selectedForm);
  }, [pokemonId, selectedForm]);

  const fetchPokemonData = async (id, form) => {
    try {
      const data = await getPokemon(id, form);
      setPokemonData(data);
      const species = await getPokemonSpecies(id);
      setSpeciesData(species);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!pokemonData || !speciesData) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{pokemonData.name}</Text>
            <Text style={styles.number}>#{pokemonData.id}</Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
              />
            </View>
            {items.length > 1 && (
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={open}
                  value={selectedForm}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedForm}
                  setItems={setItems}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdown}
                />
              </View>
            )}
            <View style={styles.sectionButtons}>
              <TouchableOpacity onPress={() => setSection('about')} style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSection('battle')} style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Battle</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Read Dex Entry"
              onPress={() => {
                if (speciesData) {
                  const dexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
                  console.log('Button pressed, dex entry:', dexEntry);
                  speakDexEntry(dexEntry);
                }
              }}
            />
            {section === 'about' ? (
              <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
            ) : (
              <PokemonInformationBattle pokemonData={pokemonData} />
            )}
          </View>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 25,
    padding: 0,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  dropdownContainer: {
    margin: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sectionButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  sectionButtonText: {
    fontSize: 16,
    color: '#000',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 18,
    color: '#666',
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PokemonInformation;