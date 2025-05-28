import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Dimensions } from "../../../ScreenContentComponent";

interface NoPostReportingComponentProps {
  dimensions: Dimensions | null;
  sendPostToScreenUrl: string;
  gridCoordinate: string;
}

export const NoPostReportingComponent = ({
  dimensions,
  sendPostToScreenUrl,
  gridCoordinate,
}: NoPostReportingComponentProps) => {
  return (
    <View style={styles.container}>
      {dimensions && (
        <View style={styles.dimensionsContainer}>
          <Text style={styles.text}>
            {`${dimensions.width.toFixed(0)}x${dimensions.height.toFixed(0)}`}
          </Text>
          <Text style={styles.text}>
            {`${(dimensions.width / dimensions.height).toFixed(2)}:1`}
          </Text>
        </View>
      )}
      <Text style={styles.text}>{sendPostToScreenUrl}</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={sendPostToScreenUrl}
          size={100}
        />
      </View>
      <Link href={sendPostToScreenUrl as any} asChild>
        <Text style={styles.link}>{gridCoordinate}</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  dimensionsContainer: {
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  qrContainer: {
    marginVertical: 16,
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});