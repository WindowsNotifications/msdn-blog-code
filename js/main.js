

$(document).ready(function () {

    /* highlight code */
    SyntaxHighlighter.defaults['gutter'] = false;
    SyntaxHighlighter.all();

    /* generate the input and labels */
    $(".tabs").each(function () {

        initialize_tabs($(this));

    });

    /* initialize snippets */
    $('[data-snippet-source][data-snippet-type]').each(function () {

        var parent = $(this);

        var source = parent.attr('data-snippet-source');
        var type = parent.attr('data-snippet-type');

        parent.text("Loading...");

        $.ajax({
            url: source,
            dataType: "text"
        }).done(function (data) {

            /* remove all children */
            parent.empty();

            var newChild = document.createElement("pre");
            newChild.appendChild(document.createTextNode(data));
            newChild.setAttribute("class", "brush: " + type);

            /* push the item that will become the highlighted */
            parent.append(newChild);

            /* Have SyntaxHighlighter run on the new child */
            SyntaxHighlighter.highlight({}, newChild);

        }).fail(function () {

            parent.text("Failed to load.");

        });;

    });

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