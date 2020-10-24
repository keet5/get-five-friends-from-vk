<template>
    <header class="header">
        <div class="header_nav">
            <a class="header_ancor" href="https://vk.com/feed">
                <img
                    src="https://vk.com/images/svg_icons/ic_head_logo.svg"
                    alt=""
                />
            </a>
        </div>
    </header>

    <div class="owner">

    </div>

    <div class="friends">
        <User  :key="owner.id" v-bind="owner" />
        <User v-for="user in friends" :key="user.id" v-bind="user" />
    </div>
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
            friends: [],
            owner: []
        };
    },

    async created() {
        this.friends = await this.$getFiveFriends()
        this.owner = await this.$getOwner()
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

.friends {
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
    .friends,
    .header_nav {
        width: 1090px;
    }
}

@media (max-width: 1089px) and (min-width: 875px) {
    .friends,
    .header_nav {
        width: 875px;
    }
}

@media (max-width: 874px) and (min-width: 660px) {
    .friends,
    .header_nav {
        width: 660px;
    }
}

@media (max-width: 659px) and (min-width: 445px) {
    .friends,
    .header_nav {
        width: 445px;
    }
}

@media (max-width: 444px) and (min-width: 230px) {
    .friends,
    .header_nav {
        width: 230px;
    }
}

@media (max-width: 229px) {
    .friends,
    .header_nav {
        width: 230px;
    }
}
</style>
