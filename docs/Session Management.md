## How do sessions work?

When a user logs in (could be after sign up), a new session is created. This means a new entry is added to the `Session` table, with a reference to the User, and the creation time. The session unique ID will be sent back to the client, which will store it in a cookie. When the client lands on a page, it will check if it has a session, and check if that session is valid. If either of those fail, we should redirect to login.
