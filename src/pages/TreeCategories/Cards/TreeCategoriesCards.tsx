import React, { FC, useState, ReactNode } from 'react';
import { useHistory } from 'react-router';

import { IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';
import styles from './TreeCategoriesCards.module.scss';
import { Collapse } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CategoryInfoModal from '../../../components/Modals/CategoryInfoModal/CategoryInfoModal';
import ChildrenCard from '../ChildrenCard/ChildrenCard';
import { ImTree } from 'react-icons/im';

interface TreeCategoriesDataProps {
  list: IGetTreeCategoriesResponse[];
}

interface ExpandableBlockProps {
  blockName: string;
  toggleOpen: (section: string) => void;
  openSections: string[];
  title: string;
  children: ReactNode;
}

const ExpandableBlock: FC<ExpandableBlockProps> = ({
  blockName,
  toggleOpen,
  openSections,
  title,
  children,
}) => {
  return (
    <div>
      <div onClick={() => toggleOpen(blockName)}>
        <span className={styles.expandBlockArrow}>
          {openSections.includes(blockName) ? (
            <IoIosArrowUp size={23} style={{ color: 'green' }} />
          ) : (
            <IoIosArrowDown size={23} />
          )}
        </span>
        <h5>{title}</h5>
      </div>
      <Collapse isOpen={openSections.includes(blockName)}>
        <div className={styles.childrensTitle}>
          <span className={styles.forkIcon}>
            <ImTree />
          </span>
          <span className={styles.title}>Дерево підкатегорій</span>
        </div>

        <div className={styles.children}>{children}</div>
      </Collapse>
    </div>
  );
};

const TreeCategoriesCards: FC<TreeCategoriesDataProps> = ({ list }) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const history = useHistory();
  const [infoModal, toggleInfoModal] = useState(false);

  const toggleOpen = (section: string) => {
    openSections.includes(section)
      ? setOpenSections(openSections.filter((sec) => sec !== section))
      : setOpenSections(openSections.concat(section));
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {list.map((l) => (
          <div className={styles.card}>
            <ExpandableBlock
              blockName={l.key}
              toggleOpen={toggleOpen}
              openSections={openSections}
              title={l.name}
            >
              <div className={styles.childrensBlock}>
                <ChildrenCard childrens={l.children} />
              </div>
            </ExpandableBlock>
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

export default TreeCategoriesCards;
