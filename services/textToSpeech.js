import * as Speech from 'expo-speech';

export const speakDexEntry = (entryText) => {
  const options = {
    pitch: 1.0, // Set pitch to a more natural value
    rate: 1.0,  // Set rate to a more natural value
  };

  // Get available voices and select a more natural-sounding voice if available
  Speech.getAvailableVoicesAsync().then(voices => {
    const naturalVoice = voices.find(voice => voice.quality === 'Enhanced');
    if (naturalVoice) {
      options.voice = naturalVoice.identifier;
    }
    Speech.speak(entryText, options);
  }).catch(error => {
    console.error('Error fetching available voices:', error);
    Speech.speak(entryText, options); // Fallback to default voice
  });
};