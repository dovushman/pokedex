// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { getPokemon, getPokemonSpecies } from '../services/api';
// import { speakDexEntry } from '../services/textToSpeech';
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
//   const [section, setSection] = useState('about');
//   const [selectedForm, setSelectedForm] = useState('default');
//   const [open, setOpen] = useState(false);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchPokemonData(pokemonId, selectedForm);
//   }, [pokemonId, selectedForm]);

//   const fetchPokemonData = async (id, form) => {
//     try {
//       const data = await getPokemon(id, form);
//       setPokemonData(data);
//       const species = await getPokemonSpecies(id);
//       setSpeciesData(species);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   if (!pokemonData || !speciesData) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={[{ key: 'content' }]}
//         renderItem={() => (
//           <View style={styles.contentContainer}>
//             <Text style={styles.name}>{pokemonData.name}</Text>
//             <Text style={styles.number}>#{pokemonData.id}</Text>
//             <View style={styles.imageContainer}>
//               <Image
//                 style={styles.image}
//                 source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
//                 contentFit="contain"
//               />
//             </View>
//             {items.length > 1 && (
//               <View style={styles.dropdownContainer}>
//                 <DropDownPicker
//                   open={open}
//                   value={selectedForm}
//                   items={items}
//                   setOpen={setOpen}
//                   setValue={setSelectedForm}
//                   setItems={setItems}
//                   style={styles.dropdown}
//                   dropDownContainerStyle={styles.dropdown}
//                 />
//               </View>
//             )}
//             <View style={styles.sectionButtons}>
//               <TouchableOpacity onPress={() => setSection('about')} style={styles.sectionButton}>
//                 <Text style={styles.sectionButtonText}>About</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setSection('battle')} style={styles.sectionButton}>
//                 <Text style={styles.sectionButtonText}>Battle</Text>
//               </TouchableOpacity>
//             </View>
//             <Button
//               title="Read Dex Entry"
//               onPress={() => {
//                 if (speciesData) {
//                   const dexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
//                   console.log('Button pressed, dex entry:', dexEntry);
//                   speakDexEntry(dexEntry);
//                 }
//               }}
//             />
//             {section === 'about' ? (
//               <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
//             ) : (
//               <PokemonInformationBattle pokemonData={pokemonData} />
//             )}
//           </View>
//         )}
//         keyExtractor={(item) => item.key}
//         contentContainerStyle={styles.container}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 70,
//     left: 25,
//     padding: 0,
//     zIndex: 1,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: 'blue',
//   },
//   dropdownContainer: {
//     margin: 10,
//   },
//   dropdown: {
//     backgroundColor: '#fafafa',
//   },
//   sectionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   sectionButton: {
//     padding: 10,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//   },
//   sectionButtonText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   number: {
//     fontSize: 18,
//     color: '#666',
//   },
//   imageContainer: {
//     marginVertical: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });

// export default PokemonInformation;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
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
                contentFit="contain"
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

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { getPokemon, getPokemonSpecies } from '../services/api';
// import { speakDexEntry } from '../services/textToSpeech';
// import PokemonInformationBattle from '../components/PokemonInformationBattle';
// import PokemonInformationAbout from '../components/PokemonInformationAbout';

// const PokemonInformation = ({ route, navigation }) => {
//   const { pokemonId } = route.params;
//   const [pokemonData, setPokemonData] = useState(null);
//   const [speciesData, setSpeciesData] = useState(null);
//   const [error, setError] = useState(null);
//   const [section, setSection] = useState('about');
//   const [selectedForm, setSelectedForm] = useState('default');
//   const [open, setOpen] = useState(false);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchPokemonData(pokemonId, selectedForm);
//   }, [pokemonId, selectedForm]);

//   const fetchPokemonData = async (id, form) => {
//     try {
//       const data = await getPokemon(id, form);
//       setPokemonData(data);
//       const species = await getPokemonSpecies(id);
//       setSpeciesData(species);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   if (error) return <Text>{error}</Text>;
//   if (!pokemonData || !speciesData) return <Text>Loading...</Text>;

//   return (
//     <SafeAreaView style={[styles.safeArea, { backgroundColor: getTypeColor(pokemonData.types[0].type.name) }]}>      
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>&#x2190; Back</Text>
//       </TouchableOpacity>
      
//       <FlatList
//         data={[{ key: 'content' }]}
//         renderItem={() => (
//           <View style={styles.contentContainer}>
//             <Text style={styles.name}>{pokemonData.name}</Text>
//             <Text style={styles.number}>#{pokemonData.id}</Text>
//             <Image style={styles.image} source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }} />
            
//             {items.length > 1 && (
//               <DropDownPicker
//                 open={open}
//                 value={selectedForm}
//                 items={items}
//                 setOpen={setOpen}
//                 setValue={setSelectedForm}
//                 setItems={setItems}
//                 style={styles.dropdown}
//               />
//             )}
            
//             <View style={styles.tabs}>
//               <TouchableOpacity onPress={() => setSection('about')} style={[styles.tab, section === 'about' && styles.activeTab]}>
//                 <Text style={styles.tabText}>About</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setSection('battle')} style={[styles.tab, section === 'battle' && styles.activeTab]}>
//                 <Text style={styles.tabText}>Battle</Text>
//               </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity style={styles.dexEntryButton} onPress={() => speakDexEntry(speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)}>
//               <Text style={styles.dexEntryText}>🔊 Read Dex Entry</Text>
//             </TouchableOpacity>
            
//             {section === 'about' ? (
//               <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
//             ) : (
//               <PokemonInformationBattle pokemonData={pokemonData} />
//             )}
//           </View>
//         )}
//         keyExtractor={(item) => item.key}
//         contentContainerStyle={styles.container}
//       />
//     </SafeAreaView>
//   );
// };

// const getTypeColor = (type) => {
//   const colors = {
//     fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
//     ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
//     flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
//     ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
//     fairy: '#EE99AC', normal: '#A8A878'
//   };
//   return colors[type] || '#A8A878';
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     zIndex: 1,
//   },
//   backButtonText: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   number: {
//     fontSize: 20,
//     color: 'white',
//     marginBottom: 10,
//   },
//   image: {
//     width: 220,
//     height: 220,
//     marginBottom: 20,
//   },
//   tabs: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 5,
//     marginVertical: 10,
//   },
//   tab: {
//     padding: 10,
//     flex: 1,
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dexEntryButton: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   dexEntryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default PokemonInformation;
