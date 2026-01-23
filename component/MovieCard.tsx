import { icons } from "@/constants/icons";
import { genreList } from "@/utility/genresList";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
    adult,
    id,
    genre_ids,
    poster_path,
    title,
    vote_average,
    release_date,
}: any) => {
    return (
        <Link href={`/movies/${id}`} asChild className="flex-1 relative">
            <TouchableOpacity>
                {
                    adult && (
                        <View className="absolute top-1 right-1 bg-red-600 px-2 py-1 rounded-md z-10">
                            <Text className="text-xs text-white font-bold">18+</Text>
                        </View>
                    )
                }
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {title}
                </Text>

                <View className="flex-row items-center justify-start gap-x-1 my-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">

                    <Text className="text-xs text-white font-bold">
                        {genreList.find((genre) => genre.id === genre_ids[0])?.name || 'N/A'}
                    </Text>
                    <Text className="text-[10px] text-light-300">
                        {release_date?.split("-")[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
