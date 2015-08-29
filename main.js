



$(document).ready(function () {

    /* generate the input and labels */
    $(".tabs").each(function () {

        initialize_tabs($(this));

    });

    /* when a tab radiobox changes, update what's displayed */
    /*$("input.tab").change(function() {

        update_tab_group($(this).attr("name"));

    });*/

    /* and when the document loaded, we also update all the states to initialize everything */
    /*$("input.tab").each(function () {

        update_tab($(this));

    });*/

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
            input.attr('checked', '');
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


function update_tab(tab)
{
    var id = tab.attr("id");

    var isChecked = tab.is(":checked");

    var affectedContentElements = $("[data-tab=" + id + "]");

    if (isChecked)
        affectedContentElements.show();
    else
        affectedContentElements.hide();
}

function update_tab_group(tabGroupName)
{
    /* for each tab in that group */
    $('input.tab[name="' + tabGroupName + '"]').each(function () {

        update_tab($(this));

    });
}