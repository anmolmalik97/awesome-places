import React, { Component } from 'react';
import {View,Image,Button,StyleSheet,Text} from 'react-native';
import imagePlaceholder from '../../assets/beautiful-place.jpg'

class PickLocation extends Component {
	render() {
		return (
			<View style={styles.conatiner}>
				<View style={styles.placeholder}>
					<Text>Map!</Text>
				</View>
				<View style={styles.button}>
					<Button title="Locate me!" onPress={() => alert('hello')}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	conatiner: {
		width: '100%',
		alignItems: 'center'
	},
	placeholder: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#eee",
		width: "80%",
		height: 150
	},
	button: {
		margin: 8
	}
})

export default PickLocation;
