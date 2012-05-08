# StageBloc Theme Documentation

# Code Style Guidelines

-----

	Here we will want to talk about what kind of code to write, some examples:
	
	* Use semicolons in JavaScript. we compress (not minify, since that would involve changing javascript variable names and stuff) all the code before we upload to the CDN

-----

# Available Pages
Note: Not all pages are required. Define pages that make sense for your theme, and the rest will be taken care of by our engine. No links will be broken. *Also see Defining Custom Pages*

## page:About
This page should show general information about the account.

Url structure: /about  
Recommended modules: AccountAbout

## page:ActivityStreamList
This page should show a listing of content posted and reposted by the current account. *By default this is the homepage.*

Url structure: /activities  
Recommended modules: ActivityStreamList

## page:AudioList
This page should show a listing of audio content such as audio objects or audio playlists.

Url structure: /audio  
Recommended modules: AudioList, AudioView, AudioPlaylistList, AudioPlaylistView

## page:AudioView
This page should show content for an audio object.

Url structure: /audio/[%id]  
Recommended modules: AudioView

## page:AudioPlaylistList
This page should show a listing of audio playlists

Url structure: /audio/playlists  
Recommended modules: AudioPlaylistView

## page:AudioPlaylistView
This page should show content for an audio playlist.

Url structure: /audio/playlists/[%id]  
Recommended modules: AudioPlaylistView

## page:BlogList
This page should show a listing of blog posts posted by the account.

Url structure: /blog  
Recommended modules:

## page:BlogView
This page should show the content of an individual blog post.

Url structure: /blog/[%id]  
Recommended modules: 

## page:Error404
This page will be loaded whenever a unknown URL structure is hit.  *Note: This page will not be called when no content is available for a defined view. Also see {Else} blocks for Modules*

Url structure: /PageThatDoesNotExist

## page:EventPastList
This page should show a listing of events that have already finished.

Url structure: /events/past  
Recommended modules: EventList

## page:EventUpcomingList
This page should show a listing of events that have not yet finished.

Url structures: /events  &  /events/upcoming  
Recommended modules: EventList

## page:EventView
This page should show information for an event.

Url structure: /events/[%id]  
Recommended modules: EventView

## page:PhotoAlbumList
This page should show a listing of photo albums

Url structure: /photos/albums/  
Recommended modules: PhotoAlbumList

## page:PhotoAlbumView
This page should show the photos contained inside a photo album.

Url structure: /photos/albums/[%id]  
Recommended modules: PhotoAlbumView

## page:PhotoList
This page should show a listing of either (a) all photos or (b) all photo albums.

Url structure: /photos  
Recommended modules: PhotoList

## page:PhotoView
This page should show a single photo.

Url structure: /photos/[%id]  
Recommended modules: PhotoView

## page:StatusList
This page should show a listing of statuses posted by the account.

Url structure: /statuses  
Recommended modules: StatusList

## page:StatusView
This page should show an individual status.

Url structure: /statuses/[%id]  
Recommended modules: StatusView

## page:VideoList
This page should show a listing of videos.

Url structure: /videos/  
Recommended modules: VideoList

## page:VideoView
This page should show the content for an individual video.

Url structure: /videos/[%id]  
Recommended modules: VideoView

## page:VideoPlaylistList
This page should show a listing of video playlists.

Url structure: /videps/playlists
Recommended modules: ViewPlaylistList

## page:VideoPlaylistView
This page should show an individual video playlist.

Url structure: /videos/playlists/[%id]  
Recommended modules: ViewPlaylistView

# Defining Custom Pages

-----

Custom pages can be defined using the following syntax:
	
	 {Page:CustomPageName}
	 
	 {/Page:CustomPageName}

They can contain any modules or blocks that you choose to put inside of them. The page URL will simply be /CustomPageName

-----
 
# Available Global Variables

-----

Global variables use the following syntax:
	
	 {VariableName}
	  
-----

## AccountName

## CSS
Returns a `<link rel="stylesheet" />` tag with a link to the theme's CSS on StageBloc's CDN.

## JS
Returns a `<script src="">` tag with a link to the theme's JS on StageBloc's CDN.

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

# Available Option Variables

-----

Options variables use the following syntax:
	
	 {VariableName option1="value1" option2="value2"}
	  
-----

## ActivityDate
Show the date of an activity in the activity stream  
Options  
format
:	the format of the date according to [this](http://php.net/manual/en/function.date.php) *defaults to n/j/y*  
Special Cases
1. relative : gives a relative date string such as "5 seconds ago"
2. gmdate : gives a GMT date 

## AdminListLikeCount
Shows the amount of likes the collective admins for an account have
Options  
oneItemText
:	the text to append to the count if it happens to be 1

numerousItemText
:	the text to append to the cound if it is anything other than 1

## AudioAddToCartLink
Creates a link that, when clicked, will add the item to the user's cart on StageBloc
Options  
text
:	the text to be put inside the `<a>` tag *defaults to "Add To Cart"*

audioid
:	the ID of the audio you want to add to the user's cart *required*

class
:	the class to assign to the `<a>` tag

## AudioFreeDownloadLink
Creates a link that, when clicked, will download an audio file (unless it requires a follow to download, in which a modal will first show up)
Options  
text
:	the text to be put inside the `<a>` tag *defaults to "Download"*

audioid
:	the ID of the audio you want to download *required*

class
:	the class to assign to the `<a>` tag

## AudioPlaylistAddToCartLink
Creates a link that, when clicked, will add the audio playlist to the user's cart on StageBloc
Options  
text
:	the text to be put inside the `<a>` tag *defaults to "Add To Cart"*

preorderText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist *defaults to "Pre-order"*

preorderSoldOutText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist and it has sold out (if it has a limit on the amount of orders) *defaults to "Pre-order Sold Out"*

audioplaylistid
:	the ID of the audio you want to add to the user's cart *required*

class
:	the class to assign to the `<a>` tag

## SecureEmail
Securely put a mailto: link in a theme  
Options  
address
:	the email address *required*

text
:	the text inside the `<a>` tag *defaults to address*

## RepostLink
Add a link to repost a specific item  
Options  
repostText
:	the text to show when the item hasn't yet been reposted by the viewer *defaults to "Repost"*

unrepostText
:	the text to show when the item has been reposted by the viewer *defaults to "Unrepost"*

class
:	the class to give the `<a>` tag

# If Statements
If statements will check if a certain statement is true, and if it is, add the code inside. We also support the use of `{if:Else}` delimiters that will add a different code block if false. For example:

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

Supported directions: Previous, Next
Recommended block: PhotoView

## if:HasPastEvents
Check if past events exist for current account.

Recommended page: EventList  
Global: Yes, this if statement will run anywhere.

## if:HasTags
Check if the current content item has any tags

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

# Example Theme

