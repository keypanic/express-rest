process.on('uncaughtException', (err, origin) => {
  console.log(`CAUTGHT ERROR: uncaughtException: ${err}\n`);
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(
    'CAUTGHT ERROR: Unhandled Rejection at promise. ',
    reason.message ? reason.message : ''
  );
});
