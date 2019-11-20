export function ConsoleTransport() {
    return function _consoleTransportLog(level, event, message_parts) {
        if (!console[level]) {
            level = 'log';
        }
        console[level](`${event}:`, ...message_parts);
    }
}
