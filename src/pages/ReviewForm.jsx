import React, { useState } from 'react';
import axios from '../api/axios';

const ReviewForm = ({ mechanicId, bookingId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const customerId = localStorage.getItem('customerId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/reviews', {
        mechanic: mechanicId,
        customer: customerId,
        booking: bookingId,
        rating,
        comment
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Review submission failed:', err.message);
    }
  };

  if (submitted) return <p>✅ Review submitted!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h4>Rate your mechanic</h4>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} ⭐</option>
        ))}
      </select>
      <br />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
      />
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
