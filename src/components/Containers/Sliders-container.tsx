import React from 'react';
import SlidersTable from '../Tables/Sliders/Sliders-table';

import useSliders from '../../hooks/useSliders';
import FormDialog from '../Modals/Slider-modal';
import useSlidersModal from '../../hooks/useSlidersModal';


const SlidersContainer: React.FC = () => {
    const { data, dispatch } = useSliders();
     const slidersCreateModalData = useSlidersModal();

    return (
        <>
            <SlidersTable data={data} />
            <FormDialog
                dispatch={dispatch}
                slidersLength={data.length}
                modalData={slidersCreateModalData}
            />
        </>
    );
}

export default SlidersContainer;
