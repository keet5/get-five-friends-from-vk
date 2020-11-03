<template>
    <header class="header"></header>

    <div class="users" v-if="users">
        <nav class="nav">
            <a class="nav_anchor" href="https://vk.com/feed">
                <img
                    src="https://vk.com/images/svg_icons/ic_head_logo.svg"
                    alt=""
                />
            </a>
        </nav>
        <User
            v-for="(information, id) in users"
            :key="id"
            :id="id"
            v-bind="information"
        />
    </div>
    <a :href="$authorizationLink" class="authorization_button" v-else
        >авторизоваться</a
    >
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
            users: {},
        };
    },

    async created() {
        this.users = await this.$getUsers();
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
    position: absolute;
    z-index: -1;
}

.nav {
    padding-top: 11px;
    grid-column: 1 / -1;
}

.nav_anchor {
    display: block;
}

.nav_anchor:active {
    padding-top: 1px;
}

.authorization_button {
    color: white;
    background-color: #4a76a8;
    border: none;
    border-radius: 4px;
    padding: 7px 20px 8px;
    margin: 15px auto;
    display: block;
    font-size: 12.5px;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue",
        Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee",
        "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian",
        "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer",
        "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil",
        "Noto Sans Telugu", "Noto Sans Thai", sans-serif, arial, Tahoma, verdana;
    line-height: 15px;
    display: block;
    width: 100px;
    text-align: center;
    user-select: none;

    text-decoration: none;
}

.authorization_button:hover {
    opacity: 0.88;
}

.authorization_button:active {
    opacity: 1;
    background-color: #4a76a8;
    padding: 8px 20px 7px;
}
.users {
    max-width: 1275px;
    display: grid;
    margin: auto;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-template-rows: 42px;
    justify-content: center;
    align-items: stretch;
    grid-gap: 15px;
    box-sizing: border-box;
}
</style>
