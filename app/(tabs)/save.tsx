import MovieCard from '@/component/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { retrieveData } from '@/utility/localStorage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

const Saved = () => {
    const [bookmarks, setBookmarks] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchBookmarks = async () => {
                const allSaved = await retrieveData('bookmark');
                setBookmarks(allSaved ?? []);
            };

            fetchBookmarks();
        }, [])
    );

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <MovieCard {...item} />
    );

    const keyExtractor = (item: Movie) => item.id.toString();

    const ListHeader = () =>
    (
        <View className="px-5">
            <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

            <Text className="text-lg text-white font-bold mt-10 mb-3">
                Saved Movies
            </Text>
        </View>
    )

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />


            <FlatList
                data={bookmarks}
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
                onEndReachedThreshold={0}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                maxToRenderPerBatch={12}
                initialNumToRender={12}
                windowSize={5}
            />


        </View>
    );
}

export default Saved