"use client";
import * as React from "react";
import { SVGProps } from "react";

export type IconProps = {
  props?: SVGProps<SVGSVGElement>;
  color?: string;
  iconStyles?: string;
};
export const HomeIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      // fill={color}
      fillRule="evenodd"
      d="M11.31 1.776a1 1 0 0 1 1.38 0l8 7.619 2.5 2.38a1 1 0 0 1-1.38 1.45l-.81-.773V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.548l-.81.772a1 1 0 1 1-1.38-1.448l2.5-2.381 8-7.62ZM5 10.548V20h4v-5a3 3 0 1 1 6 0v5h4v-9.452L12 3.88l-7 6.667ZM13 20v-5a1 1 0 1 0-2 0v5h2Z"
      clipRule="evenodd"
      className={`fill-current fill-${color}`}
    />
  </svg>
);

export const CategoryIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={iconStyles}
    // className={`stroke-current stroke-${color} `}
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      clipRule="evenodd"
      // fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z"
      className={`stroke-current stroke-${color} `}
    />
  </svg>
);
export const WriteIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // xmlSpace="preserve"
    viewBox="0 0 256 256"
    className={`${iconStyles}`}
    // width={20}
    // height={20}
    {...props}
  >
    <path
      className={`fill-current fill-${color} `}
      d="m75.9 140.1-8.3 48.3 47.7-8.2.6-.1L237.7 58.3c5.3-5.3 8.3-12.5 8.3-20 0-15.6-12.7-28.3-28.3-28.3-7.6 0-14.7 2.9-20 8.3L76.3 139.6l-.4.5zm132-111.6c2.6-2.6 6.1-4.1 9.8-4.1 7.7 0 13.9 6.2 13.9 13.9 0 3.7-1.4 7.2-4.1 9.8l-5.4 5.4L202.4 34l5.5-5.5zM89 150 192.2 44.2l19.6 19.6L106 167l-20.4 3.5L89 150z"
    />
    <path
      className={`fill-current fill-${color} `}
      d="M238.8 89.1c-4 0-7.2 3.2-7.2 7.2v116c0 10.6-8.6 19.2-19.2 19.2H43.6c-10.6 0-19.2-8.6-19.2-19.2V43.6c0-10.6 8.6-19.2 19.2-19.2h116c4 0 7.2-3.2 7.2-7.2s-3.2-7.2-7.2-7.2h-116C25.1 10 10 25.1 10 43.6v168.8c0 18.5 15.1 33.6 33.6 33.6h168.8c18.5 0 33.6-15.1 33.6-33.6v-116c0-4-3.2-7.3-7.2-7.3z"
    />
  </svg>
);
// export const WriteIcon: React.FC<IconProps> = ({
//   color,
//   iconStyles,
//   ...props
// }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     // fill={`fill-${color}`}
//     preserveAspectRatio="xMinYMin"
//     viewBox="-2 -2 24 24"
//     {...props}
// className={`fill-current fill-${color} ${iconStyles}`}
//   >
//     <path
//       // d="m5.72 14.456 1.761-.508 10.603-10.73-15.515 5.446-1.52 5.33z"
//       // d="m5.72 14.456 1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"
//       d="m5.72 14.456 1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"
//     />
//   </svg>
// );

// export const WriteIcon = (color) iconStyles, => (
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
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={iconStyles}
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.14 12c0 1.105-.874 2-1.95 2-1.077 0-1.95-.895-1.95-2 0-1.104.873-2 1.95-2 1.076 0 1.95.896 1.95 2Z"
      clipRule="evenodd"
      className={`stroke-current stroke-${color}`}
    />
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.574 18.1-2.452-5.287a1.617 1.617 0 0 1 0-1.717l2.436-5.204C7.931 5.324 8.56 4.99 9.226 5h5.926a1.958 1.958 0 0 1 1.669.892l2.431 5.2a1.617 1.617 0 0 1 0 1.717L16.805 18.1a1.957 1.957 0 0 1-1.677.9H9.25a1.957 1.957 0 0 1-1.676-.9Z"
      clipRule="evenodd"
      className={`stroke-current stroke-${color}`}
    />
  </svg>
);
export const ExitIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={`stroke-${color}`}
    strokeWidth={3}
    viewBox="0 0 64 64"
    className={`stroke-current stroke-${color} ${iconStyles}`}
    {...props}
  >
    <path d="m46.02 21.95 9.91 9.91-9.91 9.91M55.93 31.86H19.59M40 38.18V52a2.8 2.8 0 0 1-2.81 2.8H12A2.8 2.8 0 0 1 9.16 52V11.77A2.8 2.8 0 0 1 12 9h25.19A2.8 2.8 0 0 1 40 11.77V25" />
  </svg>
);
export const BookmarkIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 -0.5 25 25"
    className={iconStyles}
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.507 19.853V6.034a2.017 2.017 0 0 0-2-2.034h-8a2.017 2.017 0 0 0-2 2.034v13.819a1 1 0 0 0 1.6.913l3.8-3.281a.9.9 0 0 1 1.206 0l3.794 3.282a1 1 0 0 0 1.6-.914Z"
      clipRule="evenodd"
      className={`stroke-current stroke-${color}`}
    />
  </svg>
);
export const BookmarksIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={iconStyles}
    {...props}
  >
    <path
      d="M128 80V64a48.14 48.14 0 0 1 48-48h224a48.14 48.14 0 0 1 48 48v368l-80-64"
      style={{
        fill: "none",
        stroke: `stroke-${color}`,
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
      className={`stroke-current stroke-${color}`}
    />
    <path
      d="M320 96H112a48.14 48.14 0 0 0-48 48v352l152-128 152 128V144a48.14 48.14 0 0 0-48-48Z"
      style={{
        fill: "none",
        stroke: `stroke-${color}`,
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
      className={`stroke-current stroke-${color}`}
    />
  </svg>
);
export const HamburgerIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M20 7H4M20 12H4M20 17H4"
      className={`stroke-current stroke-${color}`}
    />
  </svg>
);
export const SearchIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
      className={`fill-current fill-${color}`}
    />
  </svg>
);
export const ShareIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9 6 3-3m0 0 3 3m-3-3v10m-5-3c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C4 11.602 4 12.068 4 13v4.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h9.607c1.118 0 1.677 0 2.104-.218.376-.192.682-.498.874-.874.218-.428.218-.987.218-2.105V13c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C18.398 10 17.932 10 17 10"
      className={`stroke-current text-${color}`}
    />
  </svg>
);
export const ArrowIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 12h12m0 0-5-5m5 5-5 5"
      className={`stroke-current text-${color}`}
    />
  </svg>
);
export const TrendsIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16.5 9.5-4.2 4.2-1.6-2.4-3.2 3.2"
      className={`stroke-current text-${color}`}
    />
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.5 9.5h2v2"
      className={`stroke-current text-${color}`}
    />
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
      className={`stroke-current text-${color}`}
    />
  </svg>
);
export const EyeIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconStyles}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      className={`stroke-current text-${color}`}
    />
    <path
      stroke={`stroke-${color}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z"
      className={`stroke-current text-${color}`}
    />
  </svg>
);
export const CommentIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 1.5 22 22"
    className={iconStyles}
    {...props}
  >
    <path
      fill={`fill-${color}`}
      d="M9 8.517a.75.75 0 0 0 0 1.5v-1.5Zm7 1.5a.75.75 0 0 0 0-1.5v1.5Zm-6.125 1.059a.75.75 0 0 0 0 1.5v-1.5Zm5.25 1.5a.75.75 0 0 0 0-1.5v1.5ZM9.163 5v-.75h-.005l.005.75Zm6.675 0 .006-.75h-.006V5ZM19.5 8.717l-.75-.006v.006h.75Zm0 4.513h-.75v.005l.75-.005Zm-1.062 2.617-.534-.526.534.526Zm-2.6 1.1v.75h.005l-.006-.75Zm-6.675 0v-.75a.75.75 0 0 0-.367.096l.367.654ZM5.5 19h-.75a.75.75 0 0 0 1.117.654L5.5 19Zm0-10.283h.75v-.006l-.75.006ZM6.562 6.1l-.534-.527.534.527ZM9 10.017h7v-1.5H9v1.5Zm.875 2.559h5.25v-1.5h-5.25v1.5ZM9.163 5.75h6.675v-1.5H9.163v1.5Zm6.67 0a2.94 2.94 0 0 1 2.917 2.961l1.5.012a4.44 4.44 0 0 0-4.406-4.473l-.012 1.5Zm2.917 2.967v4.513h1.5V8.717h-1.5Zm0 4.518a2.94 2.94 0 0 1-.846 2.086l1.069 1.053a4.44 4.44 0 0 0 1.277-3.15l-1.5.011Zm-.846 2.086a2.94 2.94 0 0 1-2.072.876l.01 1.5a4.44 4.44 0 0 0 3.13-1.323l-1.068-1.053Zm-2.067.876H9.163v1.5h6.674v-1.5Zm-7.04.096-3.664 2.053.734 1.308 3.663-2.053-.734-1.308ZM6.25 19V8.717h-1.5V19h1.5Zm0-10.289a2.94 2.94 0 0 1 .846-2.085L6.028 5.573a4.44 4.44 0 0 0-1.278 3.15l1.5-.012Zm.846-2.085a2.94 2.94 0 0 1 2.073-.876l-.011-1.5a4.44 4.44 0 0 0-3.13 1.323l1.068 1.053Z"
      className={`fill-current fill-${color}`}
    />
  </svg>
);
export const SpinnerIcon: React.FC<IconProps> = ({
  color,
  iconStyles,
  ...props
}) => (
  <svg
    aria-hidden="true"
    className={` text-gray-200 animate-spin dark:text-gray-600 fill-primary ${iconStyles}`}
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
