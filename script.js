// const access_token = '98973b86d1e66c39c3b486ba26ff200346f0fff93326b2d92ebc8b0fd40ad71686ee3b57b75609f66980b'

async function request(method = '', parametrs = {}) {
    const token = 'access_token=86e4534556363a7aeff5655b33fd826432b25495c7bf74fea94dacfab56fbf6d47cf650d32db1497f7882'
    const version = 'v=5.52'
    const url = `https://api.vk.com/method/${method}?${token}&${version}${parametrs.toStringForURL()}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.error) {
            throw new Error(data.error.error_msg)
        } else {
            return data.response
        }
    } catch (error) {
        console.log(error.message)
    }
}

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

function getURLString(protocolAddressPath, parametrs) {
    return `${protocolAddressPath}?${parametrs.toStringForURL()}`
}





function addScript(src) {
    var elem = document.createElement('script')
    elem.src = src
    document.head.appendChild(elem)
    elem.onload = function () {
        elem.remove()
    }
}

// function response(data) {
//     console.log(data)
// }

// addScript(getURLString('https://api.vk.com/method/friends.get', parametrs))

Object.prototype.toStringURLParameters = function () {
    const keys = Object.keys(this)
    return keys.map(key => `${key}=${typeof this[key] == 'object' ? this[key].join() : this[key]}`).join('&')
}



if (document.location.search[0] = '?') {
    let parametrs = document.location.search.slice(1).split('&').map(i => i.split('=')).find(([key, _]) => key === 'code')
    if (parametrs) {
        console.log('success')
    } else {
        const authorizationParametr = {
            client_id:  7636014,
            redirect_uri: 'https://keet5.github.io/show-five-friends-from-vk/',
            display: 'popup',
            scope: 'friends',
            revoke: 1
        }

        window.location.replace('https://oauth.vk.com/authorize?' + parametrs.toStringURLParameters())
    }
}
