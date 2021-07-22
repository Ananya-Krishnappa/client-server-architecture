const extractIdFromUrl = () => {
    let url = window.location.href;
    var vars = url.split('?');
    var pair;
    if (vars[1]) {
        pair = vars[1].split('=');
        return pair[1];
    }
    return pair;
}