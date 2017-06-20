import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Button,
} from 'react-native';
export default class Next extends React.Component {
    static navigationOptions = {
        title: 'Help',
    };

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>Card Counting Buddy is an application that will help you get used to doing the math for the Hi-Lo counting system.</Text>
                <Text style={styles.instructions}>We will assign the value of +1 to cards numbering 2 to 6. Cards 7 to 9 will be counted as a 0 and cards 10 to A will be given a count of -1.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C7A89',
    },
    instructions: {
        textAlign: 'center', 
        fontSize: 16,
        color: 'white', 
        padding: 10,
    }

});
