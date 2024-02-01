

$(document).ready(function () {
    InitializeDocPagesFixesSetup();
    // DOC-317+

    // DOC-187: Search page customization
    FixSearchPage();
    // must be executed after FixSearchPage()
    FixWelcomePage();


    // DOC-405 - Add a placeholder and a link to the Advanced search page
    FixSearchInputField();
    FixSideNavSearch();

    // DOC-936/DG-194: Add reference to search results
    NavMenuSearchExtension();
    // DG-195: Fix for FADocumentation Search Results Text Overflow
    FixSearchResultsTextOverflow();
});

// created to improve stability of applied fixes
function InitializeDocPagesFixesSetup() {

    // clicking a link on a left side nav menu, in some cases will not change the URL, this trigger was created to handle such cases
    window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray) => {
            window.OnURLChangeExecuted = false;
            return target.apply(thisArg, argArray);
        },
    });

    // tracking ui changes, executing on new nodes added to the dom
    let currentLocation = window.location.href;
    const observer = new MutationObserver((mutationList, observer) => {
        // URL change detection
        if (location.href != currentLocation) {
            currentLocation = location.href;
            OnURLChangeExecuted = false;
        }

        fixesToBeExecuted()
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // applying fixes
    const fixesToBeExecuted = () => {
        // NOTE: if fixes fail to apply, consider removing the if statement or moving the fixes the top of a function, this could create a loop thus causing the page to freeze

        if (window.OnURLChangeExecuted) return // this statement prevents fixes from being applied multiple times per page load

        FixFeedbackPanel()

        window.OnURLChangeExecuted = true;

    }

    fixesToBeExecuted();


    function FixFeedbackPanel() {
        // if the fixes have already been applied, exit the function
        if ($('.feedback-panel-fix-applied').length) return

        // email message generation
        const pageTitle = document.title;
        const pageUrl = window.location.href;
        const to = "documentation@fasolutions.com"
        const subject = encodeURI(`Feedback on ${pageTitle}`)
        const message = encodeURI(`\n\n\n___________________________________________\nPlease add your feedback for the topic "${pageTitle}" (${pageUrl})`)

        const newFeedbackPanel = `
<div id="email-feedback" class="feedback-link-visible feedback-panel-fix-applied">
    <p>
        <a href="mailto:${to}?subject=${subject}&body=${message}">
            <i aria-hidden="true" class="fa fa-pencil-square-o feedbackicon"></i>
            Provide feedback for this page
        </a>
    </p>
</div>
        
        `;

        $(".feedback-panel").html(newFeedbackPanel);
    }

}


// set search input field placeholder text color to black to make it visible and change text to "Search"
function FixSearchInputField() {
    // if the fixes have already been applied, exit the function
    if ($('.fix-nav-search-applied').length) return

    // select the input field with the class "search-field"
    const searchField = $('.search-field');

    // append a style tag to the body with the css for proper placeholder text color
    $('body').append('<style>.search-placeholder-fix::placeholder{color:#999}</style>')

    // set the placeholder text color to black
    searchField.addClass('search-placeholder-fix');

    // change the placeholder text to "Search"
    searchField.attr('placeholder', 'Search');

    searchField.addClass('fix-nav-search-applied');
}


// add "Advanced search" link below the search input field, aligned to the right, with font size 10px
function FixSideNavSearch() {
    // only apply the advanced search link if the side bar search field exists
    if (!$('.site-sidebar .search-field').length) return

    // if the fixes have already been applied, exit the function
    if ($('.fix-side-nav-search-applied').length) return

    // create the "Advanced search" link, align it to the right and set font size to 10px
    const advancedSearchLink = $('<a href="/search.html" target="_blank" style="text-align: right;float: right;font-size: 10px;width: 100%;padding: 6px;">Advanced search</a>');
    advancedSearchLink.addClass('fix-side-nav-search-applied');

    // select the input field with the class "search-field"
    const searchField = $('.search-field');

    // insert the link after the input field
    searchField.after(advancedSearchLink);
}


function FixWelcomePage() {
    // exit if not on welcome page

    if (["/index.html", "/", "/search.html"].includes(document.location.pathname))
        setWelcomeText();
    if (["/index.html", "/"].includes(document.location.pathname))
        setCatPanels();

    function setWelcomeText() {
        const welcomeTextDict = { "en": "FA Documentation" };
        for (var key in welcomeTextDict) {
            var element = $("header.portal-header[data-portal-language=" + key + "] h1");
            element.text(welcomeTextDict[key])
        }
        // Portal sub heading
        $('.portal-header h1').after('<h4>Find help using FA</h4>')
    }

    function setCatPanels() {
        // Image locations

        var icon1product = "https://documentation.fasolutions.com/en/files/icons/FAP_96.png";
        var icon2user = "https://documentation.fasolutions.com/en/files/icons/user_96.png";
        var icon3backref = "https://documentation.fasolutions.com/en/files/icons/backref_96.png";
        var icon4fmref = "https://documentation.fasolutions.com/en/files/icons/fmref_96.png";
        var icon5opref = "https://documentation.fasolutions.com/en/files/icons/opref_96.png";
        var icon6cportalref = "https://documentation.fasolutions.com/en/files/icons/cportalref_96.png";
        var icon7admin = "https://documentation.fasolutions.com/en/files/icons/admin_96.png";
        var icon8admref = "https://documentation.fasolutions.com/en/files/icons/admref_96.png";
        var icon9monref = "https://documentation.fasolutions.com/en/files/icons/monitorref_96.png";
        var icon10devref = "https://documentation.fasolutions.com/en/files/icons/devref_96.png";
        var icon11rn = "https://documentation.fasolutions.com/en/files/icons/rn_96.png";         

        // Cat Panel image
        $(".cat-panel-1").closest("a").prepend("<img src='" + icon1product + "'></img>");
        $(".cat-panel-2").closest("a").prepend("<img src='" + icon2user + "'></img>");
        $(".cat-panel-3").closest("a").prepend("<img src='" + icon3backref + "'></img>");
        $(".cat-panel-4").closest("a").prepend("<img src='" + icon4fmref + "'></img>");
        $(".cat-panel-5").closest("a").prepend("<img src='" + icon5opref + "'></img>");
        $(".cat-panel-6").closest("a").prepend("<img src='" + icon6cportalref + "'></img>");
        $(".cat-panel-7").closest("a").prepend("<img src='" + icon7admin + "'></img>");
        $(".cat-panel-8").closest("a").prepend("<img src='" + icon8admref + "'></img>");
        $(".cat-panel-9").closest("a").prepend("<img src='" + icon9monref + "'></img>");
        $(".cat-panel-10").closest("a").prepend("<img src='" + icon10devref + "'></img>");
        $(".cat-panel-11").closest("a").prepend("<img src='" + icon11rn + "'></img>");

        // Cat Panel text
        $('.cat-panel-1').closest("a").append('<p>Check out the detailed list of FA Platform features. The document provides an overview of the FA platform and the functionality it offers for your business.</p>');
        $('.cat-panel-2').closest("a").append('<p>Find out how to handle your daily business tasks using FA standard setup.</p>');
        $('.cat-panel-3').closest("a").append('<p>Learn more about FA Back app. FA Back app is a portfolio management tool for professionals to manage all aspects of their day-to-day work.</p>');
        $('.cat-panel-4').closest("a").append('<p>Learn more about FA Fund Management features. FA Fund Management app allows you to carry out daily operations related to managing mutual funds.</p>');
        $('.cat-panel-5').closest("a").append('<p>Learn more about FA Operations features. FA Operations app helps back-office employees carry out their daily business tasks.');
        $('.cat-panel-6').closest("a").append('<p>Learn more about FA Client Portal app.  It provides access to investment information for your clients.</p>');
        $('.cat-panel-7').closest("a").append('<p>Find out how to set up FA apps.</p>');
        $('.cat-panel-8').closest("a").append('<p>Learn more about FA Admin Console app.  FA Admin Console provides tools for system administrators and IT specialists to manage FA user accounts and access system-level files.</p>');
        $('.cat-panel-9').closest("a").append('<p>Learn more about FA Monitoring app that lets you track the FA Platform performance and business flows.</p>');
        $('.cat-panel-10').closest("a").append('<p>Learn more about FA Developer app. Customize FA and integrate it with other systems.</p>');
        $('.cat-panel-11').closest("a").append('<p>Learn about the recent changes in the FA apps.</p>');

        // Remove default icons
        $(".publication-icon").remove();
    }

}


// DOC-187: Search page customization
function FixSearchPage() {
    // * This code was added as a part of the "Search" page customization ticket [DOC-187](https://fasolutions.jira.com/browse/DOC-187)
    // * The code is executed on the "Advanced search" page only

    // checks if the page is the "Advanced search" page, if not - returns
    if (document.location.pathname !== "/search.html") return

    // replaces the html structure of the page
    document.getElementsByTagName("html")[0].innerHTML =
        `
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta xmlns="http://www.w3.org/1999/xhtml" charset="utf-8">
</meta>
<meta xmlns="http://www.w3.org/1999/xhtml" http-equiv="x-ua-compatible" content="IE=edge">
</meta>
<title>Search</title>
<link href="css/roboto.font.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossorigin="anonymous">
<link href="css/theme1.css" rel="stylesheet">
<link href="css/content-theme2.css" rel="stylesheet">
<link href="css/html5.algoliasearch.css" rel="stylesheet">
<link href="css/layout-custom-style.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css">
</head>
<body class="theme1 search-page" style="width: 100%;">
<header class="portal-header" data-portal-language="en">
<div class="inner"><a class="logo-link"><img class="logo" src="css/image/portal-logo.png" alt="Logo"></img></a>
<h1>FA Documentation</h1>
<div class="portal-search form-inline">
    <div id="searchbox-EB" class="ais-SearchBox"></div>
</div>

</div>
</header>

<div class="portal-body">
<div class="portal-body-container">
<div class="portal-body-row">
    <div class="ais-InstantSearch">
        <div class="filters-panel">
            <!-- <h3 class="filters-title">Filters</h3> -->
            <h4 class="refinement-title">Document </h4>
            <div id="document-refinement-EB"> </div>
            <div id="clear-refinements-EB"></div>
            <div id="hierarchical-categories-EB"></div>
        </div>
        <div class="search-results-panel">
            <h3 class="search-results-title"></h3>
            <div id="hits-EB"> </div>
            <div id="pagination-EB"> </div>
        </div>
    </div>
</div>
</div>
</div>
<footer xmlns="http://www.w3.org/1999/xhtml" class="portal-footer">
<div class="inner row"></div>
</footer>


<style>
.portal-header::after {
background: url(css/image/portal-bg.jpeg) no-repeat center center;
background-size: cover;
}
</style>

<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.35.1/dist/algoliasearchLite.min.js"
integrity="sha256-5rOQwvvJdM9oDYQYCGzaJuuTy6SUALjma3OtzEGyJM0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.0.0/dist/instantsearch.production.min.js"
integrity="sha256-6S7q0JJs/Kx4kb/fv0oMjS855QTz5Rc2hh9AkIUjUsk=" crossorigin="anonymous"></script>

<script type="text/javascript">

</script>
</body>
</html>
`

    // on logo click in the top left corner, redirects to the main page
    if (document.querySelector("header>.inner>.logo-link"))
        document.querySelector("header>.inner>.logo-link").href = "/"

    const initialHitsDisplayValue = document.getElementById("hits-EB").style.display
    const hideSearchResults = () => { document.getElementById("hits-EB").style.display = "none"; document.getElementById("pagination-EB").style.display = "none" }
    const showSearchResults = () => { document.getElementById("hits-EB").style.display = initialHitsDisplayValue; document.getElementById("pagination-EB").style.display = initialHitsDisplayValue }

    // initializes the Algolia's search widgets
    const search = instantsearch({
        indexName: 'en-UUID-e07e78be-333d-a131-99d4-d73a035cd96c',
        searchClient: algoliasearch('I8O8UUJYGV', '8d4fcd15257ce1d335d4e19f886b186b'),
        searchFunction: helper => {
            // if the search query is empty, hides the search results
            if (!helper?.state?.query) hideSearchResults()
            else showSearchResults()
            // executes the search
            helper.search()
        }
    });

    search.addWidget(
        instantsearch.widgets.refinementList({
            container: '#document-refinement-EB',
            attribute: 'document',
            sortBy: ['isRefined', 'count:desc', 'name:asc'],
            limit: 100,
            operator: 'or',
            templates: {
                header: 'Document', // * is not displayed in the UI
            }
        })
    );

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#searchbox-EB',
            cssClasses: {
                input: 'form-control search-field',
                submit: 'btn'
            },
            showReset: false,
            autofocus: true,
            placeholder: 'Search',
            searchAsYouType: true
        })
    );

    search.addWidget(
        instantsearch.widgets.clearRefinements({
            container: '#clear-refinements-EB',
            templates: {
                resetLabel: 'Clear filters',
            },
            cssClasses: {
                button: 'btn btn-default',
            },
        })
    );

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits-EB',
            hitsPerPage: 10,
            templates: {
                item: `
                <div class="hit">
                <div class="hit-content">
                <a href="/${window.portalLanguage}/{{ url }}">
                <h3 class="hit-title">{{ title }}</h3>
                <p class="hit-body">{{{_highlightResult.body.value}}}</p>
                <p class="hit-document">{{document}}</p>
                </a>
                </div>
                `,
                empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
            },
        }))

    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#pagination-EB',
        }));

    search.start();
}

// --- DOC-936/DG-194: Add reference to search results
function addSearch() {
    // Intercept original addSearch function call.
}

function NavMenuSearchExtension() {
    $("head").append(`
    <style>
    .aa-search-result-wrapper {
        display: grid;
    }
    
    .aa-search-reference {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; /* This will show ... when the content overflows its container */
        width: 100%;
        text-align: end;
    }
    </style>
    `);

    $("#aa-search-input").keyup(function () {
        var input = $(this);

        if (input.val() == "") {
            $('.overlay').hide();
        }
    });

    //For permalinks: data-topic-level will only be set if produce.permalink = 1 in XSLT
    var topiclevel = $('section[data-topic-level]').first().attr('data-topic-level');
    var up = '';

    if (topiclevel != '') {
        for (i = 1; i < parseInt(topiclevel);
            i++) {
            up += '../';
        }
    }

    //If this is the portal/index page:
    if ($('.portal-search-result').length) {
        up = portalLanguage + '/';

        //If the customer has specified a custom index there will be no language mappings. If so use the existing publication_id.
        publication_id = publication_langs_id[portalLanguage] ? publication_langs_id[portalLanguage] : publication_id;
    }

    var client = algoliasearch(algolia_application_id, algolia_search_only_api_key);
    var index = client.initIndex(publication_id);
    //initialize autocomplete on search input (ID selector must match)
    //minlength is the number of characters entered before first search is executed. 1 default, 3 with delayed algolia search configured.
    $("[data-portal-language='" + portalLanguage + "'] #aa-search-input, .site-body #aa-search-input, .site-header #aa-search-input").autocomplete({
        hint: false,
        autoselect: true,
        minLength: instantsearch_minlength
    }, [{
        source: $.fn.autocomplete.sources.hits(index, {
            /*The users can set this in the Algolia dashboard instead.*/
            /*hitsPerPage: 5*/
        }),
        //value to be displayed in input control after user's suggestion selection
        displayKey: 'title',
        //hash of templates used when rendering dataset
        templates: {
            //'suggestion' templating function used to render a single suggestion
            suggestion: (suggestion) => {
                var body = suggestion._highlightResult.body.value;


                // Escape tags
                body = body.replace(/\<em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-1]');
                body = body.replace(/\<\/em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-2]');
                body = body.replace(/\</g, '&lt;');
                body = body.replace(/\>/g, '&gt;');
                body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-1\]/g, '<em>');
                body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-2\]/g, '</em>');

                // DOC-936/DG-194: Main functional changes introduced here:
                let html = '<div class="aa-search-result-wrapper">'; // Start of wrapper

                html += '<a href="' + up + suggestion.url + '"><div class="aa-search-title">' +
                    suggestion._highlightResult.title.value + '</div><div class="aa-search-body">' +
                    body + '</div>';

                let reference = '';
                try {
                    reference = Object.values(suggestion?.hierarchicalCategories)[0][0] || ''
                    reference = reference?.split(' > ').slice(1).join(' > ') // remove the first element (the publication name)
                } catch (error) {
                    console.log(error)
                    reference = ''
                }

                if (reference) {
                    html += '<a class="aa-search-reference">' + reference + '</a>';
                }

                html += '</a>'; // End of wrapper

                return html;
            }
        }
    }]).on('autocomplete:shown', function (event, suggestion, dataset) {
        $('.overlay').show();
    }).on('autocomplete:closed', function (event, suggestion, dataset) {
        $('.overlay').hide();
    }).on('autocomplete:selected', function (dataset, suggestion) {
        location.href = up + suggestion.url;
        //Note: Important to prepend the up path.
    });
}

// END --- DOC-936/DG-194: Add reference to search results

// --- DG-195: Fix for FADocumentation Search Results Text Overflow
function FixSearchResultsTextOverflow() {
    $("head").append(`
    <style>
    .aa-search-body {
        overflow-wrap: anywhere;
    }
    </style>
    `);
}
// END --- DG-195: Fix for FADocumentation Search Results Text Overflow