import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalContext';

export default function CameraScreen() {
	const { globalParams, setGlobalParams } = useGlobalContext();

	const [facing, setFacing] = useState('back');
	const [permission, requestPermission] = useCameraPermissions();

	const navigation = useNavigation();

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing(current => (current === 'back' ? 'front' : 'back'));
	}

	function bcCallback(scanResult) {
		setGlobalParams(prev => ({ ...prev, scannedData: scanResult.data, latestPage: 'Camera' }));
		console.log(scanResult);
		console.log("---------------------");
		navigation.navigate('Result');
	}

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera}
				barcodeScannerSettings={{ barcodeTypes: ['ean13', 'qr', 'upc_a', 'code128'] }}
				facing={facing}
				autofocus='on'
				onBarcodeScanned={bcCallback}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});