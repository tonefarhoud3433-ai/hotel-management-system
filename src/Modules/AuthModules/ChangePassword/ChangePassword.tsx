import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { changePasswordSchema } from "../YupValidation/YupValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
interface IFormInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>({resolver: yupResolver(changePasswordSchema)});
  const [loading, setLoading] = useState(false);
  const textFieldStyle = {
    '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '8px 14px'
    },
    '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '8px 14px'
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(245, 246, 248, 1)',
      borderRadius: '6px',
      '& fieldset': { 
        borderColor: '#e2e8f0',
        borderWidth: '0px',
      },
      '&:hover fieldset': {
        borderColor: '#cbd5e1',
      },
      '&.Mui-focused fieldset': { 
        borderColor: 'rgba(21, 44, 91, 1)', 
        borderWidth: '2px' 
      }
    }
  };
  const onSubmit = (data:IFormInput) => {
    setLoading(true);
    console.log(data);  
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{mb:3}}>

    <Typography variant="subtitle2" sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register('currentPassword')}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 2 }}>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff sx={{ color: '#a0aec0' }} /> : <Visibility sx={{ color: '#a0aec0' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
    </Box>
      <Box sx={{mb:3}}>
            
    <Typography variant="subtitle2" sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}>
            New  Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 2 }}>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff sx={{ color: '#a0aec0' }} /> : <Visibility sx={{ color: '#a0aec0' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
    </Box>
      <Box sx={{mb:3}}>

    <Typography variant="subtitle2" sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}>
            Confirm New Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register('confirmNewPassword')}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 2 }}>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff sx={{ color: '#a0aec0' }} /> : <Visibility sx={{ color: '#a0aec0' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
    </Box>
        <Button
            disableElevation
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              backgroundColor: '#3b5bdb', 
              py: 1, 
              textTransform: 'none', 
              fontSize: '17px',
              fontWeight: '500',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(59, 91, 219, 0.2)',
              '&:hover': { 
                backgroundColor: '#2d46b3',
                boxShadow: '0 6px 16px rgba(59, 91, 219, 0.3)'
              }
            }}
          >
            Change Password
          </Button>
  </form>
}
