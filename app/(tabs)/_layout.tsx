import { icons } from "@/constants/icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    Text,
    View,
} from "react-native";

// Proper types for TabIcon
interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, title }) => {
    return (
        <View
            className={`${focused
                ? "bg-[#AB8BFF] flex flex-row items-center gap-2 rounded-3xl px-2.5 py-2 max-w-[85px]"
                : "justify-center items-center rounded-full p-2"
                }`}
        >
            <Image
                source={icon}
                tintColor={focused ? "#151312" : "#A8B5DB"}
                className="size-5"
                resizeMode="contain"
            />
            {focused && (
                <Text className="text-secondary text-base font-semibold">{title}</Text>
            )}
        </View>
    );
};

// Type for tab icons mapping
type TabIconsMap = {
    [key: string]: ImageSourcePropType;
};

// Custom tab bar component with proper types
const MyTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    // Define tab icons mapping with proper type
    const tabIcons: TabIconsMap = {
        index: icons.home,
        search: icons.search,
        save: icons.save,
        profile: icons.person,
    };

    return (
        <View
            style={{ flexDirection: "row" }}
            className="bg-[#0F0D23] absolute rounded-full bottom-6 mx-2.5 p-1 justify-around items-center"
        >
            {state.routes.filter((route) => route.name !== "latest").map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        className="flex-1 items-center"
                    >
                        <TabIcon
                            focused={isFocused}
                            icon={tabIcons[route.name] || icons.home}
                            title={typeof label === "string" ? label : route.name}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};

const TabsLayout: React.FC = () => {
    return (
        <Tabs tabBar={(props) => <MyTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="save"
                options={{
                    title: "Save",
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="latest"
                options={{
                    title: "Latest",
                    headerShown: false,
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
