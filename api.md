# Home
**"It's your data, we're just giving it a good home."**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API (and therefore these docs) are still currently under development. That means that there will be changes made, so if you're planning on using the API, check back here for updates and changes frequently.

### Fork us on GitHub!
All of StageBloc's documentation are up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/2.0/`.

Responses can be formatted in either JSON or XML by simply changing the extension of the endpoint between `.xml` and `.json`. For instance, to list an accounts blog entries, you could use either `/blog/list.xml` or `/blog/list.json`.

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first register your application in the StageBloc backend to receive a client ID and secret that will allow users to connect with your application.

### Wrappers
There is currently a PHP wrapper available for connecting with the API. It can be found on [GitHub](https://github.com/stagebloc/php-stagebloc-api). Instructions for how to use it are included in the `README` file of that repository.

If you want to create your own wrapper in another language, please do! Let us know, and we can link to it from here.

# /audio
This endpoint is used for interacting with an account's audio.

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

	default is no limit

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
                <embed_url>http://cdn.stagebloc.com/local/audio/1/mp3_128kb/5190_20120619_175046_1_311.mp3</embed_url>
                <short_url>http://stgb.local/a/6n</short_url>
                <description>Audio description here!</description>
                <created>2012-06-19 12:50:46</created>
                <modified>2012-07-20 16:18:57</modified>
                <length>21</length>
                <exclusive>1</exclusive>
                <private>0</private>
                <download_details>
                    <price>0.50</price>
                    <fans_name_price>1</fans_name_price>
                    <free_download_quality>1</free_download_quality>
                    <paid_download_quality>2</paid_download_quality>
                    <free_download_require_follow>1</free_download_require_follow>
                    <paid_download_require_follow>1</paid_download_require_follow>
                </download_details>
            </item>
        </items>
    </response>
    
### Example Response (JSON)

    {
        "response": {
            "total": "18",
            "items": [{
                "item": {
                    "id": "311",
                    "title": "Never Gonna Give You Up",
                    "artist": "Rick Astley",
                    "raw_url": null,
                    "embed_url": "http:\/\/cdn-staging.stagebloc.com\/local\/audio\/1\/mp3_128kb\/5190_20120619_175046_1_311.mp3",
                    "short_url": "http:\/\/stgb.local\/a\/6n",
                    "description": "Audio description here!",
                    "created": "2012-06-19 12:50:46",
                    "modified": "2012-07-20 16:18:57",
                    "length": "21",
                    "exclusive": "1",
                    "private": 0,
                    "download_details": {
                        "price": "0.50",
                        "fans_name_price": true,
                        "free_download_quality": "1",
                        "paid_download_quality": "2",
                        "free_download_require_follow": true,
                        "paid_download_require_follow": true
                    }
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

	default is no limit

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
          <short_url>http://stgb.com/b/2SV</short_url>
          <published>2012-06-25 12:30:00</published>
          <created>2012-06-25 12:30:53</created>
          <modified>2012-07-17 15:33:11</modified>
          <sticky>0</sticky>
          <exclusive>1</exclusive>
          <user>
            <id>8</id>
            <email>hi@stagebloc.com</email>
            <name>Demo Admin</name>
          </user>
          <modified>2012-07-17 15:33:11</modified>
          <modified_by>
            <id>8</id>
            <email>hi@stagebloc.com</email>
            <name>Demo Admin</name>
          </modified_by>
        </item>
      </items>
    </response>
    
### Example Response (JSON)
    {
        "response": {
            "total": "486",
            "items": [{
                "item": {
                    "id": "6317",
                    "title": "50 Shades of Grey",
                    "body": "Lions, tables, and chairs, oh my!",
                    "status": "1",
                    "short_url": "http:\/\/stgb.local\/b\/2SV",
                    "published": "2012-06-25 12:30:00",
                    "created": "2012-06-25 12:30:53",
                    "modified": "2012-07-17 15:33:11",
                    "sticky": "0",
                    "exclusive": "1",
                    "user": {
                        "id": "8",
                        "email": "hi@stagebloc.com",
                        "name": "Demo Admin"
                    },
                    "modified_by": {
                        "id": "8",
                        "email": "hi@stagebloc.com",
                        "name": "Demo Admin"
                    }
                }
            }]
        }
    }