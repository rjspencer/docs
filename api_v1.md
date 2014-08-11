# StageBloc API V1
**It's your data, we're just giving it a good home**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API is actively evolving - please check back here for updates and changes.

### Fork us on GitHub!
All of StageBloc's documentation is up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/v1/`. It can generally be assumed that writing endpoints use `POST` requests and reading endpoints use `GET` requests.

All dates returned are in `GMT / UTC (+0000)` unless otherwise specified.

### Responses
Responses are returned as `JSON`. To receive a `JSONP` response, include a `GET` parameter named `jsonp` specifying the name of your callback method.

The general structure of a success response can be seen below.  The `data` key will contain the actual response data whereas the `metadata` key will contain informational content about the request.  
```
{
    "metadata": {
        "http_code": 200
    },
    "data": {
        ...
    }
}
```

The general structure of an error response can be seen below.  
```
{
    "metadata": {
        "code": 400,
        "error_type": "InvalidData",
        "error": "The error string to present to the user",
        "dev_notes": "Some notes to help a developer debug the issue"
    },
    "data": null
}
```

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first [create a StageBloc account](http://stagebloc.com/signup) and then [register your application in the StageBloc backend](http://stagebloc.com/account/admin/management/developers/) to receive a client ID and secret that will allow users to connect with your application.

Requests can be be made with just a `client_id` parameter, but this is restricted to reading (listing) endpoints. In order to make use of any writing (editing) endpoints, an access token (i.e. validated user) must be present.

# Authentication
StageBloc uses the [OAuth2](http://oauth.net/2/) authentication process to get an access token from a request token. The access token is then used to make all subsequent requests.

Depending on the endpoint, differing levels of authentication exist. Some endpoints require that the authenticated user be a fan while other require that they be an admin of the account.

At the very least, a `client_id` must be passed with each request depending on the authentication level of that endpoint.

Access tokens can be revoked on a per application basis at any point in time by the user in their settings area in the StageBloc backend.

## /oauth2
`[POST]`  
This endpoint is used to get a request token.

username _(required)_

    the email or username of the user trying to authenticate

password _(required)_

    the password of the user trying to authenticate

response\_type _(required)_

    the response type you'd like to receive

    possible value is `code`

client\_id _(required)_

    the ID of the application this user is connecting to (applications can be created in the backend of StageBloc)

	possible values are any client ID that matches a registered application

redirect\_uri _(required)_

    the redirect URI tied to the application you're connecting the user to

    possible values are the URI that matches the application being used

### Example Response
```
{
    "metadata": {
        "http_code": 200
    },
    "data": {
        "code": "<client ID here>"
    }
}
```

## /oauth2/token
`[POST]`  
This endpoint is used to get an access token once a request token is received.

client\_id _(required)_

    the ID of the application this user is connecting to (applications can be created in the backend of StageBloc)

	possible values are any client ID that matches a registered application

client\_secret _(required)_

    the secret of the application this user is connecting to

	possible values are the client secret that matches the application of the passed client ID

grant\_type _(required)_

    the grant type being requested

	possible value is `authorization_code`

code _(required)_

	the request token code received after connecting with the `/oauth2` endpoint

	possible values are any string received during the authentication / connection process
	
include_user

	whether or not to include the authenticated user object with the `access_token` in the response
	
	accepted values are `true` or `false`
	
	defaults to `false`
	
include\_admin\_accounts

	whether or not to include the authenticated user's admin accounts with the `access_token` in the response

	accepted values are `true` or `false`

	defaults to `false`

### Example Response
```
{
    "metadata": {
        "http_code": 200
    },
    "data": {
        "access_token": "<access token here>",
        "scope": "non-expiring",
		"user": "<user object here if requested>",
		"admin_accounts": [<admin accounts here if requested>]
    }
}
```