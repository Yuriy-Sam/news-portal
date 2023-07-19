import * as React from "react";
import { SVGProps } from "react";

export type IconProps = {
  props?: SVGProps<SVGSVGElement>;
  color?: string;
  imageSize?: number;
};
export const HomeIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M11.31 1.776a1 1 0 0 1 1.38 0l8 7.619 2.5 2.38a1 1 0 0 1-1.38 1.45l-.81-.773V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.548l-.81.772a1 1 0 1 1-1.38-1.448l2.5-2.381 8-7.62ZM5 10.548V20h4v-5a3 3 0 1 1 6 0v5h4v-9.452L12 3.88l-7 6.667ZM13 20v-5a1 1 0 1 0-2 0v5h2Z"
      clipRule="evenodd"
    />
  </svg>
);

export const CategoryIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z"
    />
  </svg>
);
export const WriteIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill={color}
    preserveAspectRatio="xMinYMin"
    viewBox="-2 -2 24 24"
    {...props}
  >
    <path d="m5.72 14.456 1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z" />
  </svg>
);

// export const WriteIcon = (color = "#000") imageSize = 30, => (
//   <svg
//     fill={color}
//     width="50px"
//     height="50px"
//     viewBox="-2 -2 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     preserveAspectRatio="xMinYMin"
//   >
//     <path d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z" />
//   </svg>
// );
export const SettingIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.14 12c0 1.105-.874 2-1.95 2-1.077 0-1.95-.895-1.95-2 0-1.104.873-2 1.95-2 1.076 0 1.95.896 1.95 2Z"
      clipRule="evenodd"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.574 18.1-2.452-5.287a1.617 1.617 0 0 1 0-1.717l2.436-5.204C7.931 5.324 8.56 4.99 9.226 5h5.926a1.958 1.958 0 0 1 1.669.892l2.431 5.2a1.617 1.617 0 0 1 0 1.717L16.805 18.1a1.957 1.957 0 0 1-1.677.9H9.25a1.957 1.957 0 0 1-1.676-.9Z"
      clipRule="evenodd"
    />
  </svg>
);
export const ExitIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    stroke={color}
    strokeWidth={3}
    viewBox="0 0 64 64"
    {...props}
  >
    <path d="m46.02 21.95 9.91 9.91-9.91 9.91M55.93 31.86H19.59M40 38.18V52a2.8 2.8 0 0 1-2.81 2.8H12A2.8 2.8 0 0 1 9.16 52V11.77A2.8 2.8 0 0 1 12 9h25.19A2.8 2.8 0 0 1 40 11.77V25" />
  </svg>
);
export const BookmarkIcon: React.FC<IconProps> = ({
  color = "#b2b2b2",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    viewBox="0 -0.5 25 25"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.507 19.853V6.034a2.017 2.017 0 0 0-2-2.034h-8a2.017 2.017 0 0 0-2 2.034v13.819a1 1 0 0 0 1.6.913l3.8-3.281a.9.9 0 0 1 1.206 0l3.794 3.282a1 1 0 0 0 1.6-.914Z"
      clipRule="evenodd"
    />
  </svg>
);
export const BookmarksIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    viewBox="0 0 512 512"
    {...props}
  >
    <title>{"ionicons-v5-h"}</title>
    <path
      d="M128 80V64a48.14 48.14 0 0 1 48-48h224a48.14 48.14 0 0 1 48 48v368l-80-64"
      style={{
        fill: "none",
        stroke: color,
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <path
      d="M320 96H112a48.14 48.14 0 0 0-48 48v352l152-128 152 128V144a48.14 48.14 0 0 0-48-48Z"
      style={{
        fill: "none",
        stroke: color,
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
  </svg>
);
export const HamburgerIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M20 7H4M20 12H4M20 17H4"
    />
  </svg>
);
export const SearchIcon: React.FC<IconProps> = ({
  color = "#000",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
    />
  </svg>
);
export const ShareIcon: React.FC<IconProps> = ({
  color = "#b2b2b2",
  imageSize = 30,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={imageSize}
    height={imageSize}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9 6 3-3m0 0 3 3m-3-3v10m-5-3c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C4 11.602 4 12.068 4 13v4.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h9.607c1.118 0 1.677 0 2.104-.218.376-.192.682-.498.874-.874.218-.428.218-.987.218-2.105V13c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C18.398 10 17.932 10 17 10"
    />
  </svg>
);
