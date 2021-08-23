import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';

import { IGetMainCategoriesResponse } from '../../../interfaces/IMainCategory';
import styles from './MainCategoriesCards.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoryInfoModal from '../../../components/Modals/CategoryInfoModal/CategoryInfoModal';

interface MainCategoriesDataProps {
  list: IGetMainCategoriesResponse[];
}

const MainCategoriesCards: FC<MainCategoriesDataProps> = ({ list }) => {
  const history = useHistory();
  const [infoModal, toggleInfoModal] = useState(false);

  const handleClick = (categoryId) => {
    history.push(`/main-category/${categoryId}`);
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {list.map((l) => (
          <div className={styles.card}>
            <h5 onClick={() => handleClick(l.id)} className={styles.title}>
              {l.name}
            </h5>
            <hr />
            <div className={styles.icons}>
              <InfoIcon onClick={() => toggleInfoModal(!infoModal)} />
              <EditIcon />
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
      {infoModal && <CategoryInfoModal toggleInfoModal={toggleInfoModal} />}
    </>
  );
};

export default MainCategoriesCards;