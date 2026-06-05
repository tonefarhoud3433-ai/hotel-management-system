import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette:{
    mode:'light',
    primary:{
      main:'#c50101',
      light:'#ff0000',
      dark:'#6e0000'
    },
    success:{main:'#e9ec10'}
  }
})
export const darkTheme = createTheme({
  palette:{
    mode:'dark',
    primary:{
      main:'#c50101',
      light:'#ff0000',
      dark:'#6e0000'
    },
    success:{main:'#e9ec10'}
  }
})

