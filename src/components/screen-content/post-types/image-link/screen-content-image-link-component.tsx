import { FzbImageLinkPostData } from '@/zod-types/posts/fzb-image-link-post';
import { Image, StyleSheet, View } from 'react-native';


export const ScreenContentImageLinkComponent = ({ ...postData }: FzbImageLinkPostData) => {
  const { imageUrl, backgroundColor } = postData;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { backgroundColor }]}
        resizeMode="contain"
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
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
