import { useState, useEffect, useCallback } from 'react';

interface UseTextToSpeechReturn {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  const speak = useCallback((text: string) => {
    if (!isSupported) {
      console.error('Text-to-speech not supported');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Clean the text for better speech output
    const cleanText = text
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\*/g, '') // Remove italic markers
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
      .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code blocks
      .replace(/\n\n+/g, '. ') // Convert paragraphs to sentences
      .replace(/\n/g, ' '); // Convert line breaks to spaces

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to use a natural sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Google') || voice.name.includes('Natural'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPlaying, isPaused]);

  const resume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    isPlaying,
    isPaused,
    isSupported,
    speak,
    pause,
    resume,
    stop,
  };
};
