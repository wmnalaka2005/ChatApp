import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import NewChatScreen from "./NewChatScreen";

const Stack = createNativeStackNavigator();
export default function ChatScreen() {
    return (<Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
    </Stack.Navigator>)
}