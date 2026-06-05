import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff  from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {  ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "../../../Constants/Themes";
import ToggleButton from "@mui/material/ToggleButton";
interface IFormInput {
  email: string;
  password: string;
}


export default function Login() {
  const [darkMode,setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onSubmit = (data: IFormInput) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

return (
  <ThemeProvider theme={darkMode? darkTheme : lightTheme} >
    <CssBaseline/>
<ToggleButton href="#" value='' onClick={()=>setDarkMode(p=>!p)}>dark</ToggleButton>
  <form onSubmit={handleSubmit(onSubmit)}>
    <Box sx={{mb:3}}>
    <Typography variant="h4" gutterBottom>
      Sign in
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      If you don’t have an account register
      You can   <Typography variant="body2" color="primary" sx={{cursor:"pointer"}} onClick={() => navigate('/register')}>

      Register here !
      </Typography>
    </Typography>
    </Box>
    <Box sx={{mb:3}}>
    <TextField  {...register('email')} fullWidth  id="outlined-basic" label="Outlined" variant="outlined" color={errors.email ? "error" : "success"}/>
    <Typography variant="caption" color="error" >
      {errors?.email?.message}
      
    </Typography>
    </Box>   
        <Box sx={{mb:3}}>

    <FormControl {...register('password')} fullWidth variant="outlined" sx={{mb:3}} color={errors.password ? "error" : "success"}>
          <InputLabel htmlFor="login-Password">Password</InputLabel>
          <OutlinedInput
          
            id="login-Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment  >
            }
            label="Password"
          />
        </FormControl>
         <Typography variant="caption" color="error" >
      {errors?.password?.message}
      
    </Typography>
    </Box>
        <Button
          fullWidth
           type="submit"
           color="primary"
           // onClick={handleClick}
           loading={loading}
           loadingPosition="end"
          variant="contained"
        >
          Login
        </Button>
  </form>
           </ThemeProvider>
)
}
