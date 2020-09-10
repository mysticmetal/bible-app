import { useParams } from 'react-router-dom';
import ChapterSelector from '../components/selectors/ChapterSelector';
import Header from '../components/header/Header';
import React from 'react';

function ChapterSelectorPage() {
  const { book } = useParams();

  return (
    <>
      <Header book={book} />
      <ChapterSelector book={book} />;
    </>
  );
}

export default ChapterSelectorPage;
