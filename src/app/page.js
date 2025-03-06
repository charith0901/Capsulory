"use client";

import { useState, useEffect } from 'react';
import CreateCapsule from '../components/CreateCapsule';
import CapsuloryLanding from '@/components/CapsuloryLanding';
import Capsules from './capsules/page';
import Navbar from '@/components/Navbar';

export default function Home() {

  return (
    <div>
      <Navbar/>
      <CapsuloryLanding /> 
    </div>
  );
}
