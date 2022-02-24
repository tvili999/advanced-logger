
const getElementPath = (element) => {
    let result = [element.tagName];
    while(element.parentElement) {
        const parent = element.parentElement
        const index = [...parent.children].indexOf(element);

        const classNames = [...element.classList].map(x => "." + x).join("")
        result.push(`${parent.tagName}${classNames}[${index}]`)

        element = parent;
    }

    result.reverse();

    return result;
}

export const builtinMutators = [
    {
        test: (item) => item instanceof HTMLElement,
        mutate: (item) => ({
            tagName: item.tagName,
            attributes: item.getAttributeNames().reduce((obj, attrib) => {
                obj[attrib] = item.getAttribute(attrib)
                return obj;
            }, {}),
            path: getElementPath(item),
            innerHTML: item.innerHTML.length < 200 ? item.innerHTML : "Too long"
        })
    }
];
