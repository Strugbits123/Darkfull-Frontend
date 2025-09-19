import React from "react";

const MobileMenu = ({height=71, width=83}: {height?: number, width?: number}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 83 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_672_5697)">
        <path
          d="M31.75 23.9286C31.75 22.8635 32.6231 22 33.7 22H59.05C60.1269 22 61 22.8635 61 23.9286C61 24.9937 60.1269 25.8571 59.05 25.8571H33.7C32.6231 25.8571 31.75 24.9936 31.75 23.9286ZM59.05 33.5714H23.95C22.8731 33.5714 22 34.435 22 35.5C22 36.5651 22.8731 37.4286 23.95 37.4286H59.05C60.1269 37.4286 61 36.5651 61 35.5C61 34.435 60.1269 33.5714 59.05 33.5714ZM59.05 45.1429H41.5C40.4232 45.1429 39.55 46.0063 39.55 47.0714C39.55 48.1364 40.4232 49 41.5 49H59.05C60.1269 49 61 48.1364 61 47.0714C61 46.0063 60.1269 45.1429 59.05 45.1429Z"
          fill="url(#paint0_linear_672_5697)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_672_5697"
          x="0"
          y="0"
          width="83"
          height="71"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="11" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.560784 0 0 0 0 0.552941 0 0 0 0 0.921569 0 0 0 0.54 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_672_5697"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_672_5697"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_672_5697"
          x1="22.6796"
          y1="24.7911"
          x2="47.1866"
          y2="56.3938"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6977C5" />
          <stop offset="0.391651" stop-color="#8F8DEB" />
          <stop offset="1" stop-color="#89DDF1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MobileMenu;
