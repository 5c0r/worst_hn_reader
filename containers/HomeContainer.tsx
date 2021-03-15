import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, FlatList, SafeAreaView } from 'react-native';



const NewsItem = ({title, author, url, points, comments, onItemClick}) => {

    const goToUrl = () => {
        Linking.openURL(url)
    }

    const goToAuthor = () => {

    }

    return (
        <View style={newsItemStyle.container} >
            <View style={newsItemStyle.title} >
                <Text onPress={onItemClick}>{title}</Text>
                <Text onPress={goToUrl}>({url})</Text>
            </View>
            <View style={newsItemStyle.meta}>
                <Text>{points} pts</Text>
                <Text>|</Text>
                <Text onPress={goToAuthor}>{author}</Text>
                <Text>|</Text>
                <Text onPress={onItemClick}>{comments} comments</Text>
            </View>
        </View>
    )
}

const newsItemStyle = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: 10
    },
    title: {
        // display: 'block',
        fontSize: 14
    },
    meta: {
        // display: 'block',
        color: 'rgb(166, 158, 146)'
    }
})



export default function HomeContainer({navigation}) {

    // State /Navigation ( page number ? )
    const [newsList, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const maxItemInList = 80;

    // Similar to componentDidMount
    useEffect(() => {
        fetchUsers();
    }, [page])

    const fetchUsers = () => {
        console.log('fetching', page);
        setLoading(true);
        fetch(`http://hn.algolia.com/api/v1/search?tags=story&page=${page}`)
            .then( res => res.json())
            .then( res => res.hits).then( news => {
                const newnew = newsList.concat(news);
                if(newnew.length > maxItemInList) {
                    newnew.splice(0, 25);
                }
                setNews(newnew);
                setLoading(false);
            } )
            .catch((error) => {
                console.error(error);
              });
    }

    const onListEndReached = ({ distanceFromEnd }) => {
        console.log('distanceFromEnd' , distanceFromEnd);
        if(distanceFromEnd > 0 && !isLoading ) {
            const newPage = page + 1;
            setPage(newPage);
        }
    }

    const renderNewsItem = ({item}) => <NewsItem title={item.title} author={item.author} url={item.url} points={item.points} comments={item.num_comments} onItemClick={() => navigation.navigate('News', {
        newsId: item.objectID
    })} />

    return (
        <SafeAreaView style={styles.container}>
            <FlatList onEndReachedThreshold={0.1} onEndReached={onListEndReached} data={newsList} renderItem={renderNewsItem} keyExtractor={(item,index) => `${item.objectID}-${index}` }/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6ef',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });