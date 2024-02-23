import { View, Text, FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { useDepartmentsQuery } from "@/data/hooks/useDepartmentsQuery";

export default function TabOneScreen() {
  const query = useDepartmentsQuery();

  return (
    <View className="flex-1">
      <FlatList<any>
        data={query.data}
        keyExtractor={(item: string) => item}
        renderItem={({ item }) => (
          <Link asChild href={`/departments/${item}/`}>
            <Pressable>
              <Text className="text-2xl px-2 py-2">{item}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
