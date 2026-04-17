"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  onVideoComplete: () => void;
  showButton: boolean;
  setShowButton: (show: boolean) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoComplete, showButton, setShowButton }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Show button after 60 seconds
      if (video.currentTime >= 60 && !showButton) {
        setShowButton(true);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onVideoComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoComplete, showButton, setShowButton]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="https://via.placeholder.com/1280x720/005a32/FFFFFF?text=Video+do+Presidente"
      >
        <source src="/video/presidente-pronunciamento.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/30 transition-colors"
          onClick={handlePlay}
        >
          <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-transform group-hover:scale-110" />
          <div className="absolute bottom-4 left-4 text-white text-left">
            <p className="font-bold">Pronunciamento de Sua Excelência</p>
            <p className="text-sm opacity-80">Presidente da República sobre o Desenvolvimento Económico</p>
          </div>
        </div>
      )}

      {/* Timer overlay */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-mono">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
        <div 
          className="h-full bg-[#005a32] transition-all"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Button appears after 60 seconds */}
      {showButton && (
        <div className="absolute bottom-4 right-4 animate-fade-in">
          <button 
            onClick={() => {
              // This will be handled by the parent component
            }}
            className="bg-[#005a32] hover:bg-[#004a29] text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Candidatar-se ao Empréstimo
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;