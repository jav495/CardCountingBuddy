import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import _ from "underscore";
import { StackNavigator } from 'react-navigation';
import newScreen from './Next.js';
import Card from './Card.js';

var types = [
    {
		type :"♠︎",
		color: "black"
	},
    {
		type: "♦",
		color: "red",
	},
    {
		type: "♥︎",
		color: "red"
	},
	{
		type: "♣︎",
		color: "black"
	}   
]

var orders = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
var screen = Dimensions.get('window')


class HomeScreen extends React.Component {
    
    constructor() {
        super();
        this.state = {
            count: 0,
            Deck: {},
        }
    }
    
    static navigationOptions = {
        title: 'Card Counting Buddy',
        headerStyle: {
        }
    };
    initDeck(){
		var initTop = 50
		var initLeft = screen.width/2-62
		var count = 26
		var matches = types.map((type)=> {
			return orders.map((order)=>{
				count -= 0.5
                
				return {
					type: type.type,
					color: type.color,
					order: order
				}
			})
		})
		matches = _.shuffle(matches.reduce((p,c)=>{return p.concat(c)}))
		this.Decks = matches.map((item)=> {
				count -= 0.5;
				return (<Card key = {count} customStyle={{top: initTop+count,left:initLeft+count}} color={item.color} type={item.type} order={item.order} />)
		})
		this.setState({Deck:this.Decks});
	}

    removeCard(i) {
        this.updateCount(i);
        console.log(this.state.count);
        //RemovingCard
        
    }

    updateCount(i) {
        var sum = this.state.count + i;
        this.setState({count:sum});
    }

    render() {
        const { navigate } = this.props.navigation;
        
        
        return(
            
            <View style={styles.parentView}>
                <Image source={require('./background.jpg')} style={styles.parentView}>
                    <View style={styles.yellowView}>
                        <TouchableOpacity
                            onPress={() => navigate('Help')}
                        >
                            <Text style={styles.text}>Help</Text>
                        </TouchableOpacity>
                                      
                    </View>
                        
                    <View style={styles.redView}>
                        <TouchableOpacity style={styles.box}
                            onPress={() => this.removeCard(1)}
                        >
                            <Text style={styles.countButtons}
                            >+1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}
                            onPress={() => this.removeCard(0)}
                        >
                            <Text style={styles.countButtons}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}
                            onPress={() => this.removeCard(-1)}
                        >
                            <Text style={styles.countButtons}>-1</Text>
                        </TouchableOpacity>
                    </View>
                </Image>    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#000000',
    },
    yellowView: {
        flex:1,
        backgroundColor: 'transparent',
    },
    redView: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 10,
        marginTop: 10,
        fontFamily: 'helvetica',
        backgroundColor: 'rgba(0,0,0,.5)',
        width: 50,
    },

    box: {
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        width: 250,
        height: 60,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    countButtons: {
        textAlign: 'center',
        fontSize: 32,
        padding: 10,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
    }
    

});
const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen, },
    Help: { screen: newScreen, },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
