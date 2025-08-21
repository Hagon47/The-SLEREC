var CludoSearch, cludoIsShowingTopHits = false;

/*VARIABLES FROM SERP*/
var EID = cludo_engineId;
var SEARCHURL = cludo_searchUrl;
var LANG = cludo_language;

(function () {
    var cludoSettings = {
        customerId: 10001294,
        engineId: EID,
        searchUrl: SEARCHURL,
        searchInputs: ['cludo-search-input', '.search-form__input-wrapper'],
        customerTemplate: 'Categorized_2022',
        initSearchBoxText: '',
        loading: '<div class="cludo-loader"><div></div><div></div><div></div><div></div></div>',
        endlessScroll: { stopAfterPage: 3, resultsPerPage: 9, bottomOffset: 950 },
        language: LANG,
        translateSearchTemplates: true,
        facets: ['FacetInsightTopic', 'FacetCapability', 'FacetIndustry', 'FacetExpertise', 'FacetType', 'CategorizedGroup'],
        jumpToTopOnFacetClick: false,
        customCallbackAfterSearch: function () {
            //IF ENDLESS SCROLL IS USED
            const showingSplitByCategories = CludoSearch.elemSearchResults.results.querySelectorAll('a[data-facet-name]').length > 0;
            if (showingSplitByCategories) {
                cludoIsShowingTopHits = true;
                //override something that occurred in the SearchResulttemplate handler
                CludoSearch.helpers.addClass(CludoSearch.endlessScrollElements.loadMore, 'cludo-hidden');
            } else {
                cludoIsShowingTopHits = false;
            }

            if(LANG == "zh" || LANG == "jp") { 
                changeFacetFont();
            }

            addResultsClass();

        },
        customCallbackBeforeSearch: function () {

        }
    };
    CludoSearch = new Cludo(cludoSettings);
    CludoSearch.params.topHitsFields = [{ field: 'CategorizedGroup' }];

    if(LANG == "en") {
        CludoSearch.translateProvider.translations["en"]["total_results"] = "{{value}} results";
        CludoSearch.translateProvider.translations["en"]["total_result"] = "{{value}} result";
        CludoSearch.translateProvider.translations["en"]["your_search_on"] = " ";
        CludoSearch.translateProvider.translations["en"]["view_all"] = "View all";
    }else if(LANG == "jp") {
        CludoSearch.translateProvider.translations["jp"]["view_all"] = "すべてのコンサルタントを表示";
    }else if(LANG == "zh") {
        CludoSearch.translateProvider.translations["zh"]["view_all"] = "查看所有";

    }
    

    //IF ENDLESS SCROLL IS USED
    CludoSearch.endlessScrollScrollEvent = function () {
        
        var scrollTop = this.endlessScrollElements.scrolledElement.pageYOffset || this.endlessScrollElements.documentElement.scrollTop;
        if (scrollTop <= 100) {
            this.helpers.removeClass(this.endlessScrollElements.backToTop, 'cludo-opacity1');
            this.helpers.addClass(this.endlessScrollElements.backToTop, 'cludo-opacity0');
        }
        if (scrollTop > 100) {
            this.helpers.removeClass(this.endlessScrollElements.backToTop, 'cludo-opacity0');
            this.helpers.addClass(this.endlessScrollElements.backToTop, 'cludo-opacity1');
        }

        if (cludoIsShowingTopHits) {
            return;
        }

        var scrollHeight = this.endlessScrollElements.documentElement.scrollHeight;
        var offsetHeight = window.innerHeight || document.documentElement.clientHeight;
        var contentHeight = scrollHeight - offsetHeight - this.endlessScroll.bottomOffset;
        if (contentHeight <= scrollTop && contentHeight != 0 && scrollTop != 0 && !this.isLazyLoading) {
            if (this.params.page < this.endlessScroll.stopAfterPage && this.totalDocuments > this.endlessScroll.resultsPerPage && this.params.page < Math.ceil(this.totalDocuments / this.endlessScroll.resultsPerPage)) {
                this.params.page++;
                this.doSearch();
            }
        } 
    }

    CludoSearch.init();
})();

// Enable the load more button to work on the top hits results page. 



function changeFacetFont() {
    if (CludoSearch.translateProvider['language'] == "jp") {
        var targetFacet = document.querySelectorAll('.cludo-facet__header');
        var targetViewMoreButton = document.querySelectorAll('.view-more');

        for (let i = 0; i < targetFacet.length; i++) {
            targetFacet[i].classList.add('cludo-japanese-font');
        }
        for (let i = 0; i < targetViewMoreButton.length; i++) {
            targetViewMoreButton[i].classList.add('cludo-japanese-font');
        }
    }
}

function toggleMobileFacets(e) {
    var element = document.getElementById(e);
    element.classList.toggle("show-all-facets")
}

document.body.addEventListener('click', function (ev) {

    // is dropdown overlay open?
    var dropdown = document.querySelector('.cludo-facet__header-wrapper.open');
    var isClickedOutsideOfDropdownChoice = !ev.target.classList.contains('cludo-facet__value-list-item-anchor');
    var isDropdownHeaderClicked = (ev.target == dropdown) || (ev.target.parentElement == dropdown);

    if (dropdown && isClickedOutsideOfDropdownChoice && !isDropdownHeaderClicked) {
        toggleMe(dropdown);
    }

}, true);


function toggleMe(e) {
    var el = e.parentNode.getElementsByTagName('ul')[0];
    if (el.style.display !== 'none' && el.style.display !== '') {
        el.style.display = 'none';
        CludoSearch.helpers.removeClass(e, 'open');
        //this.elemOverlaySearch.searchBoxContent.style.zIndex = "1";
    } else {
        el.style.display = 'flex';
        CludoSearch.helpers.addClass(e, 'open');
        //this.elemOverlaySearch.searchBoxContent.style.zIndex = "0";
    }
}

function addResultsClass() {
    var container = document.querySelector('.search-results-container');
    container.classList.add("results-shown");
}