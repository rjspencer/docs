# Home
Hello there! You are about to embark on an epic journey through StageBloc's Theming Engine documentation. It may sound scary, but you won't have any issues if you have a basic understanding of HTML, CSS, and/or JavaScript.

### General Information
In general, a theme consists of defining the pages that make sense for your website and filling them with data. Each `{page}` represents a separate URL on the site. The data within each `{page}` is built using any combination of `{module}`s and `{block}`s.

It is easiest to think of `{module}`s as `for` loops that loop through various data from your StageBloc account. Within a `{module}` a `{block}` can be used to represent a "model" of the data by exposing various pieces of information about that data.

StageBloc also then has various `{if}` statements and other helpful variables to make themes as customizable as possible.

The general structure of a theme is simply repeating chunks of code with the following structure. HTML can be placed anywhere inside of this hierarchy:

	{page:PageName}
		{module:ModuleName}
			{block:BlockName}
			{/block:BlockName}
		{/module:ModuleName}
	{/page:PageName}

Some useful notes...

* If you don't explicitly provide a favicon in the `<head>` of your HTML, we'll add the [default StageBloc favicon](https://stagebloc.com/favicon.ico) for you. To add your own favicon, simply upload it as a Theme Asset and put it in your theme's `<head>` HTML tag.

* We add various `<meta>` tags to your `<head>` content if they aren't explicitly set to aid in SEO. For instance, many tags from the [Open Graph Protocol](http://ogp.me/) are automatically added.

* We allow you to upload assets *(images, fonts, favicons, etc)* to our CDN and encourage you to use this when creating a theme. This means you don't have to host any part of your theme outside of StageBloc, making it easier for you.

* CSS and JS are both minified before being uploaded to our CDN so that you get the maximum performance and caching when users come to your site. Sometimes errors can occur during this process. If you notice your JS or CSS behaving differently once uploaded, please let us know.

Some tips...

* Use semicolons in JavaScript. As mentioned above, do compress / minify your JavaScript before we upload it to our CDN so this will help ensure less issues occur.

* Remember to keep metadata in mind. For instance, when people share links to Facebook, you have control over the information Facebook pulls from the page. Check out this [obligatory StackOverflow post](http://stackoverflow.com/a/7623986/115629) for more info.

### Help us out!
The documentation for the Theming Engine is up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs/blob/master/theming.md)

## Local Theme Dev
StageBloc themes can be edited in a web based sidebar, but that isn't ideal when doing rapid development and prototyping of a theme. For that reason, we've built an open source, PHP based tool to allow for easy localhost theme development. The tool simply uses our API to render a theme and return the HTML back to you. As such, a similar tool could be built in any other language pretty easily.

For the PHP version, head over to our [Local Theme Dev](https://github.com/stagebloc/local-theme-dev) repo on GitHub. Once installed and running, it allows developers to quickly and easily swap between different themes and accounts to get a feel for how various data looks in their theme.

Please feel free to open issues and/or submit pull requests if you find ways to make it more useful.

## Submitting Themes
Once you've built your theme, you can submit it to the StageBloc team for approval to be sold in our marketplace. This can be done via the StageBloc backend for your account. Themes can be priced as whatever amount you see fit (as well as free), and the same percentages apply to themes that apply to any other products sold on StageBloc. Once someone purchases your theme, they'll get the full source code and will be able to install and use it on their account.

# Syntax
The StageBloc Theming Engine makes use of curly brackets and a few main building blocks for the majority of its syntax. The build blocks (page, modules, and blocks) should be kept lowercase as they are in these docs.

To find out more information about each building block, navigate to them in the navigation on the left hand side of this page.
	
## Pages
Each view (i.e. URL) on StageBloc in contained within a `{page}`. There are a bunch of built in pages, but [you can also create your own custom pages](#custom-pages). Any HTML, `{module}`s, or `{block}`s can be put inside of a `{page}`.

It is not necessary to define a view for every `{page}` available via the Theming Engine. Define pages that make sense for your theme, and the rest will be taken care of via a fallback theme we've created so that no links will be broken.

A page in its simplest form would look like the following block of code:

	{page:PageName}
		...
		HTML content, etc here
		...
	{/page:PageName}
	
### Custom Pages
Custom pages allow you to create pages at URLs that aren't already built into the Theming Engine. They can be defined using the following syntax:

	{page:CustomMyAwesomePage}
		...
		HTML content, etc here
		...
	{/page:CustomMyAwesomePage}

The URL for a custom page is simply whatever follows "Custom" in the page's definition (the above examples URL would be `/MyAwesomePage`). Using slashes within the page's definition is also allowable and allows easy creation of hierarchical URLs.

Any content that can be put inside of a built in page can be put inside of a custom page.
	
### Page Options
Pages can have options applied to them. Options are listed within the `{page}` code itself like below:

	{page:PageName optionName="optionValue"}
		...
		HTML content, modules, etc here
		...
	{/page:PageName}

The following options are available for `{page}`s:

`homepage`

	a flag representing if the page should be used as the homepage

	accepted values are true or false

	the default homepage is ActivityStreamList *if that page isn't defined the first defined Page in the theme's HTML will be used*

`url`

	a URL to override the page's default URL

	accepted values are any string valid in a URL, the [%id] is always assumed to be at the end *(Note: do not start the override URL with a slash (/))*

		{page:EventList url="shows"}
			<!-- The events page would now be at /shows, not /events -->
		{/page:EventList}

	default value is based on the page or whatever comes after "Custom" for custom pages

	if a page has more than one [%id] (i.e. `BlogCommentView`), use an asterik (*) for the first [%id]

`title`

	a value to force the <title> of the <head> content of the page to be

	accepts any string

    default value will be based on the `{module}`s present on the rendered page

`ajax`

	a GET parameter value that can be used to output ONLY the stuff within a specific page (i.e. strip out any headers, footers, etc) *note: this is useful for infinite scrolling with AJAX*

	accepted values are true and false

	default value is false
	
## Modules
Modules are the main data loading structures within `{page}`s. The general syntax for modules is as follows:

	{module:ModuleName}
		...
		HTML content, blocks, etc here
		...
	{Else:ModuleName}
		...
		Data to show if the module doesn't return any
		...
	{/module:ModuleName}

Modules come in two types, views and lists. A listing module will iterate through numerous pieces of content and repeat the content within the module as many times as it finds pieces of data.

Using `{Else:<module_name>}` will cause the content in the else section to render if the module doesn't load any data.

### Module Options
Modules can have their own options. Some of the options are available to all `{module}`s while other are specific to particular `{module}`s. The syntax for module options is the exact same as that of `{page}`s and looks as follows:

	{module:ModuleName optionName="optionValue"}
		...
		HTML content, blocks, etc here
		...
	{/module:ModuleName}
	
The following options are an example of two options that are available on most modules. All of the available options for a particular `{module}` can be found by the documentation for that specific modules elsewhere in these docs.

`pagination`

	flag representing if the module should be used as the primary module for pagination on the parent {page}

	accepted values are true or false

	defaults to what the Theming Engine decides is best

`ignorePaging`

	available on most listing modules to make the module ignore any pagination that might be preset in the header

	accepted values are true or false

	defaults to false
	
## Blocks
Blocks can best be thought of us the models of the data and must be inside of a `{module}`. When inside of a listing `{module}`, a `{block}` will be repeated as many times as necessary depending on the returned data. The general syntax for `{block}`s is as follows:

	{block:BlockName}
		...
		HTML content, block variables, etc here
		...
	{/block:BlockName}
	
Depending on the block you are using, different data variables become available that allow you to represent the object on the page.

## Variables
Variables are the simplest of Theming Engine elements and return the finest level of detail about an object. Using a variable simply looks like the follow:
	
	{VariableName}
	
Using options with a variable is just like using options with any other Theming Engine elements:
	
	{VariableWithOption optionOneName="optionOneValue" optionTwoName="optionTwoValue"}
	
All variables have the `block` option available to them to force them to render within the context of a certain `{block}`. This usually isn't necessary unless you have two nested `{block}`s and want to make sure the variables renders at the correct time.

### Custom Variables
You can use custom variables to define chunks of code to reuse throughout the rest of your theme. This can be useful when repeating layout elements on your site on some pages, but not others.

To define a variable, use the following syntax:

	{variable:CustomMyVariable}
		...
		Any content here
		...
	{/variable:CustomMyVariable}

Custom variables must start with "Custom" in their names. In this example, your variable name would be `MyVariable`. After defining your variable, you can access it just like a normal variable. For instance, to use the above variable we just defined, you'd write the following anywhere in your theme:

	{CustomMyVariable}

### {option} Variables
You can set up ways for StageBloc users to customize their theme to their liking without them doing any HTML/CSS/JS editing by using `{option}` variables. Options variables are pulled into the sidebar theme editor on the web and presented using `<form>` elements that less technical users can use to customize their theme. The general syntax for an `{option}` variable is:

	{option:VariableType
		group="VariableGroup"
		name="Variable Name"
		default="Default Value"
		format=""
		defaultFormat=""}

Keep in mind that less is often more. If someone wants very specific, fine tune control, it's best if they just edit the theme.

The following parameters are available to all `{option}` variables:

`name` (*required*)

	The unique name for this variable. This name is also presented to the user in the sidebar theme editor.

`group`

	A namespace for this variable. This is used to group variables in the sidebar theme editor.

`format`

	The way the data is outputted. This makes use of PHP's [sprintf()](http://php.net/sprintf) function if you'd like to force a format.

`defaultFormat`

	The default format to be used for the data.

`default`

	When the user doesn't explicitly set or change this option, this value will be used.

The following `{option}` variables are currently available for use:

**option:Image**

This `{option}` variable allows users to upload an image to use within their theme (i.e. a header image). This shouldn't be used for things like sprites or other theme assets. A file upload box will show up in the theme editor sidebar where they can upload JPEG, GIF, and PNG files to be used in the theme. The data returned is the full URL to the image uploaded.

	{option:Image
		group="Images"
		name="Header Image"
		format="background-image: url(%s);"
		defaultFormat=""}

**option:Color**

This `{option}` variable will present users with a color select box in the theme sidebar. The user can then select a color to use (i.e. font color). The additional parameter of `rgb` is available for this option. The data returned will be the full HEX value with the pound sign or the colors, comma separated (see `rgb` parameter below).

`rgb`

	Determines whether or not to return RGB or HEX values
	
	accepted values are true or false
	
	defaults to false

An example:

	{option:Color
		group="Colors"
		name="Footer Color"
		format="color: rgb(%s);"
		defaultFormat=""}

**option:Select**

This `{option}` variable adds a drop down box containing a list of predefined values to the sidebar. The data returned is the value selected.

`presets`
	Defines a comma separated list of values

An example:

	{option:Select
		group="Images"
		name="Background Repeat"
		format="background-repeat: %s;"
		presets="repeat,no-repeat,repeat-x,repeat-y"
		default="no-repeat"
	}

**option:Textarea**

This `{option}` variable presents users with a textbox where they can input any string. The data returned is the user's string.

## If Statements
If statements will check if a certain statement is true or not and add the appropriate code as defined within the theme. Else statements can be achieved by placing `{if:Else}` inside of an if statement. For example, an if statement in its simplest form could be as follows:

	{if:IfStatementName}
		...
		This content will be used if the statement is true
		...
	{if:Else}
		...
		This content will be used if the statement is false
		...
	{/if:IfStatementName}

If statements can be nested inside of one another as well.

### If Statement Options
Various if statements have different options available to them depending on the statement. The syntax is exactly the same as `{pags}`s and `{module}`s:

	{if:IfStatementName optionName="optionValue"}
		...
		This content will be used if the statement is true
		...
	{/if:IfStatementName}
	
An option that is available to all if statements is `block`. Sometimes for if statements that can be used in numerous different `{block}`s where weird behavior is happening because of the nested, you can use the `block` option to have finer control over when the if statement is rendered.

`block`

	the {block} to force the if statement to render as a part of

	accepted values any parent {block} of the if statement

	defaults to the theming engines best guess

### Combined If Statements
If statements support the use of `||` and `&&` for AND and OR logic. However, mixing of ANDs and ORs is not currently allowed (i.e. it must be all ANDs or all ORs). For example:

	{if:IfStatementOne||IfStatementTwo}
		...
		This content will be used if either of the if statements are true
		...
	{/if:IfStatementOne||IfStatementTwo}
	
# Sections
The main sections of the Theming Engine line up with the available content you can create and share on StageBloc.

In general, the documentation for each section goes from higher level to lower level. It will first list the pages. After the pages, the modules are listed with their available options. The block is listed after the modules and can be used inside of any of the modules for that section. After the definition of the block, all of the variables (and variables with options) available to that block specifically are listed.

Lastly, the if statements are listed for that block as well. Unless otherwise noted, if statements must be used inside of the corresponding block *(some are global and can be used anywhere)*.

## General
The following Theme Engine elements are available for general use within a theme and can be placed anywhere.

### Variables
	<!-- Example use of some global variables -->
	<head>
		<title>{AccountName}</title>
		{CSS}
		{JS}
	</head>

`CSS`

	a <link rel="stylesheet" /> tag with a link to the theme's CSS on StageBloc's CDN

`JS`

	a <script src=""> tag with a link to the theme's JS on StageBloc's CDN

`AccountName`

	the name of the account

`AccountId`

	the ID of the account
	
### Variables With Options
**jQuery**  
The latest version of jQuery on the page via Google's CDN

`v`

	use this parameter to specify a particular version
	
	accepted values are any version hosted on Google
	
	defaults to the latest version

**BootstrapCSS**  
The latest version of Bootstrap's combined (responsive with icons) CSS from [BootstrapCDN](http://www.bootstrapcdn.com/)

`v`

	use this parameter to specify a particular version
	
	accepted values are any version hosted on BootstrapCDN
	
	defaults to the latest version

`includeIcons`

	whether or not to includes Bootstrap's icons with the CSS

	allowed values are true or false
	
	defaults to true
	
**BootstrapJS**  
The latest version of Bootstrap's JS from [BootstrapCDN](http://www.bootstrapcdn.com/)

`v`

	use this parameter to specify a particular version
	
	accepted values are any version hosted on BootstrapCDN
	
	defaults to the latest version
	
### Pages
**page:Error404**  
`/AnyPageThatDoesNotExist` - This page will be loaded whenever a unknown URL structure is hit

## Activity Stream
### page:ActivityStreamList
`/updates` - This page should show a listing of content posted by your account *(this is the default homepage)*

## Blog
	{page:BlogView}
		{module:BlogView}
			{block:BlogPost}
				<h2>{BlogPostTitle}</h2>
				{BlogPostBody}
			{/block:BlogPost}
		{/module:BlogView}
	{/page:BlogView}

### page:BlogList
`/blog` - This page should show a listing of blog posts

### page:BlogView
`/blog/[%id]` - This page should show the content of an individual blog post. If the post has a category, the URL would automatically change to `/blog/[%category]/[%id]`

### page:BlogCategoryView
`/blog/[%category]` - This page should show a listing of blog posts by category (`{module:BlogList}` will filter by the right category automatically on this page)

### module:BlogList
This module lists blog posts by an account. Blog posts are returned by the date they were published.

**Module Options**  
`direction`

	the direction in which to list the blog posts

    accepted values are asc or desc

    defaults to desc

`limit`

	the amount of blogs to list per page
	
	accepted values are any integer

    defaults to 5

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging
	
	accepted values are any integer
	
	defaults to 0
	
`ignorePaging`

	will make offset always 0 regardless of the page you are one

	accepted values are true or false

	defaults to false
	
`sticky`

	whether or not to include sticky posts

	defaults to showing both

	accepted values are true (to show only sticky posts) or false (to show only non-sticky posts)

`ignoreSticky`

	whether or not sticky blog posts should be on top of the listing

	accepted values are true or false

	defaults to false

`exclusive`

	whether or not to include exclusive posts

	defaults to showing both

	accepted values are true (to show only exclusive posts) or false (to show only non-exclusive posts)

`category`

	a category to filter the blog listing by
	
	accepted values are any string
	
	defaults to none (unless there is a category in the URL, then it defaults to that)

`ignoreCategory`

	whether or not to ignore a category if it shows up in the URL

	accepted values true and false

	defaults to false
	
`tag`

	a tag to filter the blog listing by

	accepted values are any string

	defaults to none
	
`includeFanContent`

	normally content submitted by fans is for module:FansiteContentList, but this allows it to be included here

	accepted values are true and false

	defaults to false

`accountId`

	a comma separated list of the IDs of the accounts to limit the results to
	
	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

    defaults to none (i.e. only the current account)

`paging` *(advanced)*

	define how many items are on this page
	
	if you are using multiple modules with both `limit`s and `offset`s then you need to explicitly set how many items are on the current page, or pagination will return unexpected results
	
	accepted values are any integer

### module:BlogView
This module will load the content for a single blog post. When on `{page:BlogView}` it will automatically grab the right data from the URL.

**Module Options**  
`fanSubmittedIsExclusive`

	whether or not to consider content submitted by fans to a fansite as exclusive or not by default

	accepted values are true and false

	defaults to true

### block:BlogPost
This block exposes various content available for a blog post object

**Variables**

AuthorName  
:	the author's full name

AuthorUsername  
:	the author's StageBloc username

AuthorUrl  
:	the URL to the public facing user page for this author

AuthorFansiteUrl  
:	the URL to the public facing user page for this author on the account's fansite

AuthorPhotoUrl  
:	url to a thumbnail sized, 130x130px user photo

BlogPostAccountId  
:    the ID of the account that this blog post belongs to

BlogPostTitle  
:	the title of the blog post

BlogPostId  
:	the blog post's ID

BlogPostUrl  
:	the permalink to the blog post's individual page

BlogPostShortUrl  
:	a short URL for the blog post

LikeCount  
:	the number of likes for the blog post

BlogPostBody  
:	the main content for the blog post

BlogPostExcerpt  
:	a 1500 character beginning of the blog post

BlogPostShortExcerpt  
:	a 400 character beginning of the blog post

BlogPostShortExcerptCleaned  
:	first 400 characters of blog post with all `<span><em><strong><a><u><i><b>` tags stripped

BlogPostShortExcerptStripped  
:	first 400 characters of blog post with all html tags stripped

BlogPostRelatedContentTag  
:	the tag associated with this blog post for related content

BlogPostPhotoUrl  
:	the URL of the first `<img>` in the blog post (see `if:BlogPostHasPhoto`)

PreviousBlogPostId, NextBlogPostId  
:	the ID of the blog post previous/next to the current one if it exists

PreviousBlogPostTitle, NextBlogPostTitle  
:	the title of the blog post previous/next to the current one if it exists

PreviousBlogPostUrl, NextBlogPostUrl  
:	the permalink of the blog post previous/next to the current one if it exists

### Variables With Options
**PublishedDate**  
The date this blog post was published
  
`format`

	the format of the date according to PHP [date() function](http://php.net/date) 

    accepted values are a date format string, relative (returns time ago such as "5 seconds ago"), or gmdate (a GMT date in PHP date format 'Y-M-d h:i A')

    defaults to `n/j/y`
    
`shorttime`

	whether or not to show the units of time in a contracted manner (i.e. secs vs seconds) when using format="relative"

	accepted values are true or false
	
	defaults to false

### If Statements
`if:BlogPostHasPhoto`

	check if a blog post has at least one photo (`<img>` tag) in it
	
`if:ReadMore`

	check if the current excerpt is trimmed to something less than its total length
	
## Audio
### page:AudioList
`/audio` - This page should show a listing of audio content such as audio tracks or audio playlists

### page:AudioView
`/audio/[%id]` - This page should show content for an individual audio track

### module:AudioList
This module lists audio tracks by an account. Audio is listed by the date it was created  (unless an `audioPlaylistId` is specified, then they are listed by their order in that playlist).

**Module Options**  
`audioPlaylistId`

	a audio playlist ID to filter the audio tracks by
	
	accepted values are any ID of an audio playlist that belongs to the same account

    defaults to none

`limit`

	the amount of audio tracks to list per page
	
	accepted values are any integer

    defaults to 10

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0

`sticky`

	whether or not to just return the sticky audio track

	accepted values are true or false

	defaults to false

`direction`

	the direction in which to list the audio
	
	accepted values are asc or desc

    defaults to asc
    
`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

### module:AudioView
This module will load the content for a single audio track. When on `{page:AudioView}` it will automatically grab the right data from the URL.

**Module Options**  
`audioId`

	an ID for which audio track to show
	
	accepted values are any audio ID that belongs to the same account
	
	defaults to none or the ID from the URL if on {page:AudioView}
	
`fanSubmittedIsExclusive`

	whether or not to consider content submitted by fans to a fansite as exclusive or not by default

	accepted values are true and false

	defaults to true

### block:AudioView
This block exposes various content for an audio object

AuthorName  
:	the name of the user that created this audio track

AuthorUsername  
:	the StageBloc username of the user that created this audio track

AuthorUrl  
:	the URL to the public facing user page for this author

AuthorFansiteUrl  
:	the URL to the public facing user page for this author on the account's fansite

AuthorPhotoUrl  
:	url to a thumbnail sized, 130x130px user photo

AudioAccountId  
:    the ID of the account that created this audio

AudioUrl  
:	a permalink to the audio track's individual page

AudioShortUrl  
:	the short URL for this audio track

AudioTitle  
:	the title of the audio track

AudioJavaScriptEscapedTitle  
:	the title of the audio track for use within JavaScript

AudioId  
:	the ID of the audio track

LikeCount  
:	the number of likes for the audio track

AudioLyrics  
:	the lyrics for the audio track

AudioDescription  
:	the description for the audio track

AudioPrice  
:	the price for this audio track in USD

AudioStreamUrl
:	the URL to use when streaming the audio track

AudioCredits  
:	the credits for the audio object

AudioArtist  
:	the artist for the audio track if given, otherwise the name of the account this audio belongs to

AudioFreeDownloadQuality, AudioPaidDownloadQuaility  
:	a string representing the quality of the free/paid version of this audio track, one of the following values:

	128kb MP3, 320kb MP3, Original WAV, Original AIFF, Original WAV / AIFF

### Variables With Options
**AudioAddToCartLink**  
Creates a link that, when clicked, will add the audio track to the user's cart on StageBloc

`audioId` (*required*)

	the ID of the audio track you want to add to the user's cart

`text`

	the text to be put inside the <a> tag

	accepted values are any string (HTML included)

    defaults to "Add To Cart"

`closeTag`

	whether or not to close the <a> tag
	
	accepted values are true or false
	
	defaults to true

`class`

	the class to assign to the <a> tag
	
	accepted values are any string
	
	defaults to none

**AudioFreeDownloadLink**  
Creates a link that, when clicked, will download the audio track (unless it requires a follow to download, in which a modal will first show up)

`audioId` (*required*)

	the ID of the audio track you want to add to the user's cart

`text`

	the text to be put inside the <a> tag

	accepted values are any string (HTML included)

    defaults to "Add To Cart"

`closeTag`

	whether or not to close the <a> tag
	
	accepted values are true or false
	
	defaults to true

`class`

	the class to assign to the <a> tag
	
	accepted values are any string
	
	defaults to none

**AudioRecordedDate**  
The date this audio was recorded on
	
format

	the format of the date according to PHP [date() function](http://php.net/date) 

    accepted values are a date format string, relative (returns time ago such as "5 seconds ago"), or gmdate (a GMT date in PHP date format 'Y-M-d h:i A')

    defaults to `n/j/y`

**AudioPhotoUrl**  
A cover image for this audio track or a default one if there is no cover set

`size`

	the size of the photo to load
	
	accepted sizes are "thumbnail", "small", "medium", "large", "original"
	
	defaults to "thumbnail"
	
### If Statements
`if:AudioHasLyrics`

	Check to see if the audio track has lyrics

`if:AudioCanBeDownloadedForFree`
	
	Check to see if the audio track can be downloaded for free

`if:AudioCanBeSold`

	Check to see if the audio track is being sold

## Audio Playlists
### page:AudioPlaylistList
`/audio/playlists` - This page should show a listing of audio playlists

### page:AudioPlaylistView
`/audio/playlists/[%id]` - This page should show content for an individual audio playlist

### module:AudioPlaylistList
This module lists audio playlists by an account.

**Module Options**  
`sticky`

	whether or not to list only the sticky audio playlist

    accepted values are true or false

    defaults to false

`featuredFirst`

	whether or not to show the sticky audio playlist first in the listing
	
	accepted values are true or false
	
	defaults to false
	
`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

### module:AudioPlaylistView
This module will load the content for a single audio playlist. When on {page:AudioPlaylistView} it will automatically grab the right data from the URL.

### block:AudioPlaylistView
This block exposes various content for an audio playlist object

AudioPlaylistDescription  
:	the description for the audio playlist

AudioPlaylistId  
:	the ID for the audio playlist

AudioPlaylistUrl  
:	a permalink for the playlist's individual page

AudioPlaylistTitle  
:	the title of the audio playlist

AudioPlaylistAudioCount  
:	the amount of audio tracks in this playlist

AudioPlaylistPrice  
:	the price of this playlist if it is being sold

AudioPlaylistLabel  
:	the record label for the audio playlist

LikeCount  
:	the number of likes for the audio playlist

AudioPlaylistPrice  
:	the price for the playlist (if there is a pre-order currently active for the playlist, it'll use that price instead)

CreatedByPhotoUrl, ModifiedByPhotoUrl
:	a URL to the photo for who created/modified the audio playlist to be used in an `<img />` tag

CreatedByName, ModifiedByName
:	the name of the user who created/modified the audio playlist

AudioPlaylistFreeDownloadQuality, AudioPlaylistPaidDownloadQuaility  
:	a string representing the quality of the free/paid version of this audio playlist, one of the following values:

	128kb MP3, 320kb MP3, Original WAV, Original AIFF, Original WAV / AIFF

### Variables With Options
**AudioPlaylistPhotoUrl**  
A cover image for this audio playlist or a default one if there is no cover set

`size`

	the size of the photo to load
	
	accepted sizes are "thumbnail", "small", "medium", "large", "original"
	
	defaults to "thumbnail"

**AudioPlaylistReleaseDate** 
The date the audio playlist was released on
	
`format`

	the format of the date according to PHP [date() function](http://php.net/date) 

    accepted values are a date format string, relative (returns time ago such as "5 seconds ago"), or gmdate (a GMT date in PHP date format 'Y-M-d h:i A')

    defaults to `n/j/y`

**AudioPlaylistAddToCartLink**  
Creates a link that, when clicked, will add the audio track to the user's cart on StageBloc

`audioPlaylistId` (*required*)

	the ID of the audio playlist you want to add to the user's cart

`text`

	the text to be put inside the <a> tag

	accepted values are any string (HTML included)

    defaults to "Add To Cart"

`preorderText`

	the text to be put inside the <a> tag when a pre-order is set up for the playlist

	accepted values are any string (HTML included)

    defaults to "Pre-order"

`preorderSoldOutText`

	the text to be put inside the <a> tag when a preorder is set up for the playlist and it has sold out

	accepted values are any string (HTML included)

    defaults to "Pre-order Sold Out"

`closeTag`

	whether or not to close the <a> tag

	accepted values are true or false

	defaults to true

`class`

	the class to assign to the <a> tag

	accepted values are any string

	defaults to none

**AudioPlaylistFreeDownloadLink**  
Creates a link that, when clicked, will download the audio track (unless it requires a follow to download, in which a modal will first show up)

`audioPlaylistId` (*required*)

	the ID of the audio track you want to add to the user's cart

`text`

	the text to be put inside the <a> tag

	accepted values are any string (HTML included)

    defaults to "Add To Cart"

`closeTag`

	whether or not to close the <a> tag

	accepted values are true or false

	defaults to true

`class`

	the class to assign to the <a> tag

	accepted values are any string

	defaults to none

### If Statements
`if:AudioPlaylistCanBeDownloadedForFree`

	check to see if the audio playlist can be downloaded for free

`if:AudioPlaylistCanBeSold`

	check to see if the audio playlist is being sold
	
`if:AudioPlaylistCanNamePrice`

	check to see if the playlist is being sold and fans can name a price for it or not
	
`if:AudioPlaylistHasLabel`

	check to see if the audio playlist has a label or not
	
`if:AudioPlaylistHasRecordedDate`

	check to see if the audio playlist has a recorded date or not
	
`if:AudioPlaylistHasThumbnail`

	check to see if the audio playlist has a photo or not
	
## Videos
### page:VideoList
`/videos` - This page should show a listing of video content such as videos or video playlists

### page:VideoView
`/videos/[%id]` - This page should show the content for an individual video

### VideoList
This module lists videos by an account. Videos are returned by the date they were created (unless a `videoPlaylistId` is specified, then they are listed by their order in that playlist).

**Module Options**  
`videoPlaylistId`

	a video playlist ID to filter the videos by

	accepted values are any ID of a video playlist that belongs to the same account

	defaults to none
	
`limit`

	the amount of videos to list per page

	accepted values are any integer

	defaults to 50

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0

`direction`

	the direction in which to list the videos

	accepted values are asc or desc

	defaults to asc
    
`sticky`

	whether or not to include sticky videos

	defaults to showing both

	accepted values are true (to show only sticky posts) or false (to show only non-sticky posts)
    
`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

### VideoView
This module will load the content for a single video. When on `{page:VideoView}` it will automatically grab the right data from the URL.

**Module Options**  
`videoId`

	an ID for which video to show

	accepted values are any video ID that belongs to the same account

	defaults to none or the ID from the URL if on {page:VideoView}

`fanSubmittedIsExclusive`

	whether or not to consider content submitted by fans to a fansite as exclusive or not

	accepted values are true and false

	defaults to true

### block:VideoView
AuthorName  
:	the name of the user that created this audio track

AuthorUsername  
:	the StageBloc username of the user that created this audio track

AuthorUrl  
:	the URL to the public facing user page for this author

AuthorFansiteUrl  
:	the URL to the public facing user page for this author on the account's fansite

AuthorPhotoUrl  
:	url to a thumbnail sized, 130x130px user photo

VideoAccountId  
:    the ID of the account that posted the video

VideoCreatorId  
:	the ID of the user who created the video

VideoUrl  
:	a permalink to the video's individual page

VideoJavaScriptEscapedTitle  
:	the title of the video escaped so that it is able to be used with JavaScript

VideoId  
:	the ID of the video

LikeCount  
:	the number of likes for the video

VideoShortUrl  
:	a short URL for the video

VideoDescription  
:	the description of the video

VideoJavaScriptEscapedDescription  
:	the description of the video escaped to be used in JavaScript

VideoEmbedCode  
:	the embed code for the given video

VideoJavaScriptEncodedEmbedCode  
:	the embed code encoded for use in a URL

VideoJavaScriptEscapedEmbedCode  
:	the embed code escaped to be used in JavaScript

### Variables With Options
**VideoPhotoUrl**  
A cover image for this video or a default one if there is no cover set

`size`

	the size of the photo to load
	
	accepted sizes are "thumbnail", "small", "medium", "large", "original"
	
	defaults to "thumbnail"

### If Statements
`if:AudioPlaylistHasThumbnail`

	Check to see if the audio playlist has a photo or not

## Video Playlists
### page:VideoPlaylistList
`/videos/playlists` - This page should show a listing of video playlists

### page:VideoPlaylistView
`/videos/playlists/[%id]` - This page should show content for an individual video playlist

### VideoPlaylistList
This module lists video playlists by an account.

**Module Options**  
`limit`

	the amount of video playlists to list per page

	accepted values are any integer

	defaults to 50

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0
	
`direction`

	the direction in which to list the videos

	accepted values are asc or desc

	defaults to asc

`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

### VideoPlaylistView
This module will load the content for a single vide playlist. When on {page:VideoPlaylistView} it will automatically grab the right data from the URL.

### block:VideoPlaylistView
VideoPlaylistDescription  
:	the description for the playlist

VideoPlaylistId  
:	the ID for the video playlist

VideoPlaylistUrl  
:	a permalink to the video playlist's individual page

VideoPlaylistTitle  
:	the title for the video playlist

LikeCount  
:	the number of likes for the video playlist

VideoPlaylistVideoCount  
:	the amount of videos in this playlist

CreatedByPhotoUrl, ModifiedByPhotoUrl  
:	a URL to the thumbnail photo for the user who created/modified the video playlist to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName  
:	the name of the user who created/modified the video playlist

### Variables With Options
**VideoPlaylistPhotoUrl**  
A cover image for this video video or a default one if there is no cover set

`size`

	the size of the photo to load
	
	accepted sizes are "thumbnail", "small", "medium", "large", "original"
	
	defaults to "thumbnail"
	
### If Statements
`if:VideoPlaylistHasThumbnail`

	check to see if the video playlist has a photo or not

## Photos
### page:PhotoList
`/photos` - This page should show a listing of all your account's photos and/or photo albums

### page:PhotoView
`/photos/[%id]` - This page should show content for an individual photo

### module:PhotoList
This module lists photos by an account. Photos is listed by the date it was created (unless an audioPlaylistId is specified, then they are listed by their order in that playlist).

**Modules Options**  
`albumId`

	a photo album ID to filter the photos by
	
	accepted values are any ID of an photo album that belongs to the same account

    defaults to none

`limit`

	the amount of photos to list per page

	accepted values are any integer

	defaults to 10

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0

`direction`

	the direction in which to list the videos

	accepted values are asc or desc

	defaults to desc

`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

`includeFanContent`

	normally content submitted by fans is for module:FansiteContentList, but this allows it to be included here

	accepted values are true and false

	defaults to false

`accountContent`

	whether or not to show photos created by admins of the account
	
	accepted values are true or false

    defaults to true

`exclusive`

	whether or not to show exclusive content

	accepted values are true or false

	defaults to showing both in the case that the user is logged in and authorized to see it
	
`userId`

	the user to limit the photos to
	
	accepted values are an ID of an admin if accountContent is enabled or an ID of a fan is includeFanContent is enabled

    defaults to none (i.e. all fans and / or all admins)

`showPrivate`

	whether or not to include private photos in the listing
	
	accepted values are true or false
	
	defaults to false

### module:PhotoView
This module will load the content for a single photo. When on {page:PhotoView} it will automatically grab the right data from the URL.

**Module Options**  
`photoId`

	an ID for which photo to show

	accepted values are any photo ID that belongs to the same account

	defaults to none or the ID from the URL if on {page:PhotoView}

`fanSubmittedIsExclusive`

	whether or not to consider content submitted by fans to a fansite as exclusive or not

	accepted values are true and false

	defaults to true

### block:PhotoView
AuthorName  
:	the name of the user that created this audio track

AuthorUsername  
:	the StageBloc username of the user that created this audio track

AuthorUrl  
:	the URL to the public facing user page for this author

AuthorFansiteUrl  
:	the URL to the public facing user page for this author on the account's fansite

AuthorPhotoUrl  
:	url to a thumbnail sized, 130x130px user photo

PhotoAccountId  
:    the ID of the account that created the photo

PhotoCreatorId  
:	the ID of the user who created the photo

PhotoId  
:	the ID of the photo

PhotoUrl  
:	the permalink to this photo's individual page

PhotoShortUrl  
:	a short URL for the photo

LikeCount  
:	the number of likes for the photo

PhotoTitle  
:	the title of the photo

PhotoDescription  
:	the description of the photo

Source-Thumb  
:	a squared thumbnail photo link with the dimensions of 130x130px

Source-Small  
:	a link to a photo with max dimensions of 250x250px

Source-Medium  
:	a link to a photo with max dimensions of 500x500px

Source-Large  
:	a link to a photo with max dimensions of 800x800px

Source-Original  
:	a link to the originally uploaded photo

PreviousPhotoId, NextPhotoId  
:	the ID of the photo previous/next to the current one if it exists

PreviousPhotoTitle, NextPhotoTitle  
:	the title of the photo previous/next to the current one if it exists

PreviousPhotoUrl, NextPhotoUrl  
:	the permalink of the photo previous/next to the current one if it exists

### If Statements
`if:PhotoCanBeSold`

	checks to see if a photo can be sold or not

## Photo Albums
### page:PhotoAlbumList
`/photos/albums` - This page should show a listing of photo albums

### page:PhotoAlbumView
`/photos/albums/[%id]` - This page should show the content for an individual photo album

### module:PhotoAlbumList
This module lists photo albums by an account.

**Module Options**  
`limit`

	the amount of photo albums to list per page

	accepted values are any integer

	defaults to 10

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0

`direction`

	the direction in which to list the photo albums

	accepted values are asc or desc

	defaults to desc

`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

### module:PhotoAlbumView
This module will load the content for a single photo album. When on {page:PhotoAlbumView} it will automatically grab the right data from the URL.

**Module Options**  
`albumId`

	an ID for which photo album to show

	accepted values are any photo album ID that belongs to the same account

	defaults to none or the ID from the URL if on {page:PhotoView}

### block:PhotoAlbumView
PhotoAlbumId  
:	the ID of the photo album

PhotoAlbumAccountId  
:    the ID of the account that created the photo album

PhotoAlbumDescription  
:	the description of the photo album

PhotoAlbumUrl  
:	a permalink to the photo album's individual page

PhotoAlbumShortUrl  
:	a show URL for this photo album

LikeCount  
:	the number of likes for the photo album

PhotoAlbumPhotoCount  
:	the number of photos in this photo album

CreatedByPhotoUrl, ModifiedByPhotoUrl  
:	a URL to the photo for who created/modified the album to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName  
:	the name of the user who created/modified the photo album

### Variables With Options
**PhotoAlbumPhotoUrl**  
A cover image for this photo album or a default one if there is no cover set

`size`

	the size of the photo to load
	
	accepted sizes are "thumbnail", "small", "medium", "large", "original"
	
	defaults to "thumbnail"

## Events
### page:EventPastList
`/events/past` - This page should show a listing of events that have already occurred

### page:EventUpcomingList
`/events`, `/events/upcoming` - This page should show a listing of events that have not yet occurred

### page:EventView
`/events/[%id]` - This page should show information for an individual event

### module:EventList
This module lists events by an account. Videos are returned by the date they occur.

**Module Options**  
`limit`

	the amount of events to list per page

	accepted values are any integer

	defaults to 50

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0

`direction`

	the direction in which to list the events

	accepted values are asc or desc

	defaults to asc

`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

`sticky`

	whether or not to include sticky events

	defaults to showing both

	accepted values are true (to show only sticky events) or false (to show only non-sticky events)

`upcoming`

	whether or not to show upcoming events

    accepted values are true or false

    defaults to true

`past`

	whether or not to include past events

    accepted values are true or false

    defaults to false

`userId`

	a userId to limit the events to those this user has RSVPed to

	accepts the ID of any user that is a fan of the account

	defaults to none
	
`attending`

	when used in combination with userId, a way to filter the attending status of those events

	accepted values are "yes", "no", and "maybe"

	defaults to none

### module:EventView
This module will load the content for an event. When on {page:EventView} it will automatically grab the right data from the URL.

**Module Options**  
`eventId`

	an ID for which event to show

	accepted values are any event ID that belongs to the same account

	defaults to none or the ID from the URL if on {page:EventView}

### block:EventView
EventAccountId  
:   the ID of the account that created the event

EventTitle  
:	the title of the event

EventDescription  
:	the description of the event

EventAges  
:	will return either "Any age" or "[%Age]+" (meaning this age and up)

EventCity  
:	the city in which the event is taking place

EventContestId  
:	the ID for the contest for this event (if it has one)

EventId  
:	the ID of the event

EventLikeCount  
:	the number of likes for the event

EventAttendingCount  
:	the number of users that have RSVPed "Yes"

EventMaybeAttendingCount  
:	the number of users that have RSVPed "Maybe"

EventNotAttendingCount  
:	the number of users that have RSVPed "No"

EventUrl  
:	a permalink to the event's individual page

EventShortUrl  
:	a short URL for the event

EventLocation  
:	a string constructed based on the information available for the location. if in the USA, it will return "city, state", otherwise it will return "city, state, country"

EventStreetAddress  
:	the street address of the event's location

EventState  
:	the state in which the event is taking place

EventPrice  
:	the event for the price if it has one

TicketsBuyLink  
:	a link to where tickets for this event can be purchased, will return a link to the presale tickets if it's a presale or the normal tickets if not

VenueName  
:	the name of the venue where this event is taking place

SupportingActs  
:	a comma separated listing of the supporting acts for the event

VenueWebsiteUrl  
:	the URL to the venue where the event is taking place

### Variables With Options
**EventPhotoUrl**  
A cover image for this event or a default one if there is no cover set

`size`

	the size of the photo to load
	
	accepted sizes are "thumbnail", "small", "medium", "large", "original"
	
	defaults to "thumbnail"

**EventStartDate**  
The date and time this event starts

`format`

	the format of the date according to PHP [date() function](http://php.net/date) 

    accepted values are a date format string, relative (returns time ago such as "5 seconds ago"), or gmdate (a GMT date in PHP date format 'Y-m-d H:i:s')

    defaults to `n/j/y`

**EventEndDate**  
The date and time this event end

`format`

	the format of the date according to PHP [date() function](http://php.net/date) 

    accepted values are a date format string, relative (returns time ago such as "5 seconds ago"), or gmdate (a GMT date in PHP date format 'Y-m-d H:i:s')

    defaults to `n/j/y`

### If Statements
`if:EventHasContest`

	check to see if an event has a contest or not

`if:EventHasEnded`

	check if an event has finished or not

`if:EventHasMinimumAge`

	check if an event has a required minimum age (any age greater than zero).

`if:EventHasPhoto`

	check to see if an has a cover photo or not

`if:EventHasPrice`

	check if an event has a price of more than $0.00

`if:EventHasSupportingActs`

	check if there is at least one supporting act for the event

`if:EventHasTicketsBuyLink`

	check if the event has a ticket buy link attached, if the event has a presale and the presale hasn't started yet then this will return false

`if:EventPresaleIsActive`

	check to see if the presale for an event is active

`if:HasPastEvents` *(global, can be run from anywhere)*

	check if past events exist for current account

`if:HasUpcomingEvents` *(global, can be run from anywhere)*

	check if upcoming events exist for the current account

## Statuses
### page:StatusList
`/statuses` - This page should show a listing of statuses posted by your account

### page:StatusView
`/statuses/[%id]` - This page should show an individual status

### module:StatusList
This module lists statuses by an account. Statuses are returned by the date they were created.

**Module Options**  
`limit`

	the amount of statuses to list per page

	accepted values are any integer

	defaults to 10

`offset`

	skips X number of items based on the ordering, it is automatically adjusted when paging

	accepted values are any integer

	defaults to 0

`direction`

	the direction in which to list the statuses

	accepted values are asc or desc

	defaults to desc

`accountId`

	a comma separated list of the IDs of the accounts to limit the results to

	accepted values are IDs of any children accounts of the current account (see variable {ChildAccountIDs})

	defaults to none (i.e. only the current account)

`fanContent`

	normally content submitted by fans is for module:FansiteContentList, but this allows it to be included here

	accepted values are true and false

	defaults to false

`accountContent`

	whether or not to show photos created by admins of the account

	accepted values are true or false

    defaults to true

### module:StatusView
This module will load the content for an status. When on {page:StatusView} it will automatically grab the right data from the URL.

**Module Options**  
`statusId`

	an ID for which status to show

	accepted values are any status ID that belongs to the same account

	defaults to none or the ID from the URL if on {page:StatusView}
	
`fanSubmittedIsExclusive`

	whether or not to consider content submitted by fans to a fansite as exclusive or not

	accepted values are true and false

	defaults to true

### block:StatusPost

AuthorName  
:	the author of the status

AuthorPhotoUrl  
:	a 130x130 pixel image of the author of the photo or a placeholder if the photo doesn't exist

StatusId  
:	the ID of the status was posted

StatusAccountId  
:    the ID of the account that posted this status

StatusUrl
:	a permalink to an individual status post page

StatusShortUrl  
:	a short URL for the status

StatusText  
:	the actual text of the status post

StatusTextWithLinks  
:	the actual text of the status post with links converted into HTML <a> tags

## Store Items
### page:StoreItemList
`/store` - This page should show a listing of store items from your account

### page:StoreItemView
`/store/[%id]` - This page should show content for an individual store item

## Comments

## Orders

# SBNav
SBNav is the little, circular control box that appears in a corner of the screen. It allows users to, among other things, log in, follow and unfollow accounts, and manage their shopping cart. It is also the means of communication by which our [Advanced Functionality](#advanced-functionality) is achieved.

As a theme author, you can change a few things about it. If an account has white labeling enabled, SBNav may be removed from their account.

### {SBNav position=""}
You can set the position of SBNav with the `{SBNav}` variable. Place it anywhere in your theme and SBNav will be placed in the specified corner.

`position`

	The corner to place SBNav in

    Accepted values are two words in any order, separated by a space: top, bottom, left, right

	Default value is "bottom right"

### SBNav Color
When submitting a theme, you can select a default color that you feel best matches your theme. Just as a head up, users do have the option to override this in their account's theme management section.

# Advanced Functionality
Using JavaScript and [SBNav](#sbnav) we are able to expose some advanced functionality. The functionality allowed here is available using built in StageBloc modals, but these methods allow theme authors to have a little bit more control over how it looks and works in their theme. In general, advanced functionality is achieved by targeting SBNav via `postMessage` as follows:

	pm({ target: window.frames['sbnav'], type: 'advancedFunctionalityType', data: { key: value } });

The postMessage JS library is already included for you. The `target` parameter must be exactly as shown above.

When a request such as the above is made, SBNav will act accordingly given the data provided and callback one of the following two bindings:

	pm.bind('advancedFunctionalityType', function(data) {
		// data will be a JavaScript object representing the state of the request
		// If data.error is defined, an error occurred during the request
	});

	pm.bind('sbError', function(data) {
		// This binding will handle generic errors (i.e. if SBNav receives a 500 or anything for any reason)
		// data.type will be the action it came from (i.e. 'advancedFunctionalityType')
	});

## User Profile Editing
This allows the user's profile to be edited.

**Step One**

First, you'll need some sort way of having users add information. For instance, you could do:

 	{module:API v="3.0" path="user/list" me="true"}
 		{block:API}
		<form id="userEditForm">
			<input type="hidden" name="email" value="{email}" />
			<input type="hidden" name="username" value="{username}" />
			<textarea name="bio">{bio}</textarea>
			<input type="submit" value="Save Profile" />
		</form>
		{/block:API}
	{/module:API}

The available keys for passing are `name`, `username`, `email`, `bio`, and `gender`. You can also pass a `birthday` parameter with the array values `day`, `month`, and `year`.

**Step Two**

Next, when the user submits the form, you'll want to capture it with JavaScript similar to the following:

	$('#userEditForm').submit(function() {
		pm({ target: window.frames['sbnav'], type: 'sbInlineUserProfileEdit', data: $(this).serialize() });
		return false;
	});

**Step Three**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineUserProfileEdit', function(data) {
		// data will be a JavaScript object representing the user (or an error if an error occurred)
	});

## Commenting
Normally, adding comments can be done very easily with the use of the `{CommentLink}` variable that opens an SBNav modal. However, sometimes you'll want to have commenting inline within your page to give the user a different experience.

**Step One**

First, need some sort of `HTML` to get the necessary data. Here's an example:

	<form id="commentForm">
		<input type="hidden" name="content_slug" value="{ContentType-Photos}" />
		<input type="hidden" name="content_id" value="{PhotoId}" />
		<textarea name="commentText"></textarea>
		<input type="submit" value="Post Comment" />
	</form>
	
Note that `content_id` and `content_slug` will vary depending on the content you're trying to comment on and will most likely be received from some sort of `{block}` data within your theme.

There is also an optional `replyToId` parameter that can be passed to serve as the `id` of the original comment if this new comment is meant to be a reply to it.

**Step Two**

Next, when the user submits the form, you'll want to capture it with JavaScript similar to the following:

	$('#commentForm').submit(function() {
		pm({ target: window.frames['sbnav'], type: 'sbInlineComment', data: $(this).serialize() });
		return false;
	});
	
The passed data must contain the keys `content_slug`, `content_id`, and `commentText` with their respective values for it to be valid.

**Step Three**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineComment', function(data) {
		// data will be a JavaScript representing the comment that was posted (or an error if an error occurred)
	});

## Comment Loading
Normally, viewing comments can be done very easily with the use of the `{CommentLink}` variable that opens an SBNav modal. However, sometimes you'll want to have comments inline within your page to give the user a different experience. Initial comments can be loaded with `{module:CommentList}`, but you'll want to be careful not to load every single comment on the initial page load. This advanced functionality can be used to allow for loading more comments after the initial page load.

**Step One**

You'll want to make a call to the `sbInlineLoadComments` functionality of SBNav:

	pm({ target: window.frames['sbnav'],
		 type: 'sbInlineLoadComments',
		 data: { contentType: $(this).attr('data-content-type'), // i.e. {ContentType-Photos}
				 contentId: $(this).attr('data-content-id'),
				 limit: 20, // Any number
				 offset: 10 // Any number, probably based on the amount of comments already loaded
		 }
	});

The passed data must contain the keys `contentType` and `contentId` to be valid.

**Step Two**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineLoadComments', function(data) {
		// data will be a JavaScript array representing the additional comments (or an error if an error occurred)
	});
	
## Status Submission
Normally, adding statuses can be done very easily with the use of `{SubmitFanContentLink}` variable that opens an SBNav modal. However, sometimes you'll want to allow fans to submit statuses for your fansite from within the theme itself.

**Step One**

First, you'll need some sort of `HTML` form. Here's an example:

	<form id="statusSubmit">
		<input type="text" name="statusText" />
		<input type="submit" />
	</form>

**Step Two**

Next, when the user submits the form, you'll want to capture it with JavaScript similar to the following:

	$('#statusSubmit').submit(function() {
		pm({ target: window.frames['sbnav'], type: 'sbInlineSubmitStatus', data: $(this).serialize() });
		return false;
	});
	
The passed data must contain the key `statusText` for it to be valid.

**Step Three**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineSubmitStatus', function(data) {
		// data will be a JavaScript object representing the status that was posted (or an error if an error occurred)
	});
	
## Blog Submission
Normally, adding blogs can be done very easily with the use of `{SubmitFanContentLink}` variable that opens an SBNav modal. However, sometimes you'll want to allow fans to submit blogs for your fansite from within the theme itself.

**Step One**

First, you'll need some sort of `HTML` form. Here's an example:

	<form id="blogSubmit">
		<input type="text" name="blogTitle" />
		<textarea name="blogBody"></textarea>
		<input type="submit" />
	</form>

**Step Two**

Next, when the user submits the form, you'll want to capture it with JavaScript similar to the following:

	$('#blogSubmit').submit(function() {
		pm({ target: window.frames['sbnav'], type: 'sbInlineSubmitBlog', data: $(this).serialize() });
		return false;
	});
	
The passed data must contain the keys `blogTitle` and `blogBody` for it to be valid. You can also pass a comma separated list of words to use as tags with the key `blogTags`.

**Step Three**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineSubmitBlog', function(data) {
		// data will be a JavaScript object representing the blog that was posted (or an error if an error occurred)
	});

## Video Submission
Normally, adding videos can be done very easily with the use of `{SubmitFanContentLink}` variable that opens an SBNav modal. However, sometimes you'll want to allow fans to submit videos for your fansite from within the theme itself.

**Step One**

First, you'll need some sort of `HTML` form. Here's an example:

	<form id="videoSubmit">
		<input type="text" name="videoRawUrl" />
		<input type="submit" />
	</form>

**Step Two**

Next, when the user submits the form, you'll want to capture it with JavaScript similar to the following:

	$('#videoSubmit').submit(function() {
		pm({ target: window.frames['sbnav'], type: 'sbInlineSubmitVideo', data: $(this).serialize() });
		return false;
	});
	
The passed data must contain the key `videoRawUrl` for it to be valid (we'll then use oEmbed to grab the data for the video). You can explicitly pass `videoTitle` if you'd like. You can also pass a comma separated list of words to use as tags with the key `videoTags`.

**Step Three**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineSubmitVideo', function(data) {
		// data will be a JavaScript object representing the video that was posted (or an error if an error occurred)
	});

## Email Subscriptions
When users are part of a fansite, they can manage their email subscriptions to that fansite in the backend. This is a way to add that functionality inline to your site.

**Step One**

First, you'll need some sort of `HTML` form. Here's an example:

	{module:API v="3.0" path="user/email_lists/list" account_id="{AccountId}"}
		{block:API}
			<form id="emailSubscriptionEdit">
				<input type="radio" name="subscribedStatus[{id}]" value="1" {if:APIKeyHasValue key="user_is_subscribed" value="true"}checked{/if:APIKeyHasValue} />Subscribe
				<input type="radio" name="subscribedStatus[{id}]" value="0" {if:APIKeyHasValue key="user_is_subscribed" value="false"}checked{/if:APIKeyHasValue} />Unsubscribe
			</form>
			{title}
		{/block:API}
	{/module:API}

**Step Two**

Next, when the user updates their preference, you'll want to capture it with JavaScript similar to the following:

	$('#emailSubscriptionEdit :input').change(function() {
		pm({ target: window.frames['sbnav'], type: 'sbInlineEmailSubscriptionEdit', data: $(this).parents('form').serialize() });
	});
	
The passed data must contain the array `subscribedStatus` with ID indices for it to be valid.

**Step Three**

Finally, you should add a binding to your theme's JavaScript. You can use this callback to handle the data returned from SBNav.

	pm.bind('sbInlineEmailSubscriptionEdit', function(data) {
		// data will be a JavaScript object representing the status that was posted (or an error if an error occurred)
	});