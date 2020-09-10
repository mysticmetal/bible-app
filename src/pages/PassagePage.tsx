import 'wc-spinners/dist/orbit-spinner';
import { CenterBox } from '../components/base/Box';
import { fetchPassage } from '../api/passage';
import { findBookByValue } from '../data/findBook';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Page404 from '../components/errors/Page404';
import Passage from '../components/passage/Passage';
import React from 'react';
import ScrollUp from '../components/scrollers/ScrollUp';
import Header from '../components/header/Header';

function PassagePage() {
  /* -- Hooks -- */
  const { book, chapter } = useParams();
  const navigate = useNavigate();

  const { data: passage, status } = useQuery(
    ['passage', book, chapter],
    () => fetchPassage(book, chapter),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  /* -- Event Handlers -- */
  const handleDecrement = () => {
    const bookDetails = findBookByValue(book);
    const chapterNumber = parseInt(chapter, 10);

    if (chapterNumber === 1) return;

    const newChapter = chapterNumber - 1;

    navigate(`/${bookDetails.value}/${newChapter}`);
  };

  const handleIncrement = () => {
    const bookDetails = findBookByValue(book);
    const chapterNumber = parseInt(chapter, 10);

    if (chapterNumber === bookDetails.chapterCount) return;

    const newChapter = chapterNumber + 1;

    navigate(`/${bookDetails.value}/${newChapter}`);
  };

  /* -- Rendering -- */
  let content;

  switch (status) {
    case 'loading':
      content = (
        <CenterBox>
          <orbit-spinner color="white" />
        </CenterBox>
      );

      break;

    case 'error':
      content = <Page404 />;

      break;

    default:
      if (passage.length === 0) {
        content = <Page404 />;
      } else {
        content = (
          <>
            <Passage onDecrement={handleDecrement} onIncrement={handleIncrement} passage={passage} />
            <ScrollUp />
          </>
        );
      }
  }

  return (
    <>
      <Header book={book} chapter={chapter} />
      {content}
    </>
  );
}

export default PassagePage;
