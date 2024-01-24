import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function SheepIcon({
  width,
  height,
  ratio,
  woolColor,
  ...props
}: {
  width?: number;
  height?: number;
  ratio?: number;
  woolColor?: string;
} & SvgProps) {
  return (
    <Svg
      width={width ?? (ratio ? 415.432 * ratio : 415.432)}
      height={height ?? (ratio ? 465.756 * ratio : 465.756)}
      viewBox="0 0 109.916 123.231"
      {...props}
    >
      <Path
        d="m402.167 719.667-.874 9.693c-2.266-.017-3.898.435-8.296.699l-1.222-10.742c2.618-11.259 4.639-30.564 10.392.35z"
        opacity={1}
        fill={"#f1deca"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m431.596 712.419.96 11.701-8.512-.12-2.009-12.487z"
        opacity={1}
        fill={"#f1deca"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.847}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m373.8 721.202-6.247 9.912-9.037-3.669 4.54-10.689c7.865-7.512 11.081-5.264 10.744 4.446z"
        opacity={1}
        fill={"#f1deca"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m401.293 729.36-.436 4.497-7.074.96-.786-4.758zM432.556 724.12l.611 6.812-7.813-.208-1.31-6.724z"
        opacity={1}
        fill={"#a06e48"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m367.553 731.114-3.937 5.19-7.56-2.875 2.46-5.984z"
        opacity={1}
        fill={"#a06e48"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.847}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M406.774 708.235c.991 6.59-5.148 16.143-8.928 6.911-.45 6.37-9.475 4.913-12.313-1.354 3.508-7.487 10.591-9.334 21.241-5.557zM433.326 698.85c1.969 5.424 5.686 12.635.31 10.558-2.805 4.215-6.939 4.78-9.634.68-4.16 1.383-6.496 1.56-8.063-1.757-.889-10.323 12.841-14.446 17.387-9.482zM424.986 629.404c1.716-5.77-.57-8.304-9.78-5.24 1.328-9.163-21.68-15.833-19.212 9.17-4.816.714-2.804 4.353-1.31 7.772 27.542 21.115 23.848-1.855 30.302-11.702z"
        opacity={1}
        fill={woolColor ?? "#fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M444.632 666.47c8.289-10.292 15.855-23.634 9.51-35.321-13.438-10.319-32.99-1.86-46.436 11.732-2.32.079-2.604-.146-7.04.247-3.688-2.399-6.272-1.854-9.015-1.729-3.77 9.524 4.818 12.817 10.127 13.09 12.531 24.095 33.414 19.131 42.854 11.98z"
        opacity={1}
        fill={"#f1deca"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M417.258 641.368c6.28 2.544 9.027-.076 9.256-6.375"
        opacity={1}
        fill={"none"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M436.076 642.153c2.363 2.356 4.503 2.038 6.637 1.66"
        opacity={1}
        fill={woolColor ?? "#fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m442.19 633.508 5.064 2.096-.175-4.716z"
        opacity={1}
        fill={"#000"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M363.056 716.756c-9.103-11.726-1.924-11.713 2.47-13.708-7.618-10.157-5.632-15.924-1.852-20.87-6.26.044-10.665-4.793-6.052-6.546-4.87-3.757.363-1.276.042-3.659-.499-3.692-2.239-12.51 5.269-3.01 3.42-6.34 5.042-2.41 6.174 4.322 4.147-6.768 8.724-2.254 9.14-1.605 3.118-5.4 7.56-6.403 14.078-4.693-.403-4.763 1.134-6.512 5.928-7.04.636-4.985-.686-6.417 8.045-4.772 5.514-1.686 5.132 3.359 4.325 5.018 5.526-4.711 10.444-6.414 12.704 1.967 3.276-7.746 12.587-2.637 14.875 3.441 10.672.896 7.41 11.526 3.95 12.22 1.916 3.743 2.744 5.01-1.292 7.196-8.185 18.54-6.995 16.023-18.236 17.047-2.478 3.163-6.474 8.651-15.85 6.171-4.232 4.626-9.019 7.908-15.52 2.214-2.635 3.35-6.668 2.993-9.303 1.12.149 6.414-2.701 9.476-8.15 9.633-2.316-2.832-3.714-6.643-10.745-4.446z"
        opacity={1}
        fill={woolColor ?? "#fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M408.48 654.802c-2.511-1.237-5.302-8.173-7.813-11.674-3.664-2.553-6.378-2.254-9.016-1.729-2.729 9.729 3.152 11.89 10.127 13.09.63-.06 3.093.068 6.702.313z"
        opacity={1}
        fill={"#f8acd6"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m440.516 690.68 22.093 3.41-6.978 16.858-11.3-2.161 2.84-7.534-9.015-1.522z"
        opacity={1}
        fill={"#f1deca"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m455.631 710.948-2.331 6.325-11.79-2.664 2.821-5.822z"
        opacity={1}
        fill={"#a06e48"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="M439.06 676.486c4.093 1.017 5.88 3.847 4.78 8.087 5.35.593 3.884 12.83-4.192 10.13.228 4.556-4.522 11.375-10.908 7.21-3.815 3.686-6.67.225-7.645-2.692z"
        opacity={1}
        fill={woolColor ?? "#fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-354.116 -614.495)"
      />
      <Path
        d="m423.232 699.56-4.415-1.213 16.915-23.392 4.59 3.64z"
        opacity={1}
        fill={woolColor ?? "#fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"none"}
        strokeWidth={2.84665}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(-354.116 -614.495)"
      />
    </Svg>
  );
}
