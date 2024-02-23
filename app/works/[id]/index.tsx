import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { useFavStatusQuery } from "@/data/hooks/useFavStatusQuery";
import { useFavStatusMutation } from "@/data/hooks/useFavStatusMutation";

export default function TabOneScreen() {
  const dimensions = useWindowDimensions();

  const { id }: { id: string } = useLocalSearchParams();

  // query art API for the work
  const workQuery = useWorkByIdQuery(id);
  const work = workQuery.data;

  // read fav status
  const favQuery = useFavStatusQuery(id);
  const isFav = favQuery.data;

  // update fav status
  const favMutation = useFavStatusMutation();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: work?.title || "Loading...",
        }}
      />
        <ScrollView>
          <Image
            style={{
              height: dimensions.width,
              width: dimensions.width,
            }}
            source={{ uri: work && work.images.web.url }}
            contentFit="contain"
            transition={100}
          />
          <View className="my-4 mx-4">
            <View className="flex-row align-middle">
              <Text className="flex-1 text-3xl px-2 py-2">{work?.title}</Text>
              <View className="justify-center">
                <Pressable
                  className="active:opacity-50"
                  disabled={favQuery.isLoading || favMutation.isPending}
                  onPress={() => {
                    favMutation.mutate({ id, status: !isFav });
                  }}
                >
                  <Icon name={isFav ? "star" : "star-o"} size={28} />
                </Pressable>
              </View>
            </View>
            <Text className="text-xl px-2 py-2">{work?.tombstone}</Text>
          </View>
        </ScrollView>
    </View>
  );
}
