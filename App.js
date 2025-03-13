import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SearchScreen from './screens/SearchScreen';
import FetchDataSplashScreen from './screens/FetchDataSplashScreen';
import PokemonInformation from './screens/PokemonInformation';
import TeamBuilderHomeScreen from './screens/TeamBuilderHomeScreen'; // Import the TeamBuilderHomeScreen
import TeamEditorScreen from './screens/TeamEditorScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = ({ route }) => {
  const params = route?.params || {}; // Ensure params exist

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} initialParams={params} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Team Builder" component={TeamBuilderHomeScreen} /> 
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={FetchDataSplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="PokemonInformation" component={PokemonInformation} />
        <Stack.Screen name="TeamEditor" component={TeamEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}