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


// ------------------------------------------------------------------------------------------------------

/*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import DropDownPicker from 'react-native-dropdown-picker';
import { getPokemon, getPokemonSpecies } from '../services/api';
import { speakDexEntry } from '../services/textToSpeech';
import PokemonInformationBattle from '../components/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformationAbout';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&#x2190; Back</Text>
        </TouchableOpacity>
        
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{capitalizeFirstLetter(pokemonData.name)}</Text>
              <Text style={styles.number}>#{pokemonData.id}</Text>
              <Image style={styles.image} source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }} />
              
              {items.length > 1 && (
                <DropDownPicker
                  open={open}
                  value={selectedForm}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedForm}
                  setItems={setItems}
                  style={styles.dropdown}
                />
              )}
              
              <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setSection('about')} style={[styles.tab, section === 'about' && styles.activeTab]}>
                  <Text style={styles.tabText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSection('battle')} style={[styles.tab, section === 'battle' && styles.activeTab]}>
                  <Text style={styles.tabText}>Battle</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.dexEntryButton} onPress={() => speakDexEntry(speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)}>
                <Text style={styles.dexEntryText}>🔊 Read Dex Entry</Text>
              </TouchableOpacity>
              
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
    </LinearGradient>
  );
};

const getTypeColor = (type) => {
  const colors = {
    fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
    ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
    flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
    ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
    fairy: '#EE99AC', normal: '#A8A878'
  };
  return colors[type] || '#A8A878';
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  number: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  // tabs: {
  //   flexDirection: 'row',
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 5,
  //   marginVertical: 10,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5,
  // },
  // tab: {
  //   padding: 10,
  //   flex: 1,
  //   alignItems: 'center',
  // },
  // activeTab: {
  //   backgroundColor: '#ddd',
  //   borderRadius: 5,
  // },
  // tabText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginVertical: 12,
    padding: 4,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  
  dexEntryButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dexEntryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PokemonInformation;
*/

// ------------------------------------------------------------------------------------------------------
// Main page

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { getPokemon, getPokemonSpecies } from '../services/api';
// import { speakDexEntry } from '../services/textToSpeech';
// import PokemonInformationBattle from '../components/PokemonInformationBattle';
// import PokemonInformationAbout from '../components/PokemonInformationAbout';
// import { LinearGradient } from 'expo-linear-gradient';

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const getTypeColor = (type) => {
//   const colors = {
//     fire: ['#F08030', '#F7B780'], water: ['#6890F0', '#90CAF9'], grass: ['#78C850', '#A5D6A7'], electric: ['#F8D030', '#FFF59D'],
//     ice: ['#98D8D8', '#B2EBF2'], fighting: ['#C03028', '#E57373'], poison: ['#A040A0', '#CE93D8'], ground: ['#E0C068', '#D7CCC8'],
//     flying: ['#A890F0', '#BBDEFB'], psychic: ['#F85888', '#F06292'], bug: ['#A8B820', '#AED581'], rock: ['#B8A038', '#D4C152'],
//     ghost: ['#705898', '#9575CD'], dragon: ['#7038F8', '#81D4FA'], dark: ['#705848', '#A1887F'], steel: ['#B8B8D0', '#CFD8DC'],
//     fairy: ['#EE99AC', '#F8BBD0'], normal: ['#A8A878', '#CFCFCF']
//   };
//   return colors[type] || ['#A8A878', '#CFCFCF'];
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

//   const gradientColors = pokemonData.types.length > 0
//     ? getTypeColor(pokemonData.types[0].type.name)
//     : ['#A8A878', '#CFCFCF'];

//   return (
//     <LinearGradient
//       colors={gradientColors}
//       style={styles.gradient}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>&#x2190; Back</Text>
//         </TouchableOpacity>
        
//         <FlatList
//           data={[{ key: 'content' }]}
//           renderItem={() => (
//             <View style={styles.contentContainer}>
//               <Text style={styles.name}>{capitalizeFirstLetter(pokemonData.name)}</Text>
//               <Text style={styles.number}>#{pokemonData.id}</Text>
//               <Image style={styles.image} source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }} />
              
//               {items.length > 1 && (
//                 <DropDownPicker
//                   open={open}
//                   value={selectedForm}
//                   items={items}
//                   setOpen={setOpen}
//                   setValue={setSelectedForm}
//                   setItems={setItems}
//                   style={styles.dropdown}
//                 />
//               )}

//               <View style={styles.tabs}>
//                 <TouchableOpacity onPress={() => setSection('about')} style={[styles.tab, section === 'about' && styles.activeTab]}>
//                   <Text style={styles.tabText}>About</Text>
//                   {section === 'about' && <View style={styles.activeUnderline} />}
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setSection('battle')} style={[styles.tab, section === 'battle' && styles.activeTab]}>
//                   <Text style={styles.tabText}>Battle</Text>
//                   {section === 'battle' && <View style={styles.activeUnderline} />}
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity style={styles.dexEntryButton} onPress={() => speakDexEntry(speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)}>
//                 <Text style={styles.dexEntryText}>🔊 Read Dex Entry</Text>
//               </TouchableOpacity>
              
//               {section === 'about' ? (
//                 <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
//               ) : (
//                 <PokemonInformationBattle pokemonData={pokemonData} />
//               )}
//             </View>
//           )}
//           keyExtractor={(item) => item.key}
//           contentContainerStyle={styles.container}
//         />
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
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
//     fontSize: 36, // Increased font size
//     fontWeight: 'bold',
//     color: 'white',
//     textShadowColor: 'rgba(0, 0, 0, 0.3)', // Refined shadow
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//     marginBottom: 5,
//   },
//   number: {
//     fontSize: 18, // Smaller number font
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginBottom: 10,
//   },
//   image: {
//     width: 250, // increased size
//     height: 250,
//     marginBottom: 20,
//     borderRadius: 10,
//     //removed border
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 20, // More pronounced border radius
//     marginVertical: 12,
//     padding: 4,
//   },
//   tab: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20, // Match the tabs container
//     position: 'relative', // For underline positioning
//   },
//   activeTab: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3, // For Android shadow
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   activeUnderline: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 3,
//     backgroundColor: 'white',
//     borderRadius: 2,
//   },
//   dexEntryButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
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

// ------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import DropDownPicker from 'react-native-dropdown-picker';
import { getPokemon, getPokemonSpecies } from '../services/api';
import { getPokemonFormsByBaseId } from '../services/database/pokemonDatabase';
import { speakDexEntry } from '../services/textToSpeech';
import PokemonInformationBattle from '../components/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformationAbout';
import { LinearGradient } from 'expo-linear-gradient';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getTypeColor = (type) => {
  const colors = {
    fire: ['#F08030', '#F7B780'], water: ['#6890F0', '#90CAF9'], grass: ['#78C850', '#A5D6A7'], electric: ['#F8D030', '#FFF59D'],
    ice: ['#98D8D8', '#B2EBF2'], fighting: ['#C03028', '#E57373'], poison: ['#A040A0', '#CE93D8'], ground: ['#E0C068', '#D7CCC8'],
    flying: ['#A890F0', '#BBDEFB'], psychic: ['#F85888', '#F06292'], bug: ['#A8B820', '#AED581'], rock: ['#B8A038', '#D4C152'],
    ghost: ['#705898', '#9575CD'], dragon: ['#7038F8', '#81D4FA'], dark: ['#705848', '#A1887F'], steel: ['#B8B8D0', '#CFD8DC'],
    fairy: ['#EE99AC', '#F8BBD0'], normal: ['#A8A878', '#CFCFCF']
  };
  return colors[type] || ['#A8A878', '#CFCFCF'];
};

const PokemonInformation = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('about');
  const [selectedForm, setSelectedForm] = useState('default');
  const [open, setOpen] = useState(false);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchPokemonData(pokemonId, selectedForm);
  }, [pokemonId, selectedForm]);

  const fetchPokemonData = async (id, form) => {
    try {
      const data = await getPokemon(id, form);
      setPokemonData(data);
      const species = await getPokemonSpecies(id);
      setSpeciesData(species);

      // Fetch all forms based on base_id
      const formsData = await getPokemonFormsByBaseId(data.id);
      const forms = formsData.map((form) => ({
        label: capitalizeFirstLetter(form.name),
        value: form.name,
      }));

      setForms(forms);
      console.log('Forms:', forms); // Add console log to print the forms array
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  if (error) {
    return <Text>Error: {error}</Text>; // Display error message
  }

  if (!pokemonData || !speciesData) {
    return <Text>Loading...</Text>;
  }

  const gradientColors = pokemonData.types.length > 0
    ? getTypeColor(pokemonData.types[0].type.name)
    : ['#A8A878', '#CFCFCF'];

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&#x2190; Back</Text>
        </TouchableOpacity>
        
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{capitalizeFirstLetter(pokemonData.name)}</Text>
              <Text style={styles.number}>#{pokemonData.id}</Text>
              <Image style={styles.image} source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }} />
              
              {forms.length > 1 && (
                <View style={styles.dropdownWrapper}>
                  <DropDownPicker
                    open={open}
                    value={selectedForm}
                    items={forms}
                    setOpen={setOpen}
                    setValue={setSelectedForm}
                    setItems={setForms}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    placeholderStyle={styles.dropdownPlaceholder}
                    containerStyle={styles.dropdownContainerStyle}
                  />
                </View>
              )}

              <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setSection('about')} style={[styles.tab, section === 'about' && styles.activeTab]}>
                  <Text style={styles.tabText}>About</Text>
                  {section === 'about' && <View style={styles.activeUnderline} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSection('battle')} style={[styles.tab, section === 'battle' && styles.activeTab]}>
                  <Text style={styles.tabText}>Battle</Text>
                  {section === 'battle' && <View style={styles.activeUnderline} />}
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.dexEntryButton} onPress={() => speakDexEntry(speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)}>
                <Text style={styles.dexEntryText}>🔊 Read Dex Entry</Text>
              </TouchableOpacity>
              
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 36, // Increased font size
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Refined shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 5,
  },
  number: {
    fontSize: 18, // Smaller number font
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
  },
  image: {
    width: 250, // increased size
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    //removed border
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20, // More pronounced border radius
    marginVertical: 12,
    padding: 4,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Match the tabs container
    position: 'relative', // For underline positioning
  },
  activeTab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  dexEntryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dexEntryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    width: '80%', // Adjust width as needed
    marginBottom: 20,
    zIndex: 10, // Ensure it's above other elements
    },
    dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0,
    borderRadius: 10,
    },
    dropdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0,
    borderRadius: 10,
    },
    dropdownText: {
    fontSize: 16,
    color: 'black', // Improved readability
    },
    dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
    },
    dropdownContainerStyle: {
    borderRadius: 10,
    },
});

export default PokemonInformation;


// ------------------------------------------------------------------------------------------

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
//     <SafeAreaView style={[styles.safeArea, { backgroundColor: getTypeColor(pokemonData.types[0].type.name) }]}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>&#x2190; Back</Text>
//       </TouchableOpacity>
      
//       <FlatList
//         data={[{ key: 'content' }]}
//         renderItem={() => (
//           <View style={styles.contentContainer}>
//             <Text style={styles.name}>{capitalizeFirstLetter(pokemonData.name)}</Text>
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

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     top: 50,
// //     left: 20,
// //     zIndex: 1,
// //   },
// //   backButtonText: {
// //     fontSize: 18,
// //     color: 'white',
// //     fontWeight: 'bold',
// //   },
// //   contentContainer: {
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   name: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   number: {
// //     fontSize: 20,
// //     color: 'white',
// //     marginBottom: 10,
// //   },
// //   image: {
// //     width: 220,
// //     height: 220,
// //     marginBottom: 20,
// //   },
// //   tabs: {
// //     flexDirection: 'row',
// //     backgroundColor: 'white',
// //     borderRadius: 10,
// //     padding: 5,
// //     marginVertical: 10,
// //   },
// //   tab: {
// //     padding: 10,
// //     flex: 1,
// //     alignItems: 'center',
// //   },
// //   activeTab: {
// //     backgroundColor: '#ddd',
// //     borderRadius: 5,
// //   },
// //   tabText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   dexEntryButton: {
// //     backgroundColor: '#fff',
// //     padding: 10,
// //     borderRadius: 10,
// //     marginTop: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 5,
// //   },
// //   dexEntryText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
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
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 10,
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
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   tabs: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 5,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
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