# Home
**"It's your data, we're just giving it a good home."**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

[Objective-C Client](https://github.com/stagebloc/stagebloc-ios)

[PHP Client](https://github.com/stagebloc/php-stagebloc-api)


### Under Development
The API is frequently updated, . That means there will be changes made, so if you're planning on using the API, check back here for updates and changes frequently. We also blog about updates on the [StageBloc Developers](http://stagebloc.com/sbdevs) site.

### Fork us on GitHub!
All of StageBloc's documentation is up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/3.0/`.

All `/edit` endpoints take `POST` parameters (as well as `/oauth2/token`) and all `/list` endpoints take `GET` parameters. It can generally be assumed that writing endpoints use `POST` and reading endpoints use `GET`.

All dates returned are in `GMT / UTC (+0000)`.

Responses can be formatted in either JSON or JSONP by simply changing the extension of the endpoint between `.json` or `.jsonp`. For instance, to list an account's blog entries, one could use either `/list.jsonp` or `/list.json`. This applies to all endpoints except `/oauth2/token` since it only returns JSON. Any request that specifies JSONP as the format must include a `GET` parameter named `callback` to handle the callback function.

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first [create a StageBloc account](http://stagebloc.com/signup) and then [register your application in the StageBloc backend](http://stagebloc.com/account/admin/management/developers/) to receive a client ID and secret that will allow users to connect with your application.

Requests can be be made with just a `client_id` parameter, but this is restricted to reading (listing) endpoints. In order to make use of any writing (editing) endpoints, an access token (i.e. validated user) must be present.

In order to get a validated user, check out the `oauth2/token` endpoint and / or look towards the bottom of this page to find a wrapper / framework in your language.

### Errors
Errors can be returned for any of the `/edit` endpoints and differ in content based on the endpoint you're using. However, they will have the following structure:

JSON Example

    {
        "response": [{
            "error": {
                "message": "Description of error."
            }
        }]
    }
    
# Actions

These endpoints encompass the actions that can be taken on an object. For example, to like a blog post, use the endpoint `blog/like.json`, and pass the `id` of the blog you wish to like. Everything in the actions section should be POSTed.

## /like

id _(required)_
:	the id of the content you wish to like

action: _(required)_
:	acceptable values are "like" or "unlike"

The response will return the liked object with the like count updated. See listing endpoints for different content types for the structure of this data.

## /repost

id _(required)_
:	the id of the content to be reposted

action _(required)_
:	acceptable values are "repost" or "unrepost"

account_id _(required)_
:	the id(s) of the account you wish to repost to

	seperate numerous account IDs with commas

The response will return the reposted object with the repost count updated. See listing endpoints for different content types for the structure of this data.

## /comment

Comments are infinitely nested in StageBloc. All comments are organized by the id of their parent, which can be either an object like a blog post or photo, or another comment.

id _(required)_
:	the id of the content you wish to comment on

text _(required)_
:	the text of the comment

reply_to_id
:	if it's a comment on a comment, you must also pass the id of the parent comment (i.e. the specific comment you're replying to)

### Example Response
	{
	    response =     {
	        items =      (
	                        {
	                "account_id" = 1;
	                "content_id" = 213;
	                created = "2013-08-09 21:08:05";
	                id = 47;
	                "reply_count" = 0;
	                "reply_to_id" = 0;
	                "short_url" = "http://stgb.dev/c//P";
	                text = sadsadsad;
	                type = accountStatus;
	                user =                 {
	                    bio = "I really love cats, they are super awesome and i want to eat them yum yum yum";
	                    birthday = "1993-02-13";
	                    created = "2009-10-27 14:29:16";
	                    email = "hi@stagebloc.com";
	                    gender = male;
	                    id = 8;
	                    name = "JoshDude HolatMan";
	                    photo =                     {
	                        height = 0;
	                        id = 49;
	                        images =                         {
	                            "large_url" = "http://cdn-staging.stagebloc.com/local/photos/users/8/large/20130108_170544_8_49.jpeg";
	                            "medium_url" = "http://cdn-staging.stagebloc.com/local/photos/users/8/medium/20130108_170544_8_49.jpeg";
	                            "small_url" = "http://cdn-staging.stagebloc.com/local/photos/users/8/small/20130108_170544_8_49.jpeg";
	                            "thumbnail_url" = "http://cdn-staging.stagebloc.com/local/photos/users/8/thumbnail/20130108_170544_8_49.jpeg";
	                        };
	                        width = 0;
	                    };
	                    url = "http://stagebloc.dev/user/joshholat62man/";
	                    username = joshholat62man;
	                };
	            }
	        );
	    };
	}

# /accounts
This endpoint is used for interacting with the accounts the authenticated user has admin access to.

## /accounts/list
Lists the accounts the currently authenticated user has admin access to. No parameters are required for this endpoint.

### Explanation of Returned Data

color
:   the color associated with the account

stagebloc_url
:	the StageBloc URL for the account (i.e. `stagebloc.com/<stagebloc_url>/`)

images
:	the image for the account

user_is_following
:   whether the active user is following the particular account.
	
### Example Response (JSON)

    {
	    response = {
	        items = ({
	            color = "#cce8ff";
	            "custom_domain" = "";
	            description = "CS Purdue University. Interested in mobile + web development";
	            id = 2362;
	            name = john;
	            photo = {
	                "comment_count" = 0;
	                description = "Account Image";
	                height = 1200;
	                id = 629624;
	                images = {
	                    "large_url" = "http://cdn.stagebloc.com/production/photos/2362/large/20130524_233241_2362_629624.png";
	                    "medium_url" = "http://cdn.stagebloc.com/production/photos/2362/medium/20130524_233241_2362_629624.png";
	                    "small_url" = "http://cdn.stagebloc.com/production/photos/2362/small/20130524_233241_2362_629624.png";
	                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/2362/thumbnail/20130524_233241_2362_629624.png";
	                };
	                "like_count" = 0;
	                "repost_count" = 0;
	                "short_url" = "http://stgb.lc/p/4eaA";
	                title = "Account Image";
	                "user_has_liked" = 0;
	                width = 1200;
	            };
	            "stagebloc_url" = john;
	            type = personal;
	            "user_is_following" = 1;
	            "user_role" = 0;
	        }, {
	            color = "#e6eaef";
	            "custom_domain" = "";
	            description = "The world's a stage. Get on it.";
	            id = 205;
	            name = StageBloc;
	            photo = {
	                "comment_count" = 0;
	                description = "Account Image";
	                height = 1024;
	                id = 630003;
	                images = {
	                    "large_url" = "http://cdn.stagebloc.com/production/photos/205/large/20130613_171101_205_630003.png";
	                    "medium_url" = "http://cdn.stagebloc.com/production/photos/205/medium/20130613_171101_205_630003.png";
	                    "small_url" = "http://cdn.stagebloc.com/production/photos/205/small/20130613_171101_205_630003.png";
	                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/205/thumbnail/20130613_171101_205_630003.png";
	                };
	                "like_count" = 0;
	                "repost_count" = 0;
	                "short_url" = "http://stgb.lc/p/4eh8";
	                title = "Account Image";
	                "user_has_liked" = 0;
	                width = 1024;
	            };
	            "stagebloc_url" = stagebloc;
	            type = business;
	            "user_is_following" = 1;
	            "user_role" = 5;
	        });
	    };
	}
   
## /accounts/social/list
Lists the social profiles the currently authenticated user and account has connected to StageBloc. No parameters are required for this endpoint. Useful with the `/statuses/edit` endpoint for posting to a user's connected social profiles.

### Explanation of Returned Data

id
:   a unique identifier for the social account

name
:   the name of the account or user that the social account is connected to

service
:	the connected service type
    
### Example Response (JSON)

    {
	    response = {
	        items = ({
	            id = 180;
	            name = StageBloc;
	            service = {
	                name = Twitter;
	            };
	        }, {
	            id = 1446;
	            name = john;
	            service = {
	                name = Facebook;
	            };
	        }, {
	            id = 1246;
	            name = "John Smith";
	            service = {
	                name = Twitter;
	            };
	        }, {
	            id = 1452;
	            name = "John Smith";
	            service = {
	                name = Facebook;
	            };
	        });
	    };
	}

# /blog
This endpoint is used for interacting with an account's blog posts

## /blog/edit

This endpoint can be used for editing existing blog posts or adding new blog posts to a StageBloc account. Upon successful editing/creation, the blog post data will be returned in the same manner `/blog/list` would return it. Otherwise, an error message will be returned explaining what went wrong.

id _(required to edit an existing blog post)_
:	the ID of the blog post to edit

	possible values are any blog post ID that belongs to the authenticated account
	
title _(required)_
:	the title of the blog post

	possible values are any string <= 100 characters
	
body _(required)_
:	the body of the blog post

	possible values are any block of text (can contain HTML)
	
published
:	the published time of the post, setting it to a date in the future will cause it to be published at that date (assuming `status` is `1`)

	possible values are a formatted timestamp of the form `"Y-m-d H:i:s O"` (capital o, not zero) (see [PHP's date() function formatters](http://php.net/manual/en/function.date.php))
	
	defaults to a UTC date of the current time in timezone America/Chicago (UTC/GMT -5)

author_id
:	the id of the user who should be set as the author of the post

	possible values are any id of an admin for the currently authenticated account
	
	defaults to the authenticated user's id

status
:	whether or not this blog post should be published

	possible values are `1` (published) or `0` (draft)
	
	defaults to `1`
	
sticky
:	whether or not this blog post should be sticky

	possible values are `1` (sticky) or `0` (not sticky)
	
	defaults to `0`
		
exclusive
:	whether or not this photo should be marked as exclusive

	possible values are `1` (exclusive) or `0` (not exclusive)
	
	defaults to `0`

## /blog/list

### Returning a specific blog post

id
:	the id of the blog entry to return

	possible values are any blog id that belongs to the authenticated account
	
	no default

**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested blog entry will be returned

### Returning all blog posts for an account

order_by
:	how to order the results

	possible values are `published`, `created`, `modified`, or `title`
	
	defaults to `published`

direction
:	what direction to return the results in

	possible values are `ASC` or `DESC`
	
	defaults to `DESC`

limit
:	the limit of results to return

	defaults to `20`

offset
:	the offset of the results to return

	possible values are any number > 0

	defaults to `0`

status
:	comma seperated list of the status of blog entries to return

	possible values are `0` (draft), `1` (published), or `0,1` (both)
	
	defaults to `1`

year
:	the year to limit the published dates of the entries to

	no default

month
:	the month to limit the published dates of the entries to

	no default

ignore_sticky
:	whether or not to ignore sticky posts (i.e. posts that will be returned first regardless of the `order_by` and `direction` parameters)

	possible values are `1` (true) or `0` (false)
	
	defaults to `0`
	
### Explanation of Returned Data

status
:	a value of `1` means published and a value of `0` means draft
    
### Example Response (JSON)
    {
	    response = {
	    items = ({
	        account = {
	            color = "#e6eaef";
	            "custom_domain" = "";
	            description = "The world's a stage. Get on it.";
	            id = 205;
	            name = StageBloc;
	            photo = {
	                "comment_count" = 0;
	                description = "Account Image";
	                height = 1024;
	                id = 630003;
	                images = {
	                    "large_url" = "http://cdn.stagebloc.com/production/photos/205/large/20130613_171101_205_630003.png";
	                    "medium_url" = "http://cdn.stagebloc.com/production/photos/205/medium/20130613_171101_205_630003.png";
	                    "small_url" = "http://cdn.stagebloc.com/production/photos/205/small/20130613_171101_205_630003.png";
	                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/205/thumbnail/20130613_171101_205_630003.png";
	                };
	                "like_count" = 0;
	                "repost_count" = 0;
	                "short_url" = "http://stgb.lc/p/4eh8";
	                title = "Account Image";
	                "user_has_liked" = 0;
	                width = 1024;
	            };
	            "stagebloc_url" = stagebloc;
	            type = business;
	            "user_is_following" = 1;
	            "user_role" = 5;
	        };
	        author = {
	            bio = "Developer at StageBloc.";
	            birthday = "2000-01-01";
	            created = "2013-01-03 00:17:53";
	            email = "austinlouden@gmail.com";
	            gender = male;
	            id = 2673;
	            name = "Austin Louden";
	            photo = {
	                height = 1200;
	                id = 191;
	                images = {
	                    "large_url" = "http://cdn.stagebloc.com/production/photos/users/2673/large/20130524_233142_2673_191.png";
	                    "medium_url" = "http://cdn.stagebloc.com/production/photos/users/2673/medium/20130524_233142_2673_191.png";
	                    "small_url" = "http://cdn.stagebloc.com/production/photos/users/2673/small/20130524_233142_2673_191.png";
	                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/users/2673/thumbnail/20130524_233142_2673_191.png";
	                };
	                width = 1200;
	            };
	            url = "https://stagebloc.com/user/austin/";
	            username = austin;
	        };
	        body = "Example blog body";
	        category = "";
	        "comment_count" = 0;
	        created = "2013-07-18 00:59:29";
	        exclusive = 0;
	        id = 324962;
	        "like_count" = 1;
	        modified = "2013-07-18 16:28:46";
	        published = "2013-07-18 16:00:00";
	        "repost_count" = 1;
	        "short_url" = "http://stgb.lc/b/2EAN";
	        sticky = 0;
	        title = "Meet BARK";
	        "user_has_liked" = 0;
	    });
	    };
    }
    
# /events
This endpoint is used for interacting with an account's events.

## /events/list

### Returning a specific event

id
:	the ID of the event to return

	possible values are any event id that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested event will be returned

### Returning all events for an account

order_by
:	how to order the results

	possible values are `created`, `modified`, or `startDateTime`
	
	defaults to `startDateTime`

direction
:	what direction to return the results in

	possible values are `ASC` or `DESC`
	
	defaults to `ASC`

limit
:	the limit of results to return

	defaults to `20`

offset
:	the offset of the results to return

	possible values are any number > 0

	defaults to `0`
	
past
:	whether or not to include events that have already occurred

	possible values are `true` (include past events) or `false` (don't include past events)
	
	defaults to `false`
	
upcoming
:	whether or not to include events that have not yet occurred

	possible values are `true` (include upcoming events) or `false` (don't include upcoming events)
	
	defaults to `true`
    
### Examples Response (JSON)

	{
	    response =     {
	        items =         (
	                        {
	                "attending_count" = 0;
	                "comment_count" = 0;
	                description = "";
	                "end_date_time" = "2013-08-17 19:00:00 -05:00";
	                id = 1300;
	                "like_count" = 0;
	                "short_url" = "http://stgb.lc/e/oq";
	                "start_date_time" = "2013-08-17 17:00:00 -05:00";
	                "ticket_link" = "";
	                "ticket_price" = 0;
	                title = "Leap Motion Meetup";
	                "user_is_attending" = no;
	            }
	        );
	    };
	}
    
# /photos
These endpoints are used for interacting with an account's photos.

## /photos/edit

This endpoint can be used for editing existing photos or adding new photos to a StageBloc account. When adding a photo, a JPG, GIF, or PNG file is required that is less than 10MB in size. Upon successful editing/creation, the photo data will be returned in the same manner `/photos/list` would return it. Otherwise, an error message will be returned explaining what was wrong.

id _(required to edit an existing photo)_
:	the ID of the photo to edit

	possible values are any photo ID that belongs to the authenticated account
	
title _(required)_
:	the title of the photo

	possible values are any string <= 200 characters
	
photo_data _(required when adding a new photo (i.e. no `id` is given))_
:	the file to upload

	possible values are any `JPG`, `GIF`, or `PNG` file < `10MB` in size

album_id
:	the ID of the photo album to add this photo to

	possible values are any photo album ID that belongs to the authenticated account
	
	defaults to none
	
album_type
:	an ID representing which type of album to upload this photo to, only applicable if `album_id` isn't given, setting it to `5` will change the account's profile image

	possible values are `2` (mobile uploads), `5` (account images), `4` (blog images), or `6` (event images)
	
	defaults to `2`
	
description
:	the description of the photo

	possible values are any block of text (can contain HTML)
	
	default to none
	
exclusive
:	whether or not this photo should be marked as exclusive

	possible values are `1` (exclusive) or `0` (not exclusive)
	
	defaults to `0`
	
tags
:   the tags for the photo

    possible values are a comma sepearated string of tags (i.e. `tag1,tag2`)
    
    defaults to no tags

## /photos/list

### Returning a single photo

id
:	the id of the photo to return

	possible values are any photo id that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested photo will be returned

### Returning all of the photos in an album

album_id
:	the id of the album to receive the photos of

	possible values are any album id that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If a album_id is passed, all other parameters will be ignored and only the photos belonging to that album will be returned

### Returning all of the photos belonging to an account

order_by
:	how to order the results

	possible values are `created`, `modified`, or `title`
	
	defaults to `created`

direction
:	what direction to return the results in

	possible values are `ASC` or `DESC`
	
	defaults to `DESC`

limit
:	the limit of results to return

	defaults to `20`

offset
:	the offset of the results to return

	possible values are any number > 0

	defaults to `0`
	
### Example Response (JSON)
    {
    	response = {
	        items = ({
	            "comment_count" = 0;
	            description = "";
	            height = 1936;
	            id = 631718;
	            images = {
	                "large_url" = "http://cdn.stagebloc.com/production/photos/205/large/20130719_182538_205_631718.jpeg";
	                "medium_url" = "http://cdn.stagebloc.com/production/photos/205/medium/20130719_182538_205_631718.jpeg";
	                "small_url" = "http://cdn.stagebloc.com/production/photos/205/small/20130719_182538_205_631718.jpeg";
	                "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/205/thumbnail/20130719_182538_205_631718.jpeg";
	            };
	            "like_count" = 0;
	            "repost_count" = 0;
	            "short_url" = "http://stgb.lc/p/4eMG";
	            title = "SB shirt";
	            "user_has_liked" = 0;
	            width = 1936;
	        }, {
	            "comment_count" = 0;
	            description = "";
	            height = 465;
	            id = 631213;
	            images = {
	                "large_url" = "http://cdn.stagebloc.com/production/photos/205/large/20130711_173911_205_631213.png";
	                "medium_url" = "http://cdn.stagebloc.com/production/photos/205/medium/20130711_173911_205_631213.png";
	                "small_url" = "http://cdn.stagebloc.com/production/photos/205/small/20130711_173911_205_631213.png";
	                "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/205/thumbnail/20130711_173911_205_631213.png";
	            };
	            "like_count" = 0;
	            "repost_count" = 0;
	            "short_url" = "http://stgb.lc/p/4eCZ";
	            title = "Kid Rock signup";
	            "user_has_liked" = 0;
	            width = 565;
	        });
	    };
    }
    
# /photos/albums
This endpoint is used for interacting with an account's photo albums.

## /photos/albums/list
id
:	the id of the photo album to return

	possible values are any photo album id that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested photo will be returned

order_by
:	how to order the results

	possible values are `created`, `modified`, or `title`
	
	defaults to `created`

direction
:	what direction to return the results in

	possible values are `ASC` or `DESC`
	
	defaults to `DESC`

limit
:	the limit of results to return

	defaults to `20`

offset
:	the offset of the results to return

	possible values are any number > 0

	defaults to `0`

### Explanation of returned data

images
:	the cover image used for the photo album
	
### Example Response (JSON)

    {
	    response = {
	        items = ({
	            created = "2013-06-12 20:59:12";
	            description = "The description of the album.";
	            id = 2219;
	            modified = "2013-06-13 17:00:13";
	            "short_url" = "http://stgb.lc/pa/Eg";
	            title = "Application Images";
	        }, {
	            created = "2010-09-23 19:01:50";
	            description = "The description of the album.";
	            id = 3;
	            modified = "2012-10-11 02:52:07";
	            photo = {
	                "comment_count" = 0;
	                description = "Another description";
	                height = 323;
	                id = 5;
	                images = {
	                    "large_url" = "http://cdn.stagebloc.com/production/photos/205/large/20100923_190330_205_5.jpg";
	                    "medium_url" = "http://cdn.stagebloc.com/production/photos/205/medium/20100923_190330_205_5.jpg";
	                    "small_url" = "http://cdn.stagebloc.com/production/photos/205/small/20100923_190330_205_5.jpg";
	                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/205/thumbnail/20100923_190330_205_5.jpg";
	                };
	                "like_count" = 0;
	                "repost_count" = 0;
	                "short_url" = "http://stgb.lc/p/6";
	                title = "The Social Network";
	                "user_has_liked" = 0;
	                width = 600;
	            };
	            "short_url" = "http://stgb.lc/pa/4";
	            title = "Screen Grabs";
	        });
	    };
    }
    
#/oauth2
This is used during the [OAuth2](http://oauth.net/2/) authentication process to get an access token from a request token for [StageBloc Connect](http://stagebloc.local/developers/connect/). Curious? Check out our OAuth2 [PHP](https://github.com/stagebloc/php-stagebloc-api) or [Objective-C](https://github.com/stagebloc/stagebloc-ios) wrapper on GitHub to get started.

### General Flow
In order to authenticate a user with our application, you must first send them to the `stagebloc.com/connect/` page along with a few `GET` parameters.

	https://stagebloc.com/connect/?client_id=<your_client_id>&redirect_uri=<your_redirect_uri>&response_type=code&scope=non-expiring&consumer_key=<your_client_secret>
	
Once they authorize on that page, they'll be redirected back to your redirect URI with a request token as a `GET` parameter named `code`. Using that `code`, you must submit a `POST` request to `oauth2/token`.

##/oauth2/token
This endpoint is used to get an access token once a request token is received from the `stagebloc.com/connect/` auth flow and the user is redirected back to your application.

client_id _(required)_
:	the ID of the application an account is connecting to

	possible values are any string that matches a registered application

client_secret _(required)_
:	the secret of the application an account is connecting to

	possible values are any string that matches a registered application
	
grant_type _(required)_
:	the grant type being requested

	possible value is `authorization_code`
	
code _(required)_
:	the request token code received after connecting with a registered application via `https://stagebloc.com/connect/`

	possible values are any string received during the authentication / connection process
	
### Example Response (JSON)
    {"access_token":"<access_token_here>","scope":"non-expiring"}
    
## /oauth2/token/disconnect
No parameters required. Hitting this endpoint will simply invalidate the OAuth access token, essentially "logging out" the user.

### Example Response (JSON)
    {"response":{"message":"Token succesfully invalidated."}}

## /oauth2/token/info
This endpoint will return data about the currently authenticated user and account as well as the application for the given access token.

### Example Response (JSON)
    {
        "response": [{
            "items": [{
                "item": {
                    "access_token": "5badcaf789d3d1d09794d8f021f40f0e",
                    "account": {
                        "id": 1,
                        "name": "The Jonas Brothers",
                        "stagebloc_url": "jobros"
                    },
                    "user": {
                        "id": 8,
                        "name": "Carly Rae Jepsen"
                    },
                    "application": {
                        "name": "Music Maker",
                        "description": "Make all your music the bomb diggity!"
                    }
                }
            }]
        }]
    }
    
## /oauth2/token/edit
This endpoint will change the currently authenticated account for this access token. The response will be the same as `/oauth2/token/info`.

account_id
:	the ID of the account to use with this access token
    
# /statuses
This endpoint is used for interacting with an account's statuses.

## /statuses/list

### Returning a specific status

Pass the `id` of a status to return a specific status. If an `id `is passed, all other parameters will be ignored and only the requested status will be returned

id
:	the id of the status to return

	possible values are any status id that belongs to the authenticated account
	
	no default
	
### List the statuses the belong to an account

order_by
:	how to order the results

	possible values are `published`
	
	defaults to `published`

direction
:	what direction to return the results in

	possible values are `ASC` or `DESC`
	
	defaults to `DESC`

limit
:	the limit of results to return

	defaults to `20`

offset
:	the offset of the results to return

	possible values are any number > 0

	defaults to `0`
    
### Example Response (JSON)

	{
		response = {
		    items = ({
		        author = {
		            bio = "Developer at StageBloc.";
		            birthday = "2000-01-01";
		            created = "2013-01-03 00:17:53";
		            email = "johnsmith@gmail.com";
		            gender = male;
		            id = 2673;
		            name = "John Smith";
		            photo = {
		                height = 1200;
		                id = 191;
		                images = {
		                    "large_url" = "http://cdn.stagebloc.com/production/photos/users/2673/large/20130524_233142_2673_191.png";
		                    "medium_url" = "http://cdn.stagebloc.com/production/photos/users/2673/medium/20130524_233142_2673_191.png";
		                    "small_url" = "http://cdn.stagebloc.com/production/photos/users/2673/small/20130524_233142_2673_191.png";
		                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/users/2673/thumbnail/20130524_233142_2673_191.png";
		                };
		                width = 1200;
		            };
		            url = "https://stagebloc.com/user/john/";
		            username = john;
		        };
		        "comment_count" = 0;
		        id = 776;
		        "like_count" = 0;
		        published = "2013-07-19 18:18:15";
		        "repost_count" = 0;
		        "short_url" = "http://stgb.lc/s/eo";
		        text = "Second post from the new app";
		        "user_has_liked" = 0;
		    }, {
		        author = {
		            bio = "Developer at StageBloc.";
		            birthday = "2000-01-01";
		            created = "2013-01-03 00:17:53";
		            email = "johnsmith@gmail.com";
		            gender = male;
		            id = 2673;
		            name = "John Smith";
		            photo = {
		                height = 1200;
		                id = 191;
		                images = {
		                    "large_url" = "http://cdn.stagebloc.com/production/photos/users/2673/large/20130524_233142_2673_191.png";
		                    "medium_url" = "http://cdn.stagebloc.com/production/photos/users/2673/medium/20130524_233142_2673_191.png";
		                    "small_url" = "http://cdn.stagebloc.com/production/photos/users/2673/small/20130524_233142_2673_191.png";
		                    "thumbnail_url" = "http://cdn.stagebloc.com/production/photos/users/2673/thumbnail/20130524_233142_2673_191.png";
		                };
		                width = 1200;
		            };
		            url = "https://stagebloc.com/user/john/";
		            username = john;
		        };
		        "comment_count" = 0;
		        id = 602;
		        "like_count" = 1;
		        published = "2013-05-01 05:28:03";
		        "repost_count" = 0;
		        "short_url" = "http://stgb.lc/s/bo";
		        text = "2 more exams, then moving to Chicago";
		        "user_has_liked" = 0;
		    });
		};
	}
    
## /statuses/edit
This endpoint can be used for adding statuses to a StageBloc account (note: statuses cannot be edited, only deleted). Upon successful addition, the status data will be returned in the same manner `/statuses/list` would return it. Otherwise, an error message will be returned explaining what was wrong.

text _(required)_
:	the text of the status update

	possible values are any string (when sharing to services such as Twitter the text will be truncated to the character limit with a link to the status on StageBloc appended to the end)
	
account_id
:	a comma seperated list of additional account IDs to post this status to, don't incude the currently authorized account's ID in this string as it will always post to at least that account

	possible values are any IDs that the authenticated user has admin access to, see `/accounts/list`
	
profile_id
:	a comma seperated list of social profile IDs to post this status to

	possible values are IDs of social profiles (only Twitter or Facebook) that the authenticated user or account has connected to StageBloc, see `/accounts/social/list`

latitude
:   a string value of the latitude the status was posted at

longitude
:   a string value of the longitude the status was posted at

# /user

## /user/edit

Used for creating a new user or editing an existing one. If the user with the specific email does not exist, a new one will be created. Returns a `user` object.

email _(required)_
:	the user's email

password _(required)_
:	the user's password

bio
:	the user's bio

birthday
:	formatted like 1969-12-31

gender
:	takes "male", "female", or "cupcake"

name
:	the name of user - distinct from username

username
:	the user's username

settings
:	should mirror the settings dictionary shown below, with 0 for off, 1 for on


	{
	    response =     {
	        items =         (
	                        {
	                bio = "<null>";
	                birthday = "1969-12-31";
	                created = "2013-08-09 12:08:14";
	                email = "ratchet@stagebloc.com";
	                gender = cupcake;
	                id = 165528;
	                name = ratchet;
	                settings =                 {
	                    "dashboard_popular_content" = 1;
	                    notifications =                     {
	                        comments =                         {
	                            email = 1;
	                            push = 1;
	                            web = 1;
	                        };
	                        follows =                         {
	                            email = 1;
	                            push = 1;
	                            web = 1;
	                        };
	                        likes =                         {
	                            email = 1;
	                            push = 1;
	                            web = 1;
	                        };
	                        reposts =                         {
	                            email = 1;
	                            push = 1;
	                            web = 1;
	                        };
	                    };
	                };
	                url = "https://stagebloc.com/user/ratchet/";
	                username = ratchet;
	            }
	        );
	    };
	}
