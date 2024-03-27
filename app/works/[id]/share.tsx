import { useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { Image } from "expo-image";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { LoadingShade } from "@/components/LoadingShade";
import ImagePicker from "react-native-image-crop-picker";
import Marker, {
  ImageFormat,
  Position,
  TextBackgroundType,
} from "react-native-image-marker";

// TODO:
// ~1. Open cropper to make a square from the image: https://github.com/ivpusic/react-native-image-crop-picker?tab=readme-ov-file#crop-picture
// ~2. Apply museum advertising watermark (e.g., a hashtag or a URL or something) with react-native-image-marker
// ~3. Open share sheet to share the image with another app
// 4. Do something with this view to indicate that sharing is done (maybe swap displayed image for the modified one with "you shared it!" message)

export default function ShareWork() {
  const dimensions = useWindowDimensions();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  // query art API for the work
  const workQuery = useWorkByIdQuery(id);
  const work = workQuery.data;

  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  async function crop() {
    const image = await ImagePicker.openCropper({
      path: work.images.web.url,
      width: 300,
      height: 300,
      mediaType: "photo",
    });
    const markedImage = await Marker.markText({
      backgroundImage: {
        src: image.path,
        scale: 1,
      },
      watermarkTexts: [
        {
          text: "#cma",
          position: {
            position: Position.bottomRight,
          },
          style: {
            color: "#fff",
            fontSize: 20,
            textBackgroundStyle: {
              type: TextBackgroundType.none,
              color: "#000",
              paddingX: 16,
              paddingY: 6,
            },
          },
        },
      ],
      quality: 100,
      filename: image.filename,
      saveFormat: ImageFormat.jpg,
    });

    console.log("markedImage", markedImage);
    setCroppedImage(markedImage);
  }

  async function share() {
    await Sharing.shareAsync(
      Platform.OS === "android" ? `file:${croppedImage}` : croppedImage
    );
  }

  const path = croppedImage
    ? Platform.OS === "android"
      ? `file:${croppedImage}`
      : croppedImage
    : work && work.images.web.url;
  return (
    <View className="flex-1 bg-shade-1">
      <Stack.Screen
        options={{
          title: "Share Square",
        }}
      />
      <View className="py-4 px-4 bg-shade-2">
        <Text className="text-2xl text-center py-4">
          Share a clip of this work with your friends.
        </Text>
        <View
          style={{
            height: dimensions.width - 50,
            width: dimensions.width - 50,
            alignSelf: "center",
          }}
        >
          <Image
            source={{
              uri: path,
            }}
            style={{
              width: "100%",
              height: "100%",
              opacity: croppedImage ? 1 : 0.3,
            }}
            contentFit="cover"
            transition={500}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignSelf: "center",
          }}
        >
          <Pressable onPress={crop}>
            {({ pressed }) => (
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: pressed
                    ? "rgba(0, 0, 0, 0.9)"
                    : "rgba(0, 0, 0, 0.4)",
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#FFF", fontWeight: "bold" }}
                >
                  Crop
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={croppedImage ? share : undefined}
            disabled={croppedImage === null}
          >
            {({ pressed }) => (
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor:
                    croppedImage === null
                      ? "rgba(0, 0, 0, 0.15)"
                      : pressed
                      ? "rgba(0, 0, 0, 0.9)"
                      : "rgba(0, 0, 0, 0.6)",
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#FFF", fontWeight: "bold" }}
                >
                  Share
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <LoadingShade isLoading={workQuery.isLoading} />
    </View>
  );
}

function stripTags(htmlish: string) {
  return htmlish.replace(/<[^>]*>?/gm, "");
}
