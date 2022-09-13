


$(document).ready(function () {

    if (!document.location.pathname.includes("/search")) return

    executeReplacement()

    if (document.querySelector("header>.inner>.logo-link"))
        document.querySelector("header>.inner>.logo-link").href = "/" // INFO return to Homepage on logo (top left corner) click

    const initialHitsDisplayValue = document.getElementById("hits-EB").style.display
    const hideSearchResults = () => { document.getElementById("hits-EB").style.display = "none"; document.getElementById("pagination-EB").style.display = "none" }
    const showSearchResults = () => { document.getElementById("hits-EB").style.display = initialHitsDisplayValue; document.getElementById("pagination-EB").style.display = initialHitsDisplayValue }

    const search = instantsearch({
        indexName: 'en-UUID-e07e78be-333d-a131-99d4-d73a035cd96c',
        searchClient: algoliasearch('I8O8UUJYGV', '8d4fcd15257ce1d335d4e19f886b186b'),
        searchFunction: helper => {
            if (!helper?.state?.query) hideSearchResults()
            else showSearchResults()
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
                header: 'Document', // INFO not shown in the UI
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
});

// replace original html elements with modified html
const executeReplacement = () => document.getElementsByTagName("html")[0].innerHTML =
    `
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta xmlns="http://www.w3.org/1999/xhtml" charset="utf-8">
    </meta>
    <meta xmlns="http://www.w3.org/1999/xhtml" http-equiv="x-ua-compatible" content="IE=edge">
    </meta>
    <title>Search</title>
    <link href="/css/roboto.font.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
        integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossorigin="anonymous">
    <link href="/css/theme1.css" rel="stylesheet">
    <link href="/css/content-theme2.css" rel="stylesheet">
    <link href="/css/html5.algoliasearch.css" rel="stylesheet">
    <link href="/css/layout-custom-style.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css">
</head>
    <body class="theme1 search-page" style="width: 100%;">
    <header class="portal-header" data-portal-language="en">
        <div class="inner"><a class="logo-link"><img class="logo" src="/css/image/portal-logo.png" alt="Logo"></img></a>
            <h1>How can we help you today?</h1>
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
            background: url(/css/image/portal-bg.jpeg) no-repeat center center;
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


$(document).ready(function () { // ? TODO this part is always executed
    setWelcomeText();
    setCatPanels();

    // Portal sub heading
    $('.portal-header h1').after('<h4>Find help using FA</h4>')

    /* 
        Uncomment if using AJAX Help Center
        $(document).ajaxComplete(function () {
            setWelcomeText();
            setCatPanels();
            $('.portal-header h1').after('<h4>Sub heading</h4>')
        });
    */

});

// Site footer
$(document).ready(function () {

    /* Typical Creation and Setup A New Orphaned Element Object */
    var NewElement = document.createElement('div');
    NewElement.innerHTML = 'The contents of this document and its attachments are for the use of the intended recipient only, and are confidential and may contain confidential information which may fall under duty of non-disclosure. Note that you may not use, capitalize, disseminate, distribute, copy or print the document or its attachments or the information they contain to third party. FA Solutions Oy cannot guarantee that the information received is unchanged, accurate and error-free. FA Solutions Oy is not liable for any direct or indirect losses or damages arising out of receipt or use of document or its content.';//Replace with disclaimer text
    NewElement.id = 'pageCustomFooter';

    /* Add NewElement to the existing footer*/
    document.getElementsByClassName('site-footer')[0]?.append(NewElement);
});




function setWelcomeText() {
    for (var key in welcomeTextDict) {
        var element = $("header.portal-header[data-portal-language=" + key + "] h1");
        element.text(welcomeTextDict[key])
    }
}
var welcomeTextDict = { "en": "FA Documentation" };

function setCatPanels() {
    // Image locations

    var icon1product = "https://documentation.fasolutions.com/en/files/icons/FAP_96.png";
    var icon2user = "https://documentation.fasolutions.com/en/files/icons/user_96.png";
    var icon3admin = "https://documentation.fasolutions.com/en/files/icons/admin_96.png";
    var icon4developer = "https://documentation.fasolutions.com/en/files/icons/developer_96.png";
    var icon5backref = "https://documentation.fasolutions.com/en/files/icons/backref_96.png";
    var icon6fmref = "https://documentation.fasolutions.com/en/files/icons/fmref_96.png";
    var icon7admref = "https://documentation.fasolutions.com/en/files/icons/admref_96.png";
    var icon8monref = "https://documentation.fasolutions.com/en/files/icons/monitorref_96.png";
    var icon9devref = "https://documentation.fasolutions.com/en/files/icons/devref_96.png";
    var icon10cportalref = "https://documentation.fasolutions.com/en/files/icons/cportalref_96.png";
    var icon11rn = "https://documentation.fasolutions.com/en/files/icons/rn_96.png";


    // Cat Panel image
    $(".cat-panel-1").closest("a").prepend("<img src='" + icon1product + "'></img>");
    $(".cat-panel-2").closest("a").prepend("<img src='" + icon2user + "'></img>");
    $(".cat-panel-3").closest("a").prepend("<img src='" + icon3admin + "'></img>");
    $(".cat-panel-4").closest("a").prepend("<img src='" + icon4developer + "'></img>");
    $(".cat-panel-5").closest("a").prepend("<img src='" + icon5backref + "'></img>");
    $(".cat-panel-6").closest("a").prepend("<img src='" + icon6fmref + "'></img>");
    $(".cat-panel-7").closest("a").prepend("<img src='" + icon7admref + "'></img>");
    $(".cat-panel-8").closest("a").prepend("<img src='" + icon8monref + "'></img>");
    $(".cat-panel-9").closest("a").prepend("<img src='" + icon9devref + "'></img>");
    $(".cat-panel-10").closest("a").prepend("<img src='" + icon10cportalref + "'></img>");
    $(".cat-panel-11").closest("a").prepend("<img src='" + icon11rn + "'></img>");

    // Cat Panel text
    $('.cat-panel-1').closest("a").append('<p>Check out the detailed list of FA Platform features. The document provides an overview of the FA platform and the functionality it offers for your business.</p>');
    $('.cat-panel-2').closest("a").append('<p>Find out how to handle your daily business tasks using FA standard setup.</p>');
    $('.cat-panel-3').closest("a").append('<p>Find out how to set up FA apps.</p>');
    $('.cat-panel-4').closest("a").append('<p>Find out how to customize FA and integrate it with other systems.</p>');
    $('.cat-panel-5').closest("a").append('<p>Learn more about FA Back app. FA Back app is a portfolio management tool for professionals to manage all aspects of their day-to-day work</p>');
    $('.cat-panel-6').closest("a").append('<p>Learn more about FA Fund Management features. FA Fund Management app allows you to carry out daily operations related to managing mutual funds.</p>');
    $('.cat-panel-7').closest("a").append('<p>Learn more about FA Admin Console app.  FA Admin Console provides tools for system administrators and IT specialists to manage FA user accounts and access system-level files.</p>');
    $('.cat-panel-8').closest("a").append('<p>Learn more about FA Monitoring app that lets you track the FA Platform performance and business flows.</p>');
    $('.cat-panel-9').closest("a").append('<p>Learn more about FA Developer app.  It provides access to services for the third-party developers who work with FA.</p>');
    $('.cat-panel-10').closest("a").append('<p>Learn more about FA Client Portal app.  It provides access to investment information for your clients.</p>');
    $('.cat-panel-11').closest("a").append('<p>Learn about the recent changes in the FA apps.</p>');

    // Remove default icons
    $(".publication-icon").remove();
}


