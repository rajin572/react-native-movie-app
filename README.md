<!-- import MovieCard from "@/component/MovieCard";
import SearchBar from "@/component/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/service/api";
import useFetchInfinite from "@/service/useFetchInfinite";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading,
    initialLoading,
    error,
    loadMore,
  } = useFetchInfinite((page) => fetchMovies({ query: "", page }));

  // Memoize header component
  const ListHeader = useCallback(() => (
    <>
      <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
      <SearchBar
        onPress={() => router.push("/search")}
        placeholder="Search for a movie"
      />
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </>
  ), [router]);

  // Memoize footer component
  const ListFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View className="py-5">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }, [loading]);

  // Memoize render item
  const renderItem = useCallback(({ item }: { item: Movie }) => (
    <MovieCard {...item} />
  ), []);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      {initialLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : error ? (
        <Text className="text-white text-center mt-10 px-5">
          Error: {error.message}
        </Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 20,
          }}
          contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={9}
        />
      )}
    </View>
  );
} -->

////////////////////////////////////////////////////////////////////////////////////

import MovieCard from "@/component/MovieCard";
import SearchBar from "@/component/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/service/api";
import useFetchInfinite from "@/service/useFetchInfinite";
import { useRouter } from "expo-router";
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

const {
data: movies,
loading,
initialLoading,
error,
loadMore,
} = useFetchInfinite((page) => fetchMovies({ query: "", page }));

// Memoize header component
// const ListHeader = useCallback(() => (

// ), [router]);

// Memoize footer component
const ListFooter = useCallback(() => {
if (!loading) return null;
return (
<View className="py-5">
<ActivityIndicator size="large" color="#ffffff" />
</View>
);
}, [loading]);

// Memoize render item
const renderItem = useCallback(({ item }: { item: Movie }) => (
<MovieCard {...item} />
), []);

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
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search for a movie"
          />
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>


          {initialLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : error ? (
            <Text className="text-white text-center mt-10 px-5">
              Error: {error.message}
            </Text>
          ) : (
            <FlatList
              data={movies}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 20,
              }}
              showsVerticalScrollIndicator={false}
              // ListHeaderComponent={ListHeader}
              ListFooterComponent={ListFooter}
              onEndReached={loadMore}
              onEndReachedThreshold={0}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={10}
              initialNumToRender={9}
              scrollEnabled={false}
              className="mt-2 pb-32"
            />
          )}
        </View>
      </ScrollView>
    </View>

);
}
