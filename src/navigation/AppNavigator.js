// ------------- Base React ----------------- //
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from '../context/GlobalContext';  // Context

// --------------- Screen ---------------------//
// import HomeScreen from '../screens/HomeScreen';
// import ProductionScreen from '../screens/ProductionScreen';

import ScannerScreen from '../screens/ScannerScreen';
import ResultScreen from '../screens/ResultScreen';
import CameraScreen from '../screens/CameraScreen';
// import CameraScreen from '../screens/CameraScreen';
// import TaskDisplayScreen from '../screens/TaskDisplayScreen';
// import BreakageInputScreen from '../screens/BreakageInputScreen';

// import MachineScreen from '../screens/MachineScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { styles } from '../styles/theme';


const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// const ScannerTab = createMaterialTopTabNavigator();

// function ScannerTabNavigator() { // เฉพาะที่ต้องการให้ Swip ได้ ในส่วนของ Scanner pages
// 	return (
// 		<ScannerTab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }} initialRouteName="ScannerMain">
// 			<ScannerTab.Screen name="TaskDisplay" component={TaskDisplayScreen} />
// 			<ScannerTab.Screen name="ScannerMain" component={ScannerScreen} />
// 			<ScannerTab.Screen name="BreakageInput" component={BreakageInputScreen} />
// 		</ScannerTab.Navigator>
// 	);
// }

// function ScannerStackNavigator() { // กลุ่มหลักของ Scanner pages (รวมกล้องด้วย)
// 	return (
// 		<Stack.Navigator>
// 			<Stack.Screen name="ScannerTab" component={ScannerTabNavigator} options={{ headerShown: false }} />
// 			<Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
// 		</Stack.Navigator>
// 	);
// }

export default function AppNavigator() {
	return (
		<GlobalProvider>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => { // อันนี้คือกำลังทำทีละปุ่มเลยนะ
							let iconName;
							let iconSize = focused ? 30 : 24; // Change the size here
							let iconColor = focused ? 'white' : 'gray'; // Change color based on focus

							if (route.name === 'Scanner') {
								iconName = 'qr-code-scanner';
							} else if (route.name === 'Result') {
								iconName = 'assignment';
							}

							// Return the MaterialIcon with size and color passed as props
							return <MaterialIcons name={iconName} size={iconSize} color={iconColor} />;
							//return How <MaterialIcons name={iconName} size={28} color={color} /> // Set size to 28 for all icons

						},
						// tabBarActiveTintColor: 'white', // Fix icon color for all by sending 'color' to tabBarIcon
						// tabBarInactiveTintColor: 'gray', // Fix icon color for all by sending 'color' to tabBarIcon
						tabBarStyle: styles.tabBarStyle,
					})}
				>
					<Tab.Screen name="Scanner" component={CameraScreen} />
					<Tab.Screen name="Result" component={ResultScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</GlobalProvider>
	);
}


