import "../src/styles/groov.css";

export default {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "groov dark", value: "#17212b" },
      ],
    },
    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: { width: "430px", height: "932px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "1000px" },
        },
      },
    },
  },
};
