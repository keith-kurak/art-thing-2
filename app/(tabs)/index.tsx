import { View, Text } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { useDepartmentsQuery } from "@/data/hooks/useDepartmentsQuery";

export default function TabOneScreen() {
  const query = useDepartmentsQuery();

  return (
    <View className="flex-1">
      {query.data.map((department: string) => (
        <Text className="text-2xl px-2 py-2" key={department}>
          {department}
        </Text>
      ))}
    </View>
  );
}
