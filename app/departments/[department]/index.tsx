import { View, Text, FlatList, Pressable } from "react-native";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorksForDepartmentQuery } from '@/data/hooks/useWorksForDepartmentQuery';

export default function TabOneScreen() {

  const { department }: { department: string } = useLocalSearchParams();

  const query = useWorksForDepartmentQuery(department);

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: department,
        }}
      />
      <FlatList
        data={query.data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <Link asChild href={`/works/${item.id}/`}>
            <Pressable>
            <View className="flex-row px-4">
                <View className="flex-1 justify-start">
                  <Text className="text-xl">{item.title}</Text>
                  <Text className="italic">
                    {item.creation_date_earliest !== item.creation_date_latest
                      ? `${item.creation_date_earliest}-${item.creation_date_latest}`
                      : `${item.creation_date_earliest}`}
                  </Text>
                </View>
                <Image
                  className="h-28 w-28"
                  source={{ uri: item.images.web.url }}
                  contentFit="contain"
                  transition={1000}
                />
              </View>
              </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
