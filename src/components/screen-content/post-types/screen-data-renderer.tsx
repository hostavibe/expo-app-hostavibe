import { FzbIframeLinkPostData } from "@/zod-types/posts/fzb-iframe-link-post";
import { FzbImageLinkPostData } from "@/zod-types/posts/fzb-image-link-post";
import { FzbPostData } from "@/zod-types/posts/fzb-post";
import { FzbTextContentPostData } from "@/zod-types/posts/fzb-text-content-post";
import { FzbUrlQrcodeWithCaptionPostData } from "@/zod-types/posts/fzb-url-qrcode-with-caption";
import { FzbScreenConfigPosterPlacedScreenImageData } from "@/zod-types/screen-config/fzb-poster-placed-screen-image";
import { InvitationToPostToScreenComponent } from "../sc-poster-invitation/sc-poster-placed-screen-image/invitation-to-post-to-screen-component";
import { Dimensions } from "../ScreenContentComponent";
import { ScreenContentIframeLinkComponent } from "./iframe-link/screen-content-iframe-link-component";
import { ScreenContentImageLinkComponent } from "./image-link/screen-content-image-link-component";
import { ScreenContentTextComponent } from "./text-content/screen-content-text-component";
import { ScreenContentUrlQrcodeWithCaptionComponent } from "./url-qrcode-with-caption/screen-content-url-qrcode-with-caption";


interface ScreenDataRendererProps {
  postedData: FzbPostData | null;
  screenConfig: FzbScreenConfigPosterPlacedScreenImageData;
  
  dimensions: Dimensions | null;
  sendPostToScreenUrl: string;
  gridCoordinate: string;
}

export const ScreenDataRenderer = (props: ScreenDataRendererProps) => {

  const {
    postedData,
    dimensions,
    sendPostToScreenUrl,
    // gridCoordinate,
    screenConfig,
  } = props;

  

  // if (!postedData) {
  //   const defaultNoPostType: FzbNoPostConfigType = "np-put-your-post-here";

  //   return (
  //     <NoPostComponent
  //       noPostType={defaultNoPostType}
  //       dimensions={dimensions}
  //       sendPostToScreenUrl={sendPostToScreenUrl}
  //       gridCoordinate={gridCoordinate}
  //     />
  //   )
  // }

  if (!postedData) {
    return (
      <InvitationToPostToScreenComponent 
        dimensions={dimensions}
        screenConfig={screenConfig}
        sendPostToScreenUrl={sendPostToScreenUrl}
      />
    )
  }

  switch (postedData.postType) {
    case "text-content":
      return <ScreenContentTextComponent {...postedData as FzbTextContentPostData} />
    case "image-link":
      return <ScreenContentImageLinkComponent {...postedData as FzbImageLinkPostData} />
    case "iframe-link":
      return <ScreenContentIframeLinkComponent {...postedData as FzbIframeLinkPostData} />
    case "url-qrcode-with-caption":
      return <ScreenContentUrlQrcodeWithCaptionComponent {...postedData as FzbUrlQrcodeWithCaptionPostData} />
    default:
      throw new Error(`Unknown post type for rendering: ${(postedData as FzbPostData).postType}`);
  }
}
