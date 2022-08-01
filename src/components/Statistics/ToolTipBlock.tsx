import React, { useEffect, useState } from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tooltip: {
    borderRadius: '4px',
    backgroundColor: '#006400',
    color: '#ffffff',
    padding: '16px',
    boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
});

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  const styles = useStyles();
  const [textMessage, setTextMessage] = useState<string[]>([]);

  useEffect(() => {
    if (active && payload && payload[1]) {
      setTextMessage(['сплаченийх замовлень', 'несплачених замовлень']);
    } else {
      setTextMessage(['зареєстрованих']);
    }
  }, [active, payload]);

  if (active && payload) {
    return (
      <div className={styles.tooltip}>
        <h4>{label}</h4>
        <p>
          {payload[0].value} {textMessage[0]}
        </p>
        {payload[1] && (
          <p>
            {payload[1].value} {textMessage[1]}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
