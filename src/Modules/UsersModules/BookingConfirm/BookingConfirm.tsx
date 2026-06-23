import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#fa755a" },
  },
  hidePostalCode: true,
};

export default function BookingConfirm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { bookingId } = useLocation().state || {};
  const stripe = useStripe();
  const elements = useElements();

  const { register: regName, handleSubmit: handleName } = useForm();
  const { register: regPhone, handleSubmit: handlePhone } = useForm();

  const steps = ["Personal Info", "WhatsApp Number", "Payment"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { token} = await stripe.createToken(cardElement!);

      if (!token) {
        console.error("Failed to create token");
      }

      await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/portal/booking/${bookingId}/pay`,
        { token: token?.id },
        { headers: { Authorization: localStorage.getItem("token") } },
      );

      toast.success("Payment Successful!");
      navigate("/home/pay-success");
    } catch (error) {
      if(axios.isAxiosError(error))
      toast.error(error?.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 4, textAlign: "center", fontWeight: 700, color: "#152C5B" }}
        >
          Complete Your Booking
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Name */}
        {activeStep === 0 && (
          <form onSubmit={handleName(() => setActiveStep(1))}>
            <TextField
              {...regName("name", { required: true })}
              fullWidth
              label="Full Name"
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ bgcolor: "#3252DF" }}
            >
              Next
            </Button>
          </form>
        )}

        {/* Step 2: Phone */}
        {activeStep === 1 && (
          <form onSubmit={handlePhone(() => setActiveStep(2))}>
            <TextField
              {...regPhone("phone", { required: true })}
              fullWidth
              label="WhatsApp Number"
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setActiveStep(0)}
              >
                Back
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ bgcolor: "#3252DF" }}
              >
                Next
              </Button>
            </Box>
          </form>
        )}

        {/* Step 3: Payment */}
        {activeStep === 2 && (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, mb: 3 }}
            >
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setActiveStep(1)}
              >
                Back
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ bgcolor: "#1ABC9C" }}
              >
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
}
