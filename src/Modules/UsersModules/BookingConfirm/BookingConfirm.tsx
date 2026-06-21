import { Box, Button, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};
 

interface NameForm{
  name:string
}
interface PhoneForm{
  Phone:string
}

export default function BookingConfirm() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const [stepsDone,setStepsDone] = useState(0);
  const nameForm = useForm<NameForm>();
  const phoneNumber = useForm<PhoneForm>();
  const {bookingId} = useLocation().state
  const stripe = useStripe();
  const elements = useElements();
  const submitName = ()=>{
    setStepsDone(1);
  }
  const submitPhone = ()=>{
    setStepsDone(2);
  }
    const handleSubmit = async (event) => {
      setLoading(true)
    event.preventDefault();
    // Handle form submission logic here
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    try {
      // Step 1: Create a Stripe Token from the card details
      const { token, error: tokenError } =
        await stripe.createToken(cardElement);
      if (tokenError) {
        console.error(tokenError);
      }

      if (!token) {
        console.error("Failed to create token");
      }
      console.log("Generated Stripe token:", token);

      const response = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/portal/booking/${bookingId}/pay`,
        { token: token?.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization : localStorage.getItem('token')
              // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTI5OTU5M2IyMjdiZDViOWM0ODFhOWQiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTc4MTcxMDM1OSwiZXhwIjoxNzgyOTE5OTU5fQ.gZcS_GgZLAiRbdAhBGwZru_N7FxX5HYMd2xV_wWa4Ag",
          },
        },
      );
      navigate('/home/pay-success')
    } catch (error) {
      console.error("Error occurred while processing payment:", error);
    }
  };
  const steps = [
  'personal inrormation',
  'whats up number',
  'credit card information',
];
  
  useEffect(()=>{

  },[])
  return (<>
    <Stepper activeStep={stepsDone} alternativeLabel>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
<div>
<Box sx={{height:'50vh',display:'flex',justifyContent:'center',alignItems:'center', overflow:'hidden',width:{sm:'100%',lg:'75%'},m:'auto',padding:4}}>

    <form onSubmit={handleSubmit} className={`hide ${stepsDone == 2 ? 'show':stepsDone>2?'done':''}`} style={{width:'100%'}}>
      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      <div>
        <Button loading={loading} variant="contained" type="submit" sx={{ display:'block',mx:'auto',my:3}}>pay</Button>
        </div>
    </form>
    <form onSubmit={nameForm.handleSubmit(submitName)} className={`hide ${stepsDone == 0 ? 'show':stepsDone>0?'done':''}`} style={{width:'100%'}}>
      {/* <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} /> */}
      <TextField {...nameForm.register('name',{required:'user name is required'})} helperText={nameForm.formState.errors.name?.message} label={'user name'} sx={{width:'100%'}}/>
      <div>
        <Button type="submit" sx={{ display:'block',ml:'auto'}}>next</Button>
        </div>
    </form>
    <form onSubmit={phoneNumber.handleSubmit(submitPhone)} className={`hide ${stepsDone == 1 ? 'show':stepsDone>1?'done':''}`} style={{width:'100%'}}>
      {/* <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} /> */}
      <TextField {...phoneNumber.register('Phone',{required:'phone is required!'})} helperText={phoneNumber.formState.errors.Phone?.message} label={'phone number(wp)'} sx={{width:'100%'}}/>
            <div>
              <Button type="submit" sx={{ display:'block',ml:'auto'}} >next</Button>
              </div>

    </form>
</Box>
</div>
    
  
  </>)
}
