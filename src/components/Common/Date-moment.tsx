import React from 'react';
import Moment from 'react-moment';

interface DateMomentProps {
  date: string;
  column?: boolean;
}

const DateMoment: React.FC<DateMomentProps> = ({ date, column = false }) => {
  return (
    <>
      {column ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Moment format="YYYY.MM.DD, ">{date}</Moment>
          <Moment format="hh:mm A">{date}</Moment>
        </div>
      ) : (
        <Moment format="YYYY.MM.DD, hh:mm A">{date}</Moment>
      )}
    </>
  );
};

export default DateMoment;
