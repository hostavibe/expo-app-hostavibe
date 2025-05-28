import { FzbPostId, FzbScreenId } from "@/src/zod-types/branded-strings/fb-branded-strings";
import { FzbIframeLinkPostData } from "@/src/zod-types/posts/fzb-iframe-link-post";
import { FzbImageLinkPostData } from "@/src/zod-types/posts/fzb-image-link-post";
import { FzbPdfLinkPostData } from "@/src/zod-types/posts/fzb-pdf-link-post";
import { FzbPostData } from "@/src/zod-types/posts/fzb-post";
import { SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE } from "@/src/zod-types/screen-config/fzb-poster-placed-screen-image";
import { FzbScreenConfigData } from "@/src/zod-types/screen-config/fzb-screen-config";
import { SCREEN_CONFIG_TYPE_SHOW_PERMANENT_BLANK } from "@/src/zod-types/screen-config/fzb-show-permanent-blank";
import { SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IFRAME_LINK } from "@/src/zod-types/screen-config/fzb-show-permanent-iframe";
import { SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IMAGE_LINK } from "@/src/zod-types/screen-config/fzb-show-permanent-image";
import { SCREEN_CONFIG_TYPE_SHOW_PERMANENT_PDF_LINK } from "@/src/zod-types/screen-config/fzb-show-permanent-pdf";
import { SCREEN_CONFIG_TYPE_SHOW_PROMO } from "@/src/zod-types/screen-config/fzb-show-promo";
import React from "react";
import { ScreenContentIframeLinkComponent } from "./post-types/iframe-link/screen-content-iframe-link-component";
import { ScreenContentImageLinkComponent } from "./post-types/image-link/screen-content-image-link-component";
import { ScreenContentPdfLinkComponent } from "./post-types/pdf-link/screen-content-pdf-link-component";
import { InvitationToPostToScreenComponent } from "./sc-poster-invitation/sc-poster-placed-screen-image/invitation-to-post-to-screen-component";
import { ScreenContentPermanentBlank } from "./sc-show/permanent-blank";
import { ScreenContentPromo } from "./sc-show/promo";



export interface Dimensions {
  width: number;
  height: number;
}

interface ScreenContentComponentProps {
  screenId: FzbScreenId;
  screenPostData: FzbPostData | null;
  gridCoordinate: string;
  sendPostToScreenUrl: string;
  screenConfig: FzbScreenConfigData;
  dimensions: Dimensions | null;
}

export const ScreenContentComponent = ({ 
  screenId,
  screenPostData, 
  gridCoordinate, 
  sendPostToScreenUrl,
  screenConfig,
  dimensions,
}: ScreenContentComponentProps) => {

  switch (screenConfig.screenType) {
    case SCREEN_CONFIG_TYPE_SHOW_PERMANENT_BLANK:
      return (
        <ScreenContentPermanentBlank />
      );

    case SCREEN_CONFIG_TYPE_SHOW_PROMO:
      return (
        <ScreenContentPromo />
      );
  
    case SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IMAGE_LINK: {
      const screenPostData: FzbImageLinkPostData = {
        id: `image-link-post-${screenId}` as FzbPostId,
        name: "Permanent Image",
        postType: "image-link",
        imageUrl: screenConfig.imageUrl,
        backgroundColor: screenConfig.backgroundColor,
      }

      return (
        <ScreenContentImageLinkComponent
          {...screenPostData}
        />
      );
    }

    case SCREEN_CONFIG_TYPE_SHOW_PERMANENT_PDF_LINK: {
      const screenPostData: FzbPdfLinkPostData = {
        id: `pdf-link-post-${screenId}` as FzbPostId,
        name: "Permanent PDF",
        postType: "pdf-link",
        pdfUrl: screenConfig.pdfUrl,
      }

      return (
        <ScreenContentPdfLinkComponent
          {...screenPostData}
        />
      );
    }

    case SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IFRAME_LINK: {
      const screenPostData: FzbIframeLinkPostData = {
        id: `iframe-link-post-${screenId}` as FzbPostId,
        name: "Permanent Iframe",
        postType: "iframe-link",
        iframeUrl: screenConfig.iframeUrl,
      }

      return (
        <ScreenContentIframeLinkComponent
          {...screenPostData}
        />
      );
    }

    case SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE:
      return (
        <InvitationToPostToScreenComponent
          dimensions={dimensions}
          screenId={screenId}
          screenPostData={screenPostData}
          gridCoordinate={gridCoordinate}
          sendPostToScreenUrl={sendPostToScreenUrl}
          screenConfig={screenConfig}
        />
      );

    default:
      return <div>Unsupported screen config type: {screenConfig.screenType}</div>;
  }
};
