import PropularMovies from "@/component/HomePage/PropularMovies";
import MovieCard from "@/component/MovieCard";
import SearchBar from "@/component/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchlatestMovies, fetchPopularMovies } from "@/service/api";
import useFetch from "@/service/usefetch";
import { Link, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View
} from "react-native";


export default function Index() {
  const router = useRouter();
  // const isLoadingMore = useRef(false);


  const {
    data: propularMovies,
    loading: loadingPropularMovies,
    error: errorPropularMovies,
  } = useFetch(() => fetchPopularMovies());
  const {
    data: movies,
    loading: initialLoading,
    error,
  } = useFetch(() => fetchlatestMovies({ page: 1 }));


  // const {
  //   data: movies,
  //   loading,
  //   initialLoading,
  //   error,
  //   loadMore,
  //   hasMore,
  // } = useFetchInfinite((page) => fetchlatestMovies({ page }));


  // Memoized render function
  const renderItem = useCallback(({ item }: { item: Movie }) => (
    <MovieCard {...item} />
  ), []);


  // Memoized key extractor
  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);


  // const ListFooter = useCallback(() => {
  //   if (!loading) return null;
  //   return (
  //     <View className="py-5">
  //       <ActivityIndicator size="large" color="#ffffff" />
  //     </View>
  //   );
  // }, [loading]);


  // const handleScroll = useCallback(
  //   (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //     const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;


  //     const distanceFromBottom =
  //       contentSize.height - layoutMeasurement.height - contentOffset.y;


  //     if (distanceFromBottom < 100 && !loading && hasMore && !isLoadingMore.current) {
  //       isLoadingMore.current = true;
  //       loadMore();
  //       setTimeout(() => {
  //         isLoadingMore.current = false;
  //       }, 1000);
  //     }
  //   },
  //   [loading, hasMore, loadMore]
  // );


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
        // onScroll={handleScroll}
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
        <View className="mt-10 mb-3 flex-row items-center justify-between gap-5">
          <Text className="text-xl text-white font-black mb-3">
            Latest Movies
          </Text>
          <Link href="/latest">
            <Text className="text-sm text-white font-bold underline">See All</Text>
          </Link>
        </View>


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
            // ListFooterComponent={ListFooter}
            scrollEnabled={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={12}
            updateCellsBatchingPeriod={50}
            initialNumToRender={12}
            windowSize={5}
            className="mb-10"
          />
        )}
      </ScrollView>
    </View>
  );
}

