

$(document).ready(function () {

    /* highlight code */
    SyntaxHighlighter.defaults['gutter'] = false;
    SyntaxHighlighter.all();

    /* generate the input and labels */
    $(".tabs").each(function () {

        initialize_tabs($(this));

    });

    /* initialize snippets */
    $('[data-snippet-source]').each(function () {

        var parent = $(this);

        var source = parent.attr('data-snippet-source');
        var type = parent.attr('data-snippet-type');

        /* If they didn't specify a type */
        if (!type) {

            /* Get the type from the file type */
            type = source.split('.').pop().toLowerCase();

            switch (type)
            {
                case "cs":
                    type = "csharp";
                    break;
            }

        }

        parent.text("Loading...");

        $.ajax({
            url: source,
            dataType: "text"
        }).done(function (data) {

            /* get the scroll position before adding */
            var pageYOffsetBefore = window.pageYOffset;
            var YPositionOfElement = parent.offset().top;
            var documentHeightBefore = $(document).height();

            /* compute whether item will be affecting our scroll position, based on whether the item is above our view or not */
            var doesAffectScrollPosition = YPositionOfElement < pageYOffsetBefore;

            /* remove all children */
            parent.empty();

            var newChild = document.createElement("pre");
            newChild.appendChild(document.createTextNode(data));
            newChild.setAttribute("class", "brush: " + type);

            /* push the item that will become the highlighted */
            parent.append(newChild);

            /* Have SyntaxHighlighter run on the new child */
            SyntaxHighlighter.highlight({}, newChild);

            /* if the item affects our scroll position */
            if (doesAffectScrollPosition) {

                var documentHeightAfter = $(document).height();

                var scrollBy = documentHeightAfter - documentHeightBefore;

                window.scrollBy(null, scrollBy);
            }

        }).fail(function () {

            parent.text("Failed to load.");

        });;

    });


    // Initialize the "AppsUsingControl" control
    initializeAppsUsingControl();

});

var _uniqueIdNum = 0;

function getNewUniqueName()
{
    return 'myUniqueId' + _uniqueIdNum++;
}

function initialize_tabs(tabs_parent)
{
    var groupName = getNewUniqueName();

    var first = true;

    var elementsToAdd = [];

    tabs_parent.children('[data-tab]').each(function () {

        var id = getNewUniqueName();

        var input = jQuery('<input/>',
        {
            id: id,
            type: 'radio',
            name: groupName
        });

        /* first one gets checked by default */
        if (first)
        {
            input.attr('checked', true);
            first = false;
        }

        elementsToAdd.push(input);


        elementsToAdd.push(jQuery('<label>',
            {
                text: $(this).attr("data-tab"),
                "for": id
            }));

    });

    /* reverse the array so when we add, we add in order */
    elementsToAdd.reverse();

    /* and then add at the beginning */
    elementsToAdd.forEach(function (el) {
        tabs_parent.prepend(el);
    });
}


function initializeAppsUsingControl() {

    $(".apps-using-control").each(function () {

        var container = $(this);

        // Add the screenshot container
        var screenshotElement = document.createElement("div");
        screenshotElement.className = "app-using-control-screenshot";
        container.append(screenshotElement);

    })

    $('.app-using-control[data-icon][data-screenshot]').each(function () {

        var parent = $(this);

        // Get and clear the inner text
        var name = parent.text();
        parent.text("");

        var icon = parent.attr('data-icon');
        var screenshot = parent.attr('data-screenshot');

        var iconElement = document.createElement("div");
        iconElement.style.backgroundImage = icon;
        parent.append(iconElement);

        var nameElement = document.createElement("span");
        nameElement.innerText = name;
        parent.append(nameElement);


        parent.hover(function () {

            var screenshotElement = this.parents(".apps-using-control").find(".app-using-control-screenshot");

            screenshotElement.css("background-image", screenshot);
            screenshotElement.css("display", "block");

        }, function () {

            var screenshotElement = this.parents(".apps-using-control").find(".app-using-control-screenshot");

            screenshotElement.css("display", "none");

        });

    });

}