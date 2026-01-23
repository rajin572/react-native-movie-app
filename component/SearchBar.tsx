import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface ISearchBar {
    placeholder?: string;
    onPress: () => void;
}

const SearchBar = ({ placeholder = "Search through 300+ movies online", onPress }: ISearchBar) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-1">
            <Image
                source={icons?.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                // value=""
                // onChangeText={() => { }}
                placeholderTextColor="#AB8BFF"
                className="flex-1 ml-3 text-white"
            />
        </View>
    );
};

export default SearchBar;
