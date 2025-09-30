import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";
import { useState } from "react";
import "../../global.css";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">
export default function SignUpScreen() {

    const navigation = useNavigation<SignUpProps>();

    const { applied } = useTheme();
    const logo = applied === "light" ? require("../../assets/logo.png") : require("../../assets/logo.png");

    const { userData, setUserData } = useUserRegistration();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            className="flex-1 justify-center items-center"
        >
            <SafeAreaView className="p-5 items-center">
                <StatusBar hidden={true} />
                <Image source={logo} className=" h-48 w-36" />
                <View className="w-full justify-start items-start">
                    <Text className="font-bold text-slate-500">
                        Create your account and start the conversation TODAY
                    </Text>
                </View>
                <View className="self-stretch">
                    <View className="w-full my-3 ">
                        <FloatingLabelInput
                            style={{ borderWidth: 2, borderColor: 'black' }}
                            label={"Enter Your First Name"}
                            value={userData.firstName}
                            onChangeText={(text) => {
                                setUserData((previos) => ({ ...previos, firstName: text }));
                            }}
                        />
                    </View>
                    <View className="w-full my-3">
                        <FloatingLabelInput
                            label={"Enter Your Last Name"}
                            value={userData.lastName}
                            onChangeText={(text) => {
                                setUserData((previos) => ({ ...previos, lastName: text }));
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <View className=" mt-2 w-full p-5">
                <Pressable
                    className="bg-green-600 h-14 justify-center items-center rounded-full"
                    onPress={() => {
                        let validFirstName = validateFirstName(userData.firstName);
                        let validLastName = validateLastName(userData.lastName);
                        if (validFirstName) {
                            // skip null
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: validFirstName,
                            });
                        } else if (validLastName) {
                            // skip null
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: validLastName,
                            });
                        } else {
                            navigation.navigate("ContactScreen");
                        }
                    }}
                >
                    <Text className="text-slate-100  font-bold text-lg">Next</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>

    );
}