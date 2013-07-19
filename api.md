# Home
**"It's your data, we're just giving it a good home."**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API (and therefore these docs) is still currently under development. That means there will be changes made, so if you're planning on using the API, check back here for updates and changes frequently. We also blog about updates on the [StageBloc Developers](http://stagebloc.com/sbdevs) site.

### Fork us on GitHub!
All of StageBloc's documentation are up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/3.0/`.

All `/edit` endpoints take `POST` parameters (as well as `/oauth2/token`) and all `/list` endpoints take `GET` parameters.

All dates returned are in `GMT / UTC (+0000)`.

Responses can be formatted in either JSON or JSONP by simply changing the extension of the endpoint between `.json` or `.jsonp`. For instance, to list an account's blog entries, one could use either `/list.jsonp` or `/list.json`. This applies to all endpoints except `/oauth2/token` since it only returns JSON. Any request that specifies JSONP as the format must include a `GET` parameter named `callback` to handle the callback function.

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first [create a StageBloc account](http://stagebloc.com/signup) and then [register your application in the StageBloc backend](http://stagebloc.com/account/admin/management/developers/) to receive a client ID and secret that will allow users to connect with your application.

Once you've gotten that far, check out the `oauth2/token` endpoint or look towards the bottom of this page to find a wrapper / framework in your language.

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

### Wrappers
There is currently a PHP wrapper available for connecting with the API. It can be found on [GitHub](https://github.com/stagebloc/php-stagebloc-api). Instructions for how to use it are included in the `README` file of that repository.

An [Objective-C](https://github.com/stagebloc/cocoa-stagebloc-api) framework also exists for easy use with the StageBloc API in your iPhone, iPad, or Mac applications. Instructions on how to get setup with that can be found it its corresponding `README` file as well. There's also a [demo project](https://github.com/stagebloc/stagebloc-cocoa-framework-demo) showcasing the abilities of that framework.

If you want to create your own wrapper in another language, please do! Let us know, and we can link to it from here.

# /accounts
This endpoint is used for interacting with the accounts the authenticated user has admin access to.

## /accounts/list
Lists the accounts the currently authenticated user has admin access to. No parameters are required for this endpoint.

### Explanation of Returned Data

color
:   the color affiliated with the account

stagebloc_url
:	the URL for the account (i.e. `stagebloc.com/<stagebloc_url>/`)

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
:	the connected service
    
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

# /audio
These endpoints are used for interacting with an account's audio.

## /audio/edit
This endpoint can be used for editing existing audio tracks or adding new audio tracks to a StageBloc account. When adding audio, a WAV or AIFF file is required that is then encoded into two different MP3 files (128kb and 320kb). Upon successful editing/creation, the audio track data will be returned in the same manner `/audio/list` would return it. Otherwise, an error message will be returned explaining what was wrong.

id _(required to edit an existing audio track)_
:	the ID of the audio to edit

	possible values are any audio ID that belongs to the authenticated account
	
title _(required)_
:	the title of the audio

	possible values are any string <= 100 characters
	
audio_data _(required when adding a new audio track (i.e. no `id` is given))_
:	the file to upload and stream

	possible values are any `WAV` or `AIFF` file < `200MB` in size

artist
:	the artist of this track

	possible values are any string <= 250 characters
	
	defaults to empty
	
audio_playlist_id
:	a comma seperated list of IDs that this playlist should belong to

	possible values are any CSV string that contains IDs of playlists that the authenticated account has access to
	
	defaults to a "Mobile Uploads" playlist for new audio tracks or existing playlists when editing audio tracks
	
description
:	a description for the audio track

	possible values are any block of text (can contain HTML)
	
	defaults to empty
	
private
:	whether or not this audio track should be private

	possible values are `1` (private) or `0` (public)
	
	defaults to `0`
	
exclusive
:	whether or not this audio track should be marked as exclusive

	possible values are `1` (exclusive) or `0` (not exclusive)
	
	defaults to `0`
	
free_download_quality
:	the quality of the free download to offer for this audio track

	possible values are `0` (not downloadable), `1` (128kb MP3), `2` (320kb MP3), `3` (source WAV / AIFF file)
	
	defaults to `0`
	
paid_download_quality
:	the quality of the paid download to offer for this audio track, only applicable if this track has been uploaded to StageBloc

	possible values are `0` (not downloadable), `1` (128kb MP3), `2` (320kb MP3), `3` (source WAV / AIFF file)
	
	defaults to `0`

free_download_require_follow
:	whether or not a free download should require a follow, only applicable when `free_download_quality` is not `0`

	possible values are `0` (not required) and `1` (required)
	
	defaults to `0`
	
paid_download_require_follow
:	whether or not a paid download should require a follow, only applicable when `paid_download_quality` is not `0`

	possible values are `0` (not required) and `1` (required)
	
	defaults to `0`
	
price
:	the price of the audio track (in USD) for purchasing, only applicable when `paid_download_quality` is not `0`

	possible values are any number > `0.50`
	
	defaults to `.5` ($0.50)
	
fans_name_price
:	whether or not fans should be able to pay more than `price` when purchasing this audio track, only applicable when `paid_download_quality` is not `0`

	possible values are `0` (can't name price) or `1` (can name price)
	
	defaults to `1`
	
tags
:   the tags for the audio

    possible values are a comma sepearated string of tags (i.e. `tag1,tag2`)
    
    defaults to no tags

## /audio/list
id
:	the ID of the audio to return

	possible values are any audio ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested audio will be returned

playlist_id
:	the ID of the playlist to receive the audio of

	possible values are any audio playlist ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If a playlist_id is passed, all other parameters will be ignored and only the audio belonging to that playlist will be returned

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
	
### Explanation of Returned Data

total
:	the total amount of audio tracks for the authenticated account

length
:	the returned length is in seconds

raw_url
:	if the audio wasn't uploader (i.e. was added from SoundCloud, etc), this will be a URL from the service it was added from
	
### Example Response (JSON)

    {
        "response": {
            "total": 18,
            "items": [{
                "item": {
                    "id": 311,
                    "title": "Never Gonna Give You Up",
                    "artist": "Rick Astley",
                    "url":"http:\/\/stagebloc.com\/demo\/audio\/342",
                    "raw_url": null,
                    "embed_url": "http:\/\/cdn.stagebloc.com\/production\/audio\/1\/mp3_128kb\/5190_20120619_175046_1_311.mp3",
                    "short_url": "http:\/\/stgb.lc\/a\/6n",
                    "description": "Audio description here!",
                    "created": "2012-06-19 12:50:46",
                    "modified": "2012-07-20 16:18:57",
                    "length": "21",
                    "exclusive": true,
                    "private": false,
                    "download_details": {
                        "price": 0.50,
                        "fans_name_price": true,
                        "free_download_quality": 1,
                        "paid_download_quality": 2,
                        "free_download_require_follow": true,
                        "paid_download_require_follow": true
                    }
                }
            }]
        }
    }
    
# /audio/playlists
This endpoint is used for interacting with an account's audio playlists.

## /audio/playlists/edit
This endpoint can be used for editing existing audio playlists or adding a new audio playlist to a StageBloc account. Upon successful editing/creation, the newly created audio playlist will be returned in the same manner `/audio/playlist/list` would return it. Otherwise, an error message will be returned explaining what was wrong.

id _(required to edit an existing audio playlist)_
:	the ID of the audio playlist to edit

	possible values are any audio playlist ID that belongs to the authenticated account
	
title _(required)_
:	the title of the audio playlist

	possible values are any string <= 100 characters
	
description
:	the description of the audio playlist

	possible values are any block of text (can contain HTML)
	
	defaults to empty
	
audio_ids
:	a comma separated list of IDs that this playlist should contain

	possible values are any CSV string of audio IDs that belong to the authenticated account
	
	defaults to none (no audio tracks)

photo_data
:	an image file to use as the playlist's cover art

	possible values are any `JPG`, `GIF`, or `PNG` file < `10MB` in size

private
:	whether or not this audio playlist should be private

	possible values are `1` (private) or `0` (public)
	
	defaults to `0`
	
exclusive
:	whether or not this audio playlist should be marked as exclusive

	possible values are `1` (exclusive) or `0` (not exclusive)
	
	defaults to `0`
	
free_download_quality
:	the quality of the free download to offer for this audio playlist

	possible values are `0` (not downloadable), `1` (128kb MP3), `2` (320kb MP3), `3` (source WAV / AIFF file)
	
	defaults to `0`
	
paid_download_quality
:	the quality of the paid download to offer for this audio playlist, only applicable when all tracks in this playlist have been uploaded to StageBloc

	possible values are `0` (not downloadable), `1` (128kb MP3), `2` (320kb MP3), `3` (source WAV / AIFF file)
	
	defaults to `0`

free_download_require_follow
:	whether or not a free download should require a follow, only applicable when `free_download_quality` is not `0`

	possible values are `0` (not required) and `1` (required)
	
	defaults to `0`
	
paid_download_require_follow
:	whether or not a paid download should require a follow, only applicable when `paid_download_quality` is not `0`

	possible values are `0` (not required) and `1` (required)
	
	defaults to `0`
	
price
:	the price of the audio playlist (in USD) for purchasing, only applicable when `paid_download_quality` is not `0`

	possible values are any number > `0.50`
	
	defaults to `.5` ($0.50)
	
fans_name_price
:	whether or not fans should be able to pay more than `price` when purchasing this audio playlist, only applicable when `paid_download_quality` is not `0`

	possible values are `0` (can't name price) or `1` (can name price)
	
	defaults to `1`

## /audio/playlists/list
id
:	the ID of the audio playlist to return

	possible values are any audio playlist ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested audio playlist will be returned

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
	
include_tracks
:	whether or not the audio tracks in this playlist should also be returned

	possible values are `0` (don't include tracks) and `1` (include tracks)
	
	defaults to `0`
	
### Explanation of Returned Data

total
:	the total amount of audio playlists for the authenticated account

images
:	the album art for this audio playlist (if one exists)

track_count
:	the amount of audio tracks currently in this playlist

### Example Response (JSON)

    {
        "response": {
            "total": 4,
            "items": [{
                "item": {
                    "id": 40,
                    "title": "Animal Sounds",
                    "description": "Nature at its finest!",
                    "created": "2012-04-16 11:30:19",
                    "modified": "2012-06-04 18:12:11",
                    "url":"http:\/\/stagebloc.com\/demo\/audio\/playlists\/42",
                    "short_url": "http:\/\/stgb.lc\/ap\/G",
                    "exclusive": true,
                    "private": false,
                    "download_details": {
                        "price": 1.60,
                        "fans_name_price": false,
                        "free_download_quality": 0,
                        "paid_download_quality": 2,
                        "free_download_require_follow": false,
                        "paid_download_require_follow": true
                    },
                    "images": [{
                        "image": {
                            "size": "thumbnail",
                            "short_url": "http:\/\/stgb.lc\/p\/PZ\/t",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/thumbnail\/20120717_144734_1_2783.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "small",
                            "short_url": "http:\/\/stgb.lc\/p\/PZ\/s",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/small\/20120717_144734_1_2783.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "medium",
                            "short_url": "http:\/\/stgb.lc\/p\/PZ\/m",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/medium\/20120717_144734_1_2783.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "large",
                            "short_url": "http:\/\/stgb.lc\/p\/PZ\/l",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/large\/20120717_144734_1_2783.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "original",
                            "short_url": "http:\/\/stgb.lc\/p\/PZ\/o",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/original\/20120717_144734_1_2783.jpeg"
                        }
                    }],
                    "track_count": 6
                }
            }]
        }
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
:	the ID of the user who should be set as the author of the post

	possible values are any ID of an admin for the currently authenticated account
	
	defaults to the authenticated user's ID

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
:	the ID of the blog entry to return

	possible values are any blog entry ID that belongs to the authenticated account
	
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
id
:	the ID of the event to return

	possible values are any event ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested event will be returned

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
	
include_past
:	whether or not to include events that have already occurred

	possible values are `1` (include past events) or `0` (don't include past events)
	
	defaults to `0`
	
include_upcoming
:	whether or not to include events that have not yet occurred

	possible values are `1` (include upcoming events) or `0` (don't include upcoming events)
	
	defaults to `1`
	
### Explanation of Returned Data

total
:	the total amount of events for the authenticated account

buy_link
:	a link to an external service where tickets can be purchased

image
:	the image used as the main image for the event

collaborators
:	a list of people also involved in this event
    
### Examples Response (JSON)

    {
        "response": {
            "total": 3,
            "items": [{
                "item": {
                    "id": 115,
                    "title": "End of The World",
                    "minimum_age": 21,
                    "buy_link": "http:\/\/www.eventbrite.com\/event\/3906955810\/es2?rank=1",
                    "created": "2012-01-04 08:19:53",
                    "modified": "2012-08-10 08:57:38",
                    "start_date": "2013-01-04 13:00:00",
                    "end_date": "2013-01-04 16:00:00",
                    "description": "It's the end of the world we know it...",
                    "price": "1.50",
                    "currency": "USD",
                    "url":"http:\/\/stagebloc.com\/demo\/events\/115",
                    "short_url": "http:\/\/stgb.lc\/e\/2Z",
                    "images": [{
                        "image": {
                            "size": "thumbnail",
                            "short_url": "http:\/\/stgb.lc\/p\/Qg\/t",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/thumbnail\/20120810_134720_1_2799.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "small",
                            "short_url": "http:\/\/stgb.lc\/p\/Qg\/s",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/small\/20120810_134720_1_2799.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "medium",
                            "short_url": "http:\/\/stgb.lc\/p\/Qg\/m",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/medium\/20120810_134720_1_2799.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "large",
                            "short_url": "http:\/\/stgb.lc\/p\/Qg\/l",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/large\/20120810_134720_1_2799.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "original",
                            "short_url": "http:\/\/stgb.lc\/p\/Qg\/o",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/original\/20120810_134720_1_2799.jpeg"
                        }
                    }],
                    "location": {
                        "id": 14,
                        "global_id": 17,
                        "name": "Best Place On Earth",
                        "website": "",
                        "address": {
                            "street_address": "12345 Awesome Street",
                            "city": "Big Bend",
                            "state_province": "WI",
                            "postal_code": "53103",
                            "country": "USA"
                        }
                    },
                    "collaborators": [{
                        "collaborator": {
                            "id": 16,
                            "name": "Dirt Nasty",
                            "website": "http:\/\/dirtnastymusic.com\/"
                        }
                    }]
                }
            }]
        }
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
:	the ID of the photo to return

	possible values are any photo ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested photo will be returned

### Returning all of the photos in an album

album_id
:	the ID of the album to receive the photos of

	possible values are any album ID that belongs to the authenticated account
	
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
:	the ID of the photo to return

	possible values are any photo album ID that belongs to the authenticated account
	
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
This is used during the [OAuth2](http://oauth.net/2/) authentication process to get an access token from a request token for [StageBloc Connect](http://stagebloc.local/developers/connect/). Curious? Check out our OAuth2 [PHP](https://github.com/stagebloc/php-stagebloc-api) or [Objective-C](https://github.com/stagebloc/cocoa-stagebloc-api) wrapper on GitHub to get started.

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
:	the ID of the status to return

	possible values are any status ID that belongs to the authenticated account
	
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

# /videos

This endpoint is used for interacting with an account's videos.

## /videos/list
id
:	the ID of the video to return

	possible values are any video ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested video will be returned

order_by
:	how to order the results

	possible values are `created` and `title`
	
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

### Explanation of Returned Data

total
:	the total amount of videos for the authenticated account

raw_url
:	the link to the video on the external service it belongs to
	
### Example Response (JSON)

    {
        "response": {
            "total": "29",
            "items": [{
                "item": {
                    "id": 663,
                    "title": "Not A Rick Roll",
                    "description": "I promise you, it's not a rick roll...",
                    "url": "http:\/\/stagebloc.com\/demo\/videos\/663",
                    "short_url": "http:\/\/stgb.lc\/v\/cr",
                    "raw_url": "https:\/\/www.youtube.com\/watch?v=oHg5SJYRHA0",
                    "created": "2012-06-16 13:47:37",
                    "modified": "2012-06-16 14:11:59",
                    "embed_code": "<iframe width=\"460\" height=\"259\" src=\"http:\/\/www.youtube.com\/embed\/oHg5SJYRHA0?fs=1&feature=oembed&wmode=transparent\" frameborder=\"0\" allowfullscreen><\/iframe>",
                    "images": [{
                        "image": {
                            "size": "thumbnail",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/thumbnail\/20120713_153517_1_2779.jpeg",
                            "short_url": "http:\/\/stgb.lc\/p\/PV\/t"
                        }
                    }, {
                        "image": {
                            "size": "small",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/small\/20120713_153517_1_2779.jpeg",
                            "short_url": "http:\/\/stgb.lc\/p\/PV\/s"
                        }
                    }, {
                        "image": {
                            "size": "medium",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/medium\/20120713_153517_1_2779.jpeg",
                            "short_url": "http:\/\/stgb.lc\/p\/PV\/m"
                        }
                    }, {
                        "image": {
                            "size": "large",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/large\/20120713_153517_1_2779.jpeg",
                            "short_url": "http:\/\/stgb.lc\/p\/PV\/l"
                        }
                    }, {
                        "image": {
                            "size": "original",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/original\/20120713_153517_1_2779.jpeg",
                            "short_url": "http:\/\/stgb.lc\/p\/PV\/o"
                        }
                    }]
                }
            }]
        }
    }
	
## /videos/edit
This endpoint can be used for editing existing videos or adding new videos to a StageBloc account. Upon successful editing/creation, the video will be returned in the same manner `/videos/list` would return it. Otherwise, an error message will be returned explaining what was wrong.

id _(required to edit an existing video)_
:	the ID of the video to edit

	possible values are any video ID that belongs to the authenticated account
	
url _(required if `id` isn't sent (i.e. adding a new video))_
:	the url of the video, sending this will allow oEmbed to fetch a title and embed code automatically for the video

	possible values are any valid video URL from the following services: YouTube, Vimeo, Hulu, Flickr, Viddler, Qik, Revision3, Blip, DailyMotion
	
title
:	the title of the video, if `url` is sent this will be populated by the oEmbed request but can be overriden by passing an explicit `title`
