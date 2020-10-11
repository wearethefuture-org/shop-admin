import React from 'react';
import Moment from 'react-moment'

interface DateMomentProps {
   date: string
}

const DateMoment:React.FC<DateMomentProps> = ({date}) => {
   return <Moment format='YYYY.MM.DD, hh:mm'>{date}</Moment>;
}

export default DateMoment;