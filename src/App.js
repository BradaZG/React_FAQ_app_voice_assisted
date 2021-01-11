import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { scroller } from 'react-scroll';

import Navbar from './Navbar';
import Faq from './Faq';

const App = () => {
  const alanBtnInstance = useRef(null);
  const [index, setIndex] = useState(null);
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [toggleColorFlag, setToggleColorFlag] = useState(false);

  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: process.env.REACT_APP_ALAN_AI_KEY,
        onCommand: commandData => {
          if (commandData.command === 'gotoFaq') {
            // Call the client code that will react to the received command
            scroller.scrollTo(`accordion-button-${commandData.faqId}`, {
              duration: 800,
              delay: 0,
              smooth: 'easeInOutQuart',
            });
            setIndex(commandData.faqId - 1);
            setCurrentFaqId(commandData.faqId);
          } else if (commandData.command === 'toggleColorMode') {
            setToggleColorFlag(flag => !flag);
          }
        },
      });
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Navbar toggleColorFlag={toggleColorFlag} />
      <Faq
        index={index}
        setIndex={setIndex}
        currentFaqId={currentFaqId}
        setCurrentFaqId={setCurrentFaqId}
      />
    </ChakraProvider>
  );
};

export default App;
