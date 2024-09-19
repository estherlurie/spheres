---
tags:
  - feature
---

- If user logged in, redirect to Home
- Enter {username, email, password}
- Check if username exists in `spheres_users`
  - If yes, return failure
  - If no, proceed
- Write new user to db
- Initialize session
