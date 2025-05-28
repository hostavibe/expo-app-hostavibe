import * as WebBrowser from 'expo-web-browser';
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { Pressable, Text } from "react-native";
import { Dimensions } from "../../../ScreenContentComponent";

interface PutYourPostHereComponentProps {
  dimensions: Dimensions | null;
  sendPostToScreenUrl: string;
  gridCoordinate: string;
}

export const PutYourPostHereComponent = ({
  dimensions,
  sendPostToScreenUrl,
}: PutYourPostHereComponentProps) => {
  
  return (
    <>
      <div>
        <Pressable 
          onPress={() => WebBrowser.openBrowserAsync(sendPostToScreenUrl)}
        >
          <Text>Scan QR code to post a message here</Text>
        </Pressable>
      </div>
      <QRCodeSVG 
        value={sendPostToScreenUrl}
      />
      {
        dimensions && (
          <>
            <div>
              {`${dimensions.width.toFixed(0)}x${dimensions.height.toFixed(0)}`} - {`${(dimensions.width / dimensions.height).toFixed(2)}:1`}
            </div>
          </>
        )
      }
    </>
  )
};