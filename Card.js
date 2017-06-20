import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

export default class Card extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            init: this.props.customStyle,
            bodyColor: {backgroundColor: 'white'}
        };
    }
    componentWillMount(){
	    this.setState({
	      	//bodyColor: {backgroundColor: 'rgba(59,55,56,0.5)'}
	    })
    }

    render(){
        return(
            <View style={[styles.card,this.state.bodyColor,this.state.init]}>
                <View style={styles.leftNumeral}>
					<Text style={[styles.type,{color: this.props.color}]}>{this.props.type}</Text>
					<Text style={[styles.order,{color: this.props.color}]}>{this.props.order}</Text>
				</View>
				<View style={styles.rightNumeral}>
					<Text style={[styles.type,{color: this.props.color}]}>{this.props.type}</Text>
					<Text style={[styles.order,{color: this.props.color}]}>{this.props.order}</Text>
				</View>
				<View style={styles.center}>
					<Text style={[styles.centerLogo,{color: this.props.color}]}>{this.props.type}</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    leftNumeral:{
        width: 20,
        height: 40,
        flexDirection: 'column',
        position: 'absolute',
        top:0,
        left: 0,
        backgroundColor: 'transparent'
    },
    rightNumeral: {
        width: 20,
        height: 40,
        flexDirection: 'column',
        position: 'absolute',
        bottom:0,
        right: 0,
        backgroundColor: 'transparent'
    },
    suit: {
        height: 20,
        textAlign: 'center'
    },
    card: {
        width: 124,
        height: 176,
        backgroundColor: 'white',
        borderRadius: 12,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    order: {
		height: 20,
		textAlign: 'center',
	},
	center: {
		width: 80,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	centerLogo: {
		fontSize: 80,
		flex: 1,
		textAlign: 'center',
		lineHeight: 90
	}
});

//module.exports = Card