import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // or 'media' or 'class'
  plugins: [
    nextui({
      themes: {
        "purple-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#665775",
              100: "#0D001A",
              200: "#9A84B0",
              DEFAULT: "#FFFCFC",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        "peach-dark": {
          extend: "dark", // <- inherit default values from light theme
          colors: {
            background: "#1C0B01",
            foreground: "#ffffff",
            primary: {
              50: "#4D1F14",
              100: "#FFD0C2",
              200: "#FFB89F",
              300: "#FFA17D",
              400: "#FF8A5B",
              500: "#FF7341",
              600: "#E65D35",
              700: "#B3482A",
              800: "#80331F",
              900: "#4D1F14",
              DEFAULT: "#FF7341",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#FFA17D",
              100: "#FFA17D",
              200: "#E65D35",
              DEFAULT: "#FFFCFC",
            },
            focus: "#FFA17D",
          },
          layout: {
            disabledOpacity: "0.4",
            radius: {
              small: "4px",
              medium: "8px",
              large: "12px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        "lime-light": {
          extend: "light", // <- inherit default values from light theme
          colors: {
            background: "#f1ffe5",
            foreground: "#000000",
            primary: {
              50: "#ffffff",
              100: "#dfffc7",
              200: "#c0ff96",
              300: "#97fd59",
              400: "#72f427",
              500: "#51db07",
              600: "#3baf01",
              700: "#2c7f06",
              800: "#29680c",
              900: "#23580f",
              DEFAULT: "#66E600",
              foreground: "#2c7f06",
            },
            secondary: {
              50: "#c0ff96",
              100: "#c0ff96",
              200: "#3baf01",
              DEFAULT: "#000000",
            },
            focus: "#99FF47",
          },
          layout: {
            disabledOpacity: "0.4",
            radius: {
              small: "3px",
              medium: "6px",
              large: "9px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        "azure-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#001A29",
            foreground: "#CCFFFF",
            primary: {
              50: "#00334C",
              100: "#004A6E",
              200: "#006B99",
              300: "#008BCC",
              400: "#00A3E6",
              500: "#00BFFF",
              600: "#33D1FF",
              700: "#66E3FF",
              800: "#99F5FF",
              900: "#CCFFFF",
              DEFAULT: "#00BFFF",
              foreground: "#E0F7FF",
            },
            secondary: {
              50: "#006B99",
              100: "#006B99",
              200: "#33D1FF",
              DEFAULT: "#8ADFFB",
            },
            focus: "#33D1FF",
          },
          layout: {
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
