import { FzbPostData } from "@/zod-types/posts/fzb-post";
import { FzbScreenConfigPosterPlacedScreenImageData } from "@/zod-types/screen-config/fzb-poster-placed-screen-image";
import { Dimensions } from "../../ScreenContentComponent";
import { PutYourPostHereComponent } from "../../post-types/no-post/put-your-post-here/put-your-post-here-component";

interface InvitationToPostToScreenComponentProps {
  screenId: string;
  screenPostData: FzbPostData | null;
  gridCoordinate: string;
  sendPostToScreenUrl: string;
  screenConfig: FzbScreenConfigPosterPlacedScreenImageData;
  dimensions: Dimensions | null;
}

export const InvitationToPostToScreenComponent = ({
  dimensions,
  sendPostToScreenUrl,
  gridCoordinate,
}: InvitationToPostToScreenComponentProps) => {
  return (
    <PutYourPostHereComponent
      dimensions={dimensions}
      sendPostToScreenUrl={sendPostToScreenUrl}
      gridCoordinate={gridCoordinate}
    />
  );
}; 