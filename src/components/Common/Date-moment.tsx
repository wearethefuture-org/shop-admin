import React from 'react';
import Moment from 'react-moment';

interface DateMomentProps {
  date: string;
}

const DateMoment: React.FC<DateMomentProps> = ({ date }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Moment format="YYYY.MM.DD, ">{date}</Moment>
      <Moment format="hh:mm A">{date}</Moment>
    </div>
  );
};

export default DateMoment;
