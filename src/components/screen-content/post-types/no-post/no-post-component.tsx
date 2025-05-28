// import { Dimensions } from "../../ScreenContentComponent";
// import { InspirationalMessageComponent } from "./inspirational-message/inspirational-message-component";
// import { PutYourPostHereComponent } from "./put-your-post-here/put-your-post-here-component";
// import { NoPostReportingComponent } from "./reporting-component/no-post-reporting-component";


// interface NoPostComponentProps {
//   // noPostType: FzbNoPostConfigType;
//   dimensions: Dimensions | null;
//   sendPostToScreenUrl: string;
//   gridCoordinate: string;
// }

// export const NoPostComponent = (props: NoPostComponentProps) => {

//   const {
//     noPostType,
//   } = props;

//   // return null;

//   switch (noPostType) {
//     case "np-inspirational-message":
//       return (
//         <InspirationalMessageComponent 
//           // {...props}
//         />
//       )
//     case "np-put-your-post-here":
//       return (
//         <PutYourPostHereComponent 
//           {...props}
//         />
//       )
//     case "np-reporting":
//       return (
//         <NoPostReportingComponent 
//           {...props}
//         />
//       )
//   }
// };