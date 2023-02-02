import { useState, useRef } from 'react';
import Modal from 'react-modal';

export default function useLongPress() {
    const [action, setAction] = useState();
    const [alertModal, setAlertModal] = useState(false);

    const timerRef = useRef();
    const isLongPress = useRef();

    function startPressTimer() {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setAction('longpress');
        }, 500)
    }

    function handleOnClick(e) {
        console.log('handleOnClick');
        if (isLongPress.current) {
            return;
        }
        setAction('click')
    }

    function handleOnMouseDown() {
        startPressTimer();
    }

    function handleOnMouseUp() {
        clearTimeout(timerRef.current);
    }

    function handleOnTouchStart() {
        if (isLongPress.current) {
            setAction('longpress');
            return;
        }
        startPressTimer();
    }

    function handleOnTouchEnd() {
        if (action === 'longpress') return;
        clearTimeout(timerRef.current);
    }

    return {
        action,
        handlers: {
            onClick: handleOnClick,
            onMouseDown: handleOnMouseDown,
            onMouseUp: handleOnMouseUp,
            onTouchStart: handleOnTouchStart,
            onTouchEnd: handleOnTouchEnd
        }
    }
}