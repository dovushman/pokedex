// import React, { useEffect, useState } from "react";
// import { View, Text, Image, Modal, StyleSheet, Pressable, Button } from "react-native";
// import typeColors from '../utils/typeColors';
// import pokemonData from '../assets/pokemonData.json';

// // Utility function to capitalize the first letter of a string
// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const PokemonResultsModal = ({ results, isVisible, onClose, onNoneSelected }) => {
//   const [pokemonDetails, setPokemonDetails] = useState([]);

//   useEffect(() => {
//     if (results.length > 0) {
//       console.log('5 most likely Pokémon:', results);
//       const details = results.map((result) => {
//         const pokemon = pokemonData.find((p) => p.name.toLowerCase() === result.name.toLowerCase());
//         return {
//           ...result,
//           sprite: pokemon ? pokemon.sprite : null,
//           types: pokemon ? pokemon.types : [],
//         };
//       });
//       setPokemonDetails(details);
//     } else {
//       console.log('Results array is empty or not received');
//       setPokemonDetails([]);
//     }
//   }, [results]);

//   useEffect(() => {
//     if (isVisible) {
//       console.log('Modal is responding');
//     }
//   }, [isVisible]);

//   return (
//     <Modal visible={isVisible} animationType="slide" transparent>
//       <Pressable style={styles.modalBackground} onPress={onClose}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.header}>Here are the 5 most likely Pokémon. Is this who you're looking for?</Text>

//           <View style={styles.list}>
//             {pokemonDetails.map((pokemon) => (
//               <View key={pokemon.id} style={styles.card}>
//                 <Image source={{ uri: pokemon.sprite }} style={styles.sprite} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.name}>{pokemon.name}</Text>
//                   <View style={styles.typeContainer}>
//                     {pokemon.types.map((type) => (
//                       <Text key={type} style={[styles.typeBadge, { backgroundColor: typeColors[type] }]}>
//                         {capitalizeFirstLetter(type)}
//                       </Text>
//                     ))}
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>

//           <View style={styles.buttonContainer}>
//             <Button title="None of These?" onPress={onNoneSelected} color="#FF4C4C" />
//           </View>
//           <View style={styles.buttonContainer}>
//             <Button title="Close" onPress={onClose} color="#CCCCCC" />
//           </View>
//         </View>
//       </Pressable>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
//   },
//   modalContainer: {
//     width: "90%",
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   list: {
//     width: "100%",
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8F8F8",
//     borderRadius: 12,
//     padding: 12,
//     marginVertical: 6,
//     width: "100%",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sprite: {
//     width: 50,
//     height: 50,
//     marginRight: 12,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000", // Ensure the text color is visible
//   },
//   typeContainer: {
//     flexDirection: "row",
//     marginTop: 4,
//   },
//   typeBadge: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 10,
//     marginRight: 4,
//   },
//   buttonContainer: {
//     marginTop: 12,
//     width: "100%",
//   },
// });

// export default PokemonResultsModal;


import React, { useEffect, useState } from "react";
import { View, Text, Image, Modal, StyleSheet, Pressable, Button } from "react-native";
import typeColors from '../utils/typeColors';
import pokemonData from '../assets/pokemonData.json';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonResultsModal = ({ results, isVisible, onClose, onNoneSelected }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    if (results.length > 0) {
      console.log('5 most likely Pokémon:', results);
      const details = results.map((result) => {
        const pokemon = pokemonData.find((p) => p.name.toLowerCase() === result.name.toLowerCase());
        return {
          ...result,
          sprite: pokemon ? pokemon.sprite : null,
          types: pokemon ? pokemon.types : [],
        };
      });
      setPokemonDetails(details);
    } else {
      console.log('Results array is empty or not received');
      setPokemonDetails([]);
    }
  }, [results]);

  useEffect(() => {
    if (isVisible) {
      console.log('Modal is responding');
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Here are the 5 most likely Pokémon. Is this who you're looking for?</Text>

          <View style={styles.list}>
            {pokemonDetails.map((pokemon) => (
              <View key={pokemon.id} style={styles.card}>
                <Image source={{ uri: pokemon.sprite }} style={styles.sprite} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{pokemon.name}</Text>
                  <View style={styles.typeContainer}>
                    {pokemon.types.map((type) => (
                      <Text key={type} style={[styles.typeBadge, { backgroundColor: typeColors[type] }]}>
                        {capitalizeFirstLetter(type)}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button title="None of These?" onPress={onNoneSelected} color="#FF4C4C" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} color="#CCCCCC" />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sprite: {
    width: 80, // Increased width
    height: 80, // Increased height
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Ensure the text color is visible
  },
  typeContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  typeBadge: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 4,
  },
  buttonContainer: {
    marginTop: 12,
    width: "100%",
  },
});

export default PokemonResultsModal;