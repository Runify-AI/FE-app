import React from 'react';
import FindIdForm from '../components/Form/FindIDForm';
import BackgroundOverlay from '../components/Layout/BackgroundOverlay';
import { IMAGES } from '../constants/images';

export default function FindIdScreen() {
  return (
    <BackgroundOverlay source={IMAGES.bg}>
      <FindIdForm />
    </BackgroundOverlay>
  );
  
}
