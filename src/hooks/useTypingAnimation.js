import { useState, useEffect } from 'react';

export const useTypingAnimation = (texts, speed = 100, deleteSpeed = 50, pauseDuration = 2000) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentFullText = texts[currentIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === currentFullText) {
      setIsPaused(true);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration]);

  return currentText;
};