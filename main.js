const {
    PeerServer
} = require('peer');
const fetch = require('node-fetch');

async function fetchData(url) {
    let response = await fetch(url)
        .then(response => response.json())
        .then(json => {
            return json
        })
    return response
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var existingids;

async function getExistingIds() {
    existingids = await fetchData('http://127.0.0.1:4001/shoot/peerjs/peers');
    console.log(existingids)
}

// const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const customGenerationFunction = () => (makeid(5))

const peerServer = PeerServer({
    port: 7117,
    path: '/shoot',
    allow_discovery: true,
    generateClientId: customGenerationFunction
});

function makeid(length) {
    getExistingIds()
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}