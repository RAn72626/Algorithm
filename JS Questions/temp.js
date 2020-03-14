function debounce(handler, delay) {
    if (handler) {
        let timer = null;
        return () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                handler.apply(this, arguments)
            }, delay);
        }

    } else {
        return () => {}
    }
}

function throttle(handler, delay) {
    if (handler) {
        let timer = null;
        let param = undefined;
        return () => {
            if (timer) {
                param = arguments;
            } else {
                timer = setTimeout(() => {
                    handler.apply(this, arguments);
                    clearTimeout(timer);
                    timer = null;
                }, delay);
            }
        }
    } else {
        return () => {}
    }
}