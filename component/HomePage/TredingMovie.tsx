import { getTrendingMovies } from '@/service/appwrite';
import useFetch from '@/service/usefetch';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import TrendingCard from '../TrendingCard';

const TredingMovie = () => {

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    const renderItem = React.useCallback(({ item, index }: { item: TrendingMovie; index: number }) => (
        <View style={{ width: 120, marginRight: 15 }}>
            <TrendingCard movie={item} index={index} />
        </View>
    ), []);


    const keyExtractor = React.useCallback((item: TrendingMovie) => item.$id.toString(), []);

    return (
        <View className="mt-10" collapsable={false}>
            <Text className="text-xl text-white font-black mb-3">
                Trending Movies
            </Text>
            <View collapsable={false}>
                {trendingLoading ? (
                    <ActivityIndicator size="large" color="#ffffff" />
                ) : trendingError ? (
                    <Text className="text-white">Something went wrong!</Text>
                ) :
                    <FlatList
                        data={trendingMovies}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 20 }}
                        nestedScrollEnabled={true}
                        removeClippedSubviews={false}
                        maxToRenderPerBatch={10}
                        initialNumToRender={8}
                        windowSize={10}
                        persistentScrollbar={false}
                    />}
            </View>
        </View>
    );
};

export default TredingMovie;
