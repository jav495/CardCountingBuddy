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

var s = ["♠︎","♥︎","♦","♣︎"]
var v = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

var screen = Dimensions.get('window')


class HomeScreen extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
            count: 0,
            Deck: [],
        }
        
    }
    
    componentWillMount(){
        this.setState({Deck: this.initDeck()})
    }

    static navigationOptions = {
        title: 'Card Counting Buddy',  
    };

    initDeck() {   
        var d=[];  
        for(var i = 0; i < 13; i++){
            for(var j = 0; j < 4; j++){
                var c=[2];
                c[0] = v[i];
                c[1] = s[j];  
                d.push(c);
            }  
        }
        return d;

        //TODO: Shuffle Deck

    }

    renderDeck() {
        console.log(this.state.Deck[0]);
        return(
            <Card value={this.state.Deck[0][0]} suit={this.state.Deck[0][1]}/>
        )
        
    }
    
    removeCard(i) {
        if(this.state.Deck.length > 0) {
            this.updateCount(i);
            var arr = this.state.Deck;
            arr.splice(0,1);
            this.setState({Deck: arr});
        } else {
            //TODO: Change this to display a score or Restart game
            console.log("Deck Ran Out");
        }
    }

    updateCount(i) {
        var sum = this.state.count + i;
        this.setState({count:sum});
    }

    //TODO: Add a timer and error checking
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
                        <View style={styles.card}>
                            {this.renderDeck()}
                        </View>
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
    },

    card: {
        marginLeft: screen.width/2 - 62,
        top: screen.height/3 - 176,
        backgroundColor: 'transparent',
    }
    

});
const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen, },
    Help: { screen: newScreen, },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
