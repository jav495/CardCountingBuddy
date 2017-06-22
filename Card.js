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
            bodyColor: {backgroundColor: 'white'},
        };
    }
    

    cardColor(suit){
        if(this.props.suit == '♥︎' || this.props.suit == '♦'){
            return 'red';
        } else{
            return 'black'
        }
    }

    render(){
        fontColor = this.cardColor(this.state.suit);
        return(
            <View style={styles.card}>
                <View style={styles.top}>
					<Text style={{color: fontColor}}>{this.props.suit}</Text>
					<Text style={{color: fontColor}}>{this.props.value}</Text>
				</View>
				<View style={styles.bottom}>
					<Text style={{color: fontColor}}>{this.props.suit}</Text>
					<Text style={{color: fontColor}}>{this.props.value}</Text>
				</View>
				<View style={styles.symbol}>
					<Text style={[styles.symbolFont,{color: fontColor}]}>{this.props.suit}</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({


    card: {
        width: 150,
        height: 220,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    symbol: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    symbolFont: {
        fontSize: 80,
        flex: 1,
        textAlign: 'center',
        lineHeight: 90,
    },
    top: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'transparent',
        width: 20,
        height: 40,
        flexDirection: 'column',
    },
    bottom: {
        width: 20,
        height: 40,
        flexDirection: 'column',
        position: 'absolute',
        bottom:0,
        right: 0,
        backgroundColor: 'transparent'    
    }

});