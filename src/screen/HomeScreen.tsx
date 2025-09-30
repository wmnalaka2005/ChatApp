import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    FlatList,
    Image,
    Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";



type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenProps>();
    const [search, setSearch] = useState("");

    const chatList = useChatList();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <View
                    className={`h-20 bg-white justify-center items-center flex-row shadow-2xl elevation-2xl ${Platform.OS === "ios" ? `py-5` : `py-0`
                        }`}
                >
                    <View className="flex-1 items-start ms-3">
                        <Text className="font-bold text-2xl">ChatApp</Text>
                    </View>
                    <View className="me-3">
                        <View className="flex-row space-x-4">
                            <TouchableOpacity className="me-5">
                                <Ionicons name="camera" size={26} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ),
        });
    }, [navigation]);

    const filterdChats = [...chatList].filter((chat) => {
        return (
            chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase())
        );
    }).sort((a,b)=>new Date(b.lastTimeStamp).getTime()- new Date(a.lastTimeStamp).getTime());

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            className="flex-row items-center py-2 px-3 bg-gray-50 my-0.5"
            onPress={() => {
                navigation.navigate("SingleChatScreen", {
                    chatId:item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: formatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage,
                });
            }}
        >
            <Image source={{uri:item.profileImage}} className="h-16 w-16 rounded-full" />
            <View className="flex-1 ms-3">
                <View className="flex-row justify-between">
                    <Text
                        className="font-bold text-xl text-gray-600"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.friendName}
                    </Text>
                    <Text className="font-bold text-xs text-gray-500">{formatChatTime(item.lastTimeStamp)}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text
                        className="text-gray-500 flex-1 text-base"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View className="bg-green-500 rounded-full px-2 py-2 ms-2">
                            <Text className="text-slate-50 text-xs font-bold">
                                {item.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView
            className="flex-1 bg-white p-0"
            edges={["right", "bottom", "left"]}
        >
            <StatusBar hidden={true} />
            <View className="items-center flex-row mx-2 border-gray-300 border-2 rounded-full px-3 h-14 mt-3">
                <Ionicons name="search" size={20} color={"gray"} />
                <TextInput
                    className="flex-1 text-lg font-bold ps-2"
                    placeholder="Search"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            <View className="mt-1">
                <FlatList
                    data={filterdChats}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            </View>
            <View className="absolute bg-green-500 bottom-16 right-10 h-20 w-20 rounded-3xl">
                <TouchableOpacity className="h-20 w-20 rounded-3xl justify-center items-center">
                    <Ionicons name="chatbox-ellipses" size={26} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
