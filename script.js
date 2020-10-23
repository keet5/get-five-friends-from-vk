Object.prototype.toStringURLParameters = function () {
    const keys = Object.keys(this)
    return keys.map(key => `${key}=${typeof this[key] == 'object' ? this[key].join() : this[key]}`).join('&')
}

const request = (function () {
    let counter = 0
    return async function (method = '', parametrs = {}) {
        const id = counter++

        parametrs['v'] = 5.52
        parametrs['callback'] = 'response' + id

        const src = `https://api.vk.com/method/${method}?${parametrs.toStringURLParameters()}`


        return new Promise((resolve, reject) => {
            window['response' + id] = function (data) {
                resolve(data.response)
                delete window['response' + id]
                script.remove()
            }

            const script = document.createElement('script')
            script.src = src
            document.head.appendChild(script)

            script.onerror = () => { reject(new Error('access error')) }
        })
    }
})()

async function getFiveRandomFriends(access_token) {
    const parametrs = {
        access_token,
        count: 5,
        order: 'random',
        offset: 0,
        fields: ['photo_50'],
    }

    let response = await request('friends.get', parametrs)
    return response.items
}

let access_token = document.location.hash.slice(1).split('&').map(i => i.split('=')).find(([key, _]) => key === 'access_token')

if (access_token) {
    getFiveRandomFriends(access_token[1]).then(friends => console.log(friends))
} else {
    const authorizationParametr = {
        client_id: 7636014,
        redirect_uri: 'https://keet5.github.io/show-five-friends-from-vk/',
        display: 'popup',
        scope: 'friends',
        response_type: 'token',
    }
    window.location.replace('https://oauth.vk.com/authorize?' + authorizationParametr.toStringURLParameters())
}



