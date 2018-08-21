import React, { Component } from 'react';
import {View,Image,Button,StyleSheet,Text,Dimensions} from 'react-native';
import MapView from  'react-native-maps';
import imagePlaceholder from '../../assets/beautiful-place.jpg'

class PickLocation extends Component {

	state = {
		focusedLocation: {
			latitude: 28.653910,
			longitude: 77.271210,
			latitudeDelta: 0.0122,
			longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122

		},
		locationChosen: false
	}

	PickLocationHandler= event => {
		const coords = event.nativeEvent.coordinate;
		
		this.map.animateToRegion({
			...this.state.focusedLocation,
			latitude: coords.latitude,
			longitude: coords.longitude
		})

		this.setState(prevState => {
			return {
				focusedLocation: {
					...prevState.focusedLocation,
					latitude: coords.latitude,
					longitude: coords.longitude
				},
				locationChosen: true
			}
		})
		this.props.onLocationPick({
			latitude: coords.latitude,
			longitude: coords.longitude 
		})
	}

	getLocationhandler = () => {
		navigator.geolocation.getCurrentPosition(pos => {
			coordsEvent = {
				nativeEvent: {
					coordinate: {
						latitude: pos.coords.latitude,
						longitude:pos.coords.longitude
					}
				}
			}
			this.PickLocationHandler(coordsEvent)
		},
		err => {
			console.log(err);
			alert('fetching the position failed please do it manually!')
		})
	}

	render() {
		
		let marker = null;
		if(this.state.locationChosen){
			marker = <MapView.Marker coordinate = {this.state.focusedLocation}/>
		}

		return (
			<View style={styles.conatiner}>
				<MapView
					initialRegion = {this.state.focusedLocation}
					style={styles.map}
					onPress = {this.PickLocationHandler}
					ref = {ref => this.map = ref}>
					{marker}
				</MapView>
				<View style={styles.button}>
					<Button title="Locate me!" onPress={this.getLocationhandler}/>
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
	map: {
		width: "100%",
		height: 250
	},
	button: {
		margin: 8
	}
})

export default PickLocation;
