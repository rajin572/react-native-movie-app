import PropularMovies from "@/component/HomePage/PropularMovies";
import MovieCard from "@/component/MovieCard";
import SearchBar from "@/component/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchlatestMovies, fetchPopularMovies } from "@/service/api";
import useFetch from "@/service/usefetch";
import useFetchInfinite from "@/service/useFetchInfinite";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import {
ActivityIndicator,
FlatList,
Image,
NativeScrollEvent,
NativeSyntheticEvent,
ScrollView,
Text,
View,
} from "react-native";

export default function Index() {
const router = useRouter();
const isLoadingMore = useRef(false);

const {
data: propularMovies,
loading: loadingPropularMovies,
error: errorPropularMovies,
} = useFetch(() => fetchPopularMovies());

const {
data: movies,
loading,
initialLoading,
error,
loadMore,
hasMore,
} = useFetchInfinite((page) => fetchlatestMovies({ page }));

// Memoized render function
const renderItem = useCallback(({ item }: { item: Movie }) => (
<MovieCard {...item} />
), []);

// Memoized key extractor
const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

const ListFooter = useCallback(() => {
if (!loading) return null;
return (
<View className="py-5">
<ActivityIndicator size="large" color="#ffffff" />
</View>
);
}, [loading]);

const handleScroll = useCallback(
(event: NativeSyntheticEvent<NativeScrollEvent>) => {
const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

      const distanceFromBottom =
        contentSize.height - layoutMeasurement.height - contentOffset.y;

      if (distanceFromBottom < 100 && !loading && hasMore && !isLoadingMore.current) {
        isLoadingMore.current = true;
        loadMore();
        setTimeout(() => {
          isLoadingMore.current = false;
        }, 1000);
      }
    },
    [loading, hasMore, loadMore]

);

return (
<View className="flex-1 bg-primary">
<Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Logo */}
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        {/* Search Bar */}
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />

        {/* Popular Movies Section */}
        <PropularMovies propularMovies={propularMovies || []} loadingPropularMovies={loadingPropularMovies} errorPropularMovies={errorPropularMovies} />

        {/* Latest Movies Section */}
        <Text className="text-lg text-white font-bold mt-10 mb-3">
          Latest Movies
        </Text>

        {initialLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-white text-center mt-10">
            Error: {error.message}
          </Text>
        ) : (
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
            showsVerticalScrollIndicator={false}
            ListFooterComponent={ListFooter}
            scrollEnabled={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={12}
            updateCellsBatchingPeriod={50}
            initialNumToRender={12}
            windowSize={5}
          />
        )}
      </ScrollView>
    </View>

);
}

//--------------------------------------------------------------------------------------------

import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MovieCard from '../MovieCard';

const PopularMovies = React.memo(({ propularMovies, loadingPropularMovies, errorPropularMovies, }: {
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

});

PopularMovies.displayName = 'PopularMovies';

export default PopularMovies;

//--------------------------------------------------------------------------------------------

// Index.tsx (outline)
const {
data: movies,
loading,
initialLoading,
error,
loadMore,
hasMore,
} = useFetchInfinite((page) => fetchlatestMovies({ page }));

const router = useRouter();

const renderMovieItem = useCallback(({ item }: { item: Movie }) => (
<MovieCard {...item} />
), []);

const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

const ListHeader = useCallback(() => (
<View className="px-5">
<Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
<SearchBar
onPress={() => router.push("/search")}
placeholder="Search for a movie"
/>
<PopularMovies
propularMovies={propularMovies || []}
loadingPropularMovies={loadingPropularMovies}
errorPropularMovies={errorPropularMovies}
/>
<Text className="text-lg text-white font-bold mt-10 mb-3">
Latest Movies
</Text>
</View>
), [propularMovies, loadingPropularMovies, errorPropularMovies, router]);

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
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        maxToRenderPerBatch={12}
        initialNumToRender={12}
        windowSize={5}
      />
    )}

  </View>
);
