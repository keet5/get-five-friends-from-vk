<template>
    <a class="user" :href="'https://vk.com/id' + id">
        <div
            class="user_photo"
            :style="{ 'background-image': 'url(' + photo + ')' }"
        ></div>
        <h5 class="user_information">{{ name }} {{ lastName }}</h5>
    </a>
</template>

<script>
export default {
    props: ["photo", "name", "lastName", "id"],


    mounted() {
        console.log(this.name)
    }
};
</script>

<style>
.user {
    background-color: white;
    width: 200px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    font-family: segoe ui, Arial, sans-serif;
    font-weight: 400;
    color: black;
    text-decoration: none;
}

.user:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.user_photo {
    width: 100%;
    height: 200px;
    border-radius: 5px 5px 0 0;
}

.user_information {
    text-align: center;
}
</style>