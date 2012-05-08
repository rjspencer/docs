# StageBloc Theme Documentation

# Code Style Guidelines

-----

	Here we will want to talk about what kind of code to write, some examples:
	
	* Use semicolons in JavaScript. we compress (not minify, since that would involve changing javascript variable names and stuff) all the code before we upload to the CDN

-----

# Available Pages
Note: Not all pages are required. Define pages that make sense for your theme, and the rest will be taken care of by our engine. No links will be broken.

## page:About
This page should show general information about the account.

Url structure: /about
Recommended modules: 

## page:ActivityStreamList
This page should show a listing of content posted and reposted by the current account. *By default this is the homepage.*

Url structure: /activities  
Recommended modules:

## page:AudioList

## page:AudioPlaylistView

## page:AudioView

## page:BlogList
This page should show a listing of blog posts posted by the account.

Url structure: /blog  
Recommended modules:

## page:BlogView
This page should show the content of an individual blog post.

Url structure: /blog/[%id]  
Recommended modules: 

## page:Error404
This page will be loaded whenever a unknown URL structure is hit.  *Note: This page will not be called when no content is available for a defined view. See {Else} blocks*

Url structure: /HanShotFirstError404

## page:EventPastList
This page should show a listing of events that have already finished.

Url structure: /events/past  
Recommended modules:

## page:EventUpcomingList
This page should show a listing of events that have not yet finished.

Url structures: /events  &  /events/upcoming  
Recommended modules:

## page:EventView
This page should show information for an event.

Url structure: /events/[%id]  
Recommended modules:

## page:PhotoAlbumView
This page should show the photos contained inside a photo album.

Url structure: /photos/albums/[%id]  
Recommended modules:

## page:PhotoList
This page should show a listing of either (a) all photos or (b) all photo albums.

Url structure: /photos  
Recommended modules:

## page:PhotoView
This page should show a large version of a photo.

Url structure: /photos/[%id]  
Recommended modules:

## page:StatusList
This page should show a listing of statuses posted by the account.

Url structure: /statuses  
Recommended modules:

## page:StatusView
This page should show an individual status.

Url structure: /statuses/[%id]  
Recommended modules:

## page:VideoList

## page:VideoPlaylistView

## page:VideoView


# Defining Custom Pages


# Available Global Variables

## AccountName

## CSS
Returns a `<link rel="stylesheet" />` tag, unless the CDN is down, where it will return the CSS inside a `<style>` tag.

## JS
Returns a `<script src="">` tag, unless the CDN is down where it will return the JavaScript inside a `<script>` tag.


## jQuery
Include the latest version of jQuery on the page via Google's CDN.

*Note: this variable will eventually support defining a specific version to grab from Google*

## jPlayer
Include the jPlayer JavaScript library. Requires that {jQuery} is also included and comes before the {jPlayer} variable.

## Link-\[%Section]
Get a relative url to a particular section of the site.

Supported: Audio, Events, EventsPast, Blog, Statuses, Photos, Videos, Home  
Example: `<a href="{Link-Videos}">See my killer video about how to weave baskets underwater!</a>`  
Example return: `<a href="/account-name/videos">See my killer videos about how to weave baskets underwater!</a>`

## Secure Email
Securely put a mailto: link in a theme

address
:	the email address *required*

text
:	the text inside the `<a>` tag *defaults to address*

# If Statements
If statements will check if a certain statement is true, and if it is, execute the code inside. We also support the use of `{if:Else}` delimiters that will execute another code block if false. For example:

	{if:EventHasMinimumAge}
		This event requires that you are over the age of {EventAge} to enter.
	{if:Else}
		This event allows people (and aliens disguised as people) of any age to enter.
	{/if:EventHasMinimumAge}

Most if statements will only function in certain modules or blocks.

## if:ActivityIs[%type]
Use this if statement to compare if a certain activity list item is of a certain type.

Supported types: Audio, Blog, BlogRepost, Event, PhotoAlbum, Status, StatusRepost, Video  
Recommended modules: ActivityStreamList

## if:EventHasMinimumAge
Check if an event has a required minimum age (any age greater than zero).

Recommended block: EventView

## if:EventHasTitle
Check if an event has a title.

Recommended block: EventView

## if:EventHasPrice
Check if an event has a price. Note that a price of "0" is considered a price, as it is free.

Recommended block: EventView

## if:EventHasSupportingActs
Check if there is at least one supporting act for an event.

Recommended block: EventView

## if:Has[%direction]BlogPost
Check if a previous or next blog post exists.

Supported directions: Previous, Next  
Recommended block: BlogView

## if:Has[%direction]Photo
Check if a previous or next photo exists, relative to the current photo album.

Supported direction: Previous, Next
Recommended block: PhotoView

## if:HasPastEvents
Check if past events exist for current account.

Recommended page: EventList  
Global: Yes, this if statement will run anywhere.

## if:HasTags
Check if the content item has any tags

Recommended blocks: BlogView, StatusView, PhotoView, PhotoAlbumView, EventView, AudioView, AudioPlaylistView, VideoView, VideoPlaylistView

## if:HasTicketsBuyLink -- NEEDS TO BE UPDATED

## if:ReadMore
Checks if the current excerpt is trimmed to length of 600 characters (give or take, depending on HTML tags).

Recommended blocks: ActivityView, BlogView  
Recommended pages: ActivityStreamView, BlogList

## if:VenueHasWebsite
Checks if a venue has a website.

Recommended blocks: EventView, AudioView

# Modules and their blocks

## module:AccountAbout

### block:AccountAbout
Renders if there is a defined bio text for the account.

AccountAbout
:	the bio text
AccountAboutCleaned
:	the bio text stripped of all tags except: `<span><em><strong><a><u><i><b>`

### block:AccountLink

LinkUrl
:	The URL

LinkTitle
:	The name of the link

### block:AccountPhoto

PhotoSource-Thumb
:	A square thumbnail, 130x130

PhotoSource-Small
:	Photo with max width of 250

PhotoSource-Medium
:	Photo with max width of 500

PhotoSource-Large
:	Photo with max width of 800

PhotoSource-Original
:	The originally uploaded photo.

	Use PhotoSource-Large when possible

## module:ActivityStreamList
Events are grouped in the activity stream.

### block:ActivityStreamView

ActivityAuthorName
:	author's name

ActivityAuthorPhotoUrl
:	url to a 130x130px user photo

ActivityTitle
:	the content's title

	*Note: for events, the title will be set to* [%number] events added today! *.*

ActivityId
:	the content's id

ActivityBody
:	the main content needed, as defined:

	* Blog: the full blog post HTML
	* Event: the same as {ActivityTitle}: [%number] events added today!
	* Statuses: full status content
	* Photos albums: 
	* Video:
	* Audio:

ActivityCSSClass
:	the relevant classes from this list: repost, blog, status, event, video, audio, photo

ActivityDateTime
:	the time and date modified (photo albums), created (events, videos, audio), or published (blogs, statuses)

	See ### LINK how to format date variables ###

ActivityExcerpt
:	a trimmed version of {ActivityBody}, roughly 600 characters, taking into account HTML

ActivityUrl
:	the permalink to the content's individual page

ActivityPhotoCount
:	number of photos added to a photo album item

RepostedContentTimeAgo
:	if reposted, how long ago in relative time

RepostedFromAccountName
:	if reposted, what was the original account

RepostedFromAccountPhotoUrl
:	if reposted, what was the original account's photo

RepostedFromAccountUrl
:	if reposted, what was the original content permalink url

## module:BlogList

## module:BlogView

## module:EventList

## module:EventView

## module:Navigation
Display all the links to active, defined content sections. *Note: If you do not have the page defined in your theme, the link will not show to that section, however the section will still work with our ###LINK fallback no content page layout###.*

You can override the link text in navigation modules as options. Example:

	{module:Navigation home="News" events="Shows"}
	<ul>
		{block:NavigationItem}
			<li><a href="{Url}" class="{CSSClass}">{LinkText}</a></li>
		{/block:NavigationItem}
	</ul>
	{/module:Navigation}

This will generate links like this:

	<ul>
		<li><a href="/" class="active">News</a></li>
		<li><a href="/events" class="">Shows</a></li>
	</ul>

All variables:

ignore
:	list of top level links to ignore in navigation

	default: `blog,statuses`
order
:	comma separated list to push to beginning; unlisted items will remain in default position


## module:Pagination

## module:PhotoAlbumList

## module:PhotoAlbumView

## module:PhotoList

## module:PhotoView

## module:StatusList

## module:StatusView

## module:TagList

## module:VideoList

## module:VideoPlaylistList

## module:VideoPlaylistView

## module:VideoView

# Formatting Date variables