import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MovieCard from '../MovieCard';

const PopularMovies = ({ propularMovies, loadingPropularMovies, errorPropularMovies, }: {
    propularMovies: Movie[];
    loadingPropularMovies: boolean;
    errorPropularMovies: Error | null;
}) => {


    const renderItem = React.useCallback(({ item }: { item: Movie }) => (
        <View style={{ width: 120, marginRight: 15 }}>
            <MovieCard {...item} />
        </View>
    ), []);

    const keyExtractor = React.useCallback((item: Movie) => item.id.toString(), []);

    return (
        <View className="mt-10" collapsable={false}>
            <Text className="text-xl text-white font-black mb-3">
                Popular Movies
            </Text>
            <View collapsable={false}>
                {loadingPropularMovies ? (
                    <ActivityIndicator size="large" color="#ffffff" />
                ) : errorPropularMovies ? (
                    <Text className="text-white">Something went wrong!</Text>
                ) :
                    <FlatList
                        data={propularMovies}
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

export default PopularMovies;
