"use client";

import { useState, useEffect } from 'react';
import CapsuloryLanding from '@/components/CapsuloryLanding';
import Navbar from '@/components/Navbar';

export default function Home() {

  return (
    <div>
      <Navbar/>
      <CapsuloryLanding /> 
    </div>
  );
}
