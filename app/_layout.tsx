import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { View, FlatList, ScrollView, Platform } from "react-native";
import { cssInterop, remapProps } from "nativewind";
import "../global.css";
import * as QuickActions from "expo-quick-actions";
import { useQuickActionRouting, RouterAction } from "expo-quick-actions/router";
import React from "react";

// component interops for nativewind - just need these once
cssInterop(Image, { className: "style" });

remapProps(FlatList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

remapProps(ScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const queryClient = new QueryClient();
  useQuickActionRouting();

  React.useEffect(() => {

    QuickActions.setItems<RouterAction>([
      {
        "title": "Wait! Don't delete me!",
        "subtitle": "We're here to help",
        icon: Platform.OS === 'android' ? "help_icon" : "symbol:person.crop.circle.badge.questionmark",
        id: "0",
        params: { href: "/help" },
      },
    ]);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="visit" options={{ presentation: "modal" }} />
          <Stack.Screen name="help" options={{ presentation: "modal" }} />
        </Stack>
      </View>
    </QueryClientProvider>
  );
}
