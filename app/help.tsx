import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, View, Text, Button } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, Link } from "expo-router";
import colors from '@/constants/colors';

export default function HelpScreen() {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Get help",
        }}
      />
      <ScrollView className="bg-shade-1">
        <View className="gap-4 px-4 py-4 items-center">
          <Text className="text-4xl font-semibold text-center text-tint">
            Dont go yet!
          </Text>
          <FontAwesome name="handshake-o" size={48} color={colors.tint} />
          <Text className="text-xl text-center">We're here to help.</Text>
          <Text className="text-l text-center">
            Let us know about any issues you're having, and we'll be happy to help you with whatever you need.
          </Text>
          <Link href="mailto:support@whatev.dev" asChild>
            <View className="bg-tint px-4 py-4 rounded-md">
              <Text className="text-white text-center">Email Us</Text>
            </View>
          </Link>
        </View>
      </ScrollView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
