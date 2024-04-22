import cover1 from '../../assets/cover-1.png';
import cover2 from '../../assets/cover-2.png';
import React, { useState, useRef, useEffect } from 'react';
import audioSrc1 from '../../assets/lost-in-city-lights-145038.mp3';
import audioSrc2 from '../../assets/forest-lullaby-110624.mp3';
import nextIcon from '../../assets/Stop_and_play_fill_reverse.svg';
import previousIcon from '../../assets/Stop_and_play_fill-1.svg';
import playIcon from '../../assets/Play_fill.svg';
import stopIcon from '../../assets/Stop_and_play_fill.svg';

const tracks = [
  {
    audioSrc: audioSrc1,
    coverSrc: cover1,
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake"
  },
  {
    audioSrc: audioSrc2,
    coverSrc: cover2,
    title: "Forest Lullaby",
    author: "Lesfm"
  },
];


const Card = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(1);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleNext = () => {
    const nextTrackIndex = currentTrack < tracks.length - 1 ? currentTrack + 1 : 0;
    setCurrentTrack(nextTrackIndex);
    setIsPlaying(false); 
  };

  const handlePrevious = () => {
    const previousTrackIndex = currentTrack > 0 ? currentTrack - 1 : tracks.length - 1;
    setCurrentTrack(previousTrackIndex);
    setIsPlaying(false);
  };

  return (
    <div className='bg-c-dark p-10 rounded-[25px]'>
      <div className='text-center'>
        <img className='rounded-[25px] mb-5' src={tracks[currentTrack].coverSrc} alt='cover de musica' />
        <h1 className='text-3xl text-c-white'>{tracks[currentTrack].title}</h1>
        <p className='text-c-gray text-xl my-2'>{tracks[currentTrack].author}</p>

        <div className="mt-6 flex justify-center items-center">
          <div className='w-full'>
            <div className="flex justify-between items-center mb-3 text-c-gray">
              <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
              <span className="text-xs text-gray-500">{formatTime(duration)}</span>
            </div>
            <div className="relative w-full h-1 rounded-lg overflow-hidden">
              <div ref={progressBarRef} className="absolute top-0 left-0 h-full bg-c-pink"></div>
            </div>

            <audio
              ref={audioRef}
              className="my-5 w-full"
              src={tracks[currentTrack].audioSrc}
              type="audio/mp3"
            />

            <button className="p-3 rounded-full focus:outline-none"
              onClick={handlePrevious}>
              <img src={previousIcon} alt="Previous icon" />
            </button>
            <button
              className="p-4 rounded-full bg-c-pink focus:outline-none mx-4 shadow shadow-c-pink"
              onClick={togglePlay}
            >
              <img src={isPlaying ? stopIcon : playIcon} alt={isPlaying ? 'Stop icon' : 'Play icon'} />
            </button>
            <button className="p-3 rounded-full  focus:outline-none"
              onClick={handleNext}>
              <img src={nextIcon} alt="Next icon" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card;