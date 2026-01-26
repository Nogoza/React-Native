import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 7,
        // alignItems: 'center'
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
        
    },
    inner_container:{
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        
    },
    title:{
        fontSize: 27,
        fontWeight: 'bold',
        color: '#000000',
    },
    info_container:{
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',
        marginTop: 1,
        backgroundColor: 'white',
    },
    artist:{
        color: '#000000',
    },
    year:{
        color: 'gray',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    soldout_container:{
        borderWidth: 1,
        borderColor: 'red',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 5,
        padding: 5,
        
    },
    soldout_title:{
        color: 'red',
        fontWeight: 'bold',
    },
    content_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
    },

});