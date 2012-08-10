# Home
**"It's your data, we're just giving it a good home."**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API (and therefore these docs) are still currently under development. That means that there will be changes made, so if you're planning on using the API, check back here for updates and changes frequently.

### Fork us on GitHub!
All of StageBloc's documentation are up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/2.0/`.

All `/edit` endpoints are `POST` endpoints (as well as `/oauth2/token`) and all `/list` endpoints are `GET` endpoints.

Responses can be formatted in either JSON or XML by simply changing the extension of the endpoint between `.xml` and `.json`. For instance, to list an accounts blog entries, you could use either `/list.xml` or `/list.json`. This applies to all endpoints except `/oauth2/token` which only returns JSON.

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first [create a StageBloc account](http://stagebloc.com/signup) and then [register your application in the StageBloc backend](http://stagebloc.com/account/admin/management/applications/development/) to receive a client ID and secret that will allow users to connect with your application.

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
     
   XML Example
   
    <response>
        <error>
            <message>No audio with an ound.</message>
        </error>
    </response>

### Wrappers
There is currently a PHP wrapper available for connecting with the API. It can be found on [GitHub](https://github.com/stagebloc/php-stagebloc-api). Instructions for how to use it are included in the `README` file of that repository.

If you want to create your own wrapper in another language, please do! Let us know, and we can link to it from here.

# /audio
This endpoint is used for interacting with an account's audio.

## /audio/edit

This endpoint can be used for editing existing audio tracks or adding new audio tracks to a StageBloc account. When adding audio, a WAV or AIFF file is required that is then encoded into two different MP3 files (128kb and 320kb). Upon successful editing/creation, the newly created audio track will be returned in the same manner `/audio/list` would return it. Otherwise, an error message will be returned explaining what was wrong.

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
:	a description for the audio track (can contain HTML)

	possible values are any block of text
	
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
:	the quality of the paid download to offer for this audio track

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

	defaults to `0`
	
### Example Response (XML)

    <response>
        <total>18</total>
        <items>
            <item>
                <id>311</id>
                <title>Never Gonna Give You Up</title>
                <artist>Rick Astley</artist>
                <raw_url/>
                <embed_url>http://cdn.stagebloc.com/production/audio/1/mp3_128kb/5190_20120619_175046_1_311.mp3</embed_url>
                <short_url>http://stgb.lc/a/6n</short_url>
                <description>Audio description here!</description>
                <created>2012-06-19 12:50:46</created>
                <modified>2012-07-20 16:18:57</modified>
                <length>21</length>
                <exclusive>true</exclusive>
                <private>false</private>
                <download_details>
                    <price>0.50</price>
                    <fans_name_price>true</fans_name_price>
                    <free_download_quality>1</free_download_quality>
                    <paid_download_quality>2</paid_download_quality>
                    <free_download_require_follow>true</free_download_require_follow>
                    <paid_download_require_follow>true</paid_download_require_follow>
                </download_details>
            </item>
        </items>
    </response>
    
### Example Response (JSON)

    {
        "response": {
            "total": 18,
            "items": [{
                "item": {
                    "id": 311,
                    "title": "Never Gonna Give You Up",
                    "artist": "Rick Astley",
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

	defaults to `0`
	
include_tracks
:	whether or not the audio tracks in this playlist should also be returned

	possible values are `0` (don't include tracks) and `1` (include tracks)
	
	defaults to `0`
	
### Example Response (XML)

    <response>
        <total>4</total>
        <items>
            <item>
                <id>40</id>
                <title>Animal Sounds</title>
                <description>Nature at its finest!</description>
                <created>2012-04-16 11:30:19</created>
                <modified>2012-06-04 18:12:11</modified>
                <short_url>http://stgb.lc/ap/G</short_url>
                <exclusive>true</exclusive>
                <private>false</private>
                <download_details>
                    <price>1.60</price>
                    <fans_name_price>false</fans_name_price>
                    <free_download_quality>0</free_download_quality>
                    <paid_download_quality>2</paid_download_quality>
                    <free_download_require_follow>false</free_download_require_follow>
                    <paid_download_require_follow>true</paid_download_require_follow>
                </download_details>
                <images>
                    <image>
                        <size>thumbnail</size>
                        <short_url>http://stgb.lc/p/PZ/t</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/thumbnail/20120717_144734_1_2783.jpeg</embed_url>
                    </image>
                    <image>
                        <size>small</size>
                        <short_url>http://stgb.lc/p/PZ/s</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/small/20120717_144734_1_2783.jpeg</embed_url>
                    </image>
                    <image>
                        <size>medium</size>
                        <short_url>http://stgb.lc/p/PZ/m</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/medium/20120717_144734_1_2783.jpeg</embed_url>
                    </image>
                    <image>
                        <size>large</size>
                        <short_url>http://stgb.lc/p/PZ/l</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/large/20120717_144734_1_2783.jpeg</embed_url>
                    </image>
                    <image>
                        <size>original</size>
                        <short_url>http://stgb.lc/p/PZ/o</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/original/20120717_144734_1_2783.jpeg</embed_url>
                    </image>
                </images>
                <track_count>6</track_count>
            </item>
        </items>
    </response>

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
This endpoint is used for interacting with an account's blog posts.

## /blog/list
id
:	the ID of the blog entry to return

	possible values are any blog entry ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested blog entry will be returned

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

### Example Response (XML)
    <response>
      <total>486</total>
      <items>
        <item>
          <id>6317</id>
          <title>50 Shades of Grey</title>
          <body>Lions, tables, and chairs, oh my!</body>
          <status>1</status>
          <short_url>http://stgb.lc/b/2SV</short_url>
          <published>2012-06-25 12:30:00</published>
          <created>2012-06-25 12:30:53</created>
          <modified>2012-07-17 15:33:11</modified>
          <sticky>false</sticky>
          <exclusive>true</exclusive>
          <author>
            <id>8</id>
            <name>Demo Admin</name>
          </author>
        </item>
      </items>
    </response>
    
### Example Response (JSON)
    {
        "response": {
            "total": 486,
            "items": [{
                "item": {
                    "id": 6317,
                    "title": "50 Shades of Grey",
                    "body": "Lions, tables, and chairs, oh my!",
                    "status": 1,
                    "short_url": "http:\/\/stgb.lc\/b\/2SV",
                    "published": "2012-06-25 12:30:00",
                    "created": "2012-06-25 12:30:53",
                    "modified": "2012-07-17 15:33:11",
                    "sticky": false,
                    "exclusive": true,
                    "author": {
                        "id": 8,
                        "name": "Demo Admin"
                    }
                }
            }]
        }
    }
    
# /photos
This endpoint is used for interacting with an account's photos.

## /photos/list
id
:	the ID of the photo to return

	possible values are any photo ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If an id is passed, all other parameters will be ignored and only the requested photo will be returned

album_id
:	the ID of the album to receive the photos of

	possible values are any album ID that belongs to the authenticated account
	
	no default
	
**_Important Note:_** If a album_id is passed, all other parameters will be ignored and only the photos belonging to that album will be returned

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

	defaults to `0`
	
### Example Response (XML)

    <response>
        <total>153</total>
        <items>
            <item>
                <id>2797</id>
                <title>Surface of Mars</title>
                <description>Yay Curiosity!</description>
                <exclusive>false</exclusive>
                <modified>2012-07-23 21:16:32</modified>
                <created>2012-07-23 21:16:29</created>
                <images>
                    <image>
                        <size>thumbnail</size>
                        <short_url>http://stgb.lc/p/Qe/t</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/thumbnail/20120724_021629_1_2797.jpeg</embed_url>
                    </image>
                    <image>
                        <size>small</size>
                        <short_url>http://stgb.lc/p/Qe/s</short_url>
                        embed_url>http://cdn.stagebloc.com/production/photos/1/small/20120724_021629_1_2797.jpeg</embed_url>
                    </image>
                    <image>
                        <size>medium</size>
                        <short_url>http://stgb.lc/p/Qe/m</short_url>
                        embed_url>http://cdn.stagebloc.com/production/photos/1/medium/20120724_021629_1_2797.jpeg</embed_url>
                    </image>
                    <image>
                        <size>large</size>
                        <short_url>http://stgb.lc/p/Qe/l</short_url>
                        embed_url>http://cdn.stagebloc.com/production/photos/1/large/20120724_021629_1_2797.jpeg</embed_url>
                    </image>
                    <image>
                        <size>original</size>
                        <short_url>http://stgb.lc/p/Qe/o</short_url>
                        embed_url>http://cdn.stagebloc.com/production/photos/1/original/20120724_021629_1_2797.jpeg</embed_url>
                    </image>
                </images>
                <location>
                    <id>5</id>
                    <name>Allen Hall</name>
                    <website>http://illinois.edu</website>
                    <address>
                        <street_address>1005 West Gregory Avenue</street_address>
                        <city>Urbana</city>
                        <state_province>IL</state_province>
                        <postal_code>61801</postal_code>
                        <country>USA</country>
                    </address>
                </location>
            </item>
        </items>
    </response>

### Example Response (JSON)

    {
        "response": {
            "total": 153,
            "items": [{
                "item": {
                    "id": 2797,
                    "title": "Surface of Mars",
                    "description": "Yay Curiosity!",
                    "exclusive": false,
                    "modified": "2012-08-09 17:35:23",
                    "created": "2012-07-23 21:16:29","
                    "images": [{
                        "image": {
                            "size": "thumbnail",
                            "short_url": "http:\/\/stgb.lc\/p\/Qe\/t",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/thumbnail\/20120724_021629_1_2797.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "small",
                            "short_url": "http:\/\/stgb.lc\/p\/Qe\/s",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/small\/20120724_021629_1_2797.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "medium",
                            "short_url": "http:\/\/stgb.lc\/p\/Qe\/m",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/medium\/20120724_021629_1_2797.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "large",
                            "short_url": "http:\/\/stgb.lc\/p\/Qe\/l",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/large\/20120724_021629_1_2797.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "original",
                            "short_url": "http:\/\/stgb.lc\/p\/Qe\/o",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/original\/20120724_021629_1_2797.jpeg"
                        }
                     }],
                    "location": {
                        "id": 5,
                        "name": "Allen Hall",
                        "website": "http:\/\/illinois.edu",
                        "address": {
                            "street_address": "1005 West Gregory Avenue",
                            "city": "Urbana",
                            "state_province": "IL",
                            "postal_code": "61801",
                            "country": "USA"
                        }
                    }
                }
            }]
        }
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

	defaults to `0`
	
### Example Response (XML)

    <response>
        <total>14</total>
        <items>
            <item>
                <id>166</id>
                <title>Cats</title>
                <short_url>http://stgb.lc/pa/3S</short_url>
                <photo_count>3</photo_count>
                <description>Cats will one day rule the world!</description>
                <private>false</private>
                <exclusive>false</exclusive>
                <modified>2012-08-09 19:12:26</modified>
                <created>2011-11-16 13:31:57</created>
                <images>
                    <image>
                        <size>thumbnail</size>
                        <short_url>http://stgb.lc/p/zn/t</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/thumbnail/20111116_193157_1_1935.jpeg</embed_url>
                    </image>
                    <image>
                        <size>small</size>
                        <short_url>http://stgb.lc/p/zn/s</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/small/20111116_193157_1_1935.jpeg</embed_url>
                    </image>
                    <image>
                        <size>medium</size>
                        <short_url>http://stgb.lc/p/zn/m</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/medium/20111116_193157_1_1935.jpeg</embed_url>
                    </image>
                    <image>
                        <size>large</size>
                        <short_url>http://stgb.lc/p/zn/l</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/large/20111116_193157_1_1935.jpeg</embed_url>
                    </image>
                    <image>
                        <size>original</size>
                        <short_url>http://stgb.lc/p/zn/o</short_url>
                        <embed_url>http://cdn.stagebloc.com/production/photos/1/original/20111116_193157_1_1935.jpeg</embed_url>
                    </image>
                </images>
                <location>
                    <id>7</id>
                    <name>The Rave</name>
                    <website>http://therave.com</website>
                    <address>
                        <street_address>12345 Street</street_address>
                        <city>Milwaukee</city>
                        <state_province>WI</state_province>
                        <postal_code>53103</postal_code>
                        <country>USA</country>
                    </address>
                </location>
            </item>
        </items>
    </response>
    
### Example Response (JSON)

    {
        "response": {
            "total": 14,
            "items": [{
                "item": {
                    "id": 166,
                    "title": "Cats",
                    "short_url": "http:\/\/stgb.lc\/pa\/3S",
                    "photo_count": 3,
                    "description": "Cats will one day rule the world!",
                    "private": false,
                    "exclusive": false,
                    "modified": "2012-08-09 19:12:26",
                    "created": "2011-11-16 13:31:57",
                    "images": [{
                        "image": {
                            "size": "thumbnail",
                            "short_url": "http:\/\/stgb.lc\/p\/zn\/t",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/thumbnail\/20111116_193157_1_1935.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "small",
                            "short_url": "http:\/\/stgb.lc\/p\/zn\/s",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/small\/20111116_193157_1_1935.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "medium",
                            "short_url": "http:\/\/stgb.lc\/p\/zn\/m",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/medium\/20111116_193157_1_1935.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "large",
                            "short_url": "http:\/\/stgb.lc\/p\/zn\/l",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/large\/20111116_193157_1_1935.jpeg"
                        }
                    }, {
                        "image": {
                            "size": "original",
                            "short_url": "http:\/\/stgb.lc\/p\/zn\/o",
                            "embed_url": "http:\/\/cdn.stagebloc.com\/production\/photos\/1\/original\/20111116_193157_1_1935.jpeg"
                        }
                    }],
                    "location": {
                        "id": 7,
                        "name": "The Rave",
                        "website": "http:\/\/therave.com",
                        "address": {
                            "street_address": "12345 Street",
                            "city": "Milwaukee",
                            "state_province": "WI",
                            "postal_code": "53103",
                            "country": "USA"
                        }
                    }
                }
            }]
        }
    }
    
#/oauth2
This is used during the [OAuth2](http://oauth.net/2/) authentication process to get an access token from a request token. Curious? Check out our OAuth2 [PHP](https://github.com/stagebloc/php-stagebloc-api) or [Objective-C](https://github.com/stagebloc/cocoa-stagebloc-api) wrapper on GitHub.

**Note: The only response format for this endpoint is JSON! Do not add an extension to this endpoint!**

##/oauth2/token
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