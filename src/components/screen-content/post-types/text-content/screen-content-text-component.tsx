import { StyleSheet, Text, View } from 'react-native';
import { FzbTextContentPostData } from "~/zod-types/posts/fzb-text-content-post";

export const ScreenContentTextComponent = ({ ...postData }: FzbTextContentPostData) => {
  const { textContent } = postData;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {textContent}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
