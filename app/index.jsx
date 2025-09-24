import {StyleSheet, Text, View , Image} from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
        <Image 
            source={require('../assets/img/bookshelf.png')}
            style={styles.img}
        />

        <Text style={[styles.title, { color: '#FA8F6E' }]}>Home</Text>

        
        <Text style={{ marginTop: 15, marginBottom: 30 }}>
            Welcome to the Home screen!
        </Text>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    //An object of CSS style
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:20
    },
    img:{
        marginVertical:20,
        width:150,
        height:150,
    },
})