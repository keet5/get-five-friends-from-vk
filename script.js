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

function addScript(src) {
    console.log(src)
    var elem = document.createElement('script')
    elem.src = src
    document.head.appendChild(elem)
    elem.onload = function () {
        elem.remove()
    }
}

function response(data) {
    console.log(data)
}

async function request(method = '', parametrs = {}) {
    const token = 'access_token=b1f4136fdd0cbf2a0b750066a59707654a0a361df1b33fa6a98e2b459e806a341d6b8c05b1db38481c3a4'
    const version = 'v=5.52'
    const url = `https://api.vk.com/method/${method}?${token}&${version}${parametrs.toStringURLParameters()}`

    try {
        const response = await fetch(url, {
            headers: {
                
            }
        })
        // const data = await response.json()
        // if (data.error) {
        //     throw new Error(data.error.error_msg)
        // } else {
        //     return data.response
        // }
        return response
    } catch (error) {
        console.log(error.message)
    }
}
request('friends.get').then(response => console.log(response))
const access_token = 'b1f4136fdd0cbf2a0b750066a59707654a0a361df1b33fa6a98e2b459e806a341d6b8c05b1db38481c3a4'

// addScript('https://api.vk.com/method/friends.get?' + {
//     access_token,
//     v: 5.52,
//     callback: 'response'
// }.toStringURLParameters())


// if (document.location.search[0] = '?') {
//     let parametrs = document.location.search.slice(1).split('&').map(i => i.split('=')).find(([key, _]) => key === 'code')
//     if (parametrs) {
//         console.log('success')
//     } else {
//         const authorizationParametr = {
//             client_id:  7636014,
//             redirect_uri: 'https://keet5.github.io/show-five-friends-from-vk/',
//             display: 'popup',
//             scope: 'friends',
//             revoke: 1
//         }

//         window.location.replace('https://oauth.vk.com/authorize?' + authorizationParametr.toStringURLParameters())
//     }
// }
