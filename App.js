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
            score: 0,
            Deck: [],
        }
        
    }

    componentWillMount(){
        this.initDeck();
    }

    static navigationOptions = {
        title: 'Card Counting Buddy',  
    };

    shuffle(arr) {
        var array = arr
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        this.setState({Deck: array});
    }

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
        this.shuffle(d);
    }

    renderDeck() {
        if(this.state.Deck.length > 0){
            return(
                <Card value={this.state.Deck[0][0]} suit={this.state.Deck[0][1]}/>
            )
        } else {
            return(
                <View>
                    <Text style={styles.score}>{"Score: "}</Text>
                    <Text style={styles.score}>{this.state.score + "/52"}</Text>
                </View>
            )
        }
    }
    
    removeCard(i) {
        if(this.state.Deck.length > -1) {
            var arr = this.state.Deck;
            if(i == 1){
                if(arr[0][0] == "2" || arr[0][0] == "3" || arr[0][0] == "4" || arr[0][0] == "5" || arr[0][0] == "6"){
                    this.setState({score: this.state.score+1})
                }
            }else if(i == 0){
                if(arr[0][0] == "7" || arr[0][0] == "8" || arr[0][0] == "9"){
                    this.setState({score: this.state.score+1})
                }
            }else if(i == -1){
                if(arr[0][0] == "10" || arr[0][0] == "J" || arr[0][0] == "Q" || arr[0][0] == "K" || arr[0][0] == "A"){
                    this.setState({score: this.state.score+1})
                }
            }
            console.log(arr[0][0] + i + this.state.score);
            arr.splice(0,1);
            this.setState({Deck: arr});
        }
    }

    render() {
        const { navigate } = this.props.navigation;    
        return(
            <View style={styles.parentView}>
                <Image source={require('./background.jpg')} style={styles.parentView}>
                    <View style={styles.topView}>
                        <TouchableOpacity
                            onPress={() => navigate('Help')}
                        >
                            <Text style={styles.text}>Help</Text>
                        </TouchableOpacity>
                        <View style={styles.card}>
                            {this.renderDeck()}
                        </View>
                    </View>
                    <View style={styles.buttonView}>
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
    topView: {
        flex:1,
        backgroundColor: 'transparent',
    },
    buttonView: {
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
    },
    score: {
        fontSize: 40,
        color: 'white'
    },
});

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen, },
    Help: { screen: newScreen, },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
