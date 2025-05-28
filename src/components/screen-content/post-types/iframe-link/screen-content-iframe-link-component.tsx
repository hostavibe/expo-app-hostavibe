import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { FzbIframeLinkPostData } from "~/zod-types/posts/fzb-iframe-link-post";

export const ScreenContentIframeLinkComponent = ({ ...postData }: FzbIframeLinkPostData) => {
  const { iframeUrl } = postData;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: iframeUrl }}
        style={styles.webview}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
