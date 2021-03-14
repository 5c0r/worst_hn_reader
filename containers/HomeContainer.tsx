import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



const NewsItem = ({title, author, onItemClick}) => {
    return (
        <View>
            <Button title={title} onPress={onItemClick} />
        </View>
    )
}

export default function HomeContainer({navigation}) {

    // State /Navigation ( page number ? )
    const [newsList, setNews] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const response = fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
            .then( res => res.json())
            .then( res => res.hits).then(setNews);
    }, [])

    return (
        <View style={styles} >
            {newsList.map( (news:any) => (
                <NewsItem key={news.objectID} title={news.title} author={news.author} onItemClick={() => navigation.navigate('News', {
                    newsId: news.objectID
                })} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });