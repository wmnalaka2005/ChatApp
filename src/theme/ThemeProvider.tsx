import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export type ThemeOptions = "light" | "dark" | "system";
const THEAM_KEY = "@app_color_scheme";

type TheamContextType = {
    preference: ThemeOptions;
    applied: "light" | "dark";
    setPreference: (themeOption: ThemeOptions) => void;
};

const ThemeContext = createContext<TheamContextType | undefined>(undefined);

export function TheamProvider({ children }: { children: React.ReactNode }) {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [getPreferenceState, setPreferenceState] = useState<ThemeOptions>("system");
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const saveTheam = await AsyncStorage.getItem(THEAM_KEY);
                if (saveTheam === "light" || saveTheam === "dark") {
                    setPreferenceState(saveTheam);
                    setColorScheme(saveTheam);
                } else {
                    setPreferenceState("system");
                    setColorScheme("system");
                }
            } catch (error) {
                console.log("Error loading theme preference:", error);
            } finally {
                setReady(true);
            }
        })();
    }, [setColorScheme]);

    const setPreference = async (themeOption: ThemeOptions) => {
        try {
            if (themeOption === "system") {
                await AsyncStorage.removeItem(THEAM_KEY);
                setPreferenceState("system");
                setColorScheme("system");
            } else {
                await AsyncStorage.setItem(THEAM_KEY, themeOption);
                setPreferenceState(themeOption);
                setColorScheme(themeOption);
            }
        } catch (error) {
            console.warn("Error saving theme preference:", error);
        }
    };

    if (!isReady) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    return (
        <ThemeContext.Provider
            value={{
                preference: getPreferenceState,
                applied: colorScheme ?? "light",
                setPreference,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}