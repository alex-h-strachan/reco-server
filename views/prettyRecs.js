function prettyRecs(arr) {
    var vals = arr.map( r => {
// eslint-disable-next-line indent
return `<div class="rec">
    <div>${r.name}</div>
    <div>${r.id}</div>
    <div>${r.description}</div>
</div><br>`;
    });

    return vals.join('');
}

module.exports = prettyRecs;