import React,{Component} from  'react';
import {View,Text,TouchableOpacity,Animated,StyleSheet} from  'react-native';
import {connect} from  'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList'

class FindPlace extends Component {

	static navigatorStyle = {
		navBarButtonColor: "orange"
	}

	state = {
		placeLoaded: false,
		removeAnim: new Animated.Value(1)
	}

	constructor(props){
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = event =>{
		if(event.type === "NavBarButtonPress") {
			if(event.id === "sideDrawerToggle"){
				this.props.navigator.toggleDrawer({
					side: "left"
				})
			}
		}
	}

	itemSelectedHandler = key => {
		const selPlace = this.props.places.find(place => 
				{return place.key === key}
				);
		console.log(selPlace);
		this.props.navigator.push({
			screen: "awesome-places.PlaceDetailScreen",
			title: selPlace.name,
			passProps: {
				selectedPlace: selPlace 
			}
		}).start();
	};

	placesSearchHandler = () => {
		Animated.timing(this.state.removeAnim,{
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start()
	}

	render(){
		
		let content = (
				<Animated.View 
					style = {{
						opacity: this.state.removeAnim,
						transform: [
							{
								scale: this.state.removeAnim.interpolate({
									inputRange: [0,1],
									outputRange: [12,1]
								})
							}
						]
					}}>
					<TouchableOpacity onPress = {this.placesSearchHandler}>
						<View style = {styles.searchButton}>
							<Text style = {styles.searchButtonText}>Find Places</Text>
						</View>
					</TouchableOpacity>
				</Animated.View>
			);

		if(this.state.placeLoaded) {
			content = (
					<PlaceList 
						places = {this.props.places} 
						onItemSelected = {this.itemSelectedHandler}/>
				)
		}

		return(
				<View style = {this.state.placeLoaded ? null : styles.buttonContainer}>
					{content}
				</View>
			)
	}
}

const styles = StyleSheet.create({

	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchButton: {
		borderColor: "orange",
		borderWidth: 3,
		borderRadius: 50,
		padding: 20
	},
	searchButtonText: {
		color: "orange",
		fontWeight: "bold",
		fontSize: 26
	}
})

const mapStateToProps = state => {
	return{
		places: state.places.places
	}
}

export default connect(mapStateToProps)(FindPlace);