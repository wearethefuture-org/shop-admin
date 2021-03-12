import React from 'react';
import SlideTable from '../Tables/Slides/Slides-table';

import useSlides from '../../hooks/useSlides';
import FormDialog from '../Modals/Slide-modal';
import useSlidesModal from '../../hooks/useSlidesModal';

const SlidesContainer: React.FC = () => {
  const {data, dispatch} = useSlides();
  const slidesCreateModalData = useSlidesModal();

  return (
    <>
      <SlideTable
        data={data}
        dispatch={dispatch}
        modalData={slidesCreateModalData}/>
      <FormDialog
        dispatch={dispatch}
        slidesLength={data.length}
        modalData={slidesCreateModalData}
      />
    </>
  );
}

export default SlidesContainer;
