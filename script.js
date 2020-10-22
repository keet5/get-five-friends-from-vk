// const access_token = '98973b86d1e66c39c3b486ba26ff200346f0fff93326b2d92ebc8b0fd40ad71686ee3b57b75609f66980b'



async function getNumberOfFriends() {
    const response = await request('friends.search')
    return response.count
}

async function getFiveRandomFriends() {
    const parametrs = {
        count: 5,
        order: 'random',
        fields: ['nickname', 'photo_50'],
    }
    const response = await request('friends.get', parametrs)

    return response.items
}

function drawFriends(friends) {
    friends.forEach(i => {
        const li = document.createElement('li')
        let img = document.createElement('img')

        li.textContent = `${i['first_name']} ${i['last_name']}`
        img.setAttribute('src', i['photo_50'])
        li.appendChild(img)
        img = document.createElement('img')


        list.appendChild(li)
    })
}

Object.prototype.toStringURLParameters = function () {
    const keys = Object.keys(this)
    return keys.map(key => `${key}=${typeof this[key] == 'object' ? this[key].join() : this[key]}`).join('&')
}

function request(method = '', parametrs = {}) {

    // parametrs['access_token'] = 'b1f4136fdd0cbf2a0b750066a59707654a0a361df1b33fa6a98e2b459e806a341d6b8c05b1db38481c3a4'
    parametrs['v'] = 5.52
    parametrs['callback'] = 'response'
    const src = `https://api.vk.com/method/${method}?${parametrs.toStringURLParameters()}`


    return new Promise((resolve, reject) => {
        function response(data) {
            resolve(data)
        }

        const script = document.createElement('script')
        script.src = src
        document.head.appendChild(script)
    })
}

if (document.location.search[0] = '?') {
    let code = document.location.search.slice(1).split('&').map(i => i.split('=')).find(([key, _]) => key === 'code')
    if (code) {
        request('friends.get', { access_token: code[1], parametrscount: 10 }).then(response => console.log(response))
    } else {
        const authorizationParametr = {
            client_id:  7636014,
            redirect_uri: 'https://keet5.github.io/show-five-friends-from-vk/',
            display: 'popup',
            scope: 'friends',
            revoke: 1
        }

        window.location.replace('https://oauth.vk.com/authorize?' + authorizationParametr.toStringURLParameters())
    }
}
