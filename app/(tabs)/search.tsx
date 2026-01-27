import MovieCard from '@/component/MovieCard';
import SearchBar from '@/component/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/service/api';
import useFetch from '@/service/usefetch';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };
    const {
        data: movies,
        loading: initialLoading,
        error,
        refetch: loadMovies,
        reset,

    } = useFetch(() => fetchMovies({ query: searchQuery, page: 1 }), false);


    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();

                // Call updateSearchCount only if there are results
                if (movies?.length! > 0 && movies?.[0]) {
                    // await updateSearchCount(searchQuery, movies[0]);
                }
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Memoized render function
    const renderItem = useCallback(({ item }: { item: Movie }) => (
        <MovieCard {...item} />
    ), []);

    // Memoized key extractor
    const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

    const listHeader =
        <>
            {/* Logo */}
            <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />


            {/* Search Bar */}
            <View className="my-5">

                <SearchBar
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search for a movie"
                />
            </View>

            {initialLoading && (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="my-3"
                />
            )}

            {error && (
                <Text className="text-red-500 px-5 my-3">
                    Error: {error.message}
                </Text>
            )}

            {!initialLoading &&
                !error &&
                searchQuery.trim() &&
                movies?.length! > 0 && (
                    <Text className="text-xl text-white font-bold mb-5">
                        Search Results for{" "}
                        <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                )}
        </>


    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 20,
                }}
                ListHeaderComponent={listHeader}
                ListEmptyComponent={
                    !initialLoading && !error ? (
                        <View className="my-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim()
                                    ? "No movies found"
                                    : "Start typing to search for movies"}
                            </Text>
                        </View>
                    ) : null
                }
                // showsVerticalScrollIndicator={false}
                // // ListFooterComponent={ListFooter}
                // scrollEnabled={false}
                // removeClippedSubviews={true}
                // maxToRenderPerBatch={12}
                // updateCellsBatchingPeriod={50}
                // initialNumToRender={12}
                windowSize={5}
                className="mb-20 px-5"
            />
        </View>
    )
}

export default Search