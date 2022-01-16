import { createMuiTheme } from "@material-ui/core/styles";
import VentiCF from "../components/Font/VentiCF-Medium.woff2";
import day from "../images/logo.svg";
const VentiCFfont = {
  fontFamily: "Venti CF",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Venti CF'),
    local('Venti CF-Regular'),
    url(${VentiCF}) format('woff2')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const arcBlue = "#554BF5";
const darkBlue = "#02102B";
const arcYellow = "#F4CE2C";
const arcRed = "#d50000";
const pending = "#FFB031";
const pendingver = "#41C6D8";
const toupdate = "#FFB031";
const warning = "#E80000";
const completed = "#00B940";
const arcOrange = "#FF7C44";
const adGrey = "#464646";
const selectedGrey = "#393636";
const subtitleGrey = "#6F6F6F";
const adGreyText = "#EFEFEF";
const adWhite = "#ffffff";
const whiteOpacity1 = "rgba(255,255,255,0.9)";
const whiteOpacity2 = "rgba(255,255,255,0.85)";
const backgroundGrey = "#E6EBED";
const lightGrey = "#F4F4F4";
const black = "#000000";
const blackOpacity = "rgba(0,0,0,0.4)";
const blackOpacity1 = "rgba(0,0,0,0.9)";
const blackOpacity2 = "rgba(0,0,0,0.8)";

export const Theme = createMuiTheme({
    palette: {
      common: {
        blue: `${arcBlue}`,
        orange: `${arcOrange}`,
        grey: `${adGrey}`,
        ongrey: `${adGreyText}`,
        white: `${adWhite}`,
        backgrey: `${backgroundGrey}`,
        selectedGrey: selectedGrey,
        ltgrey: `${lightGrey}`,
        black: `${black}`,
        whiteOpaque2: adWhite,
        blackOpacity2: blackOpacity2,
        subtitleGrey: subtitleGrey,
        pending: pending,
        pendingver: pendingver,
        toupdate: toupdate,
        warning: warning,
        completed: completed,
        tabs: adWhite,
        tabFont: `${black}`,
        badge: selectedGrey,
        myFont: adWhite,
        red: `${arcRed}`,
        newgrey: `${adGrey}`,
        calHeader: adWhite,
        calTodayCol: adWhite,
        chapSel: `${adGreyText}`,
        HomeProg: `${adGrey}`,
      },
      primary: {
        main: `${arcBlue}`,
      },
      secondary: {
        main: `#ED1B30`,
      },
    },
  
    typography: {
      fontFamily: "Venti CF",
      myTheme: {
        themeName: "Day",
      },
  
      mainContainer: {
        width: "100%",
        height: "100vh",
        marginLeft: "12em",
        marginTop: "5em" ,
        backgroundColor: whiteOpacity1,
      },
      subContainer: {
        padding: "1em",
      },
  
      tiles: {
        height: "130vh",
        textDecoration: "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
  
      tilesHeading: {
        width: "94%",
        marginTop: "4.7em",
        minHeight: "7em",
        borderRadius: 0,
        backgroundColor: whiteOpacity2,
        transition: "background-color 0.5s,color 0.5s",
        "&:hover": {
          backgroundColor: selectedGrey,
          color: adWhite,
        },
      },
  
      favorites: {
        width: "100%",
        position:"sticky",
        top: "93vh",
        height: "3.5em",
        borderRadius: 0,
        backgroundColor: blackOpacity,
      },
      h4: {
        fontSize: "1.5rem",
        color: "black",
      },
  
      h5: {
        fontSize: "1.25rem",
        color: "black",
      },
  
      h6: {
        fontSize: "1rem",
        color: "black",
      },
  
      body1: {
        color: "black",
      },
  
      subtitle1: {
        color: black,
        fontSize: "0.8rem",
      },
      caption: {
        color: "#989898",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [VentiCFfont],
  
          body: {
            backgroundImage: `url(${day})`,
            backgroundSize: "100% 130%",
            backgroundRepeat: "repeat",
          },
        },
      },
    },
  });