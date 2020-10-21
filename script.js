// const access_token = '98973b86d1e66c39c3b486ba26ff200346f0fff93326b2d92ebc8b0fd40ad71686ee3b57b75609f66980b'

async function request(method = '', parametrs = {}) {
    const token = 'access_token=98973b86d1e66c39c3b486ba26ff200346f0fff93326b2d92ebc8b0fd40ad71686ee3b57b75609f66980b'
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

Object.prototype.toStringForURL = function () {
    const keys = Object.keys(this)
    return keys.map(key => `&${key}=${typeof this[key] == 'object' ? this[key].join() : this[key]}`).join('')
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


getFiveRandomFriends().then(data => drawFriends(data))








