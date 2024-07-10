import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick: () => void;
}

function CustomButton({text, color = 'primary', onClick}: CustomButtonProps) {
  return (
    <Button variant="contained" color={ color } onClick={ onClick }>
      { text }
    </Button>
  );
}

export default CustomButton;
