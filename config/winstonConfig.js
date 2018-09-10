module.exports = {
    Winston: {
        transports: [
            new winston.transports.File({filename:'../log/combined.log',level:'info'}),
            new winston.transport.File({filename:'../log/error.log', level:'error'})
        ]
    }
}