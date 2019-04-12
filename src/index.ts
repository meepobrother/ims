import { join } from "path";

var m3u8 = require('m3u8');
var fs = require('fs');

var parser = m3u8.createStream();

var file = fs.createReadStream(join(__dirname, 'index.m3u8'));
file.pipe(parser);

parser.on('item', function (item) {
    console.log(item)
    // emits PlaylistItem, MediaItem, StreamItem, and IframeStreamItem
});
parser.on('m3u', function (m3u) {
    console.log(m3u)
    // fully parsed m3u file
});