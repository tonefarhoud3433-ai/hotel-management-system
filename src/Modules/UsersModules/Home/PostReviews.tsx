import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Rating, Divider, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

interface idRoom {
  roomId: string | undefined
}
export default function PostReviews({ roomId }: idRoom) {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [comment, setComment] = useState('');

  const isReviewError = review.trim().length > 0 && review.trim().length < 10;;
  const isCommentError = comment.trim().length > 0 && comment.trim().length < 10;;

  const handleRate = async () => {
    if (review.trim().length < 10) {
      toast.error("Please enter a valid review (at least 10 characters)");
      return;
    } try {
      let response = await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/room-reviews',
        { roomId, rating, review },
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      );
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handlComment = async () => {
    if (comment.trim().length < 10) {
      toast.error("Please enter a valid review (at least 10 characters)");
      return;
    } try {
      let response = await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/room-comments',
        { roomId, comment },
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      );
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };





  return (

    <Grid container spacing={2} sx={{ mx: 'auto', my: 6}}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6"
            sx={{ color: 'rgba(21, 44, 91, 1)', fontWeight: '500', fontSize: '20px' }}
          >Rate</Typography>
          <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
          <TextField
            error={isReviewError}
            helperText={isReviewError ? "Must be 10+ characters" : ""}
            label="Message"
            multiline rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button variant="contained" sx={{ width:{md:'fit-content',xs:'100%'} , px: 10,  mr:{md:'auto'}  }} onClick={handleRate}>Rate</Button>
        </Box>

      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid size={{ xs: 12, md: 6 }} sx={{ width: { md: '45%' } }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

          <Typography variant="h6" sx={{
            mb: { md: 5 },
            color: 'rgba(21, 44, 91, 1)', fontWeight: '500', fontSize: '20px'
          }}

          >Add Your Comment</Typography>
          <TextField
            required
            error={isCommentError}
            helperText={isCommentError ? "Must be 10+ characters" : ""}
            multiline rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" sx={{ width:{md:'fit-content',xs:'100%'}, px: 10, ml:{md:'auto'} }} onClick={handlComment}>Send</Button>
        </Box>
      </Grid>
    </Grid>

  );
}