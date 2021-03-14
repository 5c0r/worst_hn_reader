import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native'

export default function NewsContainer({ route, navigation}) {

    const [ news, setNews] = useState({});
    const { newsId } = route.params;

    useEffect(() => {
        fetch(`http://hn.algolia.com/api/v1/items/${newsId}`)
        .then( res => res.json())
        .then(setNews);
    }, [])

    return (
        <View>
            <Text>News Container</Text>
            <Text>{news.url}</Text>
            <Text>{news.title}</Text>
            <Text>{news.text}</Text>
        </View>
    )
}