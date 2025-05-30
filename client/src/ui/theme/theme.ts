import { createTheme } from "@mui/material/styles";

export const theme = createTheme({

    palette: {
        primary: { main: "#435058" },
        secondary: { main: "#96BE8C" },
        background: { default: "#FFFBFF" },
        text: { primary: "#435058", secondary: "#629460" }
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: { fontSize: "36px", fontWeight: 600 },
        h2: { fontSize: "24px", fontWeight: 500 },
        h3: { fontSize: "16px", fontWeight: 400 }
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    fontWeight: 600,
                    textTransform: "none",
                    padding: "10px 20px"
                }
            }
        }
    }

});