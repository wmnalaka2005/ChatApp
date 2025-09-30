import { View, StyleSheet } from "react-native";

interface CircleProps {
    // required
    width: number;
    height: number;
    borderRadius: number;

    // optional
    fillColor?: string;
    topValue?: number;
    bottomValue?: number;
    leftValue?: number;
    rightValue?: number;
    className?: string;
}

export default function CircleShape(c: CircleProps) {
    return (
        <View
            className={`${c.className ?? ""}`}
            style={{
                width: c.width,
                height: c.height,
                borderRadius: c.borderRadius,
                position: "absolute",
                ...(c.fillColor !== undefined && { backgroundColor: c.fillColor }),
                ...(c.topValue !== undefined && { top: c.topValue }),
                ...(c.bottomValue !== undefined && { bottom: c.bottomValue }),
                ...(c.leftValue !== undefined && { left: c.leftValue }),
                ...(c.rightValue !== undefined && { right: c.rightValue }),
            }}
        />
    );
}
