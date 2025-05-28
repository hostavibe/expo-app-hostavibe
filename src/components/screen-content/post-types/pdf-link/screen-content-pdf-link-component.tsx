import { FzbPdfLinkPostData } from "@/zod-types/posts/fzb-pdf-link-post";
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export const ScreenContentPdfLinkComponent = ({ ...postData }: FzbPdfLinkPostData) => {
  const { pdfUrl } = postData;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `${pdfUrl}#toolbar=0&view=FitB` }}
        style={styles.webview}
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
    overflow: 'hidden',
  },
  webview: {
    width: '100%',
    height: '100%',
  },
});
