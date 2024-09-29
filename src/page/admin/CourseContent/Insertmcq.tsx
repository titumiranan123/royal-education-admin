import React from 'react';
import QuizForm from '../utils/Quize';
import { useParams } from 'react-router-dom';

const Insertmcq:React.FC = () => {
    const {id} = useParams()
    return (
      <div>
        <QuizForm examId={id} />
      </div>
    );
};

export default Insertmcq;