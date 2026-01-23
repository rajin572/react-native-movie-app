import MovieCard from '@/component/MovieCard';
import SearchBar from '@/component/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchlatestMovies } from '@/service/api';
import useFetchInfinite from '@/service/useFetchInfinite';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Latest = () => {
    const router = useRouter();


    const {
        data: movies,
        loading,
        initialLoading,
        error,
        loadMore,
        hasMore,
    } = useFetchInfinite((page) => fetchlatestMovies({ page }));


    const renderMovieItem = ({ item }: { item: Movie }) => (
        <MovieCard {...item} />
    );

    const keyExtractor = (item: Movie) => item.id.toString();

    const ListHeader = () =>
    (
        <View className="px-5">
            <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
            <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
            />

            <Text className="text-lg text-white font-bold mt-10 mb-3">
                Latest Movies
            </Text>
        </View>
    )



    const ListFooter = () => {
        if (!loading) return <View className="h-20" />;
        return (
            <View className="pt-5 pb-40">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            {initialLoading ? (
                <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
            ) : error ? (
                <Text className="text-white text-center mt-10">
                    Error: {error.message}
                </Text>
            ) : (
                <FlatList
                    data={movies}
                    renderItem={renderMovieItem}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 20,
                        paddingRight: 5,
                        marginBottom: 20,
                        paddingHorizontal: 20,

                    }}
                    ListHeaderComponent={ListHeader}
                    ListFooterComponent={ListFooter}
                    onEndReached={() => {
                        if (!loading && hasMore) {
                            loadMore();
                        }
                    }}
                    onEndReachedThreshold={0}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                    maxToRenderPerBatch={12}
                    initialNumToRender={12}
                    windowSize={5}
                />
            )}

        </View>
    );
}

export default Latest