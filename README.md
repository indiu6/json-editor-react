# [JSONify](https://main.d3qhb7r1xj3quf.amplifyapp.com/)

built with React, Firebase, JSON Editor
 - API endpoints from https://random-data-api.com

## Summary

- Design: [@fortawesome](https://www.npmjs.com/package/@fortawesome/fontawesome-free) + CSS
- Deployment: [AWS Amplify](https://aws.amazon.com/amplify)
- Authentication: [Firebase Authentication](https://firebase.google.com/docs/auth)
  > Login or Register with email, Google or Github account
- File Handling: [FileReader](https://developer.mozilla.org/en/docs/Web/API/FileReader)
  > Load JSON file for editor (test using test.json file)
- NoSQL Database: [Firebase Firestore](https://firebase.google.com/docs/firestore)
  > Create, Read, Update, Delete JSON data
- JSON Tree: [JSON Editor](https://github.com/josdejong/jsoneditor)
  > JSON Editor is a web-based tool to view, edit, format, and validate JSON.
- Test Coverage: [Coverage Reporting](https://create-react-app.dev/docs/running-tests/#coverage-reporting)
  > Create-React-App uses Jest as its test runner.
  ```
  npm test -- --coverage
  ```

## If Time Permits..

- Use Node.js, Express.js for server ENV and backend API
- Use ORM like mongoose for MongoDB or sequelize for MySQL
- Use Material-UI for better design on button, modal, dialog, input, and loading.
- Export edited JSON file