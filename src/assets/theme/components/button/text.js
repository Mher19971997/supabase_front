 

// React Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// React Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent, warning, secondary, grey } = colors;
const { size } = typography;

const buttonText = {
  base: {
    backgroundColor: transparent.main,
    height: "max-content",
    color: warning.main,
    boxShadow: "none",
    padding: `${pxToRem(6)} ${pxToRem(12)}`,

    "&:hover": {
      backgroundColor: transparent.main,
      boxShadow: "none",
      color: warning.focus,
    },

    "&:focus": {
      boxShadow: "none",
      color: warning.focus,
    },

    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.85,
      boxShadow: "none",
    },

    "&:disabled": {
      color: grey[600],
      boxShadow: "none",
    },

    "& .material-icons, .material-icons-round, svg, span": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    fontSize: size.xs,

    "& .material-icons, .material-icons-round, svg, span": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    fontSize: size.sm,

    "& .material-icons, .material-icons-round, svg, span": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    color: warning.main,
    backgroundColor: transparent.main,

    "&:hover": {
      color: warning.focus,
      backgroundColor: transparent.main,
    },

    "&:focus:not(:hover)": {
      color: warning.focus,
      backgroundColor: transparent.focus,
      boxShadow: "none",
    },
  },

  secondary: {
    color: secondary.focus,
    backgroundColor: transparent.main,

    "&:hover": {
      color: secondary.focus,
      backgroundColor: transparent.main,
    },

    "&:focus:not(:hover)": {
      color: secondary.focus,
      backgroundColor: transparent.focus,
      boxShadow: "none",
    },
  },
};

export default buttonText;
