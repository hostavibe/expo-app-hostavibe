import { QRCodeSVG } from 'qrcode.react';
import { StyleSheet, Text, View } from 'react-native';
import { FzbUrlQrcodeWithCaptionPostData } from "~/zod-types/posts/fzb-url-qrcode-with-caption";

export const ScreenContentUrlQrcodeWithCaptionComponent = ({ ...postData }: FzbUrlQrcodeWithCaptionPostData) => {
  const { url, caption } = postData;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {caption}
      </Text>
      <View style={styles.spacer} />
      <QRCodeSVG 
        value={url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});
