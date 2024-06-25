# JWT Session Management
## Land on page
- Does session exist?
	- Y: Is it valid?
		- Y: Proceed
		- N: Redirect to signup/login
	- N: Redirect to signup/login

## Signup/Login
After sign up, direct to login flow
- 


- Generate secret key, store on server
- Client sends token
- it gets signed by secret key
- signed token sent in ack by server
- signed token stored in cookie on clientside

