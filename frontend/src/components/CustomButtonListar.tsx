import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  color?: string;
  onClick: () => void;
}

function CustomButton({ text, color = '#1F3C70', onClick }: CustomButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: color, color: '#fff', '&:hover': { backgroundColor: color } }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
