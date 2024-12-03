import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import FeedItem from 'app/components/FeedItem';
import { calcWidth } from 'app/helper/res';
import mockFeedData from 'mockData/feeds';

const FeedScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={mockFeedData}
                renderItem={({ item }) => <FeedItem item={item} />}
                keyExtractor={(item) => item.id}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: calcWidth(2),
    },
});

export default FeedScreen;
