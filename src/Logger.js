export * as LogTransports from './log-transports/index';

export class Logger {
    constructor(transports) {
        const t = typeof transports;
        if (t !== 'object' && t !== 'function') {
            throw new Error('Constructor parameters are invalid');
        }

        if (!Array.isArray(transports)) {
            transports = [transports];
        }
        this.transports = [...transports];
    }

    error(event, ...message_parts) {
        this.log('error', event, ...message_parts);
    }

    info(event, ...message_parts) {
        this.log('info', event, ...message_parts);
    }

    log(level, event, ...message_parts) {
        this.transports.forEach(transport => {
            // Queue transport functions asynchronously
            setTimeout(() => transport(level, event, message_parts), 0);
        });
    }

    warn(event, ...message_parts) {
        this.log('warn', event, ...message_parts);
    }
}
