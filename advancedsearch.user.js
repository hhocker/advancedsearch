// ==UserScript==
// @name        advancedsearch
// @namespace   advancedsearch
// @description an advanced search
// @include     http*www.digikey.*/product-search*
// @include     http*digikeytest.digikey.*/product-search*
// @include     http*www.digikey.*/scripts/dksearch*
// @include     http*search.digikey.*/*
// @include     http*www.digikey.*/product-detail/en/*
// @include     http*digikey.*/product-detail/*/*
// @include     http*digikey.*/classic/Ordering/FastAdd*
// @include     http*digikey.*/short/*
// @exclude     http://www.digikey.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/Highcharts-4.0.4/js/highcharts.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.localScroll.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.hoverIntent.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.spellchecker.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/quantities.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.jqpagination.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/dklib/dklib.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/fixedsticky/fixedsticky.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/tooltipster-master/js/jquery.tooltipster.min.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.lazyloadxt.js
// @require     https://dl.dropboxusercontent.com/u/26263360/script/lib/jquery.dragtable.js
// @resource    buttonCSS https://dl.dropboxusercontent.com/u/26263360/script/css/buttons.css
// @resource    advCSS https://dl.dropboxusercontent.com/u/26263360/script/css/advancedsearch.css
// @resource    normalizeCSS http://yui.yahooapis.com/pure/0.5.0/base.css
// @resource    pureCSS http://yui.yahooapis.com/pure/0.5.0/pure.css
// @resource    fontAwesomeCSS https://dl.dropboxusercontent.com/u/26263360/script/css/font-awesome.css
// @resource    stickyCSS https://dl.dropboxusercontent.com/u/26263360/script/lib/fixedsticky/fixedsticky.css
// @resource    tooltipsterCSS https://dl.dropboxusercontent.com/u/26263360/script/lib/tooltipster-master/css/tooltipster.css
// @resource    tooltipster-shadowCSS https://dl.dropboxusercontent.com/u/26263360/script/lib/tooltipster-master/css/themes/tooltipster-shadow.css
// @updateURL   https://goo.gl/vbjoi
// @downloadURL https://bit.ly/advsearch-user-js
// @run-at      document-end
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// @version     3.6.5
// ==/UserScript==

// Copyright (c) 2013, Ben Hest
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met: 

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer. 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution. 

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies, 
// either expressed or implied, of the FreeBSD Project.

//author can be emailed at gmail.com   bombledmonk@


//1.7.3     gave the detail page a softer look, changed the text voltage input helper to be more user friendly
//1.7.6     Download link changed to bit.ly to keep track of downloads. https://dl.dropbox.com/u/26263360/advancedsearch.user.js
//1.7.7     Userscripts.org release http://userscripts.org/scripts/show/157205
//1.7.8     Added more alternate highlighting terms.  ie search for "10k" and all the resistors and pots will be highlighted, 
//          started checkboxes feature, changed the "initially sort by price" feature to re-filter on desired quantity when changed
//1.7.9     Added indexInstantFilter function.  Instantly filter down product families as user types in search box. Disabled by default.
//1.8.0     Added Cart Hover and item count in header.  
//1.8.1     Fixed sort by price @ Qty bug. Improved cart hover. Added price break popup when hovering over prices.
//1.8.2     Added simple column hiding. Refactored code, bug fixes.
//1.8.2.1   Added some error catching code
//1.8.3     Added Hover function to Associated Products Links, For Use With Links, and added a browse and filter function to both spots on the Product detail page.
//1.8.3.1   Fixed Chrome problems by using runat document-end instead of document-start. 
//          Fixed breadcrumbs to include sort order/in stock/lead free/rohs and quantity modifiers
//1.8.4     Added Breadcrumb Category Hover. Made Jump to Category scrollable. Fixed some bugs introduced by styling changes made by DK.
//1.8.5     Added Associated Product Carousel on product detail pages.  Fixed the chrome auto scrolling bug.  Added jquery plugins as "at require".
//          Added Compare Feature
//1.8.6     Added Reverse Filtering from product Detail pages
//1.8.6.1   Added feedback to the reverse filtering and compare features and exposed a more intuitive interface
//1.8.6.2   Fixed issue where multiple product families messed with the Carousel.
//1.8.7     Started bringing in CSS externally, Added wrapping feature for Parameter Multiselect Boxes, Added accordion select box tech demo
//          Added show hidden columns button
//1.8.7.1   New version of compare, pops up from bottom, no more hoverover.
//1.8.7.2   Fixed annoying headers not lining up, 
//1.8.8     Added icons in jump to area
//1.8.8.1   Turned Icons into sprites.  Fixed bugs with carousel. Rearranged some of the Controls menu
//1.8.9     Revamped the cart quantity changing.  Added the main cart page to the script added functionality.
//1.8.9.1   Added pictures to the cart areas.
//1.9.0     Added Explore Mode - gives little popups with pictures of each parameter when hovered
//1.9.0.1   Tweaked Explore Mode - gave a medium preview box in the Explore Mode hover
//2.0.0     Fixed bugs introduced by updates to digikey's site
//2.0.0.1   Fixed more bugs introduced by updates to digikey's site
//2.0.1     Added horizontal scrolling feature to Apply Filters, Added feature allow checkbox inputs to comma separated values in a multiselect input.
//2.0.2     Added Search Within: feature on Drill Down Results Page. Bug Fixes
//2.0.2.1   Hid some lengthy text to improve density
//2.0.3     First Attempt at Internationalizing the script.  In theory it should work on all English digikey websites from now on.
//2.0.3.1   Fixed Sorting bugs
//2.0.4     Fixed the bloated sequential timing to get script loadtime down to 10%, Introduced applied filters removal
//2.0.4.1   Fixed cart bug, added some more speed optimizations. 
//2.0.4.2   Tuned some of the hover over timings.
//2.0.4.3   Fixed No records matching bug.
//2.0.5     Added index column feature, fixed category highlighting with Jump To Category feature
//2.0.5.1   Refined some of the index page features, including column
//2.0.5.2   Added a control for location of quick pick box
//2.0.5.3   Some quick fixes
//2.0.5.4   Refinement of quick pick controls, fixed bug with forward slash in breadcrumb
//2.0.6     Finished wrapping the filters to avoid side scrolling.
//2.0.6.1   Added some more parameter titles to work with the voltage helper, added button to switch on explore mode
//2.0.6.2   Fixed the voltage helper used with wrapping, fixed clear buttons, added control for wrapping divs
//2.0.6.3   Style changes, gray headers
//2.0.7     Polished. Changed style of the filters, input text boxes, fixed buttons, changed the floating apply buttons
//          fixed applyfilters bug, put buttons in tabs
//2.0.7.1   fixed a few display bugs in Chrome
//2.0.7.2   fixed formatFilterResults page error
//2.0.8     added datasheet autoloader
//2.0.8.1   fixed some errors introduced by changes on digikey's website
//2.0.8.2   minor cleanup, error alerts, and fixes
//2.0.8.5   weekend refactoring
//2.0.9     fixed compare parts feature
//2.0.10    fixed error occurring on the detail page where user could not delete parts, added always expand checkbox to wrapping filters
//2.1.0     added customizable delay time for Explore mode in the control panel
//2.1.1     added jump down to datasheet button
//2.1.2     fixed errors where filters cannot be removed
//2.1.3     added back caching for the removable filters
//2.1.4     hopefully fixed errors associated with foreign languages
//2.2       Added query term highlighting on the filter results page, fixed formatting errors introduced by new defualt font. 
//          Changed color of help icon, changes also in CSS
//2.2.1     added null string check to fix bug with query term highlighting
//2.2.2     made the header respond better to different size windows
//2.2.3     added partial .jp support for range search
//2.3       reworked the voltage range search algorithm to include comma separated values
//2.4       Added search button highlighting, fixed so all floating filters appear in-line, added next price break calculator.
//          Fixed errors due to Digi-Key website changes
//2.4.1     Fixed doubling up bug in the quick picks box, fixed stacked explore mode box in chrome
//2.5       Added ORing checkboxes to the package type inputs
//2.5.1     Fixed bug on fastadd page, added quickpaste function on fastadd page
//2.5.2     Code cleanup, added BSD license
//2.6       Quick Fix for Quick Picks update on dk site
//2.6.1     Fix for digikey site bug.
//2.6.2     Added My Digi-Key link
//2.6.3     My Digi-Key link international bug fix
//2.6.4     Fix for Explore mode and example pictures on some sites
//2.7       Fixed issues introduced by cart changes, code cleanup
//2.7.1     Code cleanup, added id
//2.7.2     quick fix
//2.7.3     fixed the uniqueness of the checkbox helper
//2.7.4     fix for new header on dk website.
//2.7.5     fixed bug in the Search Within feature
//2.8       added a more functional associated parts filtering mechanism, 
//          added Hide Identical Columns feature, tweaked instant filter with wildcard search
//2.9       added Column Math and picture carousel 
//2.9.1     added graphing/charting, fixed picture carousel, refining value parser
//2.9.2     refactored associated product, fixed header link bugs, removed beablock blue, various other bug fixes
//2.9.3     hid customers who evaluated box
//2.9.4     added fonts, restyled checkboxes, filter page bug fixes
//2.9.5     fixed bugs in similar to feature, fixed button highlighting problems, style changes
//2.9.6     added clear button rules, worked on speed, sending ot to fix dropbox serving error
//2.9.6.1   chrome fix for selectbox width
//2.9.6.3   fixed bugs in wrap filters area
//2.9.7     handled change in breadcrumbs, styled index page
//2.9.8     Started wizards, added LEDwiz, changed qty form, fixed double fill bug in associated product, moved detail image.
//3.0       Large refactor, fixed price break hover
//3.0.1     Fixed Temperature Range helper
//3.0.2     Fixed European price formatting error, added some icons
//3.1       Started reformatting the Index page
//3.1.1     Fixed indexpicpreview
//3.2       Added Visual Picker, finished header redesign, fixed search focus, added link to category.
//3.3       Added images to families, removed explore mode, improved pick with pictures feature.
//3.4       No longer runs in cart, fixed CSS issues, removed some unused javascript libs
//3.4.1     Fixed index image problems going to the wrong url.
//3.5       refactored for speed improvements. index pictures, header, control widget.
//3.5.1     fixed checkbox bug
//3.5.2     delayed the init of settings box for speed, fixed table width issues.
//3.6		fixed upper case issues with instant search, fixed compare z-level, replaced * and - text with name and title text
// 			added learn more about capacitors link, fixed matching-records bug, added "new products" link
//3.6.1     added image hover over supplier portal links, fixed the associated product view all links.
//3.6.2		added https in product search, added view more button at bottom of product table
//3.6.3     added search help
//3.6.4     updated due to category name changes
//3.6.5     moved the css bundle to the end as a trick to improve perceived load time

//TODO add copy info button  possibly on filter results page
//TODO move alternate packaging <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//TODO fix the breadcrumb hover from being placed above
//TODO add a messages/update
//TODO offer no reload, infinite scroll? at end of product index page.
//TODO display percentage of parameter on page, possibly graph  
//TODO think about logging lib, global vars
//TODO Make graphs into filter inputs. look in drawChart function
//TODO Add graphs to the show pricing curve, call all packaging types and plot in different colors.
//TODO split family names on "\s-\s" and stick into subcats
//TODO Toggle Hide filter block
//TODO add feature to re-search on "no results found" when in stock checkboxes are checked.
//TODO check out IndexedDB for caching
//TODO add footprints and symbols
//TODO add a most recently visited/ most visited families feature to top of page (chris)
//TODO add obsolete product direct subs to top of page PCC101CQCT-ND
//TODO fuzzy similar to, start in opamps
//TODO add a google like "advanced search" to the header

// [at]include      http*digikey.*/classic/Orderi2ng/FastAdd* add the fastadd features

var starttimestamp = Date.now();
var sincelast = Date.now();
var version = GM_info.script.version;
var lastUpdate = '8/6/15';
var downloadLink = 'https://dl.dropbox.com/u/26263360/advancedsearch.user.js';
var DLOG = false; //control detailed logging.
// var MAX_PAGE_LOAD = 20;
// var selectReset = null;
var theTLD = window.location.hostname.replace('digikey.','').replace('www.', '');
var sitemaplink = $('#header').find('a:contains("Site Map"):first').attr('href');
var mydklink = getMyDigiKeyLink();
var gIndexLink = getIndexLink();
var cacheflag = false;


//loads before document status is ready
function preloadFormat(){
    _log('preloadFormat() Start',DLOG);
    $('#content form[name="attform"]').attr('id', 'mainform'); // this form is only on filter page
    GM_addStyle("#header {display: none;} #content hr {display:none;} #footer{position:relative; top:45px;} #content>form:first-child {display:none} #content>p {display:none;} .content-keywordSearch-form{display:none;}");
    // GM_addStyle("#header {display: none;} #content hr {display:none;} #footer {display:none;} #content>p {display:none;} ");
    // addResourceCSS();
    // _log('testing123333333', true)
    $('#header').detach();
    // _log('testing123333333', true)
    $('#footer').before('<div style="height:10px;"></div>');
    // $('#footer').remove();
    // formatPagesPreReady();
    _log('preloadFormat() End',DLOG);
}


preloadFormat();

$(document).ready(function() {
    _log('[ready] advanced search starts here. Jquery version '+ jQuery.fn.jquery);
    _log('[ready] hostname is '+ window.location.hostname,DLOG);
    _log('[ready] pathname is '+ window.location.pathname,DLOG);
    _log('[ready] search is '+ window.location.search,DLOG);
    formatPagesPostReady();

    _log('[ready] end of document ready function');
});

function addResourceCSS(){
    var cssNames = [
        "buttonCSS",
        "advCSS",
        "normalizeCSS",
        "pureCSS",
        "fontAwesomeCSS",
        "stickyCSS",
        "tooltipsterCSS",
        "tooltipster-shadowCSS"
    ];
    for ( var x in cssNames){
        _log('style tick end'+ cssNames[x], DLOG);
        var thetext = GM_getResourceText(cssNames[x]);
        // _log('style tick 1'+ cssNames[x], DLOG);
        GM_addStyle(thetext);
        // _log('style tick start '+cssNames[x], DLOG);
    }
}

function tc(thefunc, name){ // tc = try catch
    try{
        thefunc();
    }catch(err){
        alert('failed on '+ name + '\n' + err.message + 
            '\n\n If you are getting repeated errors try manually updating by clicking on the ++settings++ box in the upper right hand corner and then hit the manual update link.'+
            '\n\n Alternatively, copy and paste this link into your browser:  https://bit.ly/advsearch-user-js'+
            '\n\n Tampermonkey users, please make sure you go to Tampermonkey Settings and change the Externals Update Interval to "Always".'
            );
    }
}

function formatPagesPostReady() {
    _log('formatPagesPostReady() Start',DLOG);
	formatPagesPreReady();
    tc(replaceQuestionMark, 'replaceQuestionMark');
    // tc(updateCache, 'updateCache');
    // tc(addCustomHeader, 'addCustomHeader');
    // tc(addControlWidget,'addControlWidget');  // TODO FIX function order dependence on addCustomHeader      
    tc(preFormatDetailPage, 'preformatDetailPage');
    tc(formatFilterResultsPage, 'formatFilterResultsPage');

    tc(formatDetailPage, 'formatDetailPage');
    // tc(formatOrderingPage,'formatOrderingPage');
    tc(formatFastAddPage,'formatFastAddPage');
    tc(addEvents, 'addEvents');
    tc(formatIndexResultsPage, 'formatIndexResultsPage');
    tc(addBreadCrumbLink, 'addBreadCrumbLink');
    // tc(addCartHover, 'addCartHover');
    // tc(lazyLoadFix, 'lazyLoadFix');
    addResourceCSS();
    cleanup();
    _log('formatPagesPostReady() End',DLOG);
}

function formatPagesPreReady() {
    _log('formatPagesPreReady() Start',DLOG);
        tc(addCustomHeader, 'addCustomHeader');
        tc(addControlWidget,'addControlWidget');  // TODO FIX function order dependence on addCustomHeader      
        tc(addCartHover, 'addCartHover');

        // tc(preFormatDetailPage, 'preformatDetailPage');

    _log('formatPagesPreReady() End',DLOG);
} 

function getMyDigiKeyLink(){
    var retval ='';
    tc(function(){
        if ($('.header-dropdown-content').length){
            retval =$('#header-login').find('.header-dropdown-content a:first').attr('href');
        }
    }, 'getMyDigiKeyLink');
    if (retval == undefined){ retval = 'https://www.digikey.com/classic/RegisteredUser/Login.aspx';}
    return retval;
}

function getIndexLink(){
    var ret = $('#header-middle').find('.header-resource').attr('href'); 
    return (ret == undefined)? 'http://www.digikey.com/product-search/en' : ret;
}

function replaceQuestionMark(){
    _log('replaceQuestionMark() Start',DLOG);
    var $img = $('img[src$="help.png"]');
    // $('img[src*="help.png"]').attr('src', 'https://dl.dropboxusercontent.com/u/26263360/img/newhelp.png');
    // $img.addClass('qmark').hide();
    $img.hide();
    $img.after('<i class="fa fa-question-circle fa-lg" style="color:#999;"></i>');// css used to replace image as a background image
    _log('replaceQuestionMark() End',DLOG);
}

function cleanup () {
    _log('cleanup() Start',DLOG);

    askpermission(version);

    $('input[type=submit],input[type=reset]').addClass('button-small pure-button').css({
        'margin': '2px',
    });
    $('p:contains("No records match your")').show();
    _log('cleanup() End',DLOG);
}

//TODO FINISH  UNUSED
function updateCache(){
    if(Date.now() > parseInt(localStorage.getItem('lastCacheRefresh')) + 604800000){
        cacheflag = true;
    }
    else{
        localStorage.setItem('lastCacheRefresh', 604800000);
        cacheflag = false;
    }
}

function addCustomHeader(){
	try{
	_log('addCustomHeader() Start',DLOG);
    //TODO style the form with purecss
    var mydklink2 = 'https://www.digikey.com/classic/RegisteredUser/Login.aspx';
    gIndexLink = 'http://www.digikey.com/product-search/en';
    theTLD = 'com';

    var customform = '<div id="cHeader" style="display:block; background:black; color:white;"><a href="http://digikey.'+theTLD+'">'+
        '<img align=left top="50px" height=50 src="http://www.digikey.com/Web%20Export/hp/common/logo_black.jpg"></a>'+
        '<form id="headForm" method="get" action="/scripts/dksearch/dksus.dll?KeywordSearch">'+
        '<a href="http://dkc1.digikey.com/us/en/help/help10.html">'+
        '<b>Keywords:</b></a> <input type="search" value="" id="headKeySearch" maxlength="250" size="35" class="dkdirchanger2" name="keywords">'+
        '<input align=right type="submit" value="New Search" id="searchbutton">'+
        ' <input type="checkbox" style="margin:0 2px;" value="1" name="stock" id="hstock" class="saveState css-checkbox"><label for="hstock" class="css-label">In stock </label>'+
        ' <input type="checkbox" style="padding-left:5px;" value="1" name="has3d" id="has3d" class="css-checkbox"><label style="margin-left:8px;" for="has3d" class="css-label">Has 3D Model</label>'+
        ' <input type="checkbox" style="padding-left:5px;" value="1" name="newproducts" id="newproducts" class="css-checkbox"><label style="margin-left:8px;" for="newproducts" class="css-label" title="Added in the last 90 days.">New</label>'+
        // '<span id="resnum"></span>'+
        '<a id="advancedsearchlink" style="margin-left:20px; cursor:pointer;">search help</a>'+
        '<span id=quicklinks><a href="'+gIndexLink+'">Product Index</a> | '+
        '<a href="'+mydklink2+'">My Digi-Key</a> | '+
        '<a id="cartlink" href="http://www.digikey.'+theTLD+'/classic/Ordering/AddPart.aspx?"><i class="fa fa-shopping-cart fa-lg" style="color:red;"></i> Cart<span id=cartquant></span> <i class="fa fa-caret-down fa-lg" style="color:red;"></i></a> | '+
        // '<a href="'+sitemaplink+'">Site Map</a></span>'+
        '<div class="dropShadow" />'+
    '</div>';

    var keywordval = $('.psdkdirchanger').val();
    var stockval = $('#stock').prop('checked');
    var pbfreeval = $('#pbfree').prop('checked');
    var rohsval = $('#rohs').prop('checked');
    _log('stockval is'+ stockval+ ' checked status is '+ $('#stock').prop('checked'),DLOG);
    $('#content').after(customform);
    // $('.dkdirchanger2').val(keywordval).focus();
    $('.dkdirchanger2').val(keywordval);
    $('#stock').prop('checked', stockval);

    $('#content p.matching-records').show();
    $('.content-keywordSearch-form').detach();



    // console.log('>>>>>>>>>>>>>>>>>tld', theTLD, ' gIndexLink ', gIndexLink, ' mydklink2 ', mydklink2);
    // $('#content').wrap('<div class="mainFlexWrapper" style="position:relative; top:65px;"></div>');
    $('body').prepend('<div class="mainFlexWrapper" style="position:relative; top:65px;"></div>');
    $('.mainFlexWrapper').append($('#content'));
    $('.dk-url-shortener').css({position:'fixed', right: '130px', top:'28px','z-index':'30'}); //move url shortener


    tc(searchButtonHighlight, 'searchButtonHighlight');

    keywordSearchWizard()
    _log('addCustomHeader() End',DLOG);
	}catch(e){
		console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii',e);
		alert(e);
	}
}

function keywordSearchWizard(){
    var searchForm = '<div id="advancedsearchdiv" style="display:none; ">'+
        '<div>'+
            '<table class="advancedsearchtable">'+
                '<tbody>'+
                    '<tr>'+
                        '<td>Function</td>'+
                        '<td>Operator</td>'+
                        '<td>Usage</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>NOT</td>'+
                        '<td><span style="font-weight:bold; font-size:1.2em;">~</span> or <span style="font-weight:bold;">.not.</span> </td>'+
                        '<td> <span style="font-weight:bold;">mcu ~dip</span> (removes all instances of dip from results) <br> <span style="font-weight:bold;">mcu .not. dip</span></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>AND</td>'+
                        '<td><span style="font-weight:bold;">&lt;space&gt;</span> or <span style="font-weight:bold;">.and.</span> </td>'+
                        '<td> <span style="font-weight:bold;">mcu 32bit</span><br> <span style="font-weight:bold;">mcu .and. 32bit</span></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>OR</td>'+
                        '<td><span style="font-weight:bold;">|</span> or <span style="font-weight:bold;">.or.</span> </td>'+
                        '<td> <span style="font-weight:bold;">mcu atmel | mcu microchip</span><br> <span style="font-weight:bold;">mcu atmel .or. mcu microchip</span></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>"exact phrase"</td>'+
                        '<td><span style="font-weight:bold;">&quot; &quot;</span>'+
                        '<td> <span style="font-weight:bold;">&quot;DC DC&quot;</span></td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'+            
            '<table class="advancedsearchtable" style="margin-top:20px;">'+
                '<tbody>'+
                    '<tr>'+
                        '<td>Search Tips</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>All keywords are case insensitive and treated as substring matches (also known as wildcards).  '+
                        'The keyword <b style="color:red;">LED</b> will match control<b style="color:red;">led</b>,'+' O<b style="color:red;">LED</b> and LTC3458<b style="color:red;">LED</b>E#PBF </td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>It&#39s best to treat keyword searches as a guide to help find where product is hiding rather than expect ALL results to be spoonfed.'+
                        '  It&#39s often better to find the families of interest and then filter and browse the full contents of that family unless you are sure'+
                        ' there there is an exact keyword found in product listing pages. Using keywords with too much specificity may artificially limit results.</td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'+
        '</div>'+
    '</div>';
    $('#content').append(searchForm);

    $('#advancedsearchlink').click(function(){
        _log('advanced wizard opening', DLOG)
        $('#advancedsearchdiv').dialog({
                autoOpen: true,
                resizable: true,
                // draggable: false,
                height:600,
                width:800,
                modal: false,
                buttons: {
                    "Close": function() {
                        // $(this).css('color', 'lightgrey');
                        $( this ).dialog( "close" );
                    },
                }
            });
    })
}

function addControlWidget() {
    _log('addControlWidget() Start',DLOG);
    // setTimeout(function(){

    $('#content').after('<div id="controlDiv" class="gray-grad firstopen" style="display:none;" title="settings for advancedsearch v'+version+'">'+
            '<a href="'+downloadLink+'" class="button-small pure-button" style="float:right;"> click to manually update</a> ' +
            // '<button  id="closeControlDiv" class="clean-gray close">X</button>' +
            '<div class="settingscontainer" >'+
                '<img src="http://goo.gl/53qn5g">'+
                '<br><span style="font-weight:bold">Filter Results Page</span><br>'+
                '<input type=checkbox id=qtydefault class="saveState css-checkbox " value="1"><label class="css-label" for="qtydefault">Always initially sort by price @ Qty</label> <input type="text" id="qtydefaulttext" class="saveState css-checkbox" value="1" size="7" defval="1"><br>' +
                '<input type=checkbox id="combinePN" class="saveState css-checkbox " value="1"> <label class="css-label" for="combinePN">Combine Manufacturer PN, DK PN, and Manufacturer into one column to save horizontal space</label> (breaks hover headers in chrome)<br>' +
                '<input type=checkbox id=pricehoverControl class="saveState css-checkbox " value="1"><label class="css-label" for="pricehoverControl">Turn on price break popup on hovering over prices</label><br>' + 
                '<input type=checkbox id=queryHighlight class="saveState css-checkbox " value="1"><label class="css-label" for="queryHighlight">Turn on query term highlighting in on filter pages</label><br>' +   
                '<label>Explore Mode Popup Delay time <input type="text" id="exploreModeDelay" class="saveState" value="300" size="7" defval="300">ms</label><br>'+
                '<br><span style="font-weight:bold">Index/Keyword Results Page</span><br>'+
                '<label><input type=checkbox id=picPrevControl class="saveState css-checkbox " value="1"> <label class="css-label" for="picPrevControl">Turn on picture previews when hovering over Family links on the Index/Keyword Results page</label><br>' +
                '<label><input type=checkbox id=qfControl class="saveState css-checkbox " value="1"> <label class="css-label" for="qfControl">Turn on Quick Pick Box</label><br>' +
                '<label><input type=checkbox id=familyHighlight class="saveState css-checkbox " value="1"> <label class="css-label" for="familyHighlight">Turn on the bolding and text size increase of matched family names on index results page</label><br>' +
                '<label><input type=checkbox id=instantfilter class="saveState css-checkbox " value="1"><label class="css-label" for="instantfilter">Turn on the Product Index Instant Filter to immediately show matching search box keywords</label><br>' +
                '<br><span style="font-weight:bold">Experimental</span><br>'+
                '<input type=checkbox id=analytics class="saveState css-checkbox " value="0"> <label class="css-label" for="analytics">Help improve this script with analytics. These are used only by the creator of this script to help with the search experience. </label><br>' +
                '<input type=checkbox id=spellcheck class="saveState css-checkbox " value="0"> <label class="css-label" for="spellcheck">Turn on rudimentary spell check and suggested search terms</label><br>' +
                '<input type=checkbox id=stickyfilters class="saveState css-checkbox " value="0"><label class="css-label" for="stickyfilters">Turn on sticky filter selections on filter page to elminate the need for ctrl+click (known shift click bug)</label><br>' +
                '<input type=checkbox id=squishedFilters class="saveState css-checkbox " value="0"><label class="css-label" for="squishedFilters">Turn on expandemonium feature (squished multiselect filters) ...only a tech demo...</label><br>' +  
            '</div><br><br>'+
            '<button id=restoredefaults class="button-small pure-button" style="margin-left:20px"> restore defaults </button>'+
            '<br><br><div class="centerme">Have questions or comments? email my <b>gmail.com</b> account <br> <b>bombledmonk@</b></div>'+
        '</div>'
    );
    $('.settingscontainer .css-checkbox').css('z-index',2005);


    $('#content').after('<div id="controlSpan" class="pure-button"><i class="fa fa-cog"></i> settings v' + version + '</div>');
    _log('control dialog tick start ', DLOG);
            $('#controlDiv').dialog({
                autoOpen: false,
                resizable: false,
                // draggable: false,
                height:600,
                width:800,
                modal: true,
                buttons: {
                    "Apply & Refesh Page": function() {
                        $(this).css('color', 'lightgrey');
                        $( this ).dialog( "close" );
                        document.location.reload();
                    },
                    Cancel: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
    _log('control dialog tick end ', DLOG);

    $('#controlSpan').click(function(){
        $('#controlDiv').dialog('open');
        hoveringHelpHighlighter();

    });

    _log(encodeURIComponent(window.location), true);

    $('#applyControls').click(function(){
        $(this).css('color', 'lightgrey');
        document.location.reload();
    });

    $('#restoredefaults').click(function(){
        $(this).css('color', 'lightgrey');
        _log(Object.keys(localStorage));
        localStorage.clear();
        _log(Object.keys(localStorage));
    });
    
    $('#controlSpan').css({
        'position': 'fixed',
        'right': '10px',
        'top': '20px',
        'z-index': '19',
        'cursor':'pointer'
    });

    addControlWidgetActions2();
        // },1500);
    _log('addControlWidget() End',DLOG);
}

function hoveringHelpHighlighter(){
    _log('hoveringHelpHighlighter() Start',DLOG);
    // var hlarray = [
    // [$('#exploremodecheckbox').parent(), $('select[multiple]')],
    // [$('#qtydefault').parent(), $('select[multiple]')],
    // ];
    var zind = $('#headKeySearch').css('z-index');

    $('#picPrevControl, [for=picPrevControl]').hoverIntent({
        over: function(){$('.catfilterlink').addClass('zlevelhhl'); },
        out: function(){$('.catfilterlink').removeClass('zlevelhhl'); },
        interval: 2,
    }); 
    // $('#columnchooser>button').hoverIntent({
    //  over: function(){$('#content').addClass('cwhhl'); },
    //  out: function(){$('#content').removeClass('cwhhl'); },
    //  interval: 2,
    // });
    $('#instantfilter, [for=instantfilter], #spellcheck, [for=spellcheck]').hoverIntent({
        over: function(){$('#cHeader').addClass('zlevelhhl'); },
        out: function(){$('#cHeader').removeClass('zlevelhhl');},
        interval: 2,
    });     
    $('#qfControl').parent().hoverIntent({
        over: function(){$('#qpDiv').addClass('zlevelhhl');},
        out: function(){$('#qpDiv').removeClass('zlevelhhl');},
        interval: 2,
    }); 
    $('#combinePN, [for=combinePN]').hoverIntent({
        over: function(){$('.mfg-partnumber').addClass('zlevelhhl');},
        out: function(){ $('.mfg-partnumber').removeClass('zlevelhhl');},
        interval: 2,
    }); 
    $('#pricehoverControl, [for=pricehoverControl]').hoverIntent({
        over: function(){$('a:contains(.)').addClass('zlevelhhl');},
        out: function(){$('a:contains(.)').removeClass('zlevelhhl');},
        interval: 2,
    });
    $('#qtydefault, [for=qtydefault]').hoverIntent({
        over: function(){$('input[name=quantity]').addClass('zlevelhhl');},
        out: function(){$('input[name=quantity]').removeClass('zlevelhhl');},
        interval: 2,
    });
    $('#exploremodecheckbox, [for=exploremodecheckbox], #stickyfilters, [for=stickyfilters], #wrapFilters, [for=wrapFilters], #squishedFilters, [for=squishedFilters]').hoverIntent({
        over: function(){$('select[multiple]').addClass('explorehhl');},
        out: function(){$('select[multiple]').removeClass('explorehhl');},
        interval: 100,
    });
    _log('hoveringHelpHighlighter() End',DLOG);

}

function addControlWidgetActions2(){
    _log('addControlWidgetActions2() Start',DLOG);
    $('.saveState').each(function(){
        restoreInputState($(this));
    });

    if($('#qtydefault').is(':checked')){
        $('#mainform').find('input[name=ColumnSort]').val('100001');
        $('#mainform').find('input[name=qantity]').val($('#qtydefaulttext').val());
    }

    $('#exploreModeDelay').change(function() {  
        localStorage.setItem('exploreModeDelay', $('#exploreModeDelay').val());
    });
    $('#qtydefaulttext').change(function() {
        localStorage.setItem('qtydefaulttext', $('#qtydefaulttext').val());
        _log('quantity storage set to ' + localStorage.getItem('qtydefaulttext'));
        $('.engquan').val($('#qtydefaulttext').val());
        $('a.catfilterlink').each(function() {
            $(this).attr('href', $(this).attr('href').replace(/&ColumnSort=1000011&quantity=[\d]+/i, '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val()));
        });
        if (document.location.href.search('quantity')){
            document.location.href = document.location.href.replace(/quantity=\d+/i,'quantity='+$('#qtydefaulttext').val());
            $('#applyControls').off('click');
        }
    });

    $('#qtydefault').on('click',function() {
        if($(this).prop('checked') != 'checked') {
            localStorage.setItem($(this).attr('id'), 0);
            $('.engquan').attr('disabled', 'disabled');
            $('.colsort').attr('disabled', 'disabled');
        }
        if($(this).prop('checked') == 'checked') {
            $('.engquan').removeAttr('disabled');
            $('.colsort').removeAttr('disabled');
        }
    });
    _log('addControlWidgetActions2() End',DLOG);
}

function restoreInputState($singleFormElem){
    // _log('restoreInputState($singleFormElem) Start',DLOG);
    $singleFormElem.val(((localStorage.getItem($singleFormElem.attr('id'))) == null) ? $singleFormElem.val() : localStorage.getItem($singleFormElem.attr('id')));
    localStorage.setItem($singleFormElem.attr('id'), $singleFormElem.val());
    if($singleFormElem.attr('type') == 'text'){

    }
     else if($singleFormElem.attr('type') == 'checkbox'){
            $singleFormElem.prop('checked', parseInt($singleFormElem.val()));
    }

    $singleFormElem.change(function(){
        if($(this).attr('type') == 'checkbox'){
            $(this).val($(this).prop('checked') ? 1 : 0);
        }
        localStorage.setItem($(this).attr('id'), $(this).val());
        _log('[restoreInputState()] setting '+ $(this).attr('id') + ' from session storage to '+  localStorage.getItem($(this).attr('id')),DLOG);
    });
    // _log('restoreInputState($singleFormElem) Start',DLOG);
}

function styleCheckboxes(){
    _log('styleCheckboxes() Start',DLOG);

    $('.filters-group input[type=checkbox]').not('.css-checkbox').each(function(){
        $(this).parent().wrap('<div style="display:inline-block; margin-right:10px;" />');
        $(this).parent().attr('for',$(this).attr('id'));
        $(this).insertBefore($(this).parent());
    });
    $('.filters-group input[type=checkbox]').not('.css-checkbox').addClass('css-checkbox');
    

    $('.filters-group label[for]').not('.css-label').each(function(){
        $(this).html($(this).text());
    });
    $('.filters-group label[for]').not('.css-label').addClass('css-label');

    $('.filters-group').css({'padding-top':'3px'});
    _log('styleCheckboxes() End',DLOG);

}

function formatFilterResultsPage(){
    if ( $('#productTable').length){
        _log('formatFilterResultsPage() Start',DLOG);
        _log('[ready] number of results '+ parseInt($('.matching-records').text().split(':')[1].replace(/,/g,''),10),DLOG);
        //$('form').find('br').remove(); // remove <br> in forms to improve verticle space utilization.
        $('.quantity-form br').add('#mainform br').remove();
        $('p:contains("To get the most from")').remove();
        $('p:contains("Click RoHS icon next to part")').remove();
        $('p:contains("Your parts have been sorted")').remove();
        $('a.altpkglink').hide();
        $('input[type=reset]').attr('value', 'Clear All').css('margin-left','10px');

        $('#productTable').before('<div id="preProductTable"></div>');
        $('#preProductTable').append($('.results-per-page:first, .paging:first'));
        $('#preProductTable').append($('.download-table:first').css({'float':'','margin-left':'15px'}));

        //$('img[src="http://dkc3.digikey.com/us/images/datasheet.gif"]').attr('src','http://goo.gl/8S0j5');// adds transparent background to gif anonymous stats for this image are located here http://goo.gl/#analytics/goo.gl/8S0j5/all_time
        addMatchingRecordsToApply();
        // addExploreMode();
        addToTopButton();
        addImageBar();
        // highightSortArrow();
        floatApplyFilters();
        // fixAssociatedPartInFilterForm();
        //TODO fix dependencies of if statements below
        
        picsToAccel(); //add the thumnails to picture accelerator block
        if(localStorage.getItem('combinePN') == 1) {
            setTimeout(function(){combinePN();}, 1);
        }

        setTimeout(function(){addPartCompare();}, 150);
        if(localStorage.getItem('pricehoverControl') == 1) {
            setTimeout(function(){addPriceHover();}, 3000);
        }

        setTimeout(function(){addStickyHeader();}, 2500);  // wait for the page native javascript to load then reapply modified code

        formatQtyBox();
        addColumnHider();
        updateTableHeaders();
        addApplyFiltersButtonHighlight();
        wrapFilterTable(); //dependent on floatapplyfilters()

        addtrueFilterReset(); // dependent on wrapFilterTable() being in place
        addParamWizards();
        
        if(localStorage.getItem('squishedFilters') == 1){
            squishedFilters();
        }
        if(localStorage.getItem('stickyfilters') == 1){
            addStickyFilters();
        }

        fixImageHover();

        akamaiLazyLoadFixForFilterResults();

        $('input[value=Reset]').addClass('button-small pure-button').click(function(){
        // $('input[value=Reset]').addClass('minimal').css({'height':'18px', 'padding':'1px', 'margin':'0px'}).click(function(){
            // getRecordsMatching();
            addApplyFiltersButtonHighlight();
        });
        //setTimeout(function(){addDocRetrieve()}, 2500);
        $('#productTable').addClass('gray');

        $('input[value*="Download Table"]').addClass('button-small pure-button');//.css({'margin':'1px', 'padding':'2px'});
        $('input[name*="quantity"]').attr('size','9').attr('placeholder','set qty');
        
        // doHighlight($('#productTable').text(), $('input[name=k]:last').text());
        // var hlword = $('input[name=k]:last').val()
        // _log('!!!!!!11 '+ $('#headKeySearch').val().toString(), true);
        // wrapText(document.getElementById('productTable'), $('#headKeySearch').val().toString());
        
        if(localStorage.getItem('queryHighlight') == 1){
            if($('#headKeySearch').val().toString().trim() != ''){
                wrapText($('#productTable')[0], $('#headKeySearch').val().toString());  
            }
        } 

        addColumnMath();
        addGraphInterface();
        styleCheckboxes();
        // $('.ps-sortButtons').css('sortFocus');
        addVisualPicker();
        replaceStarDash();
        addMorePartsToTable();
        //addOpAmpWiz();

        _log('formatFilterResultsPage() End',DLOG);
    }
}

function addMorePartsToTable(){
    if($('.paging .digiGray').length > 0){ // if there are no pages to load don't add a button
        //add button
    	$('.paging:last').append('<button id="addmoreparts" class="button-small pure-button" style="margin-left:15px;">Show More Parts In Table</button>'+
            ' showing <span class="showingparts">'+$('#productTable tbody>tr').length+'</span> parts');

        //check if the paging is handled by javascript function
        if($('.Next:first').attr('href').indexOf('gotoPage') !== -1){ //if gotoPage is found
            
            var pageNumber = parseInt($('.Next:first').attr('href').split('(')[1]);
            _log('page pageNumber is '+ pageNumber, DLOG);
            $('#productTable:first').data('pagetoloadnext', pageNumber);

            $('#addmoreparts').on('click', function(){
                var method = window.eval('methodChooser(document.srform)')? 'POST':'GET'; // srform is the same as .quantity-form
                    
                $('.showingparts').append('<img class="loadingicon" style="margin-left:10px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
                $('.quantity-form input[name=page]').val($('#productTable:first').data('pagetoloadnext'));
                $.ajax({
                    method: method,
                    data: $('.quantity-form').serialize(),
                    url : $('.quantity-form').attr('action'),
                }).done(function(html){
                    var pTable;
                    if($('#combinePN').prop('checked')){
                        pTable = combinePNAfterLoad($(html).find('#productTable'));
                        pTable.find('tbody>tr').insertAfter($('#productTable:first tr:last'));
                    }else{
                        $(html).find('#productTable tbody>tr').insertAfter($('#productTable:first tr:last'));
                    }
                    if($(html).find('a.Next').length !== 0){
                        // console.log('a.next is ', $(html).find('a.Next').length , $(html).find('a.Next:first').attr('href'));
                        $('#productTable:first').data('pagetoloadnext', parseInt($(html).find('.Next:first').attr('href').split('(')[1]));
                        $('.showingparts').text($('#productTable tbody>tr').length);
                        
                    }else{
                        $('.showingparts').text($('#productTable tbody>tr').length);  
                        $('#addmoreparts').hide();
                    }
                });
            });
        }else{ // if gotoPage is not found

            $('#productTable:first').data('pagetoloadnext', $('.Next:first').attr('href'));
        	$('#addmoreparts').on('click', function(){

                // console.log($('#productTable:first').data('pagetoloadnext'));
                $('.showingparts').append('<img class="loadingicon" style="margin-left:10px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
                $.ajax({
                    method: "GET",
                    url : $('#productTable:first').data('pagetoloadnext')
                }).done(function(html){
                    var pTable = html;

                    if($('#combinePN').prop('checked')){
                        pTable = combinePNAfterLoad($(html).find('#productTable'));
                        // console.log(pTable.find('tbody>tr').html());
                        pTable.find('tbody>tr').insertAfter($('#productTable:first tr:last')); 
                    }else{
                        $(html).find('#productTable tbody>tr').insertAfter($('#productTable:first tr:last'));
                    }
                    // check for a.Next link on html page, set next page if exists otherwise hide button.
                    if($(html).find('a.Next').length !== 0){
                        // console.log('a.next is ', $(html).find('a.Next').length , $(html).find('a.Next:first').attr('href'));
                        $('#productTable:first').data('pagetoloadnext', ($(html).find('a.Next:first').attr('href')));
                        $('.showingparts').text($('#productTable tbody>tr').length);
                    }else{
                        $('.showingparts').text($('#productTable tbody>tr').length);  
                        $('#addmoreparts').hide();
                    }
                });
        	});
        }  
    }
}

function replaceStarDash(){
	$('select').each(function(){
		var thisSelect = $(this);
		$(this).find('option:lt(2)').each(function(){
			if($(this).text().trim() == '-'){
				$(this).text('- (N/A)');
				$(this).attr('title', 'Parameter not found in datasheet');
				thisSelect.append($(this));
			}
			thisSelect.append($(this).filter('[value=0]').text('*(TBD)').attr('title', 'Parameter To Be Completed Soon'));
		});
	});
}


// TODO add the ability to submit using form filters
function addVisualPicker(){
    _log('addVisualPicker() Start',DLOG);
    var dialogHeight = ($(window).height() * 0.8);
    var dialogWidth = ($(window).width() * 0.8);

    $('.selectboxdivclass>b').after('<i class="fa fa-picture-o pickericon fa-lg" title="Pick With Images" style="float:right; margin-left:3px; cursor:pointer;"></i>');
    $('#content').after(
        '<div id="visualpickerdiv" style="display:none;">'+
            '<div class="pickerbody" style="overflow-y:scroll; height:'+(dialogHeight-90)+'px;"></div>'+
            '<div class="pickerbuttondiv" style="height:30px">'+
            '<div class="moreadder" style="height:30px">'+
                '<span class=moreoptionsmessage /><button class="pure-button myRedButton addmoreoptions">Add More Lines</button>'+
                '<span class="pickerhelp1" style="margin-left:10px"><i style="cursor:pointer;" class="fa fa-question-circle fa-lg"></i></span>'+
            '</div>'+
                '<button class="pure-button done-with-filter" style="float:right; margin-right:20px;">Done</button>'+
                '<button class="pure-button submitPickerForm" style="float:right; margin-right:20px;">Apply</button>'+
                '<span class="pickerhelp2" style="float:right; margin-right:10px;"><i style="cursor:pointer;" class="fa fa-info-circle fa-lg"></i></span>'+
            '</div>'+
        '</div>');
    var p = $('.pickerbody');
    $('.pickerhelp1').tooltipster({
        content: $('<span> The Add More Lines button is exists to limit the number of calls to the server at one time in this experimental feature.</span>'),
        theme: 'tooltipster-shadow'
    });
    $('.pickerhelp2').tooltipster({
        content: $('<span>If you would like to see a more complete representation of example pictures for each filter option above, clear any other filters that may be selected. '+
                '(ex items in Manufacturer or Series).</span>'),
        theme: 'tooltipster-shadow'
    });

    $( "#visualpickerdiv" ).dialog( { 
        autoOpen: false,
        modal: true,
        height: ($(window).height() * 0.8),
        width: ($(window).width() * 0.8),
        close: function(){
            $('.moreadder').prependTo($('.pickerbuttondiv'));
            $('.pickerbody').empty('');
        }, 
    } );

    $('.pickericon').on('click', openVisualPicker );
    
    $('.addmoreoptions').on('click', addImagesToVisualPicker);

    $('#visualpickerdiv').on('click', '.pickerItem, .pickerItem input[type=checkbox]', pickerOptionClick);

    $('.done-with-filter').on('click', function(){
        $( "#visualpickerdiv" ).dialog('close');
    });
    $('.submitPickerForm').on('click', function(){
        $('#mainform').submit();
    });
    mediumImageHover();
    //add special case for manufacturer, pull logo?
    _log('addVisualPicker() End',DLOG);
}

function pickerOptionClick(){
        var p = $('.pickerbody');
        var $cb;
        var $pickerItem;
        if ($(this).hasClass('pickerItem')){
            $cb = $(this).find('input[type=checkbox]');
            $pickerItem = $(this);
            $cb.prop("checked", !$cb.prop("checked"));
        }else{
            $cb = $(this);
            $pickerItem = $(this).closest('.pickerItem');
        }
        $pickerItem.toggleClass('pickerItemSelected pickerItemNotSelected');
        var targetSelect = $('select[name="'+p.data('selectval')+'"]');
        // console.log('targetselect', targetSelect)
        p.find('input[type=checkbox]').each(function(){
            // console.log($pickerItem.prop('checked'), $pickerItem.val());
            targetSelect.find('[value="'+$(this).val()+'"]').prop('selected', $(this).prop('checked'));
        });
}

function openVisualPicker(){
        // _log('clicked on .pickeritem', true);
        var p = $('.pickerbody');
        var filtername = $(this).closest('.selectboxdivclass').find('b').text();
        p.data('selectval', $(this).parent().find('select').attr('name'));
        var $options = $(this).parent().find('select option');


        p.data('optioncount', $options.length);
        p.data('optionsvisible', 0);
        p.data('currentfilter', filtername);
        p.data('theoptions', $options);

        $( "#visualpickerdiv" ).dialog('open');
        $('.addmoreoptions').show();
        addImagesToVisualPicker();
}

function addImagesToVisualPicker(){
        var p = $('.pickerbody');
        var ovisible = p.data('optionsvisible');
        var ocount = p.data('optioncount');
        if(ovisible+5 < ocount){
        // console.log('clicked')
            getSubsetOfOptionImages(p.data('theoptions'), p.data('currentfilter'), ovisible, ovisible+5);
            $( ".moreoptionsmessage" ).text( 'Showing '+ (ovisible+5)+ ' of '+ ocount+ ' available filters Click to add more');
            $( "#visualpickerdiv" ).dialog('option', 'title', 'Filtering on ' + p.data('currentfilter') +' '+ (ovisible+5) + ' showing out of '+ ocount);
            $('.addmoreoptions').show();

        }else{

            getSubsetOfOptionImages(p.data('theoptions'), p.data('currentfilter'), ovisible, ovisible+(ocount-ovisible));
            $( ".moreoptionsmessage" ).text( 'Showing all '+ ocount+ ' of '+ ocount+ ' the available filters');
            $( "#visualpickerdiv" ).dialog('option', 'title', 'Filtering on ' + p.data('currentfilter') +' '+ ocount+ ' showing out of '+ ocount);
            $('.addmoreoptions').hide();
        }
        $('.moreadder').appendTo($('.pickerbody'));

}

function getSubsetOfOptionImages($options, filtername, first, last){
    $options.slice(first,last).each(function(){
        getSingleOptionImageSet($(this), filtername);
    });
    $('.pickerbody').data('optionsvisible', last);
}

function getSingleOptionImageSet($option, filtername){
    //special cases replace - and * with descriptive names
    //fix special case when it goes to detail page, should not need to worry about no search results found
    //add clear this filter button
    //add extra data on hover
    //give choice to see unrestricted examples of filters. 
    //add (no images available message)   

        var selectname = $option.parent().attr('name');
        var optionval = $option.val();
        $option.parent().attr('disabled', true);
        var serialform = $('#mainform').serialize();
        $option.parent().attr('disabled', false);

        var mylink = $('.seohtagbold').find('a:last').attr('href') + '&' +serialform + '&' +$option.parent().attr('name')+'='+$option.val();
        // console.log(mylink)
        // var mylink = $('.seohtagbold').find('a:last').attr('href') + '&pageSize=25&akamai-feo=off&' + $option.parent().attr('name')+'='+$option.val();
        var ddclass = 'store-'+optionval;
        if ($('.'+ddclass).length === 0){
            $('#content').after('<div  class="'+ddclass+'" />');
            var dd = $('.'+ddclass);

            $('.pickerbody').append('<div id="pickerid'+optionval+'" class="pickerItem pickerItemNotSelected" />');
            $('#pickerid'+optionval).append(
                '<div class="pickercheckboxholder" >'+
                    '<input type=checkbox value="'+optionval+'" class="css-checkbox" id="check'+optionval+'" style="z-index:2005;">'+
                    '<label class="css-label" for="check'+optionval+'"></label>'+
                '</div>'+
                '<div class="imageholder imgholder'+optionval+'">'+
                    '<div style="font-weight:bold; font-size:1.2em;">'+$option.text()+' (<span class="matchnum">loading</span>) </div>'+
                ' </div>'
            );

            dd.load(mylink+' #productTable,.image-table,img[src*=pna_en],.matching-records,#reportpartnumber', function(){
                var matching = (dd.find('.matching-records').length > 0 ) ? dd.find('.matching-records').text().split(':')[1].trim() : '1';
                var $images = dd.find('.pszoomer').addClass('pszoomervp').removeClass('pszoomer');

                // $('#pickerid'+optionval).append(
                //     '<div style="width:40px; display:flex; align-items:center;">'+
                //     '<input type=checkbox value="'+optionval+'" class="css-checkbox" id="check'+optionval+'" style="z-index:2005;">'+
                //     '<label class="css-label" for="check'+optionval+'"></label></div>'+
                //     '<div class="imgholder'+optionval+'">'+
                //         '<div style="font-weight:bold; font-size:1.2em;">'+$option.text()+' ('+matching+') </div>'+
                //     ' </div>'
                // );
                $('#pickerid'+optionval).find('.matchnum').text(matching);

                 $images.css({'height':'50px', 'width':'50px'});
                $('.imgholder'+optionval).append(deDuplicateCollection($images, 'src').slice(0,20));

                if($(this).find('.beablock-image').length == 1){
                    $(this).find('img').css({'height':'50px', 'width':'50px'}).appendTo($('.imgholder'+optionval)).addClass('pszoomervp');
                }

                dd.detach();
                presetSelections(selectname);
            });
        }
}

function presetSelections(selectname){
    //grabs he highlighted options from the main form and selects them in the visual picker body.
    $('select[name="'+selectname+'"] option:selected').each(function(){
        $('.pickerbody').find('input[value='+$(this).val()+']').prop('checked',true);
    });
    $('.pickerbody input:checked').closest('.pickerItem').addClass('pickerItemSelected').removeClass('pickerItemNotSelected');
}

function deDuplicateCollection($collection, attribute){
    //deduplicates a collection of  jquery objects based on an attribute
    _log('deDuplicateCollection() Start',DLOG);
    var found = {};
    return $collection.filter(function(){
        var $this = $(this);
        if(found[$this.attr(attribute)]){
           return false;   
        }
        else{
             found[$this.attr(attribute)] = true; 
             return true;  
        }
    });
    _log('deDuplicateCollection() End',DLOG);
    return $collection;  
}

function mediumImageHover(){
    //hover image for visual picker.
    _log('mediumImageHover() Start',DLOG);
    $('#content').after('<img style="display:none; height:300px" id="mzoomie"></img>');
    $('#mzoomie').css({
        'border':'0px solid white', 
        'box-shadow': '0 0 10px 5px #888',
        'position': 'absolute',
        'background': '#f5f5f5'
    });

    $('#visualpickerdiv').hoverIntent(
        function () {
            $('#mzoomie').attr('src','');

            //check if src is from a from a detail page or from a results page
            var src = ($(this).filter('[itemprop]').length == 1)? this.src : $(this).attr('zoomimg');  
            $('#mzoomie').attr('src', src);
            $('#mzoomie').show().position({
                'my': 'left top',
                'at': 'left bottom',
                'of': $(this),
                'collision':'flip',
                'offset': '0 0',
            }).hide().css('z-index', 2000).show();
        },
        function () {
            $('#mzoomie').hide();
        },
        '.pszoomervp'
    );
    _log('mediumImageHover() End',DLOG);
}


function addMatchingRecordsToApply(){
    _log('addMatchingRecordsToApply() Start',DLOG);
    $('.filters-buttons').append('<div class="matching-records" style="display:inline; margin-left:30px; position:relative;">'+$('.matching-records').text()+'</div>');
    //$(".matching-records:last").css({display:'inline', 'margin-left': '30px', postion:'relative'});
    _log('addMatchingRecordsToApply() End',DLOG);
}

function addColumnMath(){
    _log('addColumnMath() Start',DLOG);
    $('#preProductTable').append('<button id="doMath" style="margin:2px 5px;"class="button-small pure-button"><i class="fa fa-calculator"></i> Column Math</button>');
    setTimeout(addColumnMathDialog, 3000);
    $('#doMath').click(function(e){
        _log('ready to do math', true);
        $('#colMathDialog').dialog("open");
        e.preventDefault();
    });
    _log('addColumnMath() End',DLOG);
}

function addColumnMathDialog(){
    //TODO add units of precision in form
    //TODO add normalization checkbox
    _log('addColumnMathDialog() Start',DLOG);
    $('body').append(
        '<div id="colMathDialog" title="Column Math">'+
            '<form><select id="firstMathColumn"></select><br>'+
                '<select id="mathOperator">'+
                    '<option value="div">/</option>'+
                    '<option value="mul">*</option>'+
                    '<option value="add">+</option>'+
                    '<option value="sub">-</option>'+
                '</select><br>'+
                '<select id="secondMathColumn"></select><br><br>'+
                '<button id="doOperation">Go</button>'+
            '</form>'+
        '</div>');
    GM_addStyle('.ui-widget-overlay {opacity: .3 !important;}' );
    $('#doOperation').click(function(e){
        e.preventDefault();
        addMathCol();
        $('#colMathDialog').dialog('close');
    });
    $('#colMathDialog').dialog({
        'autoOpen':false,
        'open': openMathDialog,
        'close': closeMathDialog,
        'modal': true,
        'position': {'my':'bottom', 'at':'top', 'of':$('#productTable'), 'offset': '0px 0px'}
    });
    _log('addColumnMathDialog() End',DLOG);
}

function openMathDialog(){
    _log('openMathDialog() Start',DLOG);
    insertTableSelectValues('#firstMathColumn', '#secondMathColumn');
    $('#firstMathColumn, #secondMathColumn').on('mouseenter.math', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'), table tr th:nth-child('+colval+')').addClass('mathHighlight');
    });
    $('#firstMathColumn, #secondMathColumn').on('mouseleave.math', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'),table tr th:nth-child('+colval+')').removeClass('mathHighlight');
    });
    _log('openMathDialog() End',DLOG);
}

function closeMathDialog(){
    _log('closeMathDialog() Start',DLOG);
    $('#firstMathColumn').empty();
    $('#secondMathColumn').empty();
    _log('closeMathDialog() End',DLOG);
}

function insertTableSelectValues(firstSelector, secondSelector){
    _log('insertTableSelectValues() Start',DLOG);
    var skipClasses = ['.rd-compare-parts','.rd-datasheet','.image', '.mfg-partnumber', '.description','.series', '.packaging' ];
    $('#productTable>thead>tr:eq(0) th').each(function(ind){

        if (!$(this).is(skipClasses.join(','))){
            $(firstSelector).append('<option value='+ind+'>'+$(this).text()+'</option>');
            $(secondSelector).append('<option value='+ind+'>'+$(this).text()+'</option>');
        }
        if($(this).hasClass('unitprice')){ 
            $(firstSelector).find('option[value='+ind+']').prop('selected',true); // set default option to price
        }
    });
    _log('insertTableSelectValues() End',DLOG);
}

function addMathCol(){
    _log('addMathCol() Start', DLOG);
    var fcol = $('#firstMathColumn').val();
    var scol = $('#secondMathColumn').val();
    var ftitle = $('#productTable>thead>tr:eq(0) th').eq(+fcol).text();
    var stitle = $('#productTable>thead>tr:eq(0) th').eq(+scol).text();
    var funit = getNormalization(fcol);
    var sunit = getNormalization(scol);
    var operator = $('#mathOperator').val();
    // console.log('operator', operator);
    console.log('fcol', fcol, ' scol ', scol);
    console.log('funit', funit, ' sunit ', sunit);
    $('#productTable>thead>tr:eq(0)').find('th').eq(scol).after('<th>'+ftitle + operator + stitle +'</th>');
    $('#productTable>thead>tr:eq(1)').find('td').eq(scol).after('<td><div class="sortme">asc</div><div class="sortme">desc</div></td>');
    $('.sortme').click(sortStuff);
    // _log('fcol'+ fcol + ' scol ' + scol);
    $('#productTable>tbody>tr').each(function(ind){
        try{                
            // var firstnum = Qty.parse($(this).find('td').eq(fcol).text().split('@')[0]);
            // var secondnum = Qty.parse($(this).find('td').eq(scol).text().split('@')[0]);
            var firstNum = parseElemForQty($(this).find('td').eq(fcol));
            var secondNum = parseElemForQty($(this).find('td').eq(scol));
            var finalNum = null;
                //console.log('firstnum', firstNum, 'secondNum', secondNum, ' sntext ', $(this).find('td').eq(scol).text());
            
            if(firstNum !== null && secondNum !== null){
                firstNum = toUnit(firstNum, funit);
                secondNum = toUnit(secondNum, sunit);
                try{
                    if (operator == 'div'){
                        finalNum = firstNum.div(secondNum);
                    }
                    if(operator == 'mul'){
                        finalNum = firstNum.mul(secondNum);
                    }
                    if(operator == 'add'){
                        finalNum = firstNum.add(secondNum);
                    }
                    if(operator == 'sub'){
                        finalNum = firstNum.sub(secondNum);
                    }
                        finalNum = finalNum.toPrec(0.000001);
                }catch(err){
                    console.log(err, "not compatible with ", operator);
                    finalNum = 'NaN';
                } 
                $(this).find('td').eq(scol).after('<td class="mathcol">'+finalNum +'</td>');
            }
            else{
                console.log(firstNum, secondNum, ' changing finalNum to NaN');
                finalNum = 'NaN';
                $(this).find('td').eq(scol).after('<td class="mathcol">'+'NaN'+'</td>');
            }
            $(this).find('td').eq(+scol+1).data('qtyval',finalNum); 
        } catch(err){console.log('row', ind ,err);}
    });
    _log('addMathCol() End', DLOG);
}


function preProcessForQty($elem){
    var parsableText = '';

    if(typeof $elem === 'string'){ //taking care of the case where there is a need to pass in a string.
        parsableText = $elem;
        // console.log ( parsableText, 'parsabletext');
    }else {
        var etext = $elem.text();

        if($elem.hasClass('CLS 1')){
            //console.log('type = resistance');
            parsableText = etext + 'Ohm';
        }else if ($elem.hasClass('unitprice') || $elem.hasClass('priceme')){
            //console.log('type = price')
            parsableText = etext.split('@')[0] + ' USD';
        }else if ($elem.hasClass('CLS 2')){
            parsableText = etext.split(',')[0];
            if((etext.split(',').length > 2)){
                console.log('there may be more values in this cell than were handled');
            }
        }else if ($elem.hasClass('CLS 33')){
            // console.log('type = Capacity cls 33');
            if(etext.indexOf('Ah') != -1){
                parsableText = etext.replace('Ah', 'A h');
                // console.log('change to A h', parsableText);
            }else{ 
                parsableText = etext;
            }
        }else if (etext.indexOf('(') !== -1){
            parsableText = etext.split('(')[0];
            console.log('type with multiple units in ()');
        }else if ($elem.hasClass('qtyAvailable')){
            // this will have problems with European notation '5,4' vs '5.4'
            parsableText = etext.split('-')[0].replace(/,/g, '');
        }
        else{
            parsableText = etext;
            // console.log('general case', parsableText);
        }
    }
    return parsableText;
}

function parseElemForQty($elem){
    var elemText = preProcessForQty($elem);
    try{
        //console.log(elemText);
        var num = Qty.parse(elemText);
        if(num == null){ 
            console.log("can't parse ", elemText, elemText.length);
            return num;
        }else{ return num;}
    }catch(err){
        console.log('parseElemForQty Error', $elem.text() , err);
    }
}



function getNormalization(colNum){
    //goes through each row of the #productTable and finds the most common label for given column
    var unitarray = [];
    var indexrow;
    $('#productTable>tbody>tr').each(function(ind){
        try{
            indexrow = ind;
            //unitarray.push(Qty.parse($(this).find('td').eq(colNum).text().split('@')[0]).units());
            unitarray.push(parseElemForQty($(this).find('td').eq(colNum)).units());
        }
        catch(err){ 
            //console.log('normalization error on row ', indexrow , err);
        }
    });
   // console.log( unitarray);
   console.log('mode of unitarray ',mode(unitarray));
    return mode(unitarray);
}

function mode(array){
    //stack overflow
    if(array.length === 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function sortStuff(){
    var ind = $(this).parent().index();
    var direction = $(this).text();
    var rows = $('#productTable>tbody>tr').sort(function(a,b){
        var aval = $(a).find('td').eq(+ind).data('qtyval');
        var bval = $(b).find('td').eq(+ind).data('qtyval');
        if(aval == 'NaN' || bval == 'NaN') {
            return (aval=='NaN') ? 1 : 0;   
        }
        else{
            if(direction == "asc"){
                return aval.compareTo(bval);
            }else{ return (-1 * aval.compareTo(bval));}
        }
    });    
    $('#productTable>tbody').append(rows);
}

function highlightKeywords(){
}

function addGraphInterface(){
    _log('addGraphInterface() Start', DLOG);
    $('body').append('<div id=graphDialog></div>');
    setTimeout(function(){
        $('#graphDialog').dialog({
            'autoOpen':false,
            'open': openGraphDialog,
            'close': closeGraphDialog,
            'modal': true,
            'height': 550,
            'width': 900,
            'position': {'my':'bottom', 'at':'top', 'of':$('#productTable'), 'offset': '0px 0px'}
        });
    },3000);

    
    $('#preProductTable').append('<button id="buildChart" style="margin:2px 5px;"class="button-small pure-button"><i class="fa fa-line-chart"></i> Build Chart</button>');
    
    $('#graphDialog').append(
        '<form><select id="yGraphColumn"></select>'+
            '<span> vs. </span>'+
            '<select id="xGraphColumn"></select>'+
            '<button id="drawGraphButton">Go</button>'+
        '</form>'
    );

    $('#graphDialog').append('<div class="featureNotice">This is a test feature.  All data shown in chart is only from table below on the current page. To view maximum number of points change the number of Results per Page to 500 </div>');
    $('#drawGraphButton').on('click', function(e){
        e.preventDefault();
        console.log('graphcol1', $('#xGraphColumn').val(), 'graphcol2', $('#yGraphColumn').val());
        drawChart($('#xGraphColumn').val(), $('#yGraphColumn').val());

        //$('#graphDialog').dialog('close');
    });
    $('#buildChart').on('click', function(e){ 
        $('#graphDialog').dialog('open'); 
        e.preventDefault();
    });

    $('#graphDialog').append('<div class="graphErrorNotice"></div>');
    _log('addGraphInterface() End', DLOG);
}
    
function openGraphDialog(){
    $('.featureNotice').after('<div id=graphContainer style="width:800px;"></div>');
    insertTableSelectValues('#xGraphColumn', '#yGraphColumn');
    $('#xGraphColumn, #yGraphColumn').on('mouseenter.graph', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'), table tr th:nth-child('+colval+')').addClass('mathHighlight');
    });
    $('#xGraphColumn, #yGraphColumn').on('mouseleave.graph', 'option', function(){
        var colval = +$(this).val()+1;
        $('table tr td:nth-child('+colval+'),table tr th:nth-child('+colval+')').removeClass('mathHighlight');
    });

}
function closeGraphDialog(){
    $('#xGraphColumn').empty();
    $('#yGraphColumn').empty();
    $('#graphContainer').remove();
}

function getChartSeriesData(xcol, ycol, xunit, yunit){
    // TODO verify numerical inputs
    // TODO give option for non-numerical.... create dictionary, enumerate, then plot across each unique item

    var pt = $('#productTable');
    var data = [];
    var failedData = [];

    pt.find('tbody>tr').each(function(ind){
        var dp = getDataPoint(xcol,ycol, xunit, yunit, $(this));
        if (dp.usablePoint !== false){
            data.push(dp);
        }else{
            console.log('incomplete data for row', ind);
            failedData.push(dp);
        }
    });
    console.log(failedData);
    return {'validPoints':data, 'failedPoints': failedData};
}


function getDataPoint(xcol, ycol, xunit, yunit, $row){
    var xcell = $row.find('td').eq(xcol);
    var ycell = $row.find('td').eq(ycol);
    var x = parseElemForQty(xcell);
    var y = parseElemForQty(ycell);

    var retData;
    // if( x== undefined || y == undefined){console.log('x', x, 'y', y);}
    if (x !== null && y !== null){
        return {
            'name':$row.find('.mfg-partnumber a:first').text(),
            'dkname': $row.find('meta[itemprop=productID]').attr('content').replace('sku:',''),
            'x': toUnit(x, xunit).scalar,
            'y': toUnit(y, yunit).scalar,
            'usablePoint': true
        };

    }else{ 
        return {
            'name':$row.find('.mfg-partnumber a:first').text(),
            'usablePoint': false
        };
    }
}

function toUnit(q, unit){
    try{
        //console.log('q is', q, 'unit is ', unit);
        //console.log(Qty(q.format(unit).toString()));
        if (q != null){
            return Qty(q.format(unit).toString());
        }else{ return "NaN";}
    }catch(err){
        console.log('error converting ', err); return 'error Parsing';
    }
}

function drawChart(xcol, ycol){
    //TODO, give option to draw not log, vs log graphs
    //TODO always-on hover tooltip
    //TODO make each point clickable to new tab?
    var xname = $('#productTable').find('thead>tr:first th').eq(xcol).text();
    var yname = $('#productTable').find('thead>tr:first th').eq(ycol).text();
    var xunit = getNormalization(xcol);
    var yunit = getNormalization(ycol);
    var pointData = getChartSeriesData( xcol, ycol, xunit, yunit);

    $('#graphContainer').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: (yname + ' vs. ' + xname)
        },
        subtitle: {
            text: 'awesomeness'
        },
        yAxis: {
            title: {
                enabled: true,
                text: (yname +' '+getNormalization(ycol))
            },
            type: 'logarithmic',
            minorTickInterval: 10,
        },
        xAxis: {
            title: {
                text: (xname +' '+getNormalization(xcol))
            },
                        type: 'logarithmic',
            minorTickInterval: 1,
        },

        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.point.name}</b><br />',
                    pointFormat: '<br>{point.x}'+xunit+', {point.y}'+yunit
                }
            }
        },
        series: [{
            name: $('#famBreadCrumb').text(), //dependency identified
            color: 'rgba(223, 83, 83, .5)',
            data: pointData.validPoints,
            },]
    });
    

    $('.graphErrorNotice').text('There were '+ pointData.failedPoints.length +
        ' rows that were not included in this chart due to parsing errors.');
    console.log(pointData.failedPoints);

}

function formatQtyBox(){
    _log('formatQtyBox() Start',DLOG);
    var $srform = $('.quantity-form');
    $srform.find('label,input').appendTo($srform);
    $srform.wrap('<div id=srformdiv style="display:inline-block"/>');
    // $srform.wrap('<div id=srformdiv style="display:inline-block"/>');
    // $('.quantity-form').addClass('pure-form');
    // $srform.find('[name=quantity]').after('<input name="quantity" type="search" maxlength=9>').detach();
    $srform.find('[type=submit]:first').val('See Price @ qty');
    $srform.find('[type=submit]:last').val('x');
    $srform.find('.quantity-title').hide();
    // // $srform.css({'position':'relative', 'left': ($('.qtyAvailable:first').position().left-50)+'px'});
    // $('.quantity-form').css({
    //     'padding-left':'3px',
    //     'position':'relative', 
    //     'left': ($('.qtyAvailable:first').position().left-19)+'px',
    //     'top': '5px'
    //     });// hack to fix position
    // $('th.qtyAvailable, th.unitprice, th.minQty').css({'background':'#ddd'});

    // $srform.css({'margin-right': '10px', 'background':'#ddd'});

    //$srform.children().addBack().css({'display':'inline'});
    $srform.attr('title', $srform.find('p').text());
    $('#productTable').before($('#srformdiv'));
    $srform.find('p').detach();    // hide descriptive paragraph
    // _log('formatQtyBox() tick1',DLOG);
    $('p:contains("To see real-time pricing")').detach();   //hide the "To see reel-time pricing" paragraph
    $('#preProductTable').append($srform);
    _log('formatQtyBox() End',DLOG);
}

function fixImageHover(){
    _log('fixImageHover() Start',DLOG);
    $('.pszoomie').css({
        'border':'0px solid white', 
        'box-shadow': '0 0 10px 5px #888'
    });

    window.eval("$('.pszoomer').unbind('mouseenter mouseleave');");

    $('#productTable').hoverIntent(
        function () {
            var d = Math.min(640, 0.8 * Math.min($(window).width(), $(window).height()));
            $('#pszoomie').attr('src','');
            $('#pszoomie')
            .attr('src', $(this).attr('zoomimg'))
            .css('height', d)
            .css('width', d)
            .css('left', ($(window).width() - d) / 2)
            .css('top', ($(window).height() - d) / 2)
            .fadeIn(300);
        },
        function () {
            $('.pszoomie')
            .fadeOut(100);
        },
        '.pszoomer'
    );
    _log('fixImageHover() End',DLOG);
}

// function fixAssociatedPartsForIndexResultsPage(){
//     _log('fixAssociatedPartsForIndexResultsPage() Start',DLOG);
//     if($('.catfilterlink:first').attr('href').indexOf('part=') != -1){
//         $('.catfilterlink').each(function(){
//             var fullhref = $(this).attr('href');
//             var queryarray = fullhref.split('?')[1].split('&');
//             var baseurl = fullhref.split('?')[0].split('/');
//             var catfamnumber = baseurl.pop();
//             var currentitem = $(this);

//             currentitem.wrap('<form action="/scripts/dksearch/dksus.dll" method="post" />');
//             currentitem.after('<input type=hidden value="'+catfamnumber+'" name="cat" >');

//             queryarray.forEach(function(attr){
//                 if (attr.indexOf('=') != -1){
//                     currentitem.after('<input type=hidden value="'+attr.split('=')[1]+'" name="'+attr.split('=')[0]+'" >');
//                     currentitem.attr('href',"#");
//                     currentitem.click(function(){$(this).closest('form').submit();});
//                 }                
//             });
//         });
//     }
//     _log('fixAssociatedPartsForIndexResultsPage() End',DLOG);
// }

// function fixAssociatedPartInFilterForm(){
//     _log('fixAssociatedPartInFilterForm() End',DLOG);
//     var fullquerystring = window.location.search;
//     if(fullquerystring.indexOf('&') != -1){
//         var queryarray = fullquerystring.split('&');
//         var parts = queryarray.filter(function(part){
//              if(part.indexOf('part=') != -1){
//                 return true;
//              }else{return false;}
//         });
//         if (parts.length > 0){
//             parts = parts.map(function(part){
//                 return part.split('=')[1];
//             }); 
//             parts.forEach(function(part){
//                 $('#mainform').append('<input type="hidden" name="part" value="'+part+'">');
//             });
//         }
//         // _log('fullquerystring is ' + fullquerystring , true);
//     }
//     else if($('#earlPH').length){
//         var parts = $('#earlPH').val().split('&').filter(function(part){
//              if(part.indexOf('part=') != -1){
//                 return true;
//              }else{return false;}
//         });
//         if (parts.length > 0){
//             parts = parts.map(function(part){
//                 return part.split('=')[1];
//             }); 
//             parts.forEach(function(part){
//                 $('#mainform').append('<input type="hidden" name="part" value="'+part+'">');
//                 $('#mainform').attr('action', "/scripts/dksearch/dksus.dll");
//             });
//         }
//     }
//     _log('fixAssociatedPartInFilterForm() End',DLOG);
// }

function floatApplyFilters(){
    $('.filters-buttons').wrapAll('<div id=floatApply>');
    
    $(window).scroll(function(){
        $('.filters-buttons').children().css('left', $(window).scrollLeft() );
    });
    addSearchWithin();
    $('.filters-buttons').children().css('position', 'relative');
}

function addSearchWithin(){
    // dependancy on floatApplyFilters #floatApply div
    $('.filters-group').prepend('<label>Keyword Filters: <input type="text" name="k" style="margin-right:20px; padding-left:5px;" class="searchWithin" title="Provides a way to change your Keyword search while applying"></label>');
    $('.filters-group').css({padding:'0 0 3px 4px'});
    $('.searchWithin').val($('.dkdirchanger2').val());
}

function addFilterHider(){
}

function addtrueFilterReset(){
    // s = 3FFB = 16379,    v= 3FFF = 16383
    _log('addtrueFilterReset() Start',DLOG);
        var fv = $('#mainform').find('input[name=FV]').length ? $('#mainform').find('input[name=FV]').val() : '0' ;
    if (fv.split(',').length > 2){  
        var famlink = getFamilyLink().split('?')[0];
        $('#mainform').prepend('<div id=filterResetDiv class=gray-grad2 style="padding:5px 5px; width:auto;">'+
                '<span><b>Applied Filters: <b> </span>'+
                '<div id="tempdiv" style="display:none; postion:fixed;"></div>'+
                '<a id="startOverInFam" style="float:right" href='+famlink+'>Start Over in: '+$('.seohtagbold a:last').text()+'</a>'+
            '</div>');
        // _log('')
        setTimeout(function(){
            if (sessionStorage.getItem(famlink) == null){
                $('#tempdiv').load(famlink+' form[name=attform]', function(){
                    sessionStorage.setItem(famlink, htmlEscape($('#tempdiv').html()));
                    trueFilterCallback();
                    $('#tempdiv').empty();
                    _log('addtrueFilterReset() tagsnew',1);
                });
            }
            else {
                $('#tempdiv').append(htmlUnescape(sessionStorage.getItem(famlink)));
                    trueFilterCallback();
                    //_log('addtrueFilterReset() tagstored ' + $('#tempdiv').text(),1);
                    $('#tempdiv').delay(3000).empty();
                    _log('addtrueFilterReset() tagstored',1);
            }
        },200); 
    }
    _log('addtrueFilterReset() End',DLOG);
}

function trueFilterCallback(){
    _log('trueFilterCallback() Start',DLOG);
    var FVarray = $('#mainform').find('input[name=FV]:last').val().split(',');
    var masterResetArray = []; // [[name, pv],[],...]
    var x,y,pvnum,shiftedFV;
    $('#tempdiv').find('select').each(function(ind){
        masterResetArray.push([$(this).closest('table').find('th').eq(ind).text(),$(this).attr('name')]);
    });
    
    _log('masterResetArray ' + masterResetArray+'\n FVval ' +FVarray);
    for ( y=0; y < masterResetArray.length; y++){
        for(x=0; x < FVarray.length; x++){
            pvnum = parseInt(masterResetArray[y][1].replace('pv', '').replace('s','16379').replace('v','16383'), 10);
            shiftedFV = parseInt(FVarray[x],16)>>>18;
            // _log(FVarray[x] +' parsint>>18 ' +shiftedFV +'  '+ pvnum, DLOG);
            if(parseInt(FVarray[x],16)>>>18 == pvnum){
                // _log(FVarray[x] +' parsint>>18 ' +shiftedFV +'  '+ pvnum, DLOG);
                $('#filterResetDiv').append('<span class="trueReset trueResetButton" data-pvnum='+pvnum+' title="Click to Remove this Filter">'+ masterResetArray[y][0]+
                    ' <i class="fa fa-remove ired"></i></span>');
                console.log('pvnum', pvnum);
                    //                 $('#filterResetDiv').append('<span class="trueReset">'+ masterResetArray[y][0]+
                    // ' </span><button class="trueResetButton minimal" style="margin-right:20px" value="'+
                    // pvnum+'"">x</button> ');
                break;
            }
        }
    }

    $('.trueReset').click(function(){
        var x=0;
        var temparr=[];
        for(x=0; x< FVarray.length; x++){
            _log('datapvnum '+(parseInt(FVarray[x],16)>>>18) + ' '+ parseInt($(this).attr('data-pvnum'),10));
            if( (parseInt(FVarray[x],16)>>>18) != parseInt($(this).attr('data-pvnum'), 10) ){
                temparr.push(FVarray[x]);
            }
        }
        _log($('#mainform input[name=FV]').val());
        $('#mainform input[name=FV]').val(temparr.join(','));
        _log($('#mainform input[name=FV]').val());
        $('#mainform').submit();        
        // var x=0;
        // var temparr=[];
        // for(x=0; x< FVarray.length; x++){
        //     _log((parseInt(FVarray[x],16)>>>18) + ' '+ parseInt($(this).val(), 10));
        //     if( (parseInt(FVarray[x],16)>>>18) != parseInt($(this).val(), 10) ){
        //         temparr.push(FVarray[x]);
        //     }
        // }
        // _log($('#mainform input[name=FV]').val());
        // $('#mainform input[name=FV]').val(temparr.join(','));
        // _log($('#mainform input[name=FV]').val());
        // $('#mainform').submit();

    });
    _log('trueFilterCallback() End',DLOG);
}


function getParamList(){
    //TODO finish
    var myobject;

    if (localStorage.getItem(getFamilyLink()) == undefined){
        $('#filterResetDiv').load(getFamilyLink().replace('stock=1','stock=0')+' form[name=attform]', function(){
            myobject = {
                'lastupdate' : Date.getTime(),
                'selectlist' : $('#filterResetDiv').find('select')
            };
            return myobject.selectlist;
        });
    }
    else if (myobject.lastupdate+604800000 <= Date.getTime()) {

    }
    else {
        myobject = localStorage.getItem(getFamilyLink());
    }
    //return somearray
}

function wrapFilterClickFunc(somespan, buttonval){
    if(buttonval == 0){
        $('#selectboxdiv').addClass('wsnowrap').removeClass('morefilters lessfilters');
        $('#morefiltersbutton').hide();
    }
    else if( buttonval == 1){
        $('#selectboxdiv').removeClass('wsnowrap').addClass('morefilters');
        $('#morefiltersbutton').show();
    }
}


function wrapFilterTable(){
    _log('wrapFilterTable() Start',DLOG);
    //button code
    $('#mainform').wrap('<div id=mainformdiv />');

    var thehtml = '<div id="wrapfilterschooser" class="tabbedbutton" style="display:inline-block;" title="Instead of scrolling horizontally the filters will wrap to the next line"><div>'+
        '<input id="wrapFilters" value="0" class="saveState" type="hidden">' +
        '<button id=wrapfilteron value=0 class="pure-button">Off</button>'+
        '<button id=wrapfilteroff value=1 class="pure-button">On</button>'+
        ' Wrap Filters'+
    '</div></div><div class="dummydiv"></div>'; //remove dummydiv from here if explore mode comes back.
    var originalSelects = $('.filters-panel').find('form[name=attform] select');
    _log('wrapFilterTable width calc',DLOG);
    originalSelects.each(function(){
        $(this).data('limitwidth', ($(this).width()+25));
    });
    _log('wrapFilterTable width calc',DLOG);

    $('.filters-panel').prepend(thehtml);   
    addChooserButtonAction($('.filters-panel').find('#wrapfilterschooser'), wrapFilterClickFunc);
    var $filtersPanel = $('.filters-panel');
    // var $filtersPanel = $('.filters-panel').detach();
    var $mainform = $filtersPanel.find('form[name=attform]');
    $mainform.find('table').hide();
    //end button code

    var selectlist = $mainform.find('select');
    selectlist.each(function(ind){
        $(this).data('pname', $(this).closest('table').find('th:eq('+ind+')').text());
        // _log('pv '+ $(this).attr('name') + ' columnname ' + 
        //      $(this).closest('table').find('th:eq('+ind+')').text()
            // );
        });
    $mainform.prepend('<div id=selectboxdiv class="morefilters" />');
    
    $(selectlist.get().reverse()).each(function(){
        var $thisSelect = $(this);
        
        $mainform.find('#selectboxdiv').prepend(
            '<div class="selectboxdivclass" style="max-width:'+ $thisSelect.data('limitwidth')+'px;"><b>'+ // this line forces the select header to wrap
                $thisSelect.data('pname')+'</b><br>'+$thisSelect.parent().html()+
            '<br><a name="'+$thisSelect.attr('name')+'" class="clearselect" style="display:none; " href="#">clear</a></div>'
        );
        // if($(this).find('option').filter(':selected').length == 1){
        //     $(this).find('.clearselect').css({visibility:'visible'});
        // }
    });
    $filtersPanel.on('click','.clearselect', function(e){
        e.preventDefault();
        $filtersPanel.find('select[name="'+$(this).attr('name')+'"]').find('option').each(function(){
            $(this).prop('selected',$(this).prop('defaultSelected'));
        });
        addApplyFiltersButtonHighlight();
    });
    // $('.seohtagbold:first').after($filtersPanel);  //part of a possible speedup detach, do stuff and reattach?  probably no benefit
    $('#mainform').on('mouseup', 'option', function(){
        
        if($(this).parent().find('option').filter(':selected').length >=1){
            $(this).closest('div').find('.clearselect').show();
        }else{
            $(this).closest('div').find('.clearselect').hide();
        }
    });
    
    $('#mainformdiv table').detach(); //use this instead of empty or remove to maintain speed

    $('.filters-group').append(
        '<div id="morefiltersbutton" class="cupid-green" style="float:right; width:200px; padding:2px; height:10px; cursor:pointer; margin-left:3px;">'+
        
        '<span style="position:relative; top:-2px;"> + see all '+$('#mainformdiv div>select').length+' filters + </span><span style="display:none; position:relative; top:-2px;"> - see fewer filters - </span>'+
        '</div>'+
        '<div style="float:right;">'+
            '<input style="float:right" type="checkbox" class="css-checkbox" value="1" name="filterAlwaysExpand" id="filterAlwaysExpand">'+
            '<label class="css-label" for="filterAlwaysExpand">Always Expand</label>'+
        '</div>'
    );
    //test area

    // end test area

    restoreInputState($('#filterAlwaysExpand'));
    if($('#filterAlwaysExpand').val() == 1){
        _log('filterAlwaysExpand ' + $('#filterAlwaysExpand').val(), true);
        $('#selectboxdiv').toggleClass('morefilters lessfilters');
        $('#morefiltersbutton span').toggle();
    }
    $('#morefiltersbutton').click(function(){
        //$('#mainformdiv').animate({'height': '100%'},200);
        $('#selectboxdiv').toggleClass('morefilters lessfilters');
        $('#morefiltersbutton>span').toggle();
        _log('finished morefiltersbutton click func', true);
    });

    if($('#wrapFilters').val() == 0){

        $('#selectboxdiv').removeClass('morefilters lessfilters');
        $('#morefiltersbutton').hide();
        $('#selectboxdiv').addClass('wsnowrap');
    }else{
        //$('#selectboxdiv').removeClass('morefilters lessfilters');
    }

    setupAttForm();
    // setTimeout(function(){location.assign("javascript:setupAttForm();void(0)")},8000);
    // location.assign("javascript: $('content').empty(); void(0);");
    _log('wrapFilterTable() End',DLOG);
}

function setupAttForm() {
	//ripped right from digikey
    var f = $('[name="attform"]');
    var summaryUrl='/product-search/summary/en';
    f.contextId = 0;
    f.updateEnabled = true;
    f.oldRecordCount = $('.matching-records').html();
    f.resetRecordCount = function () { $('.matching-records').html(f.oldRecordCount); f.find(":submit").each(function () { this.disabled = false; }); };
    f.updateRecordCount = function () {
        if (this.updateEnabled) {
            this.contextId++;
            $.ajax({
                type: 'POST',
                url: summaryUrl,
                data: $(this).serialize() + "&contextId=" + this.contextId,
                timeout: 3000,
                success: function (data, status) { if (data.contextId == f.contextId) $('.matching-records').html(data.msg); f.find(":submit").each(function(){this.disabled = !data.nMatches;}); },
                error: function () { f.resetRecordCount(); f.updateEnabled = false; }
            });
        }
    };
    f.bind('reset', function () { f.resetRecordCount(); });
    f.find('input:not(:reset)').click(function () { f.updateRecordCount(); });
    //f.find('select').change(function () { f.updateRecordCount(); });
    f.find('select').each(function () { this.onchange = function () { f.updateRecordCount(); }; });
    f.updateRecordCount();
}

function squishedFilters(){
    // hover animation in advancedsearch.css
    var $selects = $('#mainform').find('select');
    $selects.addClass('fullwidth');
    $selects.parent().addClass('fullwidth');
}

// function enableDefaultQty(){
//     _log('enableDefaultQty() Start',DLOG);
//     if(localStorage.getItem('qtydefault') == 1) {
//         if($('a.catfilterlink').length) {
//             //setTimeout(function(){
//                 addQuantityToCatFilterLinks();
//                 //},5);
//         }
//         $('.engquan').removeAttr('disabled');
//         $('.colsort').removeAttr('disabled');
//         $('.engquan').val($('#qtydefaulttext').val());
//     }
//     _log('enableDefaultQty() End',DLOG);
// }

function formatIndexResultsPage(){
    if($('.catfilterlink').length){
        _log('formatIndexResultsPage() Start',DLOG);
        $('body').addClass('indexPage');
        addIndexPicPrev();
        if(localStorage.getItem('qfControl') == 1) {
            // addQuickFilter3();
        }
        $('h1:contains(Electronic)').detach();
        //fixAssProdFamilyLinks();
        if(localStorage.getItem('instantfilter') == 1){
            // console.log('instant filter loaded');
            indexInstantFilter3();
        }

        
        // fixAssociatedPartsForIndexResultsPage();

        var productTree = storeProductIndexTree();
        var topResultsData = getTopResultsData();
        newProductIndexDiv(productTree);
        addSideIndex(productTree);
        handleTopResults3(topResultsData);
        addFullResultsTitle();
        addProductIndexThumbs();//dependent on fullresults title and newproductindexdiv

        addIndexColumnizerControls();
        addCategorySprites2();

        addToTopButton();
        addLearnMore();
        $('#content').css({'margin':'0px','padding':'0px 10px 10px 10px'});// for the sidebar separator
        // setTimeout(function(){$('#headKeySearch').focus();}, 50);  //for some reason it looks like this takes 100ms+ to execute .focus

        _log('formatIndexResultsPage() End',DLOG);
    }
}

function addLearnMore(){
	var learnMoreCatList = [
		{
            'category': 'Capacitors',
            'link': 'https://eewiki.net/display/Motley/Capacitors',
            'text': 'Learn More About Capacitors'
        },
        {
            'category': 'Programmers, Development Systems',
            'link': 'http://www.digikey.com/en/resources/development-tools',
            'text': 'Development Tools Selector Guide'
        },        
        {
			'category': ' Discrete Semiconductor Products ',
			'link': 'https://www.eewiki.net/pages/viewpage.action?pageId=49414403',
			'text': 'Learn More About FETs'
		},
	];

	var learnMoreFamList = [
		{
			"family": "Aluminum Capacitors",
			"famid": "''"
		}
	];
	learnMoreCatList.forEach(function(el, idx, arr){
		$('#'+selectorEscape(el.category)).find('.piThumbIcons').before('<a style=" margin-right:20px; margin-left:auto; font-size:14px; color:red;" target="_blank" href="'+el.link+'">'+el.text+'</a>');
	});
}

function addSideIndex(productTree){
    _log('addSideIndex() Start',DLOG);
    // $('#content').wrap('<div class="mainFlexWrapper" style="position:relative; top:70px;"/>');
    $('.mainFlexWrapper').prepend('<div class="sideIndex"><div class="sideIndexContent"><div class="sideIndexTitle"><a href="'+gIndexLink+'">Index</a> <a href="#content" style="margin-left:auto; margin-right: 4px;">top</a></div></div></div>');
    var sidetext = '';
    productTree.forEach(function(item){
        //$('.sideIndexContent').append(
            sidetext = sidetext + '<li style="display:flex; align-items:center;"><a href="#'+selectorEscape(item.category)+'">'+item.category+'</a></li>';
        //);
    });
    $('.sideIndexContent').append(sidetext);
    // $('.sideIndex').css('width',($('.sideIndexContent').width()+50)+'px'); //needs to be there for chrome when using display:flex
    $('.sideIndex').css('width',(300)+'px'); //needs to be there for chrome when using display:flex
    // alert($('.sideIndexContent').width());
    $('.sideIndexContent').addClass('fixedsticky').css('top','55px').fixedsticky();
    // $('.sideIndexContent').addClass('fixedsticky').css('top','50px');
    // $('#footer').addClass('fixedsticky').fixedsticky();

    //addCategorySprites2();

    $('.sideIndexContent a').click(smoothScrollToCat);
    _log('addSideIndex() End',DLOG);
}

function smoothScrollToCat(e){
    e.preventDefault();
    var destinationHref = $(this).attr('href');
    var dpos = $(destinationHref).position().top;
    var clickedon = $(e.target);
    // clickedon.remove();
    // $('.catfilteritem').not($(destinationHref).closest('.catfilteritem')).fadeTo('fast', .5);
    $('.sideIndexContent a').css({'background': ''});
    setTimeout(function(){clickedon.css({'background':'#ddd'});}, 1);
    $('html,body').animate(
        {scrollTop: dpos-0},
        {       
        duration: 250,
        easing: 'swing', 
        complete: function(){
            //hack to get around the complete function firing early and getting stomped on by the scroll event
            // $(destinationHref).closest('.catfilteritem').fadeTo(0,1);
            // $('.catfilteritem').not($(destinationHref).closest('.catfilteritem')).fadeTo('slow', 1)
            clickedon.css({'background':'#ddd'});
            // setTimeout(function(){clickedon.css({'background':'#ddd'});}, 1);
        }   
    });
    $('.catfilteritem h2').removeClass('highlightCat');
    //get the parent catfilteritem and set highlight background
    $(destinationHref).closest('h2').addClass('highlightCat');

    // $(destinationHref).closest('.catTitle').animate({'background-color': 'red'}, 3000);
}

function addFullResultsTitle(){
    _log('addFullResultsTitle() Start',DLOG);

    //add Full Results title bar to separate top results from full results. Use keyword in title if available.
    var keyword = $("#headKeySearch").val();
    if(keyword !=''){
        $('#productIndexDiv').before(
            // '<div id="fullResultsTitle" style="width:100%; border: 1px solid #ccc; background:#eee; padding:3px; margin:3px 20px 3px 0px;">'+
            '<div id="fullResultsTitle" class="" style="display:flex;  background:#888; height:25; padding:5px; margin:8px 0px 10px 0px; color:white;">'+
            '<div style="display:flex; font-weight:bold; font-size:15px;">Full Results for <span style="font-size:15px; font-weight:bold; font-style:italic;">&nbsp'+keyword+'</span></div>'+
            '</div>'
        );  
    }else{

        $('#productIndexDiv').before(
            // '<div id="fullResultsTitle" style="width:100%; border: 1px solid #ccc; background:#eee; padding:3px; margin:3px 20px 3px 0px;">'+
            '<div id="fullResultsTitle" class="" style="display:flex;  background:#888; height:25; padding:5px; margin:0px 0px 10px 0px; color:white;">'+
            '<div style="display:flex; font-weight:bold; font-size:15px;">Full Results</div>'+
            '</div>'
        );
    }
        $('#fullResultsTitle').append($('.matching-records').css({'margin':'auto auto',}));
    _log('addFullResultsTitle() End',DLOG);

}

function handleTopResults3(trdata){
    _log('handleTopResults3() Start',DLOG);
    var keyword = $("#headKeySearch").val();
    if(keyword !="" && $('#quickPicksDisplay').length > 0){
        var resultList = $('#quickPicksDisplay li');
        // console.log(resultList);
        $('#quickPicksDisplay').remove();

        var topResultsHTML = '<div id="topResultsContainer" class="box effect1">'+
            '<div class="topResultsTitle"><i class="fa fa-arrow"></i>Top Families for <span style="font-size:15px; font-style:italic;">&nbsp'+keyword+'</span></div>'+
            '<div class="topResultsBody" ></div>'+
        '</div>';

        $('#content').prepend(topResultsHTML);
        
        $('.topResultsBody').append( '<table id="topResultsTable"><tbody><tr style="font-weight:bold;"><td>Family</td><td>Category</td></tr></tbody></table>');
        var rows = '';
        var trt = $('#topResultsTable tbody');
        var regExp = /\(([^)]+)\)/;
        trdata.forEach(function(elem){
            trt.append('<tr><td></td><td></td></tr>');
            trt.find('tr:last td:first').append(elem.famLink);
            trt.find('tr:last td:first').append( ' ('+ elem.count + ') ');
            trt.find('tr:last td:last').append('<a class="catjumpto" href="#'+selectorEscape(elem.cat)+'">'+elem.cat+'</a>');
        });

        $('.catjumpto').click(smoothScrollToCat);
        // $('head').append('<style></style>');

        $('#topResultsContainer a').css("textDecoration", "none");
    }
    _log('handleTopResults3() End',DLOG);
}

function getTopResultsData(){
    _log('getTopResultsData() Start',DLOG);
    var trdata =[];
    var resultList = $('#quickPicksDisplay li');
    var itemsRE = /\(\d+\sitems\)/;
    var itemsREnot = /^(\(\d+\sitems\)).+/;
    resultList.each(function() {
        var famLink = $(this).find('a');
        var cat = $(this).contents().filter(function() {return this.nodeType == 3;}).text().replace(itemsRE, '').trim();
        var count = itemsRE.exec($(this).contents().text()).toString().replace(/\(|\)|\sitems/g, '');

        trdata.push ({
            'famLink':famLink,
            'cat': cat,
            'count': count
        });
    });
    _log('getTopResultsData() end',DLOG);
    return trdata;
}

function getTopResultsCategories(trdata){
    //collects all the categories represented in the Top Results box
    var array = [];
    trdata.forEach( function(item) {
        array.push(selectorEscape(item.cat));
    });
    return uniqueArray(array).reverse();
}

function storeProductIndexTree(){
    _log('storeProductIndexTree() Start',DLOG);

    var container = [];
    var quantitytest = (localStorage.getItem('qtydefault') == 1)? 1 : 0;
 
        $('#productIndexList>li').each(function(){
            var oneCategory = $(this);
            var familyTree = [];
            oneCategory.find('.catfiltersub>li').each(function(){
                familyTree.push(getFamilyItemFromListElem(this, quantitytest)); 
            });
            // console.log('familyTree');
            container.push({
                'category': oneCategory.find('.catfiltertopitem').text(), 
                'catlink': oneCategory.find('.catfiltertopitem a').attr('href'), 
                'families': familyTree,
                'new': parseInt(oneCategory.find('.newProductCategory').text().replace('-','')) || 0
            })  ;
        });
        //console.log(container);
    _log('storeProductIndexTree() End',DLOG);
    return container;
}

function getFamilyItemFromListElem(item, quantitytest){
    // var itemsRE = /\(\d+\sitems\)/;
    // var count = itemsRE.exec($(item).contents().text()).toString().replace(/\(|\)|\sitems/g, '');
    // count = parseInt(count);
    var resultCount = $(item).contents().filter(function(){return this.nodeType ===3;}).text().replace('(','');
    var count = parseInt(resultCount);

    // console.log('getFamilyItemFromListElem');
    var akamai = 1;

    var name = $(item).find('a').text();
    var link = augmentHref($(item).find('a').attr('href'), akamai, quantitytest);
    var famID = $(item).find('a').attr('href').split('/');
    famID = famID[famID.length-1];
    return {
        'name': name,
        'count': count,
        'link': link,
        'famId':  famID
    };
}

function augmentHref(catfilterlinkhref, akamai, quantity){
    var queryCheckedURL = catfilterlinkhref;
    if(akamai){
        queryCheckedURL = (catfilterlinkhref.indexOf('?') != -1) ? (catfilterlinkhref + '&akamai-feo=off') : (catfilterlinkhref + '?akamai-feo=off');  
    }
    if(quantity){
        queryCheckedURL = (queryCheckedURL.indexOf('?') == -1) ? 
                (queryCheckedURL + '?ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val()) :
                (queryCheckedURL + '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val());
    }
    return queryCheckedURL;
}

function newProductIndexDiv(productTree){
        _log('newProductIndexDiv() Start',DLOG);

    $('#productIndexList').after('<div id="productIndexDiv" class="" style="white-space:normal;" />').detach();

    var exampleFamilyImages = getIndexImages();


    // productTree.slice(0,10).forEach(function(item){
    //     buildCategoryItem(item, exampleFamilyImages);
    // });

    var ht = '';
    productTree.forEach(function(item){
        ht = ht+ buildCategoryItem(item, exampleFamilyImages);
        //_log(item.category, DLOG)
    });
    $('#productIndexDiv').append(ht);

    _log('newProductIndexDiv() End',DLOG);
}

function addIndexLazyLoad(){
    _log('addIndexLazyLoad() Start',DLOG);

    // $('#content').find('.lazyimg').lazyLoadXT({
    //     throttle: 200
    // });
    $('#content').lazyLoadXT();
    $.lazyLoadXT.edgeY = 200;
    $.lazyLoadXT.throttle = 200;

    _log('addIndexLazyLoad() End',DLOG);
}



// function buildCategoryItem(catItem, exampleFamilyImages){
//     var catSelector = selectorEscape(catItem.category.replace(/\s/g, ''));
//     $('#productIndexDiv').append('<div id="'+selectorEscape(catItem.category)+'" class="box effect1 catContainer '+catSelector+'" data-view=0>'+
//         '<div class="catTitle"><a href="'+catItem.catlink+'">'+catItem.category+'</a></div>'+
//         '<div id="cat-'+catSelector+'" class="familiesContainer"></div>'+
//         '</div> ');

//     // _log('newprod1'+catItem.category)
//     var fams = catItem.families;
//     var htmltext = '';
//     for(var i in fams){
//         htmltext += buildFamilyItemHTML(fams[i], catSelector, exampleFamilyImages);
//     }
//     $('#cat-'+catSelector).append(htmltext);
//     // _log('newprod2')

// }
function buildCategoryItem(catItem, exampleFamilyImages){
    var catSelector = selectorEscape(catItem.category.replace(/\s/g, ''));
    // $('#productIndexDiv').append('<div id="'+selectorEscape(catItem.category)+'" class="box effect1 catContainer '+catSelector+'" data-view=0>'+
    //     '<div class="catTitle"><a href="'+catItem.catlink+'">'+catItem.category+'</a></div>'+
    //     '<div id="cat-'+catSelector+'" class="familiesContainer"></div>'+
    //     '</div> ');


    // _log('newprod1'+catItem.category)
    var fams = catItem.families;
    var htmltext = '';
    var rettext = ';';
    for(var i in fams){
        htmltext += buildFamilyItemHTML(fams[i], catSelector, exampleFamilyImages);
    }
    // $('#cat-'+catSelector).append(htmltext);
    // _log('newprod2')

    if(catItem.catlink == undefined){
    	catItem.catlink = '';
        rettext = '<div id="'+selectorEscape(catItem.category)+'" class="box effect1 catContainer '+catSelector+'" data-view=0>'+
	    '<div class="catTitle"><a href="'+catItem.catlink+'">'+catItem.category+'</a> </div>'+
	    '<div id="cat-'+catSelector+'" class="familiesContainer">'+htmltext+'</div>'+
	    '</div> ';	
    }else{
	    var queryCheckedURL = (catItem.catlink.indexOf('?') != -1) ? 
	                                            (catItem.catlink + '&newproducts=1') : 
	                                            (catItem.catlink + '?newproducts=1');
	    rettext = '<div id="'+selectorEscape(catItem.category)+'" class="box effect1 catContainer '+catSelector+'" data-view=0>'+
		    '<div class="catTitle">'+
		    	'<a href="'+catItem.catlink+'">'+catItem.category+'</a> '+
		    (catItem.new	? '<a style="font-size: 14px; padding-left:50px;" href="'+queryCheckedURL+'"> ('+catItem.new+' New Products)</a>' : '')+
		    '</div>'+
		    '<div id="cat-'+catSelector+'" class="familiesContainer">'+htmltext+'</div>'+
	    '</div> ';
    	
    }

    return rettext;
}

function buildFamilyItemHTML(fam, catSelector, exampleFamilyImages){

        // _log('>>>>>>>>><<<<<<<<<<<>>>>>>>>>>>'+fam.link)
        var root = fam.link.replace('product-search/en/','').split('?')[0];
        var famitem = $(this);
        var imagestring = '';
        if (exampleFamilyImages[root] != undefined){
            exampleFamilyImages[root].slice(0,3).forEach(function(item, ind){
                // console.log(root, item);
                // famitem.find('.familyimages').append('<img class=lazyimg data-original="http://media.digikey.com'+item+'">');
                imagestring = imagestring + '<img class=lazyimg data-src="http://media.digikey.com'+item+'">';
            });
        }

        

        var famSelector = selectorEscape(fam.name.replace(/\s/g, ''));
        // $('#cat-'+catSelector).append('<div class="famItemContainer fam-'+famSelector+'">'+'<div class="fcount">('+fam.count+')</div>'+
        return'<div class="famItemContainer fam-'+famSelector+'">'+'<div class="fcount">('+fam.count+')</div>'+
            '<div class="famTitle"><a href="'+fam.link+'">'+fam.name+'</a> </div> '+
            '<a href="'+fam.link+'" class="familyimages">'+imagestring+'</a> '+
            '</div>';
        // getCachedImagesForFamily(fam, catSelector, fam.link, MOCKPICS);
}

function addProductIndexThumbs(){
    _log('addProductIndexThumbs() Start',DLOG);

    $('.catContainer').addClass('plTextOnly');
    // var exampleFamilyImages = getIndexImages();
    // $('.famItemContainer').each(function(){
    //     // var root = 'http://www.digikey.com'+$(this).find('.famTitle a').attr('href').split('?')[0];
    //     var root = $(this).find('.famTitle a').attr('href').replace('product-search/en/','').split('?')[0];
    //     // console.log(root);
    //     var famitem = $(this);
    //     if (exampleFamilyImages[root] != undefined){
    //         exampleFamilyImages[root].slice(0,3).forEach(function(item, ind){
    //             // console.log(root, item);
    //             // famitem.find('.familyimages').append('<img class=lazyimg data-original="http://media.digikey.com'+item+'">');
    //             famitem.find('.familyimages').append('<img class=lazyimg data-src="http://media.digikey.com'+item+'">');
    //         })
    //     }

    // });
    _log('addProductIndexThumbs() Here>>>>>>>>>>>>>>>>>',DLOG);
    // $('.lazyimg').lazyload({
    //     skip_invisible: true,
    //     threshold : 800
    // });


    // setTimeout(addIndexLazyLoad, 1);
    addIndexLazyLoad();

    $('.catTitle').append('<div class="piThumbIcons"><i title="text only" class="piText fa fa-list fa-2x"></i><i title="turn on images" class="piThumbs fa fa-th fa-2x"></i></div>');
    

    $('#productIndexDiv').on('click', '.piText', function(){
        // $('#productIndexDiv').toggleClass('plTextOnly plContainerized');
        $(this).closest('.catContainer').addClass('plTextOnly').removeClass('plContainerized');
        $(window).scrollTop($(window).scrollTop()+1);
    });
    $('#productIndexDiv').on('click', '.piThumbs', function(){
        // $('#productIndexDiv').toggleClass('plTextOnly plContainerized');
        $(this).closest('.catContainer').addClass('plContainerized').removeClass('plTextOnly');
        $(window).scrollTop($(window).scrollTop()+1);
    });

    $('#fullResultsTitle').append('<div class="piThumbIconsAll">'+
        '<input id="indexThumbsState" type="hidden" class="saveState" value=0>'+
        '<button id="piTextAllButton" title="text only" class="pure-button" value=0>'+
        '<i class="piTextAll fa fa-list fa-lg"></i></button>'+
        '<button id="piThumbsAllButton" title="turn on images" class="pure-button" value=1><i class="piThumbsAll fa fa-th fa-lg"></i></button>'+
        ' Images</div>'
        );

    restoreInputState($('#indexThumbsState'));
    // _log($('#columnchooserstate').length);
    if($('#indexThumbsState').val() == 0){
        _log('indexThumbsState off', DLOG);
        $('#piTextAllButton').addClass('myRedButton');
        $('.catContainer').addClass('plTextOnly').removeClass('plContainerized');
    }else if($('#indexThumbsState').val() == 1){
        _log('indexThumbsState columns', DLOG);
        $('#piThumbsAllButton').addClass('myRedButton');
        $('.catContainer').addClass('plContainerized').removeClass('plTextOnly');
    }



    $('#fullResultsTitle').on('click', '#piTextAllButton', function(){
        localStorage.setItem('indexThumbsState', $(this).val());
        $('.catContainer').addClass('plTextOnly').removeClass('plContainerized');
        // console.log('textall',$('.piThumbIconsAll').find('button'))
        $('#piThumbsAllButton').removeClass('myRedButton');
        // $('.piThumbIconsAll').find('button').addClass('hello').removeClass('myRedButton');
        $('#piTextAllButton').addClass('myRedButton');

        $(window).scrollTop($(window).scrollTop()+1);
    });
    $('#fullResultsTitle').on('click', '#piThumbsAllButton', function(){
        localStorage.setItem('indexThumbsState', $(this).val());
        $('.catContainer').addClass('plContainerized').removeClass('plTextOnly');
        $('#piTextAllButton').removeClass('myRedButton');
        $('#piThumbsAllButton').addClass('myRedButton');
        //         console.log('thumball', $('.piThumbIconsAll').find('button'));

        $(window).scrollTop($(window).scrollTop()+1);
    });


    _log('addProductIndexThumbs() End',DLOG);

}



// function 

function categoryDivWrap(){
    _log('categoryDivWrap() Start',DLOG);
    $('.catfiltertopitem').each(function(){
        $(this).next('ul').addBack().wrapAll('<div />');
    });
    _log('categoryDivWrap() End',DLOG);
}

function addIndexColumnizerControls(){
    //Adds off, right, top controls to the top index results page
    _log('addIndexColumnizerControls() Start',DLOG);
    var thehtml = '<span id="columnchooser" style="margin-left:auto;" >'+
        '<input id="columnchooserstate" type="hidden" value="2" class="saveState">'+
        '<button id=cwfull value=0  class="pure-button"><i class="fa fa-minus fa-lg"></i></button>'+
        '<button id=cw300 value=1 class="pure-button"><i class="fa fa-bars fa-lg fa-rotate-90"></i></button>'+
        '<button id=cw301 value=2 class="pure-button"><i class="fa fa-bars fa-lg"></i></button>'+
        ' columns'+
    '</span>';
    $('#fullResultsTitle').append(thehtml);

    restoreInputState($('#columnchooserstate'));
    // _log($('#columnchooserstate').length);
    if($('#columnchooserstate').val() == 0){
        _log('columnchooserstate off', DLOG);
        $('#cwfull').addClass('myRedButton');
    }else if($('#columnchooserstate').val() == 1){
        _log('columnchooserstate columns', DLOG);
        $('#cw300').addClass('myRedButton');
        $('#productIndexDiv').addClass('catColumns');
    }else if($('#columnchooserstate').val() == 2){
        _log('columnchooserstate lines', DLOG);
        $('#productIndexDiv').addClass('familyColumns');
        $('#cw301').addClass('myRedButton');
    }

    $('#columnchooser button').on('click', function(){
        localStorage.setItem('columnchooserstate', $(this).val());
        if(localStorage.getItem('columnchooserstate') == 0){
            $('#productIndexDiv').removeClass('familyColumns').removeClass('catColumns')
        }else if(localStorage.getItem('columnchooserstate') == 1){
            $('#productIndexDiv').addClass('catColumns').removeClass('familyColumns');
        }else if(localStorage.getItem('columnchooserstate') == 2){
            $('#productIndexDiv').addClass('familyColumns').removeClass('catColumns');
        }
        $('#columnchooser button').removeClass('myRedButton');
        $(this).toggleClass('myRedButton');
    }).css('padding','3px 3px 3px 3px');

    _log('addIndexColumnizerControls() End',DLOG);
}

function addQuickPicksDisplayControls(){
    //Adds the Off, |||, = columns and off, right, top controls to the top of the quick
    _log('addQuickPicksDisplayControls() Start', DLOG);
    var thehtml = '<span id="qpchooser" style="position:relative; top:70px; margin-left:20px; z-index:6;" >'+
        '<input type=hidden id=qfLocation class="saveState" value="2">' +
        '<button id=qpoff value=0 class="pure-button">Off</button>'+
        '<button id=qpside value=1 class="pure-button">Right</button>'+
        '<button id=qptop value=2 class="pure-button">Top</button>'+
        ' Jump To / Top Results Box'+
    '</span>';
    $('#content').before(thehtml);
    restoreInputState($('#qfLocation'));
    $('#qpchooser').val($('#qfLocation').val());

    if($('#qfLocation').val() == 0){
        _log('qpchooser off', DLOG);
        $('#qpDiv').hide();
        $('#qpoff').addClass('myRedButton');
        // $('#qpside').addClass('clean-gray');
        // $('#qptop').addClass('clean-gray');
    }else if($('#qfLocation').val() == 1){
        _log('qpchooser columns', DLOG);    
    
        // $('#qpoff').addClass('clean-gray');
        $('#qpside').addClass('myRedButton');
        // $('#qptop').addClass('clean-gray');
    }else if($('#qfLocation').val() == 2){
        _log('qpchooser lines', DLOG);

        // $('#qpoff').addClass('clean-gray');
        // $('#qpside').addClass('clean-gray');
        $('#qptop').addClass('myRedButton');
    }

    $('#qpchooser button').on('click', function(){
        $('#qfLocation').val($(this).val());
        localStorage.setItem('qfLocation', $(this).val());
        _log($('#qfLocation').val() + ' qflocation val -- '+ $(this).val());
        if($('#qfLocation').val() == 0){
            $('#qpDiv').hide();
            _log('hiding qpdiv');
        }else if($('#qfLocation').val() == 1){
            $('#qpDiv').removeClass().addClass('rightside').show();
            $('#qpHandle').show();
            _log('rightside qpdiv');
        }else if($('#qfLocation').val() == 2){
            $('#qpDiv').removeClass().addClass('topside').show();
            _log('topside qpdiv');
            $('#qpHandle').hide();
        }

        $('#qpchooser button').removeClass('myRedButton');
        $(this).toggleClass('myRedButton');
    }).css('padding','3px 3px 3px 3px');

    _log('addQuickPicksDisplayControls() End', DLOG);
}

//TODO Evaluate if needed
function fixAssProdFamilyLinks(){
    //trying to fix the problem of associated product being in multiple families and the links to those families not working.... 
    //not working for now
    _log('fixAssProdFamilyLinks() Start',DLOG);
    $('.catfilterlink[href*="part="]').each(function(){
        var myhref = $(this).attr('href').split('?')[1];
        var mypath = $(this).attr('href').split('?')[0];
        var qarray = myhref.split('&');
        var partarray =[];
        var otherparams =[];
        var partsHTML = '';
        $(this).wrap('<form method="post" action="/scripts/dksearch/dksus.dll" />');
        for(var x=0; x<qarray.length; x++){
            if (qarray[x].indexOf('part=')!= -1){
                $(this).parent().append('<input type="hidden" name="part" value="'+qarray[x].replace(/part\=/i,'')+'">');
                //partarray.push(qarray[x].replace(/part\=/i,''));
            }
            else{
                otherparams.push(qarray[x]);
            }
        }
        
        $(this).parent().append('<input type="hidden" cat=>');
        $(this).click(function(){
            $(this).parent().submit();
        });
        _log(partarray);
    });
    _log('fixAssProdFamilyLinks() End',DLOG);
}

function addIndexPicPrev(){
    _log('addIndexPicPrev() Start',DLOG);
    if(localStorage.getItem('picPrevControl') == 1) {
        setTimeout(function(){
            $('.famTitle a').tooltipster({
                content: $('<div class=picPrev><div class=picPrevTitle /> <div class=picPrevBody></div></div>'),
                trigger: 'hover',
                delay: 350,
                // contentCloning: true,
                position: 'bottom-right',
                // interactive: true,
                positionTracker: false,
                onlyOne: true,
                iconTouch: true,
                functionReady: function(origin){

                    var queryCheckedURL = ($(this).attr('href').indexOf('?') != -1) ? 
                                            ($(this).attr('href') + '&stock=1&pageSize=100&akamai-feo=off') : 
                                            ($(this).attr('href') + '?stock=1&pageSize=100&akamai-feo=off');
                    var onlink = $(this);
                        
                    $('.picPrevBody').html('** loading pictures**<br><div class=loader />');

                    if(sessionStorage.getItem(queryCheckedURL) == undefined){
                        $('.picPrevBody').load(queryCheckedURL + ' img.pszoomer', function() {
                            $('.picPrevTitle').html('<span style="vertical-align:top" height="100%"> Example pictures of <b>'+
                                onlink.text() +'</b> (up to first 100 in stock):</span><br> '
                             );
                            $('.picPrevBody').find('img').each(function() {
                                $(this).css('height', '64px');
                                $('img[src="'+$(this).attr('src')+'"]:gt(0)').hide();
                                // $('this').attr('alt','').attr('title', '');
                            });
                            $('.picPrevBody').find('img').attr('alt','').attr('title', '');

                            if($('.picPrevBody').find('img').length == 0){
                                $('.picPrevBody').html('----no pics exist?');
                            }
                            sessionStorage.setItem(queryCheckedURL, $('.picPrev').html());
                            origin.tooltipster('reposition');

                        });
                    }else{
                        $('.picPrev').html(sessionStorage.getItem(queryCheckedURL));
                        origin.tooltipster('reposition');
                    }
                }
            });
            // _log('tooltipster',DLOG);
        },1000);
    }
    _log('addIndexPicPrev() End',DLOG);
}

function formatDetailPage(){
    if($('#reportpartnumber').length){
        _log('formatDetailPage() Start',DLOG);
        // var dataTable = $('#errmsgs').siblings('table:eq(1)').find('table:first');
        var dataTable = $('.attributes-table-main').find('table:first');
        //addAssProdLinkToFilters();
        ap.addAssociatedProductViewer();
        apOld.addAssociatedProductViewer();
        addReverseFiltering(dataTable);
        addToTopButton();

        addPriceBreakHelper();
        
        addDetailPageEasyInfoCopy($('#content'));


        addDataSheetLoader();
        // addDashNDHover();

        // add3dCad();
        if($('.seohtagbold').find('a[href$=525140]').length == 1){
            addCOBLEDWizard();
        }

        $('td:contains("obsolete") p').css('background-color','#FF8080'); // changes the color of the obsolete callout
        // $('#content').css({'position':'relative', 'top': '45px'});
        detailPageManufacturerHover();

        // newAssociatedProducts();

        // addFootprintSearch()
        _log('formatDetailPage() End',DLOG);
    }
}
function preFormatDetailPage(){
    if($('#reportpartnumber').length){
        _log('preformatDetailPage() Start',DLOG);
        var tablegeneralcss = {
            'border-radius': '5px',
            'border-spacing': '0',
            'border': '0px solid #ccc'
        };
        var trtdcss = {
            'border': '1px solid #ccc'
        };
        makeImageHolder();
        addDetailHoverMainImage();

        var priceTable = $('#reportpartnumber').parent().parent().parent();
        var discPriceTable = priceTable.parent().find('table:contains("Discount Pricing")');
        var digireelTable = $('.product-details-reel-pricing');
        $('.request-quote-description').hide();
        // var dataTable = $('table:contains("Category")');
        var dataTable = $('#errmsgs').siblings('table:eq(1)').find('table:first');
        
        //$('.beablock').removeClass('beablock');
        $('.beablock').css({
        'border-radius': '5px',
        'border': '1px solid #ccc'
        });
        
        priceTable.css(tablegeneralcss);
        priceTable.find('td,th').css(trtdcss);
        digireelTable.css(tablegeneralcss);
        digireelTable.find('td,th').css(trtdcss);
        discPriceTable.css(tablegeneralcss);
        discPriceTable.find('td,th').css(trtdcss);
        dataTable.css(tablegeneralcss);
        dataTable.find('td,th').css(trtdcss);
        

        $('.psdkdirchanger').parent().hide(); // removes the extra search box on the item detail page

        $('.update-quantity').insertAfter('.product-details');
        // $('.product-details-discount-pricing').css({'display':'inline'});
        // $('.update-quantity').css({'display':'inline'});
        $('.catalog-pricing').append($('.product-details-discount-pricing'));
        $('.product-details-discount-pricing br').hide();
        $('.update-quantity br').hide();
        $('.product-details-discount-pricing tr:last').css({'background':'#eeeeee'});
        $('#pricing th').css({'background-color':'#555'});

        _log('preformatDetailPage() End',DLOG);
    }
}

function detailPageManufacturerHover(){
	$('h2[itemprop=manufacturer] a').tooltipster({
        content: $('<div class=logoHover> <div class=logoHoverContent> </div><div class=logoHoverTitle></div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'bottom',
        interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // minWidth: '90%',
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: function(someitem){$('.logoHoverContent').gmload($(someitem).attr('href')+ ' #logo');}
    });
}

function addDetailPageEasyInfoCopy($pageobject){
	$('.attributes-table-main form:last').after('<button class="easyCopy pure-button" style="margin-right:10px;">Easy Data Copy</button>');
	$('#content').after('<div id="easyCopyDialog" class="firstopen" style="display:none;">'+
		'<div class="copytablediv">Click and drag headers to choose order.<br><table id="copytable" class="gray"><thead><tr></tr></thead><tbody><tr></tr></tbody></table></div>'+
		'<textarea style="width:100%; height:150px;  overflow:scroll;" class="copytext"></textarea> <div style="float:right;">Ctrl+C to copy, then paste into spreadsheet</div>'+
		'<div class="includeInfo" style="margin-top:5px;">Desired Columns<br></div>'+
		'</div>');

	$('.easyCopy').on('click', function(){		
		if($('#easyCopyDialog').hasClass('firstopen')){  // only make the dialog as needed.
			//init and open dialog
			$('#easyCopyDialog').removeClass('firstopen');
			$('#easyCopyDialog').dialog({
                autoOpen: true,
                resizable: false,
                // draggable: false,
                height:600,
                width:'80%',
                modal: true,
                buttons: {
                    "Close": function() {
                        $(this).css('color', 'lightgrey');
                        $( this ).dialog( "close" );
                    },
                }
            });

			buildEazyCopyCheckboxes();
			$('.copytext').select();
		}else{
			//just open dialog
			$('#easyCopyDialog').dialog('open');
		}
	});

}

function buildEazyCopyCheckboxes(){

	var info = getDetailPageInfo($('#content'));
	var keys = Object.keys(info);
	// console.log('local');
	var storedKeys = [];
	var local = localStorage.getItem('copycheckboxes')
	if(local == undefined || local == ''){
		storedKeys = keys;
		localStorage.setItem('copycheckboxes', JSON.stringify(keys));
		// console.log('storedKeys und', storedKeys);
	}else{
		storedKeys = JSON.parse(local);
		// console.log('storedKeys else', storedKeys);
	}
	//create checkboxes
	keys.forEach(function(el,idx,array){
		$('.includeInfo').append('<input id="c_'+el+'" class="css-checkbox copycheckboxes" style="z-index:2005; margin-right:10px;" type="checkbox"><label class="css-label" for="c_'+el+'">'+el+'</label><br>');
	});
	//populate checks
	storedKeys.forEach(function(el,idx,array){
		$('#c_'+el).prop('checked',true);
	});

	buildCopyTable(storedKeys);

	//event
	$('.copycheckboxes').change(function() {
		var fullinfo = getDetailPageInfo($('#content'));
		var limitedKeys = [];
		var localKeys = JSON.parse(localStorage.getItem('copycheckboxes'));
		var sortedKeys = [];
		$('.copycheckboxes:checked').each(function(){
			limitedKeys.push(this.id.replace('c_',''));
		});

		localKeys.forEach(function(el,idx,arr){
			if(limitedKeys.indexOf(el) !== -1){
				sortedKeys.push(el);
			}
		});

		limitedKeys.forEach(function(el,idx,arr){
			if(sortedKeys.indexOf(el) == -1){
				sortedKeys.push(el);
			}
		});

		localStorage.setItem('copycheckboxes', JSON.stringify(sortedKeys));
		buildCopyTable(sortedKeys);
	});

}

function buildCopyTable(desiredkeys){
	$('#copytable tr').empty();
	var info = getDetailPageInfo($('#content'));
	var keys = Object.keys(info);

	// console.log('desiredkeys', );
	if(desiredkeys == undefined || desiredkeys == []){
		desiredkeys = Object.keys(info);
	}
	
	desiredkeys.forEach(function(el,idx,array){
			$('#copytable thead tr:first').append('<th class="i_'+el+'">'+el+'</th>');
			$('#copytable tbody tr:first').append('<td>'+info[el]+'</td>');
	});

	buildCopyText(getDetailPageInfoFromTable());

	$('#copytable').dragtable({stop:function(){
		var neworder = getDetailPageInfoFromTable();
		var fullinfo = getDetailPageInfo($('#content'));
		localStorage.setItem('copycheckboxes', JSON.stringify(neworder));
		buildCopyText(neworder);
	}});
	//$('#copytable').change();
}

function buildCopyText(oKeys){
	var info = getDetailPageInfo($('#content'));
	$('.copytext').text('');
	if (oKeys==undefined){
		oKeys = Object.keys(info);  //order is not guaranteed! don't care for now.
	}

	//KEEP needed to add headings for spreadsheet
    // oKeys.forEach(function(el, idx, array){
    // 	$('.copytext').text($('.copytext').text()+el+'\t');
    // });
    // $('.copytext').text($('.copytext').text()+'\n');

    oKeys.forEach(function(el, idx, array){
    	$('.copytext').text($('.copytext').text()+info[el]+'\t');

    });
  	$('.copytext').text($('.copytext').text()+'\n');

	$('.copytext').select();

}

function getDetailPageInfoFromTable(){
	var keyorder = [];
	$('#copytable th').each(function(){
		keyorder.push($(this).attr('class').replace('i_',''));
	});
	console.log(keyorder);
	return keyorder;
}

function getDetailPageInfo($pageobject){

    var info = {};
    info.MPN = $pageobject.find('h1[itemprop=model]').text();
    info.DKPN = $pageobject.find('#reportpartnumber').text();
    info.Manufacturer = $pageobject.find('h2[itemprop=manufacturer]').text(); //could also do contents()
    info.Description = $pageobject.find('td[itemprop=description]').text();
    info.Packaging = $pageobject.find('.attributes-table-main a[href*="Standard%20Packaging%20Help"]').last().closest('tr').find('td').text();
    info.UnitPrice = $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(1)').text();
    info.PriceBreak = $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(0)').text();
    // info.PriceBreakTable = getPricingTable($('#pricing'));
    info.DatasheetLink = $pageobject.find('.lnkDatasheet:first').attr('href');
    info.Image = $pageobject.find('img[itemprop=image],img[src*=nophoto]').attr('src');
    info.QuantityAvailable = $pageobject.find('#quantityavailable').text().split('<br>')[0];
    info.MinQuantity = $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(0)').text();
    info.ROHS = $pageobject.find('.product-details tr:last').text();
    return info;
}
      
function getPricingTable($priceTable){
	var priceData = [];
	// console.log($priceTable);
	if($priceTable.filter(':contains(Call)').length === 0){
		$priceTable.find('tr:gt(0)').each(function(){
			// console.log($(this).text());
			// console.log($(this).find('td:eq(0)').text(), $(this).find('td:eq(1)').text());
			priceData.push([$(this).find('td:eq(0)').text(), $(this).find('td:eq(1)').text()]);
		});
		return priceData;
	}else{
		return priceData;
	}
}         
         
         

//TODO finish
function addFootprintSearch(){
    var manufacturer = detailPageInfo.getManufacturer($('#content'));
    var manPN = detailPageInfo.getMPN($('#content'));
    // var url = 'http://www.snapeda.com/api/v1/parts/search?q=NCP2820MUTBG&manufacturers=ON%20Semiconductor&include=cad';
    // var url = 'http://www.snapeda.com/api/v1/parts/search?q='+encodeURIComponent(manPN)+'&manufacturers='+encodeURIComponent(manufacturer)+'&include=cad');
    var url = 'http://www.snapeda.com/api/v1/parts/search?q='+encodeURIComponent(manPN)+'&manufacturers='+encodeURIComponent(manufacturer)+'&include=cad';


    $('#content').append('<div id="sometestdiv" style="display:none;"/>');
    $('#sometestdiv').gmload(url, function(data){
        var results = JSON.parse(data.response);
        console.log('snapeda', results, results.results[0].manufacturer);
        if (results.error == null){
            console.log(results.results[0].has_footprint, results.results[0].has_symbol, results.results[0].manufacturer);
        }
    });

}

function addDetailHoverMainImage(){
    $('.beablock-image img:first').tooltipster({
        content: $('<div class=detailHoverImage><div class=detailHoverTitle /> <div class=detailHoverBody> hit</div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'right',
        // interactive: true,
        // positionTracker: true,
        offsetX: -30,
        offsetY: -150,
        onlyOne: true,
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: function(origin){ $('.detailHoverBody').html('<img src="'+$(this).parent().attr('href')+'">'); origin.tooltipster('reposition');}
    });
}

function add3dCad(){
    _log('add3dCad() start',DLOG);
    var items = $('a[href$="igs"]:first');

    if (items.length !== 0 ){
        $('#content').append('<div>sharecad</div><iframe width="800" height="800" src="//sharecad.org/cadframe/load?url='+items.attr('href')+'" scrolling="no"></iframe>');
    }
    // if (items.length !== 0 ){
    //     // $('#content').append('<div>sharecad</div><iframe width="800" height="800" src="//sharecad.org/cadframe/load?url='+items.attr('href')+'" scrolling="no"></iframe>');
    //     $('#content').append("<div id='iframe3DviewerContainer' style='width:400px;height:210px;border-width: 2px; border-style: solid; border-color: black;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;'><iframe id='iframe3dvieweronline' type='text/html' width='400' height='210' src='http://www.3dvieweronline.com/iframe.php?bg=&textcolor=&text=VIEW THE MODEL' scrolling='no' frameborder='0'/><p>Your browser does not support iframes.</p></iframe></div><div style='font-size:12px;'><strong>Powered by <a href='http://www.3dvieweronline.com' target=_blank>3D Viewer online</a></strong> Allow Pop-Up to use the viewer</div>");
    // }

    _log('add3dCad() end',DLOG);
}

function addCOBLEDWizard(){
    _log('addCOBLEDWizard() start',DLOG);
    var voltageOutput = 'pv48';
    var currentOutputMax = 'pv1120';
    var id = 'ledwiz';
    var param1 = 'Voltage - Forward (Vf) (Typ)';
    var param1Escaped = selectorEscape(param1);
    var param2 = 'Current - Test';
    var param2Escaped = selectorEscape(param2);
    var param1Text = getParametricValueText(param1);
    var param2Text = getParametricValueText(param2);
    var driverLink = '/product-search/en/power-supplies-external-internal-off-board/led-supplies/591038';

    $('.attributes-optional-table').prepend('<div id="'+id+'" style="width:100%;" class="panel panel-default">'+
        '<div class="panel-heading">Compatible Driver Wizard</div>'+
            '<div class="panel-body" style="padding:10px; ">'+
                '<div class="" style="line-height:2em; display:inline-block;">'+
                    'Find Drivers with Vout Max of at least '+
                    '<input id="'+param1Escaped+'" type="text" size='+param1Text.length+' value="'+param1Text+'">'+
                    ' and Current Output Max of less than <input id="'+param2Escaped+'" type="text" value="'+param2Text+'"> '+
                '</div>'+
                // '<div class="" style="line-height:2em; display:inline-block;"></div>'+
                '<div><div id="compatibleDriverWizzardButton" class="button-small pure-button">See Compatible Drivers</div></div>'+
                '<div class="hiddenLEDForm" ></div>'+
                // '<div class="hiddenLEDForm" style="display:none;"></div>'+
            '</div>'+
        '</div>');


    // var param2Text = $('.attributes-table-main').find('tr:contains("'+param2+'")').last().find('td').text();

    $('#compatibleDriverWizzardButton').click(function(){
        console.log(driverLink);
        $('#compatibleDriverWizzardButton').after('<img class="loadingicon" style="margin-left:10px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
        $('.hiddenLEDForm').load(driverLink+' [name=attform]', function(){
            $('form[name=attform]').attr('target', '_blank').hide();
            var vOptions = $(this).find('[name='+voltageOutput+'] option');
            var cOptions = $(this).find('[name='+currentOutputMax+'] option');
            // console.log(cOptions);

            selectSingleValueOptions(cOptions, '<', Qty(param2Text) );
            selectRangeValueOption(vOptions, Qty(param1Text));

            // location.assign("javascript:function methodChooser(f) { var serializedEarl = $(f).serialize(); f.method = serializedEarl.length < 1800 ? 'get' : 'post'; return true; } void(0)");
            window.eval("function methodChooser(f) { var serializedEarl = $(f).serialize(); f.method = serializedEarl.length < 1800 ? 'get' : 'post'; return true; }");
            // location.assign("javascript:$('form[name=attform]').submit(); void(0)");
            window.eval("$('form[name=attform]').submit();");
            $('.loadingicon').remove();
            _log('driver wizard done');
            return true;
        });
    });

    hoverHighlightDetailWizParams(param1, $('#'+id));
    hoverHighlightDetailWizParams(param2, $('#'+id));
    
    _log('paramtext '+ param1Text + param2Text, DLOG);

    _log('addCOBLEDWizard() End',DLOG);
}

function selectSingleValueOptions($options, operator, qtyValue ){
    _log('selectSingleValueOptions() Start', DLOG);
    var doNotMatch = '-*';
    if (operator === '<'){
        $options.each(function(){
            var opText = $(this).text().trim();
            if(doNotMatch.indexOf(opText) == -1){
                if(qtyValue.gte(parseElemForQty($(this)))) {
                    $(this).prop('selected',true);
                    // console.log(parseElemForQty($(this)));
                }
            }
            //console.log(qtyValue, parseElemForQty($(this)));
        });
    }
    _log('selectSingleValueOptions() End', DLOG);
}

function selectRangeValueOption($options, qtyValue){
    _log('selectRangeValueOption() Start', DLOG);
    //only checked in LED supplies family
    var doNotMatch = '-*';
        $options.each(function(){
            var opText = $(this).text();
            try{
                opText = $(this).text().trim();
                if(doNotMatch.indexOf(opText) == -1){
                    if(opText.indexOf('~') !== -1 || opText.indexOf('Max') !== -1){
                        // _log('Range to Process '+ opText, DLOG);
                        var range = processRangeText(opText);
                        // _log('After Range Process' + range, DLOG);
                        var fval = preProcessForQty(range[0]);
                        var sval = preProcessForQty(range[1]);
                        if( qtyValue.gte(fval) && qtyValue.lte(sval)){
                            $(this).prop('selected',true);
                        }
                    }else{
                        if(opText.indexOf('AC') !== -1){

                        }else{
                            var singleVal = preProcessForQty(opText);
                            var singleValQty = Qty(singleVal);
                            if(qtyValue.eq(singleValQty)){
                                $(this).prop('selected',true);
                            }
                        }
                    }
                }
            }catch(e){
                console.log('selectRangeValueOption failed to parse', opText, ' error ', e);
            }
        });
    _log('selectRangeValueOption() End', DLOG);
}
function processRangeText(rtext){
    //only check in LED supplies family
    if(rtext.indexOf('Max') !== -1){
        rtext = rtext.replace(' (Max)', '');
        // console.log(' rtext ', rtext, ' base ');
        var baseUnit = rtext.replace(/^.*\d(.*)$/, "$1");
         // console.log(opText, ' max processor');
         return ['0 '+ baseUnit, rtext];
    }else{
        var splitRange = rtext.split('~');
        var val1 = splitRange[0].trim();
        var val2 = splitRange[1].trim();
        var baseUnit = val2.split(' ')[1];
        if (val1.indexOf(baseUnit) === -1){
            if(baseUnit){
                return [val1 + ' ' + baseUnit, val2];
            }else{ return [val1 , val2];}
        }else{ return splitRange;}
    }
}

function getParametricValueText(paramtext){
    return $('.attributes-table-main').find('th:exactly("'+paramtext+'")').parent().find('td').text();
}

function hoverHighlightDetailWizParams(paramtext, $hoverObject){
    $hoverObject.on('mouseenter', function(){
       $('.attributes-table-main').find('th:exactly("'+paramtext+'")').parent().find('td').css({'background-color':'#ffc10e'}); 
    }); 
    $hoverObject.on('mouseleave', function(){
       $('.attributes-table-main').find('th:exactly("'+paramtext+'")').parent().find('td').css({'background-color':''}); 
    }); 
}

function addPriceBreakHelper(){
    _log('addPriceBreakHelper() Start',DLOG);
    var ptable = $('#pricing');
    // var eurocheckRE = /(?.*,\d\d)/; 
    // check if part is not orderable
    if(ptable.filter(':contains(call)').size() == 0){
        var pricingrows = ptable.find('tr:gt(0)');
        var tdlast = pricingrows.eq(0).find('td:last').text();
        var isEuro = (tdlast[tdlast.length-3] == ',');  //check if the last a comma is used before the last two digits of the extend price 

            var firstpb = simpleInternationalParse(pricingrows.eq(0).find('td:eq(0)').text(), isEuro);
            pricingrows.each(function(index){
                if(pricingrows.eq(index+1)){
                        // priceVal = simpleInternationalParse(price.replace(/[^0-9-.]/g, ''));
                    var pricebreak =  simpleInternationalParse(pricingrows.eq(index).find('td:eq(0)').text(), isEuro);
                    var unitprice = simpleInternationalParse(pricingrows.eq(index).find('td:eq(1)').text(), isEuro);
                    var nextextendedprice = simpleInternationalParse(pricingrows.eq(index+1).find('td:eq(2)').text(), isEuro);
                    var breakeven = Math.ceil(nextextendedprice/unitprice);

                    if ( breakeven >= pricebreak && firstpb == 1){
                        ptable.find('tr:first').eq(index).append('<th style=" border: 1px solid rgb(204, 204, 204);" title="If ordering the green quantity or more, it is a better deal to buy the next price break quantity.">Break-Even Qty</th>');
                        pricingrows.eq(index).append('<td style="color:green; text-align:center; border: 1px solid rgb(204, 204, 204);" title="If ordering the green quantity or more, it is a better deal to buy the next price break quantity.">'+breakeven +' </td>');
                    }               
                }
            });
    }
    _log('addPriceBreakHelper() End',DLOG);
}

function simpleInternationalParse(text, isEuro){
    return isEuro ? (parseFloat(text.replace(/\./g, '').replace(/\,/g, '.'))) : (parseFloat(text.replace(/,/g,'')));
}

function addDataSheetLoader(){
        _log('addDataSheetLoader() Start',DLOG);
        var dslink = $('tr:contains("Datasheet") td>a:first').attr('href');
        var hidenav = '#navpanes=0&zoom=100';
        
        //KEEP different methods  KEEP*************>>>>
        //$('#content').append('<embed src="'+dslink+'" width=100% height=800px>');
        // $('#content').append('<embed src="'+dslink+'#toolbar=0&navpanes=0&scrollbar=0" width=100% height=auto>');
        // $('#content').append('<object data="'+dslink+'" type="application/pdf" width=100% height=10000px>');
        // $('#content').append('<div style="height:10000px;"><object data="'+dslink+hidenav+'" type="application/pdf" width=100% height=100%></div>');
        // $('#content').append('<div style="height:auto;"><object data="'+dslink+'#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width=100% height=100%></div>');
        // $('#content').append('<iframe src="http://docs.google.com/gview?url='+dslink+'" style="width:100%; height:800px;" frameborder="0"></iframe>');
        // $('#content').append('<iframe src="http://docs.google.com/viewer?url='+htmlEscape(dslink)+'&embedded=true" width="100%" height="800px" style="border: none;"></iframe>');
        
        $('#content').append('<div id=datasheetdiv><div>'+
            '<span id="datasheetchooser" class="tabbedbutton" style="" title="Enable or Disable the autoloading datasheets">'+
            '<input id="datasheetchooserinput" value="1" class="saveState" type="hidden">' +
            '<button id=datasheetoff value=0 class="pure-button">Off</button>'+
            '<button id=datasheeton value=1 class="pure-button">On</button>'+
            ' Datasheet Autoloader: '+
            '</span></div><br>'+
        '</div>');
        addChooserButtonAction($('#datasheetchooser'), dataSheetButtonAction);
        
        if($('tr:contains("Datasheet") td>a:first').length > 0 && $('#datasheetchooserinput').val() == 1){
            setTimeout(function(){$('#datasheetdiv').append('<embed src="'+dslink+hidenav+'" width=100% height='+($(window).height()-70)+'px>');},500);
            $('tr:contains("Datasheet") td>a:first').wrap('<div style="background:lightgrey; padding:3px;"/>').after('<a style="float:right;" href=#datasheetdiv><button class="pure-button" style="width:40px; font-size:11px; padding:2px; margin:0px" ><i class="fa fa-arrow-circle-down fa-lg"></i></button></a>').parent().localScroll();
            // $('tr:contains("Datasheet") td:first div').css({'white-space':'nowrap'});
        }
        _log('addDataSheetLoader() End',DLOG);
}

function dataSheetButtonAction(){
    var dslink = $('tr:contains("Datasheet") td>a:first').attr('href');
    var hidenav = '#navpanes=0&zoom=100';
    if($('#datasheetchooserinput').val() == 1){
        $('#datasheetdiv>embed').remove();
        setTimeout(function(){$('#datasheetdiv').append('<embed src="'+dslink+hidenav+'" width=100% height='+($(window).height()-70)+'px>');},500);
    }
    else if ($('#datasheetchooserinput').val() === 0){
        $('#datasheetdiv>embed').remove();
    }
}

function addOpAmpWiz(){
    getAllFilters($('.filters-panel'));
}

function getAllFilters($filtersPanel){
    var filters = [];
    // console.log($filtersPanel.html())
    console.log($filtersPanel.find('.filters-group:first tbody').html())
    $filtersPanel.find('.filters-group:first tbody>tr').eq(0).find('td').each(function(item, index){
        console.log(item, index)
        filters[index].title = $(this).text();
    });
    $filtersPanel.find('.filters-group tbody>tr').eq(1).find('td').each(function(item, index){
        filters[index].selectbox = $('this').find('select');
    });
    $filtersPanel.find('.filters-group tbody>tr').eq(2).find('td').each(function(item, index){
        filters[index].resetVal = $('this').find('button').attr('name');
    });
    console.log('filters', filters);
}

// function getOneFilter($filter){

// }

//TODO fuzzy reverse filtering /similar to  Start with Opamps
// find numeric values
function addReverseFiltering($tableToFilter){
    _log('addReverseFiltering() Start',DLOG);
    var categoryRow = $tableToFilter.find('th:contains("Category")').parent();
    var lastFilterRow = $tableToFilter.find('tr:contains("Note"),tr:contains("Online Catalog"),tr:contains("Mating Products"),tr:contains("For Use With"),tr:contains("Associated Product"),tr:contains("Other Names")').not('tr:contains("Application Note")').eq(0);
    var formRowsTD = $tableToFilter.find('tr>td').slice(categoryRow.index(),lastFilterRow.index());  //get the valid rows on which to add check boxes
    formRowsTD.each(function(ind){
        if (ind==0){
            $(this).append('<span style="float:right"><input id="catfilter" class="css-checkbox" type=checkbox checked=true><label class="css-label" for="catfilter"></label></span>');
        }else if (ind==1){
            $(this).append('<span style="float:right"><input id="familyfilter" class="css-checkbox" type=checkbox checked=true><label class="css-label" for="familyfilter"></label></span>');
        }else{
            $(this).append('<span style="float:right"><input type=checkbox class="css-checkbox" id="revcheck'+ind+'"><label class="css-label" for="revcheck'+ind+'"></label></span>');
        }
    });

    $('.attributes-table-main form:first').after(
        '<a class="similarPartLink" target="_blank">'+
        '<div style="float:right; cursor:pointer;" class="pure-button similarPartsButton">See <span></span> Similar Parts</div>'+
        '</a>'
    );

    formRowsTD.find('input').change(function(){
        var i = getReverseFilterLink(formRowsTD);
        _log('url is '+i);
        $('.similarPartLink').attr('href', i);
        $('.similarPartsButton span').html('<img src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
        $('.similarPartsButton span').load(i + ' .matching-records', function() {
            $(this).text($(this).text().split(':')[1]);
        });
    });

    $('.attributes-table-main form:first').css({float:'left'}).find('input').addClass('pure-button'); // move the Report an Error button to the left
    _log('addReverseFiltering() End',DLOG);
}

function getReverseFilterLink(formRowsTD){
    _log('getReverseFilterLink() Start',DLOG);
    var reverseFilterLink = '/scripts/DkSearch/dksus.dll?k=';
    if($('#familyfilter:checked').length){
        // _log('familfilter '+ $('#familyfilter:checked').attr('checked') + $('#familyfilter').closest('td').find('a').attr('href'));
        reverseFilterLink = $('#familyfilter').closest('td').find('a').attr('href')+'?k=';
    }else if ($('#catfilter:checked').length){
        // _log('catfilter '+ $('#catfilter:checked').closest('td').find('a').html());
        reverseFilterLink = $('#catfilter:checked').closest('td').find('a').attr('href')+'?k=';
    }else{
        reverseFilterLink = '/scripts/DkSearch/dksus.dll?k=';
    }
    formRowsTD.find('input:checked').not('#catfilter,#familyfilter').each(function(){
        reverseFilterLink = reverseFilterLink +$(this).parent().parent().text().replace(/\s/g,'+')+ '+';
    });
    // _log('new reversefilterlink ' + reverseFilterLink);
    reverseFilterLink = reverseFilterLink.replace('%','%25');
    _log('getReverseFilterLink() End',DLOG);
    return reverseFilterLink;
}

function addBreadCrumbLink(){
    _log('addBreadCrumbLink() Start',DLOG);
    if ($('#productTable').size() > 0) {
        appendURLParam($('.seohtagbold a:last'), 'akamai-feo', 'off');
    }
    addBreadcrumbHover();
    _log('addBreadCrumbLink() End',DLOG);
}

function appendURLParam(href, param, value){
    _log('appendURLParam() Start',DLOG);
    
    if (href instanceof $){
        var $a = href;
        href = $a.attr('href');
        if( href.indexOf('?') !== -1){
            href += '&'+param+'='+value;
        }else{
            href += '?'+param+'='+value;
        }
        $a.attr('href', href);
        _log('added param to jquery object '+param ,DLOG);

    }
    else if ($.type(href) === 'string'){
        console.log('im a string');
        if( href.indexOf('?') !== -1){
            href += '&'+param+'='+value;
        }else{
            href += '?'+param+'='+value;
        }
        return href;
    }
    _log('appendURLParam() End',DLOG);
}

function getFamilyLink(){
    _log('getFamilyLink() Start',DLOG);
    var myhref = $('.seohtagbold').find('a:last').attr('href');
    var mainform = $('#mainform');
    var modifiers = mainform.find('input[type=checkbox], input[name=quantity], input[name=ColumnSort]').serialize()+'&akamai-feo=off';

    _log('getFamilyLink() End',DLOG);
    return myhref;
}

function addStickyHeader () {
    // location.assign("javascript:$(window).unbind('scroll resize');void(0)");
    window.eval("$(window).unbind('scroll resize');");
    $('div.stickyHeader').remove();
    CreateFloatingHeader();
    $(window).scroll(function () { UpdateFloatingHeader(); });
    $(window).resize(function () { UpdateFloatingHeader(); });
    //      $('#productTable thead>tr:first th').attr('border', 0).css({
            // 'border-top-left-radius': '5px',
            // "border-spacing":0
    //      });
    $("#productTable thead").css('background-color', 'white');
    $('#productTable thead>tr:eq(1)').css('background-color','#e8e8e8');
    $('.stickyThead>tr:eq(1)').css('background-color','#e8e8e8');
    $('.stickyThead').parent().css({'table-layout':'fixed'});

}

function CreateFloatingHeader() {
    var origTable = $('#productTable');
    var tableClone = $(origTable).clone(true).empty().removeClass('stickyHeader');
    tableClone.css('margin-bottom', '');
    var theadClone = $(origTable).find('thead').clone(true);
    theadClone.addClass('stickyThead');
    var stickyHeader = $('<div></div>').addClass('stickyHeader hide').attr('aria-hidden', 'true');
    stickyHeader.append(tableClone).find('table').append(theadClone);
    $(origTable).after(stickyHeader);

    var widthValues = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
    var tableWidth = $(origTable).width();
    var tableHeight = $(origTable).height();

    for (var i = 0; i < widthValues.length; i++) {
        var parsedValue = Number($('#productTable').css(widthValues[i]).replace(/px/ig, ""));
        if (!isNaN(parsedValue)) {
            tableWidth += parsedValue;
        }
    }

    var headerCells = $(origTable).find('thead th');
    var headerCellHeight = $(headerCells[0]).height();

    var stickyHeaderCells = stickyHeader.find('th');
    stickyHeader.css('width', tableWidth);
    for (var i = 0, l = headerCells.length; i < l; i++) {
        $(stickyHeaderCells[i]).css('width', $(headerCells[i]).css('width'));
        // $(stickyHeaderCells[i]).css('background-color', '#E1E0E0');
    }

    var cutoffTop = $(origTable).offset().top;
    var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
    var leftInit = $(origTable).offset().left;
    var currentPosition = $(window).scrollTop()+50;
    $(stickyHeader).offset({ left: leftInit, top: currentPosition });

    // Fix to make sure it's visible on refresh
    if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
        stickyHeader.removeClass('hide');
        $(stickyHeader).offset({ left: leftInit, top: currentPosition });
    }
    else {
        stickyHeader.addClass('hide');
    }
}

function UpdateFloatingHeader() {
    var stickyHeader = $('div.stickyHeader');
    var headerCells = $('#productTable').find('thead th');
    var headerCellHeight = $(headerCells[0]).height();
    var widthValues = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
    var tableWidth = $('#productTable').width();
    var tableHeight = $('#productTable').height();
    for (var i = 0; i < widthValues.length; i++) {
        var parsedValue = Number($('#productTable').css(widthValues[i]).replace(/px/ig, ""));
        if (!isNaN(parsedValue)) {
            tableWidth += parsedValue;
        }
    }
    var stickyHeaderCells = stickyHeader.find('th');
    stickyHeader.css("width", tableWidth);
    for (var i = 0, l = headerCells.length; i < l; i++) {
        $(stickyHeaderCells[i]).css('width', $(headerCells[i]).css('width'));
        // $(stickyHeaderCells[i]).css('background-color', '#E1E0E0');
    }
    var cutoffTop = $('#productTable').offset().top;
    var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
    var currentTopPosition = $(window).scrollTop()+50;
    var currentLeftPosition = $(window).scrollLeft();
    var cutoffLeft = $('#productTable').offset().left;

    if (currentTopPosition > cutoffTop && currentTopPosition < cutoffBottom) {
        stickyHeader.removeClass('hide');
        $(stickyHeader).offset({ left: cutoffLeft, top: currentTopPosition });
    }
    else {
        stickyHeader.addClass('hide');
    }
}

//adds floating table header in the productTable search results
//TODO see if needed.... might be unused
function addPersistHeader() {
    _log('addPersistHeader() Start',DLOG);
    GM_addStyle(".floatingHeader {position: fixed; top: 0;visibility: hidden; display:inline-block;}");
    var floatingHeader;
    $('#productTable').addClass('persist-area');
    $('#productTable>thead').find('tr:first').addClass('persist-header');
    $(".persist-area").each(function() {
        floatingHeader = $(".persist-header", this);
        
        floatingHeader.before(floatingHeader.clone().attr('id','realheader'));
    
        floatingHeader.children().css("width", function(i, val){
            return $(floatingHeader).children().eq(i).css("width", val);
        });
        
        floatingHeader.addClass("floatingHeader");
        floatingHeader.css('width', $('.persist-area').width());
    });

    floatingHeader.find('th').width(function(i, val) {
            if(i==2){return 64;}// for the image column so the alt text doesn't mess with the column width of images.
            else{return $('#realheader').find('tr:first>th').eq(i).width();}

    });

    $(window).scroll(updateTableHeaders).trigger("scroll");
    _log('addPersistHeader() End',DLOG);
}

function updateTableHeaders() {
    $(".persist-area").each(function() {

        var el = $(this),
            offset = el.offset(),
            scrollTop = $(window).scrollTop(),
            floatingHeader = $(".floatingHeader", this);

        if((scrollTop > offset.top - 50) && (scrollTop < offset.top + el.height())) {
            //_log('scrollTop = ' + scrollTop + ', offset.top = ' + offset.top + ', el.height = '+ el.height() + ' offset.left = '+ offset.left,DLOG);
            floatingHeader.css({
                "visibility": "visible",
                "top": 50,
                "backgroundColor": 'white',
                "left": offset.left - $(document).scrollLeft(),
                'border-spacing': '0'
            });
        } else {
            floatingHeader.css({
                "visibility": "hidden"
            });
        }
    });
}

function addImageBar() {
    _log('addImageBar() Start',DLOG);
    if($('#productTable').size() == 1) {
        _log('adding image bar', DLOG);
        $('#mainform').after('<div id="accDiv" class="collapsed"><div id="accContent">loading...</div></div>');
        $('#accDiv').css({
            // 'width': ($(window).width() - 100),
            'width': '97vw',
            'height': '66px',
            'border': '1px solid lightgrey',
            'box-shadow': '1px 1px 2px #aaa',
            'margin-bottom': '8px',
            'border-radius': '1px',
        });
        $('#accContent').css({
            'overflow': 'hidden',
            'height': '100%'
        });
        $('#accDiv').append('<div id="expand1"><div id="expand2">+ Expand +</div></div>');
        $('#expand1').css({
            'float': 'right',
            'position': 'relative',
            'top': 1,
            'background': 'linear-gradient(to bottom, #f5f5f5 0px, #e8e8e8 100%)',
            'width': 80,
            'border': '1px solid #eee',
            'border-radius': '0px 0px 1px 1px',
            'box-shadow': '1px 1px 3px #aaa'
        });
        $('#expand2').css({
            'text-align': 'center',
            'cursor': 'pointer'
        });
    }

    $('#content').after('<div id="itemInfo"></div>');
    $('#itemInfo').hide();

    $('#content').after('<div id="bigpic"></div>');
    $('#bigpic').hide();
    _log('addImageBar() End',DLOG);
}

function addToTopButton(){
    //css in stylesheet
    $('#content').after('<div class="totop" href="#content"><a href="#content" style="text-decoration:none"><span>^^^<br/>Top<br/>^^^</span></a></div>');
    // $('.totop').localScroll({
    //     duration: 500,
    //     offset: -600,
    // });
    $('.totop').on('click', function(){
      $('html,body').animate(
        {scrollTop: 0},
        {       
            duration: 250,
            easing: 'swing'
        }
        );  
    });
}

function addChooserButtonAction(somespan, clickfunc){
    _log('addChooserButtonAction() Start' ,DLOG);
    somespan.find('button').css({'padding':'3px 5px 4px 5px'}); //TODO fix

    var $input = somespan.find('input') ;
    var inputid = $input.attr('id');
    restoreInputState($('#'+inputid));

    _log('restored input state of '+inputid + ' is '+ $input.val(), DLOG);
    // console.log('$input',$input);
    somespan.find('button').removeClass('myRedButton');
    somespan.find('button[value='+$input.val()+']').addClass('myRedButton');
    // somespan.find('button').not('[value='+$input.val()+']').addClass('clean-gray');
    somespan.find('button').not('[value='+$input.val()+']');

    somespan.on('click', 'button' , function(){
        var bval = $(this).val();
        $input.val(bval);
        _log('setting ' + inputid + ' to ' + $input.val() + ' button val is ' + bval, true);
        localStorage.setItem(inputid, $(this).val());   
        _log('setting ' + inputid + ' to ' + $input.val() + ' button val is ' + bval, true);
        _log('getting ' + inputid + ' is ' + localStorage.getItem(inputid) + ' button val is ' + $(this).val(), true);        
        somespan.find('button').removeClass('myRedButton');
        somespan.find('button[value='+$input.val()+']').addClass('myRedButton');
        somespan.find('button').not('[value='+$input.val()+']');
        clickfunc(somespan, $(this).val());
    });
        _log('addChooserButtonAction() End',DLOG);
}


function addParamWizards(){
    _log('addParamWizards() Start',DLOG);
    var filterfunctions = [ //['Series',                function(name, e){getAttributeExampleImgs(name, e);}, 'Ex Pics'],
                            //['Connector Type',        function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            //['Connector Style',       function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            //['Number of Positions',   function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            //['Contact Type',      function(name, e){getAttributeExampleImgs(name, e);}, '+Ex Pics'],
                            ['pv127' ,'Voltage - Input',        function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv569' ,'Voltage Range',        function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv48' ,'Voltage - Output',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv276' ,'Voltage - Supply',   function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1112' ,'Voltage - Supply (Vcc/Vdd)',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv659' ,'Voltage - Supply, Single/Dual',  function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1525' ,'Voltage - Output 1',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1526' ,'Voltage - Output 2',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1527' ,'Voltage - Output 3',    function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv252' ,'Operating Temperature',  function(name, e){temperatureHelper(name, e);}, '+ helper'],
                            ['pv772' ,'Voltage - Load', function(name, e){voltageHelper(name, e);}, '+ helper'],
                            ['pv1113' ,'Connectivity',  function(name, e){checkboxHelper(name, e);}, '+checkboxes'],
                            ['pv1114' ,'Peripherals',   function(name, e){checkboxHelper(name, e);}, '+checkboxes'],
                            ['pv16' ,'Package / Case',  function(name, e){checkboxHelper2(name, e);}, '+checkboxes'],
                            ['pv1291' ,'Supplier Device Package',   function(name, e){checkboxHelper2(name, e);}, '+checkboxes'],
    ];

    for (var x=0; x<filterfunctions.length; x++){
        $('select[name="'+filterfunctions[x][0]+'"]').parent().append('<span class="adv pure-button myRedButton" order="'+x+'" > '+filterfunctions[x][3]+'</span>');
    }
    $('.adv').click(function(){
        var i= $(this).attr('order');
        filterfunctions[i][2]( filterfunctions[i][1], $('select[name="'+filterfunctions[i][0]+'"]'));
    });

    _log('addParamWizards() End',DLOG);
}

function createHelperBox(name,$selectElem, boxheight, boxwidth){
    _log('createHelperBox() Start',DLOG);
    $('.helperBox').remove(); // probly not needed
    $('#content').after('<div class="helperBox gray-grad"><div id="helpertitlemessage" style="float:left;">hello</div><button class="closeHelperBox clean-gray close">X</button><br><br><div id="helperBoxContent"></div></div>');
    $('.helperBox').css({
        'position': 'relative',
        'border': '1px solid grey',
        'width': boxwidth,
        'height': boxheight,
        "borderRadius": "5px",
        'box-shadow': '3px 3px 3px rgb(136, 136, 136)'
    }).hide()
    .slideDown()
    .position({
        my: 'left top',
        at: 'left top',
        of: $selectElem
    });

    $('.closeHelperBox').click(function() {
    $('.helperBox').slideUp(400,
            function(){$(this).remove();
        });
    }); 
    _log('createHelperBox() End',DLOG);
}

function opampVoltageHelper(){
    // add single or dual supply range?
    
}

function voltageHelper(name, $selectElem) {
    //TODO differentiate between in and out.... add vin min, vin max
    //TODO add ability to select multi output devices
    //TODO deal with +- ranges
    _log('voltagehelper name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG);
    //_log(arguments.callee.caller); 

    createHelperBox(name,$selectElem,'150px','200px');

    $('#helperBoxContent').html('<label><b>desired ' + name + 
        ':</b> <br><input id=voltin type="text" size="5"><b>Volts</b> <br>(enter key or apply)</label><br>'+
        '<button id=helperbutton class="clean-gray clearfix">apply</button><span id=voltmess></span>');
    $('#helperbutton').css({
        'float':'right',
        'padding':'3px',
        'margin-right':'10px',
        'margin-top':'10px',
    });

    $('#voltin').focus();
    $('#helperbutton').click(function() {
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    $('#helperBoxContent').find('input').change(function(){
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    
    _log('end voltageHelper');
}

function temperatureHelper(name, $selectElem) {
    //TODO differentiate between in and out.... add vin min, vin max
    //TODO add ability to select multi output devices
    //TODO deal with +- ranges
    _log('temperaturehelper name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG);
    //_log(arguments.callee.caller); 

    createHelperBox(name,$selectElem,'150px','200px');

    $('#helperBoxContent').html('<label><b>desired ' + name + 
        ':</b> <br><input id=voltin type="text" size="5"><b>C</b> <br>(enter key or apply)</label><br>'+
        '<button id=helperbutton class="clean-gray clearfix">apply</button><span id=voltmess></span>');
    $('#helperbutton').css({
        'float':'right',
        'padding':'3px',
        'margin-right':'10px',
        'margin-top':'10px',
    });

    $('#voltin').focus();
    $('#helperbutton').click(function() {
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    $('#helperBoxContent').find('input').change(function(){
        // applyRangeSelect(name, $selectElem);
        applyRangeSelect2(name, $selectElem);
        buttonHighlightAction();
    });
    
    _log('end voltageHelper');
}

function voltageHelper2(name, $selectElem){

}

function applyRangeSelect2(name, $selectElem){
    var userinputvalue = parseFloat($('#helperBoxContent').find('input').val());
    var commaselector = ':contains(,),:contains(、)'; //the oddball comma is for the .jp site
    var tildeselector = ':contains(~),:contains(～)'; //the oddball tilde is for the .jp site
    // var commaregex = /,、/g ;
    // var tilde regex = /~～/g ;
    var $optionList = $selectElem.find('option');
    // _log($optionList.filter(commaselector).size(), true);

    $optionList.filter(commaselector).each(function(){
        var thisOption = $(this);
        var splitOnComma = $(this).text().split(/[,、]/g);  // implicitly tested for comma by selector
        // _log('splitoncomma is ' +splitOnComma, true);
        splitOnComma.forEach(function(element, index, array){
            if ((element.indexOf('~') != -1) || (element.indexOf('～')!= -1)){
                if(isInRange(userinputvalue, element)){
                    thisOption.prop('selected', true);
                }
            }else if(parseFloat(element) == userinputvalue){
                thisOption.prop('selected', true);
                _log(element, true);
            }
        });
    });

    $optionList.not(commaselector).each(function(){
        var thisOption = $(this);
        var otext = $(this).text();
        if ((otext.indexOf('~') != -1) || (otext.indexOf('～')!= -1)){
                if(isInRange(userinputvalue, otext)){
                    thisOption.prop('selected', true);
                }
            }else {
                if(parseFloat(otext) == userinputvalue){
                    thisOption.prop('selected', true);
                    _log(otext, true);  
                }
                thisOption.filter(':contains("Up to")').each(function(index) {
                    if((parseFloat($(this).text().split('Up to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
                        $(this).prop('selected', true);
                    }
                });
                thisOption.filter(':contains("Adj to")').each(function(index) {
                    // if((parseFloat($(this).text().split('Adj to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
                        $(this).prop('selected', true);
                    // }
                });
                thisOption.filter(':contains("Down to")').each(function(index) {
                    if((parseFloat($(this).text().split("Down to")[1]) <= userinputvalue) && (userinputvalue <= 0)) {
                        $(this).prop('selected', true);
                    }
                });

            }
    });

    // getRecordsMatching();
    var selNum = $selectElem.find('option:selected').size();
    $('#voltmess').text(' ' + selNum + ' options selected in ' + name);
    $('.helperBox').delay(200).slideUp(500);
}

function isInRange(userinput, teststring){
    var rangeSplit = teststring.split(/[\~\～]/);
    var firstval = parseFloat(rangeSplit[0]);
    var secondval = parseFloat(rangeSplit[1]);
    //_log(rangeSplit +' '+firstval +' '+secondval,DLOG);
    if(secondval > firstval) {
        if(firstval <= userinput && userinput <= secondval) {
            // optElem.prop('selected', true);
            return true;
        }else {return false;}
    } else {
        if(secondval <= userinput && userinput <= firstval) {
            // optElem.prop('selected', true);
            return true;
        }else {return false;}
    }
}

function applyRangeSelect(name, $selectElem){
    //The odd squiggly is support for the .jp website
    $selectElem.find('option').prop('selected', false);
    var userinputvalue = parseFloat($('#helperBoxContent').find('input').val());
    _log(userinputvalue, DLOG);

    $selectElem.find('option:contains(~),option:contains(～)').not(':contains(,)').not(':contains("&#x2213;")').each(function(index) {
        selectInRange($(this), userinputvalue);

    });

    $selectElem.find('option:contains("Up to")').each(function(index) {
        if((parseFloat($(this).text().split('Up to')[1]) >= userinputvalue) && (userinputvalue >= 0)) {
            $(this).prop('selected', true);
        }
    });
    $selectElem.find('option:contains("Down to")').each(function(index) {
        if((parseFloat($(this).text().split("Down to")[1]) <= userinputvalue) && (userinputvalue <= 0)) {
            $(this).prop('selected', true);
        }
    });
    $selectElem.find('option').not(':contains(~),:contains(～)').not(':contains("Down to")').not(':contains("Up to")').not(':contains("&#x2213;")').each(function(index) {
        if(parseFloat($(this).text()) == userinputvalue) {
            $(this).prop('selected', true);
        }
    });

}

function selectInRange(optElem, input) {
    var rangeSplit = optElem.text().split(/[\~\～]/);
    var firstval = parseFloat(rangeSplit[0]);
    var secondval = parseFloat(rangeSplit[1]);
    //_log(rangeSplit +' '+firstval +' '+secondval,DLOG);
    if(secondval > firstval) {
        if(firstval <= input && input <= secondval) {
            optElem.prop('selected', true);
        }
    } else {
        if(secondval <= input && input <= firstval) {
            optElem.prop('selected', true);
        }
    }
}

function checkboxHelper(name, $selectElem){
    _log('checkboxHelper name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG); 
    createHelperBox(name,$selectElem,'','80%');

    $('#helperBoxContent').html('');

    var masterarray = [];
    $selectElem.find('option').each(function(){
        var smalla = $(this).get(0).text.replace('\\n','').replace('\\c','').replace(/\(/,'').replace(/\)/,'').replace(/\./,'').split(',');
        masterarray = masterarray.concat(smalla);
        //_log(masterarray);
    });

    masterarray = $.map(masterarray, function(e){return e.trim();});

    masterarray = uniqueArray(masterarray);

    masterarray = uniqueArray(masterarray).sort();

    $('#helperBoxContent').addClass('columnized5');
    masterarray.forEach(function(e,i,a){
       $('#helperBoxContent').append('<label><input type="checkbox"> '+e+' </input></label><br> ');
    });

    $('#helperBoxContent').after('ok');
    $('#helperBoxContent').find('input[type=checkbox]').change(function(){
        // add logical AND, and OR
        $selectElem.find('option').prop('selected',false);
        $selectElem.attr('selectedIndex', 0);
        _log(' ' + $('#helperBoxContent').find(':checked').length + ' checkboxes checked and '+ $selectElem.find('option').length + ' total option permutations');

        var checkedWordArray = [];
        var additiveSelector = 'option:contains("';

        $('#helperBoxContent').find(':checked').each(function(index){
            _log('length '+ $('#helperBoxContent').find(':checked').length + ' index ' + index);
            if($('#helperBoxContent').find(':checked').length-1 == index){
                additiveSelector = additiveSelector + $(this).parent().text().trim() + '")';
            }else{
                additiveSelector = additiveSelector + $(this).parent().text().trim() + '"):contains("';
            }
        });
        _log(additiveSelector);
        $selectElem.find(additiveSelector).prop('selected','true');
        $('#helpertitlemessage').text($selectElem.find('option:selected').length + ' lines selected using ANDed combination of checkboxes');
        if($selectElem.find('option:selected').length > 0){
            // getRecordsMatching();
        }else{
            $('#helpertitlemessage').text('There are no lines matching all checkboxes');
        } 
    });

    _log('end checkboxHelper');
}

function checkboxHelper2(name, $selectElem){
    _log('checkboxHelper2 name is ' +name + ' $selecteelem children size is ' + $selectElem.children().size(), DLOG); 
    createHelperBox(name,$selectElem,'','40%');

    $('#helperBoxContent').html('');

    var masterarray = [];
    $selectElem.find('option').each(function(){
        var smalla = $(this).get(0).text.replace('\\n','').replace('\\c','').replace(/\(/,'').replace(/\)/,'').replace(/\./,'').split(',');
        masterarray = masterarray.concat(smalla);
        //_log(masterarray);
    });
    masterarray = uniqueArray(masterarray);
    for(var y=0; y<masterarray.length; y++){
        masterarray[y] = trim(masterarray[y]);
    }
    masterarray = uniqueArray(masterarray).sort();

    $('#helperBoxContent').addClass('columnized5');
    for( var x=0; x<masterarray.length; x++){
        $('#helperBoxContent').append('<label><input type="checkbox"> '+masterarray[x]+' </input></label><br> ');
    }

    $('#helperBoxContent').after('ok');
    $('#helperBoxContent').find('input[type=checkbox]').change(function(){
        // add logical AND, and OR
        $selectElem.find('option').prop('selected',false);
        $selectElem.attr('selectedIndex', 0);
        _log(' ' + $('#helperBoxContent').find(':checked').length + ' checkboxes checked and '+ $selectElem.find('option').length + ' total option permutations');

        $('#helperBoxContent').find(':checked').each(function(index){
            $selectElem.find('option:contains("'+$(this).parent().text().trim()+'")').prop('selected', true);
            _log('the box was checked', true);
        });

        // $selectElem.find(additiveSelector).prop('selected','true');
        // $('#helpertitlemessage').text($selectElem.find('option:selected').length + ' lines selected using ORed combination of checkboxes');
        $('#helpertitlemessage').text('ORed combination of checkboxes, close to see selected');
        if($selectElem.find('option:selected').length > 0){
            // getRecordsMatching();
        }else{
            $('#helpertitlemessage').text('There are no lines matching all checkboxes');
        } 
    });

    _log('end checkboxHelper2');
}

function getAttributeExampleImgs(name,$selectElem) {
    _log('populating pictures for '+$selectElem.attr('name'));
    $('#accContent').html('');
    $selectElem.find('option').each(function(index) {
        var myURL = getURL(false, false);
        //_log('myurl'+$(this).parent().attr('name'));
        var myregex = new RegExp('&' + $(this).parent().attr('name') + '=[0-9]+', 'ig');
        //_log('myregex '+ myregex);
        myURL = myURL.replace(myregex, '') + $(this).parent().attr('name') + '=' + $(this).val();
        //_log('regexed url '+ myURL);
        $('#accContent').append('<a id="imgprev' + index + '" href="' + myURL + '" title="' + $(this).text() + '"></a>');
        $('#imgprev' + index).load(myURL + ' img[src*="tmb"]:first,div.beablock>a>img', function() {
            if($(this).find('img:not([src*=tmb])').size() > 0) {
                var thumb = $(this).find('img:not([src*=tmb])').attr('src').replace('_sml', '').replace('.jpg', '_tmb.jpg');
                $(this).find('img:not([src*=tmb])').attr('src', thumb).removeAttr('title').removeAttr('width');
            }
        });
        if(index > 30) {
            return false;
        }
        
    });
}

function akamaiLazyLoadFixForIndexResults(){
    _log('akamaiLazyLoadFixForIndexResults() Start',DLOG);

    // $('.catfilterlink').each(function(){
    //         var querycheckedURL = ($(this).attr('href').indexOf('?') != -1) ? ($(this).attr('href') + '&akamai-feo=off') : ($(this).attr('href') + '?akamai-feo=off');
    //         $(this).attr('href', querycheckedURL);
    // });
    _log('akamaiLazyLoadFixForIndexResults() End',DLOG);

}

function akamaiLazyLoadFixForFilterResults(){
    $('#mainform').append('<input type=hidden value="off" name="akamai-feo">');
}



function addKeywordMatchedSprites(){
    _log('addKeywordMatchedSprites() Start',DLOG);

    $('.quickpick').each(function(){
        $(this).next('br').before('<div class=/>');
    });
    _log('addKeywordMatchedSprites() End',DLOG);

}


function addCategorySprites2(){
    _log('addCategorySprites() Start',DLOG);
    // $('.sideIndexContent li').each(function(ind) {
    //     $(this).prepend('<span style="display:none;" class="catSprite2 '+$(this).text().replace(/[\s\(\)\\\/\,]/g, '').toLowerCase() +
    //             '" >'+
    //             // '" style="margin:3px; position:relative; top:11px; border:1px solid gray; border-radius:5px; display:inline-block;" >'+
    //             '</span>' 
    //     );
        //**************************************
        // KEEP for testing, this is the code for category images without using the sprites
        // $('#qpDivCont').append('<a href="#' + 
        //  $(this).text().replace(/[\s\(\)\\\/\,]/g, '') + 
        //  '"><img align=center style="margin:2px; border:1px solid gray; border-radius:5px;" src="https://dl.dropboxusercontent.com/u/26263360/img/caticons/'+
        //  $(this).text().replace(/[\s\(\)\\\/\,]/g, '')+'.png">' + 
        //  $(this).text() + '</a><br>'
        // );                   
        //**************************************
    // });
    $('.catTitle').each(function(){
        $(this).prepend('<span class="catSprite2 '+$(this).find('a:first').text().replace(/[\s\(\)\\\/\,]/g, '').toLowerCase() +
                '" >'+
                // '" style="margin:3px; position:relative; top:11px; border:1px solid gray; border-radius:5px; display:inline-block;" >'+
                '</span>' 
        );

    });
    _log('addCategorySprites() End',DLOG);
}


// Adds alternate search terms or patterns to add related categories to the Quick Filter box 
function getQFAlts(searchterm) {
    _log('getQFAlts(searchterm) function ' + searchterm,DLOG);
    var altArray = [
        [/microcontroller/i, 'mcu'],
        [/mcu/i, 'microcontroller'],
        [/msp430/i, 'microcontroller', 'mcu'],
        [/pic\s?[\d]+?/i, 'microcontroller', 'mcu'],
        [/atmega/i, 'microcontroller', 'mcu'],
        [/avr/i, 'microcontroller', 'mcu'],
        [/cortex/i, 'microcontroller', 'mcu'],
        [/\b(M0|M3|M4|R4)\b/, 'microcontroller', 'mcu'],
        [/bluetooth/i, 'finished', 'transceiver', 'evaluation'],
        [/gps/i, 'finished', 'receiver', 'evaluation'], 
        [/usb/i, 'microcontroller', 'mcu','smart cables'], 
        [/adapters/i, 'between series', 'smart cables'], 
        [/rj[\-\s]?\d+/i, 'modular', 'ethernet'], 
        [/ethernet/i, 'modular'], 
        [/sma/i, '(RF)','adapter','coaxial'], 
        [/bnc/i, '(RF)','adapter','coaxial'], 
        [/db-?\d+/i, 'd-sub'], 
        [/sram/i, 'memory'],
        [/eeprom/i, 'memory'], 
        [/ssr/i, 'solid'], 
        [/fpga/i, 'demo'], 
        [/arduino/i, 'boards'], 
        [/cree/i, 'led','eval'], 
        [/rs-?\d+/i, 'uart','cables','drivers'], 
        [/\d+k/i, 'resistor'], 
        [/\d+uf/i, 'capacitor'],
        [/dsub/i, 'd-sub'], 
        [/battery/i, 'batteries'], 
        [/accessory/i, 'accessories'], 
        [/assembly/i, 'assemblies'], 
        [/epoxy/i, 'epoxies'], 
        [/supply/i, 'supplies'], 
        [/mosfet/i, 'fet'] 
    ];
    _log('altarray.length is '+altArray.length,DLOG);
    for(var x = 0; x < altArray.length; x++) {
        //_log(' trying ' + altArray[x][0],DLOG);
        if(searchterm.match(altArray[x][0])) {
            //if(searchterm.match(/microcontroller/i)){
            var returnString = '';
            for(var y = 1; y < altArray[x].length; y++) {
                returnString = returnString + ' ' + altArray[x][y];
            }
            _log('alternate search terms are '+ returnString,DLOG);
            return returnString;
        }
    }
    return '';
}


//TODO remove not sure if used or needed.
function checkCategoryQF(keywordArray) {
    for(var x = 0; x < keywordArray.length; x++) {
        $('h1:contains("' + keywordArray[x] + '")').each(function() {
            $(this).next().find('a.catfilterlink').css({
                'fontSize': ((parseInt($(this).css('fontSize'),10) < 17) ? (parseInt($(this).css('fontSize'),10) + 2) : (parseInt($(this).css('fontSize'),10))),
                "font-weight": 'bold'
            });
            $(this).next().find('a.catfilterlink').addClass('quickpick');
            $(this).next().find('a.catfilterlink').each(function() {
                $('#qpDivCont').append( '<div class="clearfix">'+ $(this).parent('li').html() + ' ' + $(this).parent('li').prev('.catfiltertopitem').text() + ' in ' + $(this).closest('ul').prev().text() + '<div style="float:right;" class="'+$(this).closest('ul').prev().text().replace(/[\s\(\)\\\/\,]/g, '').toLowerCase()+'"></div></div>');
            });
        });
    }
}

// for the common word replace stemming, spell checking and expansion
function processInput(elem) {
    var qarray = $(elem).val().split(' ');

    for(var y = 0; y < qarray.length; y++) {
        qarray[y] = commonWordReplace(qarray[y]);
    }

    var myval = Array();
    for(var x = 0; x < qarray.length; x++) {
        //_log('alt add ' +commonWordAltAdd(qarray[x]).join(', '),DLOG);
        if(commonWordExpand(qarray[x]) != null) {
            myval = myval.concat(commonWordExpand(qarray[x]));
            myval = myval.join(' ');
        }
    }
    _log('logging myval '+ myval,DLOG);
    if(myval != null) {
        qarray = myval.concat(qarray.join(' '));
    }
    $(elem).val((qarray));
}

function commonWordReplace(someword) {
    _log('commonWordReplace someword = ' + someword);
    var altArray = [
        ['capacitors', 'capacitor'],
        ['resistors', 'resistor'],
        ['capacitors', 'capacitor'],
        ['connectors', 'connector'],
        ['diodes', 'diode'],
        ['leds', 'led'],
        ['transformers', 'transformer'],
        ['enclosures', 'enclosure'],
        ['headers', 'header'],
        ['dsub', 'd-sub'],
        ['potentiometers', 'potentiometer'],
        ['blocks', 'block'],
        ['dcdc', 'dc dc'],
        ['dc-dc', 'dc dc'],
        ['dc/dc', 'dc dc'],
        ['fans', 'fan'],
        ['regulators', 'regulator'],
        ['crystals', 'crystal'],
        ['oscillators', 'oscillator'],
        ['circuits', 'circuit'],
        ['microcontrollers', 'microcontroller'],
        ['uc', 'microcontroller'],
        ['converters', 'converter'],
        ['soldering', 'solder'],
        ['supports', 'support'],
        ['heatshrink', 'heat shrink'],
        ['heatsink', 'heat sink'],
        ['ssl', 'ssl | solid state lighting | led']
    ];

    for(var p = 0; p < altArray.length; p++) {
        if(someword != null && (someword.toLowerCase() == altArray[p][0])) {
            _log(someword+' was changed to '+ altArray[p][1]);
            return altArray[p][1];
        }
    }
    _log('commonWordReplace nothing returned, returning "' + someword+'"');
    return someword;
}

function commonWordExpand(someword) {
    _log('commonWordExpand start someword = '+ someword);
    var altArray = [
        ['battery', 'batteries'],
        ['batteries', 'battery'],
        ['supply', 'supplies'],
        ['supplies', 'supply'],
        //['heatsink', 'heat sink'],
        //  ['heatshrink', 'heat shrink'],
        //  ['ssl', 'ssl | solid state lighting | led'],
        ['tube', 'tubing'],
        //['suppression', 'tvs'],
        //['capacitor', 'capacitance'], 
        ['epoxy', 'epoxies'],
        ['multimeter', 'DMM | multi meter']
    ];
    var retval = Array();
    for(var p = 0; p < altArray.length; p++) {
        if(someword.toLowerCase() == altArray[p][0]) {
            for(u = 1; u < altArray[p].length; u++) {
                retval[u - 1] = altArray[p][u] + ' | ';
            }
            _log('commonWordExpand returning retval= '+ retval);
            return retval;
        }
    }
    _log('commonWordExpand returning nothing');
    return null;
}


function addQuantityToCatFilterLinks() {
    _log('addQuantityToCatFilterLinks() Start',DLOG);
    try {
        if($('a.catfilterlink').attr('href').indexOf('?') == -1) {
            _log('catfilter links has no question questionmark '+ ($('a.catfilterlink').attr('href').indexOf('?') == -1));
            $('a.catfilterlink').each(function() {
                $(this).attr('href', $(this).attr('href') + '?ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val());
            });
        } else if($('a.catfilterlink').attr('href').indexOf('quantity=') == -1) {
            _log('catfilter links has no quantity ' + ($('a.catfilterlink').attr('href').indexOf('quantity=') == -1 ));
            $('a.catfilterlink').each(function() {
                $(this).attr('href', $(this).attr('href') + '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val());
            });
        } else if($('a.catfilterlink').attr('href').indexOf('quantity=') != -1) {
            _log('catfilter links has quantity ' + ($('a.catfilterlink').attr('href').indexOf('quantity=') != -1 ) + 'there are this many catfilter links '+ $('a.catfilterlink').size());
            $('a.catfilterlink').each(function() {
                $(this).attr('href', ($(this).attr('href').replace(/&quantity=\d+/i, '&ColumnSort=1000011&quantity=' + $('#qtydefaulttext').val())));
            });
        } else if (document.location.href.search('quantity')){
            document.location.href = document.location.href.replace(/quantity=\d+/i,'quantity='+$('#qtydefaulttext').val());
        }
    } catch(err) {}
    _log('addQuantityToCatFilterLinks() End',DLOG);
}




function indexInstantFilter3(){
    _log('indexInstantFilter3() Start',DLOG);

    if($('body.indexPage').length>0){
        $('#headKeySearch').keyup(function(){
            var keywords = $(this).val().trim().toLowerCase();
            var keywordarray = keywords.split(' ');
            var attrfilters = '';
            keywordarray.forEach(function(word){
                attrfilters += '[href*='+word+']';
            });
            _log('keyword array length ' + attrfilters);
            $('.famItemContainer').addClass('hideme');
            $('.catContainer').hide();
            $('.famItemContainer a'+attrfilters).closest('.famItemContainer').removeClass('hideme');

            $('.famItemContainer').not('.hideme').closest('.catContainer').show();
            // $('.hideme').hide();
            if($(this).val() == ''){
                $('.famItemContainer').removeClass('hideme');
                $('.famItemContainer').closest('.catContainer').show();
            }
            console.log('hi keywords here');
        });
    }
    _log('indexInstantFilter3() End',DLOG);
}

function getURL(stripQuery, inclFormData) {
    // strip query 
    // included serialized form data
    //$('mainform')
    var querycheckedURL = (window.location.toString().indexOf('?') != -1) ? (window.location.toString() + '&"') : (window.location.toString() + '?');
    if(stripQuery) {
        querycheckedURL = (window.location.toString().split('?')[0] + '?');
    }
    var serializedFormData = $('#mainform').serialize();
    var myloc = inclFormData ? (querycheckedURL + serializedFormData) : querycheckedURL;
    return myloc;
}

function addStickyFilters(){
    //adds stickyfilters to multi select boxes 
    
        $('option').mousedown(function(e,index) {
            if(!e.ctrlKey && !e.shiftKey){
                e.preventDefault();
                $(this).prop('selected', $(this).prop('selected') ? false : true);
                //e.parent().prop('selectedIndex',index);
                return false;
            }
        });
}

function addApplyFiltersButtonHighlight(){
    _log('addApplyFiltersButtonHighlight() Start',DLOG);
    $('#mainform').on('mouseup','option,input[type=reset],input[value=Reset]', function(e){
        buttonHighlightAction();
    });
    $('#mainform').on('change', 'input[type=checkbox], input[type=text]', function(e){
        $('input[value="Apply Filters"]').addClass('myRedButton');
        // $('input[value="Apply Filters"]').removeClass('button-small pure-button').addClass('thoughtbot2');
    });
    $('#mainform').on('keyup', 'input[type=checkbox], input[type=text]', function(e){
        $('input[value="Apply Filters"]').addClass('myRedButton');
        // $('input[value="Apply Filters"]').removeClass('button-small pure-button').addClass('thoughtbot2');
    });
    $('#mainform').on('click','.clearselect', function(e){
        //dependancy on clearselect link being added/existing
        buttonHighlightAction();
        $(this).hide();
    });
    _log('addApplyFiltersButtonHighlight() End',DLOG);
}

function buttonHighlightAction() {
    setTimeout(function(){
        if($('#mainform option:selected').length>0){
            $('input[value="Apply Filters"]').toggleClass('myRedButton',true);
        }else{
            $('input[value="Apply Filters"]').toggleClass('myRedButton',false);
        }       
    },10);
}



function searchButtonHighlight(){
    $('.dkdirchanger2').on('keyup', function(){
        if($(this).val().length !== 0){
            $('#searchbutton').addClass('myRedButton');
        }else{
            $('#searchbutton').removeClass('myRedButton');
        }
    });
}

function addEvents(){
    _log('addEvents() Start',DLOG);

    $('#expand2').click(function(e){
            _log($(this).attr('id')+' acc expand click');
            if($('#accDiv.expanded').length){
                $('#accDiv').animate({height:'65px'}, 300);
                $('#expand2').text('+ Expand +');
                $('#accDiv').toggleClass('expanded collapsed');
            }
            else if($('#accDiv.collapsed').length){
                $('#accDiv').animate({height:'130px'}, 300, function(){
                    $('#accDiv').css('height','100%');
                });
                
                $('#expand2').text('- Collapse -');
                $('#accDiv').toggleClass('expanded collapsed');
            }
        
    });

    //adds rudimentary spell check
    if(localStorage.getItem('spellcheck') == 1){
        $('#headKeySearch').blur(function(){ processInput(this); }); 
        $('#headKeySearch').keydown(function(myevent){ 
            _log(myevent.keyCode +' keydown event happend');
            if(myevent.keyCode == 13){
                _log('event 13 happend '+ this + ' has been passed');
                processInput(this);
            }
        });
    }

    _log('addEvents() End',DLOG);
}

function addColumnHider(){
    _log('addColumnHider() Start',DLOG);
    $('#preProductTable').append('<button id=showCols style="margin:2px 5px;"class="button-small pure-button">Show hidden Columns</button>');
    $('#showCols').click(function(e){
        e.preventDefault();
        $('.hiddenCol').fadeIn(800);
        $('#showCols').removeClass('myRedButton');
        _log('showing hidden columns');
    });

    $('#productTable').find('th').each(function(i,e){
        $(this).attr('title','double-click to hide column');
    });

    $('#productTable').on('dblclick', 'th',function(){
        var colIndex = $(this).index()+1;
        _log($(this).text()+' acc expand click is sibling number ' + $(this).index() );
        _log('trying to hide col ' + colIndex);
        $('.stickyHeader').find('td:nth-child('+colIndex+'),th:nth-child('+colIndex+')').addClass('hiddenCol').fadeOut(400);
        // $('#productTable').find('td:nth-child('+colIndex+'),th:nth-child('+colIndex+')').addClass('hiddenCol').fadeOut(400);
        $('#showCols').addClass('myRedButton');   
    });
    addDashedColumnsHider();
    _log('addColumnHider() End',DLOG);
}


function addDashedColumnsHider(){
    //dev
    _log('addDashedColumnsHider() Start',DLOG);    
    $('#preProductTable').append('<button id=identCols style="margin:2px 5px;"class="button-small pure-button">Hide Identical Columns</button>');
    $('#identCols').click(function(e){
        e.preventDefault();
        hideIdenticalColumns();
    });
    _log('addDashedColumnsHider() End',DLOG);
}


function hideIdenticalColumns(){
        $('#productTable').find('th').each(function(){
        var colIndex = $(this).index()+1;
        var firstText = $('#productTable').find('tbody td:nth-child('+colIndex+')').first();
        console.log('firstMathcolumn' + firstText.html());
        // _log('first text is' + firstText.html());
        var result = $('#productTable').find('tbody td:nth-child('+colIndex+')').filter( function(index){
            if($(this).html() != firstText.html()){
                return false;
            }else{
                return true;
            }});
        _log( $(this).html() + 'and first result '+ firstText.html() +' :' +
         result.length + 'tbody tr count: ' + $('#productTable').find('tbody>tr').length);
        if(result.length == $('#productTable').find('tbody>tr').length){
            $('#productTable').find('td:nth-child('+colIndex+'),th:nth-child('+colIndex+')').addClass('hiddenCol').fadeOut(400);
            $('#showCols').addClass('myRedButton');   
        }
    });
}

function addPartCompare(){
    _log('addPartCompare() Start',DLOG);
    $('form[name=compform]').attr('id','compareForm');
    $('#content').append('<div style="height:150px;"></div>');
    addBottomCompare();
    $('#compareForm').change(function(){
            if($('#compareForm input:checked').length > 0 && $('#bottomCompare:hidden').length == 1){
                $('#bottomCompare').show('slide', {'direction':'down'}, 500);
                populateCompare($('#compareForm input:checked'));
            }
            else if($('#compareForm input:checked').length===0){
                $('#bottomCompare').hide('slide', {'direction':'down'}, 500);
            }else{
                populateCompare($('#compareForm input:checked'));
            }           
        });
    _log('addPartCompare() End',DLOG);
}

function populateCompare($checkedItems){
    $('#bottomCompareCont').empty();
    $('#bottomCompareCont').append('<table style="height:100%"><tbody><tr></tr></tbody></table>');
    $checkedItems.removeClass();
    $checkedItems.each(function(i){
        var mytr = $(this).closest('tr');
        $('#bottomCompareCont>table tr:first').append('<td class="compdivs" valign=top align=center>'+
            '<span class=clickcheck style="float:right; cursor:pointer; color:red;">x</span>'+
            mytr.find('a[href*="-ND"]:first').html()+'<br>' +mytr.find('a[href*="-ND"]:eq(2)').html()+'</td>');
        $('.clickcheck:last').data('mycheck',$(this));
    });

    $('#complink').attr('href','http://www.digikey.'+theTLD+'/scripts/DkSearch/dksus.dll?'+$('#compareForm').serialize().replace('=',''));
    $('#compcount').text($checkedItems.length);
    $('.clickcheck').click(function(){
        $($(this).data('mycheck')).prop('checked','');
        populateCompare($('#compareForm input:checked'));
    });
}

function addBottomCompare(){
    _log('addBottomCompare() Start',DLOG);
    $('#content').after('<div id=bottomCompare class="gray-grad">'+
        '<div style="float:left; margin:1px 5px 0px 1px; width:100px; height:110px;" class=clearfix>'+
        '<button class="minimal close" style="margin:4px; float:left; padding:2px;">hide</button><br>'+
        '<a style="margin:2px;" href="" id="complink" target="_blank"></a>'+
        '<br><span><span id=compcount>0</span> items selected</span></div>'+
        '<button class="close minimal" >hide</button>'+
        '<div id=bottomCompareCont style="height:100%">bottom world</div></div>');

    $('#bottomCompare').css({
        'position': 'fixed',
        'bottom' : '0px',
        'width': '100%',
        'height': '110px',
        //'background': 'white',
        'border-top': '3px solid red',
        'box-shadow': '0px -1px 2px 2px #888',
        'z-index': '10'
    }).hide();

    $('#bottomCompare .close').click(function(){
        $('#bottomCompare').hide('slide', {'direction':'down'}, 500);
    });

    $('#complink').after($('#compare-button').attr('value','Compare\n Now').addClass('minimal').css('height','50px'));
    _log('addBottomCompare() End',DLOG);
}

function addPriceHover(){
    _log('addPriceHover() Start',DLOG);
    //adds price hover over td.unitprice

    $('td.unitprice').tooltipster({
        content: $('<div class=priceHover><div class=priceHoverTitle /> <div class=priceHoverBody> hit</div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'right',
        // interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: loadPrices
    });

    _log('addPriceHover() End',DLOG);
}

// function loadPrices($hoveredObj){
function loadPrices(origin){
    $('.priceHoverBody').html('...loading <img style="margin-left:60px" src="https://dl.dropboxusercontent.com/u/26263360/img/loading.gif">');
    // console.log($(this).closest('tr').find('.mfg-partnumber a:first').attr('href'));
    // console.log($(this).text());
    $('.priceHoverBody').load($(this).closest('tr').find('.mfg-partnumber a:first').attr('href')+' #pricing', function(){
        addPriceBreakHelper();
        origin.tooltipster('reposition');
    });
}

function combinePN(){
    _log('combinePN() Start',DLOG);
    // var productTable = $('#productTable').eq(0).detach();
    var productTable = $('#productTable').eq(0);
    var mfpnIndex = productTable.find('th').index($('th.mfg-partnumber')) + 1;

    productTable.find('td:nth-child(' + mfpnIndex + ')').each(function() {
        // $(this).append('<br>' + $(this).prev().html() + '<br>' + $(this).next().text());
        $(this).append('<br>' + $(this).prev().html() + '<br>' + $(this).next().html());
        $(this).find('a:last').css({'color':'black'}).attr('title','Manufacturer Landing Page');
        //$(this).css('white-space', 'nowrap');
        
    });
    
    var firstcol = productTable.find('td:nth-child(' + (parseInt(mfpnIndex)-1) + '),th:nth-child(' + (parseInt(mfpnIndex)-1) + ')');
    var seccol = productTable.find('td:nth-child(' + (parseInt(mfpnIndex)+1) + '),th:nth-child(' + (parseInt(mfpnIndex)+1) + ')');
    firstcol.remove();
    seccol.remove();

    $('a[href*=1000002]').parent().empty(); // remove
    productTable.find('th:contains("Manufacturer Part Number")').each(function() {
        $(this).text('Part# & Manu');
    });
    productTable.find('th:contains("Number")').each(function() {
        $(this).text($(this).text().replace('Number', '#'));
    });
    $('#ColSort1000002,#ColSort-1000002,#ColSort1000001,#ColSort-1000001').parent().parent().empty();

    // $('.quantity-form').css({'position':'relative', 'left': ($('.qtyAvailable:first').position().left-19)+'px'});// hack to fix position

    // Take care of NEW and Rohs icons
    $('.product-indicator-collection').css({'opacity':'.25', 'float':'right'});

    // console.log(productTable);
    addHoverLogo(productTable);
    _log('combinePN() End',DLOG);
}

function combinePNAfterLoad($targetProductTable){
    _log('combinePNAfterLoad() Start',DLOG);
    // var productTable = $('#productTable').eq(0).detach();
    var productTable = $targetProductTable.eq(0);
    var mfpnIndex = productTable.find('tbody>tr:first>td').index('.mfg-partnumber') + 1;
    mfpnIndex = 5;
    // alert('mfpnIndex')
    console.log('mfpnIndex', mfpnIndex, productTable.find('tbody>tr:first>td').index('.mfg-partnumber'))
    // console.log('right here',productTable.find('tbody>tr:first>td').html())
    // console.log( 'mfpnIndex', mfpnIndex, productTable.find('.rd-compare-parts').length, productTable, productTable.find('.mfg-partnumber:first'))
    productTable.find('td:nth-child(' + mfpnIndex + ')').each(function() {
        $(this).append('<br>' + $(this).prev().html() + '<br>' + $(this).next().html());
        $(this).find('a:last').css({'color':'black'}).attr('title','Manufacturer Landing Page');
        
    });
    
    var firstcol = productTable.find('td:nth-child(' + (parseInt(mfpnIndex)-1) + '),th:nth-child(' + (parseInt(mfpnIndex)-1) + ')');
    var seccol = productTable.find('td:nth-child(' + (parseInt(mfpnIndex)+1) + '),th:nth-child(' + (parseInt(mfpnIndex)+1) + ')');
    // console.log(firstcol,seccol)
    firstcol.remove();
    seccol.remove();

    // Take care of NEW and Rohs icons
    productTable.find('.product-indicator-collection').css({'opacity':'.25', 'float':'right'});

    addHoverLogo(productTable);
    _log('combinePNAfterLoad() End',DLOG);
    return productTable;
}

function addHoverLogo($productTable){
	// $('[itemprop="url]')
// $('span[itemprop="name"]').hide()
    // $('#productTable a[href*="Suppliers"]').tooltipster({
	$productTable.find('a[href*="Suppliers"]').tooltipster({
        content: $('<div class=logoHover> <div class=logoHoverContent> </div><div class=logoHoverTitle></div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'bottom',
        interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // minWidth: '90%',
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: function(someitem){$('.logoHoverContent').gmload($(someitem).attr('href')+ ' #logo');}
    });
}

function picsToAccel() {
    _log('picsToAccel() Start',DLOG);
    $('#accContent').empty();
    //var pictureLinkSet = $('img[src*="_tmb"]').parent(); // find the links wrapping all tmb images
    // var pictureSet = $('img[src*="_tmb"]'); // find the links wrapping all tmb images
    var pictureSet = $('.pszoomer'); // find the links wrapping all tmb images
    var piclinkhtml ='';
    pictureSet.each(function(mykey, myvalue) {
        //if statement to cull out consecutive images
        if(pictureSet.eq(mykey - 1).attr('src') != $(this).attr('src')) { 
            var imganchor = $(this).parent();
            imganchor.attr('id', 'popthumb' + mykey);
            piclinkhtml = piclinkhtml +'<a href="#popthumb'+ mykey +'" data-pop="#popthumb'+ mykey +'">'+ imganchor.html() + '</a>';
        } else {}
    });
    _log('picsToAccel() tick1',DLOG);
    $('#accContent').append(piclinkhtml);
    _log('picsToAccel() tick2',DLOG);
    $('#accContent img').each(function(){ $(this).attr('src', $(this).attr('data-blzsrc'));});
    _log('picsToAccel() afterpicturelinkset ',DLOG);

    $('#accContent').append('<< last one');
    
    $('#accContent').on('click','a', function(e){
        e.preventDefault();
        var thishref = $(this).attr('data-pop');
        var pos = $(thishref).position().top;
        $(jQuery.browser.webkit ? "body": "html").animate({scrollTop:pos-200},{
            duration: 500,
            easing: 'swing', 
            complete: function(){
                        $(thishref).parent().parent().css('background-color', '');
                        $(thishref).parent().parent().animate({
                            'backgroundColor': 'pink'
                        }, 500).animate({
                            'backgroundColor': 'lightcyan'
                        }, 1500);
            }
        });
    });  
    // })

    $('#accContent').find('img').toggleClass('pszoomer accelimg hoverborder');

    $('#accContent').hoverIntent(showAccelTmb, hideAccelTmb, '.accelimg');
    $('#accContent').on('mouseenter', '.accelimg', infoHoverIn2);
    $('#accContent').on('mouseleave', '.accelimg', infoHoverOut);
    // $('#accContent').on('click', '.accelimg',function(e) {
    //     var thishref = $(this).parent().attr('href');
    //     $(thishref).parent().parent().css('background-color', '');
    //     $(thishref).parent().parent().animate({
    //         'backgroundColor': 'pink'
    //     }, 500);
    //     $(thishref).parent().parent().animate({
    //         'backgroundColor': 'lightcyan'
    //     }, 1500);
    // });

    _log('picsToAccel() End',DLOG);
}

function infoHoverIn2(e){
    // var infoselector = $(this).parent().attr('href').replace('<a href="', '').replace('"/>', '');
    var targetImageID = $(this).parent().attr('href');
    _log('targetImageID is '+$(targetImageID).attr('href')+ ' .... '+ targetImageID  );
    var info = '';
    var thisitem = $(this);
    $(targetImageID).parent().siblings().each(function(mykey, myval) {
        info += '<b>' + $('#productTable>thead>tr:first>th:eq(' + (mykey + 1) + ')').text() + '</b> : ' + 
        $(this).text() + '<br>';
    });
    $('#itemInfo').html(info).show();   
    $('#itemInfo').position({
        'my': 'left top',
        'at': 'left bottom',
        'of': thisitem,
        'collision':'flip',
        'offset': '0 0',
    });

    //KEEP  This adds the price breaks to each picture
    //$('#itemInfo').append('<div id="breakdown"></div>');
    // $('#breakdown').load($(targetImageID).attr('href') + ' #pricing', function(){
    //  $('#itemInfo').position({
    //  'my': 'right top',
    //  'at': 'right bottom',
    //  'of': thisitem,
    //  'collision':'flip',
    // });
    //});

    //css for border in stylesheet
 }

function infoHoverOut(e) {
    $('#itemInfo').hide();
    //css for border in stylesheet
}

function showAccelTmb(e) {
    $('#bigpic').fadeIn(300);
    $('#bigpic').html('<img src="' + $(this).attr('src').replace('_tmb', '') + '" height="250" width="250">');
    $('#bigpic').position({
        'my': 'left top',
        'at': 'right top',
        'of': $('#itemInfo'),
        'offset': '5 0',
        'collision':'flip',
    });
}

function hideAccelTmb(e) {
    $('#bigpic').hide();
}

function addBreadcrumbHover(){
    //add hover over to the category link of the bread crumbs
    _log('addBreadcrumbHover() Start',DLOG);
    $('h1.seohtagbold').find('a:eq(1)').append(' <i class="fa fa-caret-down fa-lg" style="color:red;"></i>');

    $('h1.seohtagbold').find('a:eq(1)').tooltipster({
        content: $('<div class=priceHover><div class=breadcrumbHoverTitle /> <div class=breadcrumbHoverContent> hit</div></div>'),
        trigger: 'hover',
        delay: 350,
        // contentCloning: true,
        position: 'bottom',
        interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // minWidth: '90%',
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: loadBreadcrumbHover
    });

    _log('addBreadcrumbHover() End',DLOG);
}

function loadBreadcrumbHover(origin){
    var $hoveredObj = $(this);
    if($('.breadcrumbHoverContent').find('ul').length){
        //do nothing because it has already been loaded once
    } else{
        $('.breadcrumbHoverContent').html('Loading....');
        $('.breadcrumbHoverContent').load( $hoveredObj.attr('href') + ' #content>ul', function(){
            var linkcount = $(this).find('li').length;
            if(linkcount > 25){
                $(this).addClass('columnized3');
                $(this).parent().css({'overflow':'auto'});
                $(this).parent().css({'width': '97%'});
            }
            origin.tooltipster('reposition');
        });
    }
}

//--------------------------------------------------


var detailPageInfo = (function(){
    return{  
        getImage : function($pageobject){return $pageobject.find('img[itemprop=image],img[src*=nophoto]').css({'width': '48px', 'height': '48px'});},
        getMPN : function($pageobject){return $pageobject.find('h1[itemprop=model]').text();},
        getManufacturer : function($pageobject){return $pageobject.find('h2[itemprop=manufacturer]').text();}, //could also do contents()
        getDescription : function($pageobject){return $pageobject.find('td[itemprop=description]').text();},
        getPackaging : function($pageobject){return $pageobject.find('.attributes-table-main a[href*="Standard%20Packaging%20Help"]').last().closest('tr').find('td').text();},
        getUnitPrice : function($pageobject){return $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(1)').contents();},
        getQuantityAvailable : function($pageobject){return $pageobject.find('#quantityavailable').html().split('<br>')[0];},
        getMinQuantity : function($pageobject){return $pageobject.find('#pricing>tbody>tr:eq(1)>td:eq(0)').text();}
    };
})();

var detailPageInfo2 = (function(){
    return{  
        getImage : function(pageobject){return '<img width="48px" height="48px" src="'+pageobject.imageLink+'">';},
        getMPN : function(pageobject){return pageobject.manufacturerPartNumber;},
        getManufacturer : function(pageobject){return pageobject.manufacturer;}, //could also do contents()
        getDescription : function(pageobject){return pageobject.description;},
        getPackaging : function(pageobject){return pageobject.packageType;},
        getUnitPrice : function(pageobject){return pageobject.unitPrice;},
        getQuantityAvailable : function(pageobject){return pageobject.quantityAvailable;},
        getMinQuantity : function(pageobject){return pageobject.minimumOrderQuantity;},
        getDetailLink : function(pageobject){return pageobject.detailLink;},
        getDkpn : function(pageobject){return pageobject.reportPartNumber;},
        getNonStock : function(pageobject){return pageobject.nonStock;}
    };
})();

// associated parts function.
var apOld = (function(){
    var columnList = [
        {'name':'Image', 'f': detailPageInfo.getImage,},
        {'name':'Manufacturer Part Number', 'f':detailPageInfo.getMPN},
        {'name':'Manufacturer', 'f':detailPageInfo.getManufacturer},
        {'name':'Description', 'f':detailPageInfo.getDescription},
        {'name':'Packaging', 'f':detailPageInfo.getPackaging},
        {'name':'Unit Price', 'f':detailPageInfo.getUnitPrice},
        {'name':'Quantity Available', 'f':detailPageInfo.getQuantityAvailable},
        {'name':'Min Quantity', 'f':detailPageInfo.getMinQuantity}
    ];
    var cLen = columnList.length;
    var perPage = 5;

    var buildProductViewerBox = function(item){

        var firstRowHTML = '';
        for (var z=0; z<columnList.length; z++){
            firstRowHTML = firstRowHTML+ '<th>' + columnList[z].name + '</th>';
        }
        var allRows = ''
        for(var z=0; z<item.list.length; z++){
            allRows = allRows + buildRowHTML(item.list[z]);
        }
        var itemSel = selectorEscape(item.title)
        
        $('.attributes-optional-table').append(
            '<div id="asd-id-'+itemSel+'" class="asd-containerOld panel panel-default">'+
                '<div class="asd-title panel-heading">'+item.title+' ('+ item.list.length +')</div>'+
                '<div class="asd-content panel-body">'+
                '<table id="table-'+itemSel+'" class="asd-table tstripe"> '+
                    '<thead><tr>'+firstRowHTML+'</tr></thead>'+
                    '<tbody>'+allRows+'</tbody>'+
                '</table>'+
                '</div>'+
            '</div>'
        );
        
        $('#asd-id-'+itemSel).data('itemlist', item.list);
        
        $('#table-'+itemSel).find('tbody tr').each(function(ind){
            $(this).data('linkobj',item.list[ind]);
            $(this).data('boxSel', $('#asd-id-'+itemSel));
        });
        
        $('#table-'+ itemSel).find('tbody>tr').slice(perPage).hide();

        if (item.list.length > perPage){
            addPageination(itemSel, item.list.length);
        }

        addFilterAllForm($('#asd-id-'+itemSel));

        var listlength = (item.list.length >= perPage) ? perPage :item.list.length;
        for(var z=0; z<listlength; z++){
            getDetailPage(item.list[z], $('#asd-id-'+itemSel));
        }

    },

    addPageination = function (itemSel, listLen) {
        $('#asd-id-'+itemSel).find('.asd-content').append('<div class="pagination page-'+itemSel+'">'+
                '<a href="#" class="first" data-action="first">&laquo;</a>'+
                '<a href="#" class="previous" data-action="previous">&lsaquo;</a>'+
                '<input type="text" readonly="readonly" data-max-page="'+Math.ceil(listLen/perPage)+'" />'+
                '<a href="#" class="next" data-action="next">&rsaquo;</a>'+
                '<a href="#" class="last" data-action="last">&raquo;</a>'+
            '</div>');

            $('.page-'+itemSel).jqPagination({
                paged: function(page) {
                    var $rows = $('#table-'+itemSel+' tbody > tr')
                    $rows.hide()// do something with the page variable
                    var $showing = $rows.slice((page*5 - 5),(page * 5)).show()// do something with the page variable
                    $showing.not('.filled').each(function(){
                        getDetailPage($(this).data('linkobj'), $(this).data('boxSel'));
                    })
                }
            });
    }

    buildRowHTML = function(pnlinkobj){
        var row = "";
        for (var i = 0; i < columnList.length; i++) {
            row = row + '<td class="col-'+selectorEscape(columnList[i].name)+'"></td>';
        };
        row = '<tr class="'+selectorEscape(pnlinkobj.pn)+'">' + row + '</tr>'
        return row;
    },

    getDetailPage =    function (pnlinkobj, $boxSel){
        var jqxhr = $.get(pnlinkobj.href)
                .done(function(data){
                    var $d = $(data);
                    fillRow($d, pnlinkobj, $boxSel)
                })
                .fail(function(){console.log(pnlinkobj, ' failed');})
                .always(function(){});
    },
    fillRow = function ($DetailPageContent, pnlinkobj, $boxSel){
        var rowSel = selectorEscape(pnlinkobj.pn);
        var row = $('.'+rowSel);

        for (var x=0; x<cLen; x++){
            row.not('.filled').find('.col-'+selectorEscape(columnList[x].name)).append(columnList[x].f($DetailPageContent));
            if (x < 2){ row.find('.col-'+selectorEscape(columnList[x].name)).contents().wrap('<a href="'+pnlinkobj.href+'" />') ; }
        }
        row.addClass('filled');
        console.log('addrowdone');
    },

    getAssociationListFromElem = function (parentElem){
        var pnlinkarray = []
        parentElem.find('.more-expander-item').each(function(){
            pnlinkarray.push({
                'href': $(this).find('a:first').attr('href'),
                'pn': $(this).find('a:first').text()
            });
        });
        //console.log(pnlinkarray);
        return pnlinkarray;
    },

    addFilterAllForm = function($boxSel){
        var pnlist = '';
        var itemlist = $boxSel.data('itemlist');
        itemlist.forEach(function(x){ pnlist = pnlist+'<input type=hidden name="part" value="'+x.pn+'">'});
        console.log(pnlist);
        var formHTML = '<div style="float:right;"><div style="clear:both; margin:0px 15px 1px 0px;"><form  action="/scripts/DkSearch/dksus.dll" method=get>'+
        '<input type=submit value="View All '+itemlist.length+'">'+ '<input id="associatedInStock" type="checkbox" class="css-checkbox"><label class="css-label" for="associatedInStock">In Stock</label>'+
            pnlist+
        '</form></div></div><div style="clear:both;"></div>';
        $boxSel.find('.asd-content').append(formHTML);
    },

    addAssociatedImageHover = function(){
        _log('associatedImageHover() Start',DLOG);

       $('body').append('<img border="0/" src="" style="display: none; box-shadow: 0 0 10px 5px #888; position:absolute;" class="pszoomie2 psshadow" id="pszoomie2">');

        $('.asd-containerOld').hoverIntent({
            over: function () {
                $('#pszoomie2').attr('src','');
                $('#pszoomie2')
                .attr('src', $(this).attr('src'))
                .show('fade', 200)
                .position({
                    my : 'right middle',
                    at : 'left middle',
                    of: $(this), 
                    offset : '-10 0',
                    collision : 'fit fit'
                });
            },
            out: function () {
                $('.pszoomie2').fadeOut(100);
            },
            'selector': '.col-Image img'
        }
        );
        _log('associatedImageHover() End',DLOG);
    },

    addAssociatedProductViewer = function (){
        var boxDataArray = [];
        // $('.expander-div-10').each(function(){
        //     boxDataArray.push({
        //         'title': $(this).closest('tr').find('th').text(), 
        //         'list':getAssociationListFromElem($(this))
        //     });
        //     $(this).closest('tr').hide()
        // });

        $('.expander-div-5').each(function(){
            if($(this).find('.product-details-also-evaluated').length < 1){
                boxDataArray.push({
                    'title': $(this).parent().find('.beablocktitle').text().split('\n')[0], 
                    'list':getAssociationListFromElem($(this))
                });
            }
        });
        $('.attributes-optional-table .rd-extra-option').hide();
        for (var i=0; i<boxDataArray.length; i++){
            buildProductViewerBox(boxDataArray[i]);
        }
        addAssociatedImageHover();
    };

    return {'addAssociatedProductViewer': addAssociatedProductViewer};
})();

var ap= (function(){
    var columnList = [
        {'name':'Image', 'f': detailPageInfo2.getImage,},
        {'name':'Manufacturer Part Number', 'f':detailPageInfo2.getMPN},
        {'name':'Manufacturer', 'f':detailPageInfo2.getManufacturer},
        {'name':'Description', 'f':detailPageInfo2.getDescription},
        // {'name':'Packaging', 'f':detailPageInfo2.getPackaging},
        {'name':'Unit Price', 'f':detailPageInfo2.getUnitPrice},
        {'name':'Quantity Available', 'f':detailPageInfo2.getQuantityAvailable},
        // {'name':'Min Quantity', 'f':detailPageInfo2.getMinQuantity}
    ];
    var assTypes = [
        "MatingProducts",
        "AssociatedProduct"
    ];

    // reference: description, detailLink, imageLink, manufacturer, manufacturerPartNumber, minimumOrderQuantity, 
    // nonStock, packageType, quantityAvailable, reportPartNumber, unitPrice
    var cLen = columnList.length;
    var perPage = 5;



    var buildProductViewerBox = function(associationSet){
        var firstRowHTML = '';
        for (var z=0; z<columnList.length; z++){
            firstRowHTML = firstRowHTML+ '<th>' + columnList[z].name + '</th>';
        }
        var allRows = '';
        for(var z=0; z<associationSet.list.length; z++){
            allRows = allRows + buildRowHTML(associationSet.list[z]);
        }
        var escTitle = selectorEscape(associationSet.title);
        
        $('.attributes-optional-table').append(
            '<div id="asd-id-'+escTitle+'" class="asd-container panel panel-default">'+
                '<div class="asd-title panel-heading">'+associationSet.title+' ('+ associationSet.list.length +')</div>'+
                '<div class="asd-content panel-body">'+
                '<table id="table-'+escTitle+'" class="asd-table tstripe"> '+
                    '<thead><tr>'+firstRowHTML+'</tr></thead>'+
                    '<tbody>'+allRows+'</tbody>'+
                '</table>'+
                '</div>'+
            '</div>'
        );
        
        $('#asd-id-'+escTitle).data('associationSetlist', associationSet.list);
        
        $('#table-'+escTitle).find('tbody tr').each(function(ind){
            $(this).data('linkobj',associationSet.list[ind]);
            $(this).data('boxSel', $('#asd-id-'+escTitle));
        });
        
        $('#table-'+ escTitle).find('tbody>tr').slice(perPage).hide();
        if (associationSet.list.length > perPage){
            addPageination(escTitle, associationSet.list.length);
        }
        addFilterAllForm($('#asd-id-'+escTitle), associationSet.viewAllLink, associationSet.list.length); //addback

        var listlength = (associationSet.list.length >= perPage) ? perPage :associationSet.list.length;
        for(var z=0; z<listlength; z++){
            var associationSetData = $('#table-'+escTitle).find('.'+selectorEscape(associationSet.list[z].manufacturerPartNumber)).data('linkobj');
            var $boxSel = $('#table-'+escTitle).find('.'+selectorEscape(associationSet.list[z].manufacturerPartNumber)).data('boxSel');
            fillRow(associationSetData , $boxSel);
        }

    },

    fillRow = function (itemData, $boxSel){
        var rowSel = selectorEscape(itemData.manufacturerPartNumber);
        var row = $('.'+rowSel);

        for (var x=0; x<cLen; x++){
            row.not('.filled').find('.col-'+selectorEscape(columnList[x].name)).append(columnList[x].f(itemData));
            if (x < 2){ row.find('.col-'+selectorEscape(columnList[x].name)).contents().wrap('<a href="'+itemData.detailLink+'" />') ; }
        }
        row.addClass('filled');
    },

    addPageination = function (itemSel, listLen) {
        $('#asd-id-'+itemSel).find('.asd-content').append('<div class="pagination page-'+itemSel+'">'+
                '<a href="#" class="first" data-action="first">&laquo;</a>'+
                '<a href="#" class="previous" data-action="previous">&lsaquo;</a>'+
                '<input type="text" readonly="readonly" data-max-page="'+Math.ceil(listLen/perPage)+'" />'+
                '<a href="#" class="next" data-action="next">&rsaquo;</a>'+
                '<a href="#" class="last" data-action="last">&raquo;</a>'+
            '</div>');

            $('.page-'+itemSel).jqPagination({
                paged: function(page) {
                    var $rows = $('#table-'+itemSel+' tbody > tr');
                    $rows.hide()// do something with the page variable
                    var $showing = $rows.slice((page*5 - 5),(page * 5)).show()// do something with the page variable
                    $showing.not('.filled').each(function(){
                        var itemData = $(this).data('linkobj');
                        var $boxSel = $(this).data('boxSel');
                        fillRow(itemData, $boxSel)
                        // getDetailPage($(this).data('linkobj'), $(this).data('boxSel'));
                    })
                }
            });
    },



    buildRowHTML = function(item){
        var row = "";
        for (var i = 0; i < columnList.length; i++) {
            row = row + '<td class="col-'+selectorEscape(columnList[i].name)+'"></td>';
        };
        row = '<tr class="'+selectorEscape(item.manufacturerPartNumber)+'">' + row + '</tr>'
        return row;
    },

    getAssociationListFromElem = function (parentElem){
        var pnlinkarray = []
        parentElem.find('.more-expander-item').each(function(){
            pnlinkarray.push({
                'href': $(this).find('a:first').attr('href'),
                'pn': $(this).find('a:first').text()
            });
        });
        console.log('>>>>>>>>>>>',pnlinkarray);
        return pnlinkarray;
    },

    addFilterAllForm = function($boxSel,viewAllLink,listlength){
        var pnlist = '';
        // var itemlist = $boxSel.data('itemlist');
        // itemlist.forEach(function(x){ pnlist = pnlist+'<input type=hidden name="part" value="'+x.pn+'">'});
        // console.log(pnlist);
        var formHTML = '<div style="float:right;" id="'+$boxSel.attr('id')+'-link""><div style="clear:both; margin:0px 15px 1px 0px;">'+
        '<a id="'+$boxSel.attr('id')+'-link"" href="'+viewAllLink+'" target="_blank">View All <span>'+listlength+'</span> </a>'+ '<input id="'+$boxSel.attr('id')+'-stock" type="checkbox" class="css-checkbox"><label class="css-label" for="'+$boxSel.attr('id')+'-stock">In Stock</label>'+
            
        '</div></div><div style="clear:both;"></div>';

        $boxSel.find('.asd-content').append(formHTML);

        $('#'+$boxSel.attr('id')+'-stock').data('allstocklink', viewAllLink)

        $('#'+$boxSel.attr('id')+'-stock').click(function(){
            if($(this).prop('checked') == true ){
                console.log('ischecked')
                $('#'+$boxSel.attr('id')+'-link a').attr('href', $(this).data('allstocklink')+'&stock=1')
            }else{
                console.log('is not checked')
                $('#'+$boxSel.attr('id')+'-link a').attr('href', $(this).data('allstocklink'))
            }
            $(this).parent().parent().find('span').load($('#'+$boxSel.attr('id')+'-link a').attr('href')+' .matching-records:first', function(){
                $(this).text($('.matching-records').text().split(':')[1])
            })
        });
    },

    addAssociatedImageHover = function(){
        _log('associatedImageHover() Start',DLOG);

       $('body').append('<img border="0/" src="" style="display: none; box-shadow: 0 0 10px 5px #888; position:absolute;" class="pszoomie2 psshadow" id="pszoomie2">');

        $('.asd-container').hoverIntent({
            over: function () {
                $('#pszoomie2').attr('src','');
                $('#pszoomie2')
                .attr('src', $(this).attr('src').replace('_tmb', '_sml'))
                .show('fade', 200)
                .position({
                    my : 'right middle',
                    at : 'left middle',
                    of: $(this), 
                    offset : '-10 0',
                    collision : 'fit fit'
                });
            },
            out: function () {
                $('.pszoomie2').fadeOut(100);
            },
            'selector': '.col-Image img'
        }
        );
        _log('associatedImageHover() End',DLOG);
    },

    addAssociatedProductViewer = function (){
        var boxDataArray = [];
        // $('.expander-div-10').each(function(){
        //     boxDataArray.push({
        //         'title': $(this).closest('tr').find('th').text(), 
        //         'list':getAssociationListFromElem($(this))
        //     });
        //     $(this).closest('tr').hide()
        // });

        // $('.expander-div-5').each(function(){
        //     if($(this).find('.product-details-also-evaluated').length < 1){
        //         boxDataArray.push({
        //             'title': $(this).parent().find('.beablocktitle').text().split('\n')[0], 
        //             'list':getAssociationListFromElem($(this))
        //         });
        //     }
        // });
        // $('.attributes-optional-table .rd-extra-option').hide();



        boxDataArray = getAllAssociations();
        for (var i=0; i<boxDataArray.length; i++){
            buildProductViewerBox(boxDataArray[i]);
        }
        addAssociatedImageHover();
        $('.product-details-also-evaluated').closest('.beablock').detach();
        // handleExpanderDiv5();
    };

    return {'addAssociatedProductViewer': addAssociatedProductViewer};
})();

function handleExpanderDiv5(){ //alternate package, direct subs, etc
    $('.expander-div-5').each(function(){
        // $(this).closest('.beablock').hide();
        getInfoFromExpanderDiv5($(this).closest('.beablock'))
    });
}
function getInfoFromExpanderDiv5($beablock){
    var retval = {};

    retval['title'] = $beablock.find('.beablocktitle').text().split('|')[0].trim();
    $beablock.find('table.more-expander tbody>tr').gt(0).each(function(){
        retval['data'].push()
    });
    console.log('expander5 retval', retval)
}
function getInfoFromRow($tr){
    var rowInfo = {
        'Digi-Key Part Number': $tr.eq(0).text(),
        'link': $tr.eq(0).find('a').attr('href'),
        'Manufacturer': $tr.eq(1).text(),
        'Packaging': $tr.eq(1).text(),
        'packaging': $tr.eq(1).text(),
        'quantityavailable': $tr.eq(1).text(),
        'mpn': $tr.eq(1).text(),
    };
    $tr.each(function(){

    });
}
function getAssociationNames(){
    var names = [];
    $('.expander-div-10').each(function(){
        names.push($(this).closest('tr').find('th').text()); 
        $(this).closest('tr').hide();
    });
    $('.expander-div-5').each(function(){
        if($(this).parent('.beablock:contains("Direct Substitute")').length == 1){
            names.push('Direct Subs')
            $(this).parent('.beablock').detach();
        }
    })
    return names;
}
function getAssociationDataFromPageByType(assType){
    var escaped = selectorEscape(assType);
    return (window.eval(escaped));
}
function getAllAssociations(){
    var assocationData = [];
    var names = getAssociationNames();
    names.forEach(function(el,idx,arr){
        var escaped = selectorEscape(el);
        var alldata = window.eval(escaped);
        // console.log(window.eval(escaped).slice(1));
        assocationData.push({
            'title': el,
            'list': alldata.slice(1),
            'viewAllLink': alldata[0].showAllLink
        }) ;
    });
    return assocationData;
}


//*************************** TODO fix collision events 
// function addDashNDHover(){
//     var DashNDConfig = {
//         id:'DashNDHover', 
//         title : 'Associated Product',
//         message : 'Loading....', 
//         hoverOver : $('a:contains("-ND")'), 
//         highlight : true,
//         interactive : true, 
//         my : 'left bottom',
//         at : 'right top', 
//         offset : '0 -20', 
//         collision : 'fit flipfit',
//         someFunc : loadDashNDHover
//     };
//     createHoverWindow(DashNDConfig);
// }

// function loadDashNDHover($hoveredObj, wcon){
//     $("#DashNDHoverContent").text('Loading....');
//     //_log('wcon title '+ wcon.title);
//     $("#DashNDHoverContent").load($hoveredObj.attr('href')+' table[itemtype="http://schema.org/Product"]', function(){
//         //edit add to order button functionality so it will work    
//         $('#DashNDHover').position({
//             my : 'left bottom',
//             at : 'right top',
//             of: $hoveredObj, 
//             offset : '0 -10',
//             collision : 'fit fit'
//         });

//         $(this).find('form').attr('method');
//     });
// }



function addCartHover(){
     _log('addCartHover() Start',DLOG);

    //avoid applying cart logic to the cart page
    if(window.location.pathname.indexOf('Ordering') == -1 ){

        $('#content').after('<div class=cartHoverContainer style="display:none;"><div></div><div class=cartHoverContent></div></div>');
        // $('<div class=cartHoverContainer><div></div><div class=cartHoverContent></div></div>').insertAfter('#content').hide();

        loadCartDetails();
    }
    _log('addCartHover() End',DLOG);

}

function loadCartDetails(serialstring){
    _log('loadCartDetails() Start',DLOG);
    if(serialstring == undefined){serialstring = '';}
    var ordet = ' #ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_ordOrderDetails';
    $('.cartHoverContent').gmload('http://www.digikey.'+theTLD+'/classic/Ordering/AddPart.aspx?'+serialstring+ordet, function(){
        $('#cartquant').text( ' ('+($('img[src*="close-x"]').length)+')');
        _log('loadCartDetails() loaded',DLOG);

        $('#cartlink').tooltipster({
        // content: $('<div class=cartHover><div class=cartHoverTitle /> <div class=cartHoverContent> hit</div></div>'),
        content: $('.cartHoverContent'),
        trigger: 'hover',
        delay: 350,
        contentCloning: true,
        position: 'bottom',
        interactive: true,
        // positionTracker: true,
        offsetX: -30,
        onlyOne: true,
        // iconTouch: true,
        theme: 'tooltipster-shadow',
        functionReady: function(){console.log('hovering')}
        })
    });
    _log('loadCartDetails() End',DLOG);
}


function formatOrderingPage(){
    if($('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_ordOrderDetails').length){
        _log('inlineChangeQty() Start',DLOG);
        $('form').show();
        // getCartImages();
        _log('inlineChangeQty() End',DLOG);
    }
}


function makeImageHolder(){
    _log('makeImageHolder() Start',DLOG);
    //for detail page image holder

    $('.image-disclaimer').after('<div id="imageTray"></div>')
    var images = getImageLinks();
    images.forEach(function(image){
        $('#imageTray').append('<img class="trayThumbnail" height=64px style="border:1px solid #ccc; margin:1px;" src="'+image+'">');
    });
    $('.trayThumbnail').mouseenter(function(){
        console.log('hovering', $(this).attr('src'))
        $('.image-table img:first').attr('src', $(this).attr('src'));
        $('.image-table a:first').attr('href', $(this).attr('src'));
    });
    $('.image-disclaimer').hide();

    $('.image-table').insertBefore($('.product-details-main'));
    $('.beablock-image').css({'margin-left':'0px', 'border':'1px solid #ccc'});
    $('.beablock-image img').css({'border':'1px solid #ccc'});

    _log('makeImageHolder() End',DLOG);
}

function getImageLinks(){
    //for detail page image holder
    _log('getImageLinks() Start',DLOG);
    var imageURLs = [];
    var images = $('.attributes-table-main').find('a[href$=jpg], a[href$=JPG]').each(function(){
        imageURLs.push($(this).attr('href'));
    });
    images.parent().parent().hide();
    _log('getImageLinks() End',DLOG);
    return imageURLs;
}


// Loging function
function _log(somestring, detailed_logging, textcolor, bgcolor){
    if (detailed_logging == null) detailed_logging=true;
    try{
        if(detailed_logging == true){console.log('%c'+(Date.now()-starttimestamp)+'ms '+(Date.now()-sincelast)+'[as] '+somestring, 'background: '+bgcolor+'; color:'+textcolor+';');}
        sincelast = Date.now();
    }
    catch(err){}
}



function formatFastAddPage(){
    if($('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtQty1').length){
        $('p').add('#aspnetForm').show();
        $('#mainContent').before('<b>Quick Paste</b><br>Copy multiple part numbers and quantities from a spreadsheet and paste into this box (experimental).  '+
            '<br>Exclude any header lines.  It should be able to pick out Quantity and Part Number in either order. Customer Ref not yet supported.  <br />'+
            '<textarea rows="2" cols="40" id="pastebox"></textarea> <br /><div class="pure-button button-small myRedButton" style="width:40px">OK</div>');
        
        $('#pastebox').change(function(){
            var lines = $('#pastebox').val().split(/\n\r?/gi);
            var line = [];
            var cols = [];
            var farray = [];
            for(var x=0; x<=lines.length; x++){
                line = lines[x];
                if(line != undefined){
                    if(line.split(/\t/g).length == 2){
                        cols = line.split(/\t/g);
                        if (cols[0].indexOf('-ND') != -1){
                            farray.push([cols[0],cols[1]]);
                            _log('DK# in first column, adding to farray '+ [cols[0],cols[1]] );
                        }else if (cols[1].indexOf('-ND') != -1){
                            farray.push([cols[1],cols[0]]);
                            _log('DK# in second column, adding to farray '+ [cols[1],cols[0]] );
                        }else {
                            alert('not finding -nd');
                        }
                    }

                }
                
                _log(farray.length);
                //_log(lines[x]);
            }
            addMoreRows(farray);
            var $onRow = $('.oddrow:first');
            for(var x=0; x<farray.length; x++){
                $onRow.find('input:eq(0)').val(farray[x][1]);
                $onRow.find('input:eq(1)').val(farray[x][0]);
                $onRow = $onRow.next();
            }
            $('#pastebox').val('');
        });
    }
}
function addMoreRows(farray){
    if(farray.length > 20){
        for(var x=21; x<farray.length; x++){
            $('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_tblAddParts').find('tr:last').after(
                '<tr class="evenrow" style="border-width:1px;border-style:solid;">'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+ x +
                '</td>'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+
                '<input id="ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtQty'+x+
                '" type="text" style="width:65px;" maxlength="9" name="ctl00$ctl00$mainContentPlaceHolder$mainContentPlaceHolder$txtQty'+x+'">'+
                '</td>'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+
                '<input id="ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtPart'+x+'" type="text" style="width:290px;" maxlength="48" name="ctl00$ctl00$mainContentPlaceHolder$mainContentPlaceHolder$txtPart'+x+'">'+
                '</td>'+
                '<td class="tblborder" style="border-width:1px;border-style:solid;">'+
                '<input id="ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_txtCref'+x+'" type="text" style="width:145px;" maxlength="48" name="ctl00$ctl00$mainContentPlaceHolder$mainContentPlaceHolder$txtCref'+x+'">'+
                '</td>'
            );
        }
    }
}





//useful for unbinding functions that are outside of the scope of greasemonkey
// location.assign("javascript:$(window).unbind('scroll resize');void(0)");


//note this.href is better than $(this).attr('href');



