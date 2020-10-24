process.on('uncaughtException', err => {
  console.log(`CAUTGHT ERROR: uncaughtException: ${err}\n`);
});
process.on('unhandledRejection', reason => {
  console.log(
    'CAUTGHT ERROR: Unhandled Rejection at promise. ',
    reason.message ? reason.message : ''
  );
});
