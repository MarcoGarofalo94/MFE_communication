import {createTheme} from "@mui/material";
import {cssVariables} from "@models/cssvar";

export const ncTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        //Name of the slot
        root: {
          //Some CSS
        }
      },
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            color: "white",
            fontWeight: "bold",
            backgroundColor: cssVariables.colorPrimaryElement,
            border: "1px solid " + cssVariables.colorPrimaryElement,
            borderRadius: "4px",
            minWidth: '64px',
            minHeight: '0',
            textTransform: 'none',
            '&:hover': {
              backgroundColor:  cssVariables.colorPrimaryElementLight,
              border: "1px solid " + cssVariables.colorPrimaryElementLight + " !important",
            },
            '&[disabled]': {
              backgroundColor: cssVariables.colorBorderDark,
              color: cssVariables.colorMainText,
              border: "1px solid " + cssVariables.colorMainText + " !important",
            }
          },
        }
      ]
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "4px"
        },
        select: {
          backgroundColor: 'var(--color-main-background)',
          background: 'var(--color-main-background)',
          fontSize: 14,
          color: cssVariables.colorMainText,
          border: "1px solid " + '#a8a8a8',
          textAlign: 'center',
          padding: '5px 8px',
          '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-main-background)',
          background: 'var(--color-main-background)',
          borderRadius: "4px"
        },
        input: {
          border: '1px solid ' + '#a8a8a8',
          fontSize: 14,
          textAlign: 'center',
          padding: '4px 8px',
          backgroundColor: 'var(--color-main-background)',
          background: 'var(--color-main-background)',
          '&:not([type="range"])': {
            backgroundColor: 'var(--color-main-background)',
            background: 'var(--color-main-background)',
            border: '1px solid ' + '#a8a8a8',
          },
          '&:hover': {
            border: '1px solid ' + '#a8a8a8 !important',
          },
          '&:focus': {
            border: '2px solid #186fc6 !important',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }
    }
  },
});