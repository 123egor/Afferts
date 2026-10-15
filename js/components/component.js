function getDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
}

function getSpan(text, className) {
    const span = document.createElement('span');
    span.textContent = text;
    span.className = className;
    return span;
}
function getLink(href, text, className) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    link.className = className;
    return link;
}

function getBtn(text, className) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = className;
    return btn;
}

function getList(className) {
    const list = document.createElement('ul');
    list.className = className;
    return list;
}

function getListItem(text, className) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    listItem.className = className;
    return listItem;
}

function getH2(text, className) {
    const h2 = document.createElement('h2');
    h2.textContent = text;
    h2.classList.className(className);
    return h2;
}

function getImg(src, alt, className) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add(className);
    return img;
}

function getSvg(className) {
    const svg = document.createElementNS('svg');
    svg.classList.add(className);
    return svg;
}

function getUse(xlinkHref) {
    const use = document.createElementN('use');
    use.setAttribute('xlink:href', xlinkHref);
    use.xlinkHref = xlinkHref;
    return use;
}

export {
    getDiv,
    getSpan,
    getLink,
    getBtn,
    getList,
    getListItem,
    getH2,
    getImg,
    getSvg,
    getUse
};