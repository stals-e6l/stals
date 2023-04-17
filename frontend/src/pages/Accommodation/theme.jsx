import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        textColor: {
            main: "#1d1d15",         // black
            subMain: "#154360",      // light gray
            subHeadings: "#6e6e73"   // darker gray   
        },
        bacgroundGray: {
            mainGray: "#154360",    
            darkGray: "#f5f5f7"
        },
        customBlue: {
            main: '#154360',        // blue
            textColor: customGray.mainGray
        },
        customGreen: {
            main: '#60ce80',        // green
            textColor: customGray.mainGray
        }
    },
    typography: {
        main: {
            fontFamily: 'Source Sans Pro'
        },
        body: {
            fontFamily: 'Quicksand'
        }

    }
})