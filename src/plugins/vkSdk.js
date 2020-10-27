export default {
    install: (app, options) => {
        let { access_token, user_id } = getTokenAndId()

        function getTokenAndId() {
            let { access_token, user_id } = document.location.hash
                .slice(1)
                .split('&')
                .map(keyValue => keyValue.split('='))
                .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})

            if (access_token && user_id) {
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('user_id', user_id)
                return { access_token, user_id }
            }
            return ({
                access_token: localStorage.getItem('access_token'),
                user_id: localStorage.getItem('user_id')
            })
        }

        function objToURLParam(obj) {
            const keys = Object.keys(obj)
            return keys.map(key => `${key}=${typeof obj[key] == 'object' ? obj[key].join() : obj[key]}`).join('&')
        }

        const request = (function () {
            let counter = 0
            return async function (method = '', parametrs = {}) {
                const id = counter++

                parametrs.v = 5.52
                parametrs.callback = 'response' + id
                parametrs.access_token = access_token

                const src = `https://api.vk.com/method/${method}?${new URLSearchParams(parametrs).toString()}`
                return new Promise((resolve, reject) => {
                    window['response' + id] = function (data) {
                        clearTimeout(timeOutError)
                        delete window['response' + id]
                        script.remove()

                        if (data.response) {
                            resolve(data.response)
                        } else if (data.error.error_code == 5) {
                            reject(data.error)
                        } else {
                            throw new Error('¯\\_(ツ)_/¯')
                        }
                    }

                    const script = document.createElement('script')
                    script.src = src
                    document.head.appendChild(script)
                    const timeOutError = setTimeout(() => { throw new Error('time out') }, 2000)

                    script.onerror = () => { throw new Error('access error') }
                })
            }
        })()

        async function getOwner() {
            let response = await request('users.get', { id: user_id, fields: 'photo_200_orig' })
            return {
                id: user_id,
                name: response[0].first_name,
                lastName: response[0].last_name,
                photo: response[0].photo_200_orig
            }
        }

        async function getFriends() {
            const parametrs = {
                count: 5,
                order: 'random',
                offset: 0,
                fields: ['photo_200_orig'],
            }

            const itemHandler = (friends, user) => {
                if (!(user.deactivated || friends[user.id])) {
                    friends[user.id] = {
                        name: user.first_name,
                        lastName: user.last_name,
                        photo: user.photo_200_orig
                    }
                }
                return friends
            }

            const { count, items } = await request('friends.get', parametrs)
            const friends = items.reduce(itemHandler, {})
            parametrs.order = 'hints'

            for (let offset = 0; (offset < count) && (Object.keys(friends).length < 5); offset += parametrs.count) {
                parametrs.offset = offset
                parametrs.count = 5 - Object.keys(friends).length
                const { items } = await request('friends.get', parametrs)
                items.reduce(itemHandler, friends)
            }

            return Object.keys(friends).map(id => Object.assign({ id }, friends[id]))
        }

        async function getUsers() {
            try {
                return [await getOwner(), ...await getFriends()]
            } catch (error) {
                localStorage.clear()
                return null
            }
        }

        app.config.globalProperties.$getUsers = async () => {
            if (access_token && user_id)
                return getUsers()
            else
                return null
        }

        // app.config.globalProperties.$authorizationLink = 'https://oauth.vk.com/authorize?' + objToURLParam({
        //     client_id: 7636014,
        //     redirect_uri: 'https://keet5.github.io/show-five-friends-from-vk/',
        //     display: 'popup',
        //     scope: 'friends',
        //     response_type: 'token',
        //     v: 5.52
        // })

        app.config.globalProperties.$authorizationLink = 'https://oauth.vk.com/authorize?' + new URLSearchParams({
            client_id: 7636014,
            redirect_uri: 'https://keet5.github.io/show-five-friends-from-vk/',
            display: 'popup',
            scope: 'friends',
            response_type: 'token',
            v: 5.52
        }).toString()
    }
}
