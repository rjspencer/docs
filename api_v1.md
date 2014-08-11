# StageBloc API V1
**"It's your data, we're just giving it a good home."**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API is actively evolving - please check back here for updates and changes.

### Fork us on GitHub!
All of StageBloc's documentation is up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/v1/`. It can generally be assumed that writing endpoints use `POST` and reading endpoints use `GET`. All dates returned are in `GMT / UTC (+0000)` unless otherwise specified.

Responses are returned as `JSON`. To get a `JSONP` response, include a `GET` parameter named `jsonp` specifying the name of your callback method.

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first [create a StageBloc account](http://stagebloc.com/signup) and then [register your application in the StageBloc backend](http://stagebloc.com/account/admin/management/developers/) to receive a client ID and secret that will allow users to connect with your application.

Requests can be be made with just a `client_id` parameter, but this is restricted to reading (listing) endpoints. In order to make use of any writing (editing) endpoints, an access token (i.e. validated user) must be present.

In order to get a validated user, check out the `oauth2/token` endpoint and / or look towards the bottom of this page to find a wrapper / framework in your language.

