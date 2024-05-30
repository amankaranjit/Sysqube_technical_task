import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
interface MainFooterProps {
    next_display: string;
    prev_display: string;   
    nextNavigate: string;
    prevNavigate: string
}

const MainFooter: React.FC<MainFooterProps> = ({ next_display, prev_display, prevNavigate, nextNavigate }) => {
    const navigate = useNavigate();
    return (
        <div className='footer__wrapper'>
            <Button style={{ display: next_display }} onClick={() => navigate(nextNavigate)}>Next</Button>
            <Button style={{ display: prev_display }} onClick={() => navigate(prevNavigate)}>Previous</Button>
        </div>
    );
};

export default MainFooter;
