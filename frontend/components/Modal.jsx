import React from 'react';

const Modal = (props) => {
    return (
        <div className={'modal-background'} onClick={()=>props.setOpen(false)}>
            <div className={'modal-container'} onClick={(e)=>e.stopPropagation()}>
                <button onClick={()=>props.setOpen(false)} className={'modal-close-icon'}>X</button>
                <div className={'modal-content'}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;