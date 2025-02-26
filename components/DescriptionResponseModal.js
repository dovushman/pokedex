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
//             <Button title="None of These?" onPress={onNoneSelected} color="#FFD700" />
//           </View>
//           <View style={styles.buttonContainer}>
//             <Button title="Close" onPress={onClose} color="#CCCCCC" />
//           </View>
//         </View>
//       </Pressable>
//     </Modal>
//   );
// };

// // const styles = StyleSheet.create({
// //   modalBackground: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
// //   },
// //   modalContainer: {
// //     width: "90%",
// //     backgroundColor: "#fff",
// //     padding: 20,
// //     borderRadius: 16,
// //     alignItems: "center",
// //     shadowColor: "#000",
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     elevation: 5,
// //   },
// //   header: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 16,
// //   },
// //   list: {
// //     width: "100%",
// //   },
// //   card: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#F8F8F8",
// //     borderRadius: 12,
// //     padding: 12,
// //     marginVertical: 6,
// //     width: "100%",
// //     shadowColor: "#000",
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   sprite: {
// //     width: 80, // Increased width
// //     height: 80, // Increased height
// //     marginRight: 12,
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   name: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     color: "#000", // Ensure the text color is visible
// //   },
// //   typeContainer: {
// //     flexDirection: "row",
// //     marginTop: 4,
// //   },
// //   typeBadge: {
// //     color: "white",
// //     fontSize: 12,
// //     fontWeight: "bold",
// //     paddingHorizontal: 8,
// //     paddingVertical: 4,
// //     borderRadius: 10,
// //     marginRight: 4,
// //   },
// //   buttonContainer: {
// //     marginTop: 12,
// //     width: "100%",
// //   },
// // });


// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
//   },
//   modalContainer: {
//     width: "86%", // Reduced width from 90% to 85%
//     backgroundColor: "#e5343d",
//     padding: 20,
//     borderRadius: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 5,
//     // height: "85.5%", // Added height
    
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//     color: "white", // Ensure the text color is visible
//   },
//   list: {
//     width: "100%",
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     // backgroundColor: "#F8F8F8",
//     // backgroundColor: "#d32f2f",
//     // backgroundColor: "#C62828",
//     // backgroundColor: "#e5343d",
//     backgroundColor: "#F54F56",
//     borderRadius: 12,
//     padding: 10, // Reduced padding from 12 to 10
//     marginVertical: 4, // Reduced margin from 6 to 4
//     width: "100%",
//     height: 90, // Added height
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sprite: {
//     width: 80, // Increased width
//     height: 80, // Increased height
//     marginRight: 12,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white", // Ensure the text color is visible
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
import { View, Text, Image, Modal, StyleSheet, Pressable } from "react-native";
import typeColors from "../utils/typeColors";
import pokemonData from "../assets/pokemonData.json";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonResultsModal = ({ results, isVisible, onClose, onNoneSelected }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    if (results.length > 0) {
      console.log("5 most likely Pokémon:", results);
      const details = results.map((result) => {
        const pokemon = pokemonData.find(
          (p) => p.name.toLowerCase() === result.name.toLowerCase()
        );
        return {
          ...result,
          sprite: pokemon ? pokemon.sprite : null,
          types: pokemon ? pokemon.types : [],
        };
      });
      setPokemonDetails(details);
    } else {
      console.log("Results array is empty or not received");
      setPokemonDetails([]);
    }
  }, [results]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>
           It's one of these Pokémon!
          </Text>
          <View style={styles.list}>
            {pokemonDetails.map((pokemon) => (
              <View key={pokemon.id} style={styles.card}>
                <Image source={{ uri: pokemon.sprite }} style={styles.sprite} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{pokemon.name}</Text>
                  <View style={styles.typeContainer}>
                    {pokemon.types.map((type) => (
                      <Text
                        key={type}
                        style={[
                          styles.typeBadge,
                          { backgroundColor: typeColors[type] },
                        ]}
                      >
                        {capitalizeFirstLetter(type)}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <Pressable style={styles.primaryButton} onPress={onNoneSelected}>
            <Text style={styles.primaryButtonText}>None of These?</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryButtonText}>Close</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

// Larger style

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContainer: {
    width: "86%",
    backgroundColor: "#e5343d", // Red modal background
    padding: 18, // Slightly reduced padding
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
    marginBottom: 14, // Slightly reduced margin
    color: "white",
  },
  list: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C62828", // Darker red for contrast
    borderRadius: 12,
    padding: 11, // Slightly reduced padding
    marginVertical: 7, // Slightly reduced margin
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  sprite: {
    width: 75, // Slightly reduced width
    height: 75, // Slightly reduced height
    marginRight: 11, // Slightly reduced margin
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  typeContainer: {
    flexDirection: "row",
    marginTop: 3, // Slightly reduced margin
  },
  typeBadge: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 7, // Slightly reduced padding
    paddingVertical: 3, // Slightly reduced padding
    borderRadius: 8,
    marginRight: 5, // Slightly reduced margin
    color: "white",
  },
  primaryButton: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingVertical: 13, // Slightly reduced padding
    paddingHorizontal: 22, // Slightly reduced padding
    marginTop: 18, // Slightly reduced margin
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  secondaryButton: {
    marginTop: 11, // Slightly reduced margin
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9, // Slightly reduced padding
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E0E0E0",
  },
});

export default PokemonResultsModal;

//Smaller Style
/*
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContainer: {
    width: "86%",
    backgroundColor: "#e5343d", // Red modal background
    padding: 16, // Reduced padding
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
    marginBottom: 12, // Reduced margin
    color: "white",
  },
  list: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C62828", // Darker red for contrast
    borderRadius: 12,
    padding: 10, // Reduced padding
    marginVertical: 6, // Reduced margin
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  sprite: {
    width: 70, // Reduced width
    height: 70, // Reduced height
    marginRight: 10, // Reduced margin
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  typeContainer: {
    flexDirection: "row",
    marginTop: 2, // Reduced margin
  },
  typeBadge: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6, // Reduced padding
    paddingVertical: 2, // Reduced padding
    borderRadius: 8,
    marginRight: 4, // Reduced margin
    color: "white",
  },
  primaryButton: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingVertical: 12, // Reduced padding
    paddingHorizontal: 20, // Reduced padding
    marginTop: 16, // Reduced margin
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  secondaryButton: {
    marginTop: 10, // Reduced margin
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8, // Reduced padding
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E0E0E0",
  },
});

export default PokemonResultsModal;
*/