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
import { Stopwatch } from 'react-native-stopwatch-timer';
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
            count: 0,
            stopwatchStart: false,
            stopwatchReset: false,
            finish: 0,
        }
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);   
    }

    componentWillMount(){
        this.initDeck();
    }
    toggleStopwatch() {
        this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }

    resetStopwatch() {
        this.setState({stopwatchStart: false, stopwatchReset: true});
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
        this.setState({Deck: array, score: 0, count: 0, finish: 0});
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
        this.resetStopwatch();
    }

    renderDeck() {
        if(this.state.Deck.length > 0){
            return(
                <View>
                    <Card value={this.state.Deck[0][0]} suit={this.state.Deck[0][1]}/>
                </View>
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
        if(this.state.Deck.length == 52 && this.state.finish == 0){
            this.toggleStopwatch();
        }
        if(this.state.Deck.length > 0) {
            var arr = this.state.Deck;
            if(i == 1){
                if(arr[0][0] == "2" || arr[0][0] == "3" || arr[0][0] == "4" || arr[0][0] == "5" || arr[0][0] == "6"){
                    this.setState({score: this.state.score+1})
                }
                this.setState({count: this.state.count+1})
            }else if(i == 0){
                if(arr[0][0] == "7" || arr[0][0] == "8" || arr[0][0] == "9"){
                    this.setState({score: this.state.score+1})
                }             
            }else if(i == -1){
                if(arr[0][0] == "10" || arr[0][0] == "J" || arr[0][0] == "Q" || arr[0][0] == "K" || arr[0][0] == "A"){
                    this.setState({score: this.state.score+1})
                }
                this.setState({count: this.state.count-1})
            }
            arr.splice(0,1);
            this.setState({Deck: arr});
        }
        if(this.state.Deck.length == 0 && this.state.finish == 0){
            this.toggleStopwatch();
            this.setState({finish: 1});
        }
    }

    render() {
        const { navigate } = this.props.navigation;    
        return(
                <Image source={require('./stars.jpg')} style={styles.parentView}>
                    <View style={styles.timeView}>
                        <View style={styles.accessoryView}>
                            <TouchableOpacity
                                style={styles.box2}
                                onPress={() => navigate('Help')}
                            >
                                <Text style={styles.text}>Help</Text>
                            </TouchableOpacity>

                            <Stopwatch style={styles.box2}
                                start={this.state.stopwatchStart}
                                reset={this.state.stopwatchReset}
                                options={options}
                                getTime={this.getFormattedTime}
                            />
                            
                            <TouchableOpacity
                                style={styles.box2}
                                onPress={() => this.initDeck()}
                            >
                                <Text style={styles.text}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View style={styles.topView}>
                        
                        {this.renderDeck()}
                        
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.box}
                            onPress={() => this.removeCard(1)}
                        >
                            <Text style={styles.countButtons}
                            >{this.state.count+1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}
                            onPress={() => this.removeCard(0)}
                        >
                            <Text style={styles.countButtons}>{this.state.count}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}
                            onPress={() => this.removeCard(-1)}
                        >
                            <Text style={styles.countButtons}>{this.state.count-1}</Text>
                        </TouchableOpacity>
                    </View>
                </Image>    
        );
    }
}

const options = {
  container: {
    backgroundColor: 'rgba(0,100,250,.7)',
    padding: 5,
    borderRadius: 100,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: null,
        width: null,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    timeView: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        flex: 7,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonView: {
        flex: 7,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    accessoryView:{
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'helvetica',
    
    },

    box: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: (screen.width-250)/2,
        marginRight: (screen.width-250)/2,
        width: 250,
        height: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,100,250,.5)'
    },
    box2: {
        width: 60,
        borderRadius: 100,
        backgroundColor: 'rgba(0,100,250,.7)',
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
    },

    countButtons: {       
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },

    card: {

        
        backgroundColor: 'transparent',
    },
    score: {
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: {width: 5, height: 5},
        color: 'white'
    },
    restart: {
        fontSize: 10,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: {width: 5, height: 5},
        color: 'white'
    },
});

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen, },
    Help: { screen: newScreen, },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
