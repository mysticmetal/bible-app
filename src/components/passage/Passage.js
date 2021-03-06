import { useRef } from 'react';
import styled from 'styled-components';
import useHammerEffect from '../../hooks/useHammerEffect';

const PassageContainer = styled.div`
  font-size: 1.25rem;
  margin: 0 1rem;

  @media screen and (min-width: 768px) {
    margin: 0 auto;
    width: 50%;
  }

  @media screen and (min-width: 1200px) {
    margin: 0 auto;
    width: 40%;
  }

  /* Styles for returned passage */
  p {
    margin-bottom: 1rem;
  }

  .verse-num {
    font-size: smaller;
    font-style: italic;
    vertical-align: super;
  }
`;

function Passage({ onDecrement, onIncrement, passage }) {
  /* -- Hooks -- */
  const passageRef = useRef();

  useHammerEffect(passageRef, [
    {
      action: 'swipeleft',
      callback: () => onIncrement(),
    },
    {
      action: 'swiperight',
      callback: () => onDecrement(),
    },
  ]);

  /* -- Rendering -- */
  return (
    <PassageContainer
      dangerouslySetInnerHTML={{ __html: passage }}
      data-testid="passage"
      ref={passageRef}
    />
  );
}

Passage.propTypes = {
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  passage: PropTypes.string.isRequired,
};

export default Passage;
