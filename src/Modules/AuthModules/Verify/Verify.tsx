import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';

import  {verifySchema,type VerifySchema } from '../YupValidation/YupValidation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Verify() {

  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<VerifySchema>({
      resolver: yupResolver(verifySchema),
    });
  
    const onSubmit: SubmitHandler<VerifySchema> = (data,e) => {
      e?.preventDefault();
      console.log("Valid Form Data:", data);
      reset();
  
    };
    
    const textFieldStyle = {
  
      '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input':{
        padding:'10px 14px'
      },
      '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input':{
        padding:'10px 14px'
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(245, 246, 248, 1)',
        borderRadius: '6px',
        '& fieldset': { 
          borderColor: '#e2e8f0',
          borderWidth:'0px',
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
  return <>
  <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ width: '100%', mx: 'auto', fontFamily: 'sans-serif' }}
    >
      {/* Header Section */}
      <Typography variant="h4" gutterBottom sx={{ color: 'rgba(21, 44, 91, 1)', fontWeight: 'bold' }}>
        Verify Your Account
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        If you already have an account register
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You can <Link href="/login" underline="none" sx={{ color: 'rgba(235, 81, 72, 1)', fontWeight: 'bold' }}>Login here !</Link>
      </Typography>

      {/* parent Grid  */}
      <Grid container spacing={2}>
        
        {/* Email Address */}
        <Grid size={12}>
          <Typography variant="subtitle2" sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}>
            Email Address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        {/* OTP Code */}
        <Grid size={12}>
          <Typography variant="subtitle2" sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}>
            OTP Code
          </Typography>
          <TextField
            fullWidth
            placeholder="Please type your OTP here ..."
            sx={textFieldStyle}
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message}
          />
        </Grid>

        {/* Action Button */}
        <Grid size={12} sx={{ mt: 1 }}>
          <Button
            disableElevation
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
            Send 
          </Button>
        </Grid>

      </Grid>
    </Box>
  
  </>;
}
