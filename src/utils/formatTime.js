 const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const _seconds = Math.floor(seconds - hours * 3600 - minutes * 60);

    let str = '';
    if (hours > 0) {
        str += (hours < 10 ? '0' + hours : hours) + ':';
    }
    str += (minutes < 10 ? '0' + minutes : minutes) + ':';
    str += (_seconds < 10 ? '0' + _seconds : _seconds);

    return str;
 }

export default formatTime;