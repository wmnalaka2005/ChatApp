import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatScreen";
import Statusreeen from "./StatusScreen";
import ClassSreeen from "./CallsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();
export default function HomeTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "chatbubble-ellipses";
          if (route.name === "Chats") iconName = "chatbubble-ellipses";
          else if (route.name === "Status") iconName = "time";
          else if (route.name === "Calls") iconName = "call";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 16 },
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          height: 70,
          backgroundColor: "#fff",
          paddingTop: 8,
        },
      })}
    >
      <Tabs.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tabs.Screen name="Status" component={Statusreeen} />
      <Tabs.Screen name="Calls" component={ClassSreeen} />
    </Tabs.Navigator>
  );
}
