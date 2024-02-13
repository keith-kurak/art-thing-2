import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";

export default function TabOneScreen() {
  const dimensions = useWindowDimensions();

  const { id }: { id: string } = useLocalSearchParams();

  const query = useWorkByIdQuery(id);

  const item = query.data;

  return (
    <View className="flex-1">
      {item && (
        <ScrollView>
          <Image
            style={{
              height: dimensions.width,
              width: dimensions.width,
              backgroundColor: "whitesmoke",
            }}
            source={{ uri: item.images.web.url }}
            contentFit="contain"
            transition={100}
          />
          <Text className="text-3xl px-2 py-2">{item?.title}</Text>
          <Text className="text-xl px-2 py-2">{item.tombstone}</Text>
        </ScrollView>
      )}
    </View>
  );
}
