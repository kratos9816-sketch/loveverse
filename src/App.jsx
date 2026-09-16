import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PasswordGate from './pages/PasswordGate';
import LoadingScreen from './pages/LoadingScreen';
import Page1Rope from './pages/Page1Rope';
import Page2HoneyTree from './pages/Page2HoneyTree';
import Page3FlowerPath from './pages/Page3FlowerPath';
import Page4NightForest from './pages/Page4NightForest';
import Page5MemoryMap from './pages/Page5MemoryMap';
import Page6MemoryGarden from './pages/Page6MemoryGarden';
import Page7LittleHouse from './pages/Page7LittleHouse';
import Page8HandwrittenLetter from './pages/Page8HandwrittenLetter';
import FinalLoveverse from './pages/FinalLoveverse';
import ThumbprintCertificate from './pages/ThumbprintCertificate';
import MusicController from './components/MusicController';
import SceneContainer from './components/SceneContainer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pageIndex, setPageIndex] = useState(-1);

  const nextPage = () => setPageIndex((prev) => prev + 1);
  const replay = () => setPageIndex(0);

  const renderScene = () => {
    if (!isUnlocked) {
      return (
        <SceneContainer key="passwordGate" bgTheme="forest">
          <PasswordGate onUnlock={() => setIsUnlocked(true)} />
        </SceneContainer>
      );
    }

    switch (pageIndex) {
      case -1:
        return <LoadingScreen onComplete={() => setPageIndex(0)} />;
      case 0:
        return (
          <SceneContainer key="page1" bgTheme="forest">
            <Page1Rope onNext={nextPage} />
          </SceneContainer>
        );
      case 1:
        return (
          <SceneContainer key="page2" bgTheme="forest">
            <Page2HoneyTree onNext={nextPage} />
          </SceneContainer>
        );
      case 2:
        return (
          <SceneContainer key="page3" bgTheme="meadow">
            <Page3FlowerPath onNext={nextPage} />
          </SceneContainer>
        );
      case 3:
        return (
          <SceneContainer key="page4" bgTheme="night">
            <Page4NightForest onNext={nextPage} />
          </SceneContainer>
        );
      case 4:
        return (
          <SceneContainer key="page5" bgTheme="forest">
            <Page5MemoryMap onNext={nextPage} />
          </SceneContainer>
        );
      case 5:
        return (
          <SceneContainer key="page6" bgTheme="meadow">
            <Page6MemoryGarden onNext={nextPage} />
          </SceneContainer>
        );
      case 6:
        return (
          <SceneContainer key="page7" bgTheme="house">
            <Page7LittleHouse onNext={nextPage} />
          </SceneContainer>
        );
      case 7:
        return (
          <SceneContainer key="page8" bgTheme="paper">
            <Page8HandwrittenLetter onNext={nextPage} />
          </SceneContainer>
        );
      case 8:
        return (
          <SceneContainer key="page9" bgTheme="night">
            <FinalLoveverse onNext={nextPage} />
          </SceneContainer>
        );
      case 9:
      default:
        return (
          <SceneContainer key="page10" bgTheme="night">
            <ThumbprintCertificate onReplay={replay} />
          </SceneContainer>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-warm-darkwood overflow-x-hidden font-sans">
      <MusicController />
      <AnimatePresence mode="wait">
        {renderScene()}
      </AnimatePresence>
    </div>
  );
}
