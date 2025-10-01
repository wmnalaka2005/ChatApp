import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screen/SplashScreen";
import SignUpScreen from "./src/screen/SignUpScreen";
import SignInScreen from "./src/screen/SignInScreen";
import SettingsScreen from "./src/screen/SettingsScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import { TheamProvider } from "./src/theme/ThemeProvider";
import ContactScreen from "./src/screen/ContactScreen";
import AvatarScreen from "./src/screen/AvatarScreen";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import HomeTabs from "./src/screen/HomeTabs";
import SingleChatScreen from "./src/screen/SingleChatScreen";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import NewChatScreen from "./src/screen/NewChatScreen";

export type RootStack = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  SettingScreen: undefined;
  ProfileScreen: undefined;
  HomeScreen: undefined;
  SingleChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
  NewChatScreen:undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  const USER_ID =1
  return (
    <AlertNotificationRoot>
      <WebSocketProvider userId={USER_ID}>
        <TheamProvider>
          <UserRegistrationProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{ animation: "flip" }}
              >
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignUpScreen"
                  component={SignUpScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AvatarScreen" component={AvatarScreen} options={{ headerShown: false }}/>
                <Stack.Screen
                  name="SignInScreen"
                  component={SignInScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="HomeScreen"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SingleChatScreen"
                  component={SingleChatScreen}
                />

                <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ headerShown: false }}/>

                <Stack.Screen name="SettingScreen" component={SettingsScreen} options={{ headerShown: false }}/>
               
                <Stack.Screen 
                name="NewChatScreen" 
                component={NewChatScreen} 
                
                
                />

              </Stack.Navigator>
            </NavigationContainer>
          </UserRegistrationProvider>
        </TheamProvider>
      </WebSocketProvider>
    </AlertNotificationRoot>
  );
}
