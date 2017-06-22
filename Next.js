import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    StyleSheet,
    Button,
} from 'react-native';
export default class Next extends React.Component {
    static navigationOptions = {
        title: 'Help',
    };

    render() {
        return(
            //TODO: Make Help/Info look more professional
            <Image source={require('./stars.jpg')} style={styles.container}>
                <Text style={styles.instructions}>Card Counting Buddy is an application that will help you get used to doing the math for the Hi-Lo counting system.</Text>
                <Text style={styles.instructions}>We will assign the value of +1 to cards numbering 2 to 6.</Text>
                <Text style={styles.instructions}>Cards 7 to 9 will be counted as a 0.</Text>
                <Text style={styles.instructions}>Cards 10 to A will be given a count of -1.</Text>
                <Text style={styles.instructions}>In a game of Blackjack, if you are debating whether to hit or stay, you can use the current count to predict whether the next card will be high or low.</Text>
                <Text style={styles.instructions}>If the count is high then there is a higher probability that the next card will be a face card or 10. If the count is low, there is a higher probability the next card will be a low card ranging between 2-6.</Text>
                <Text style={styles.instructions}>Note that Hi-Lo counting works better when the dealer is using less decks.</Text>
                <Text style={styles.instructions}>Good luck and have fun!</Text>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C7A89',
        width: null,
        height: null,
    },
    instructions: {
        //textAlign: 'center', 
        fontSize: 16,
        color: 'white', 
        padding: 5,
    }
});
