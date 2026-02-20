import { Stack } from "expo-router";
import { StatusBar } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {

  // const { bottom, top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar hidden={true} />

      <Stack screenOptions={{

        contentStyle: {
          // paddingTop: top,

          // paddingBottom: bottom,
          backgroundColor: "#030014",
        },
      }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
