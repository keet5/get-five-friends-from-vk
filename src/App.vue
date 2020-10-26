<template>
    <header class="header">
        <div class="header_nav">
            <a class="header_anchor" href="https://vk.com/feed">
                <img
                    src="https://vk.com/images/svg_icons/ic_head_logo.svg"
                    alt=""
                />
            </a>
        </div>
    </header>

    <div class="users" v-if="users">
        <User v-for="(information, id) in users" :key="id" :id="id" v-bind="information" />
    </div>
    <a :href="$authorizationLink" class="authorization_button" v-else>авторизоваться</a>
</template>

<script>
import User from "./components/User.vue";

export default {
    name: "App",
    components: {
        User,
    },

    data() {
        return {
            users: {}
        };
    },

    async created() {
        console.log('test travis')
        this.users = await this.$getUsers()
    },
};
</script>

<style>
body {
    background-color: #edeef0;
    padding: 0;
    margin: 0;
}

.header {
    height: 42px;
    width: 100%;
    background-color: #4a76a8;
    border-bottom: 1px #4a76a8;
    margin: 0;
}

.header_nav {
    width: 1305px;
    margin: auto;
    padding: 11px 0 0 15px;
    box-sizing: border-box;
}

.header_anchor {
    display: block;
}

.header_anchor:active {
    padding-top: 1px;
}

.authorization_button {
    color: white;
    background-color: #4a76a8;
    border: none;
    border-radius: 4px;
    padding: 7px 20px 8px;
    margin:   15px auto;
    display: block;
    font-size: 12.5px;
    font-family: -apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",sans-serif,arial,Tahoma,verdana;
    line-height: 15px;
    display: block;
    width: 100px;
    text-align: center;
    user-select: none;
  
    text-decoration: none;
}

.authorization_button:hover {
    opacity: .88
}

.authorization_button:active {
    opacity: 1;
    background-color: #4a76a8;
    padding: 8px 20px 7px;
}
.users {
    width: 1305px;
    display: grid;
    margin: auto;
    grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
    grid-gap: 15px;
    padding: 15px;
    align-items: center;
    box-sizing: border-box;
}

@media (max-width: 1304px) and (min-width: 1090px) {
    .users,
    .header_nav {
        width: 1090px;
    }
}

@media (max-width: 1089px) and (min-width: 875px) {
    .users,
    .header_nav {
        width: 875px;
    }
}

@media (max-width: 874px) and (min-width: 660px) {
    .users,
    .header_nav {
        width: 660px;
    }
}

@media (max-width: 659px) and (min-width: 445px) {
    .users,
    .header_nav {
        width: 445px;
    }
}

@media (max-width: 444px) and (min-width: 230px) {
    .users,
    .header_nav {
        width: 230px;
    }
}

@media (max-width: 229px) {
    .users,
    .header_nav {
        width: 230px;
    }
}
</style>
