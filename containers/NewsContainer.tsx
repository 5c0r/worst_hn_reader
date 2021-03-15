import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native'

export default function NewsContainer({ route, navigation }) {

    const [ news, setNews] = useState({});
    const { newsId } = route.params;

    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
        .then( res => res.json())
        .then(setNews);
    }, [])

    return (
        <View>
            <Text>News Container</Text>
            <Text>{news.title}</Text>
            <Text>{news.type}</Text>
            <Text>{news.url}</Text>
        </View>
    )
}