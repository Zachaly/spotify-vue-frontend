<template>
    <div class="tabs is-centered">
        <ul>
            <li :class="{'is-active': category === 0}"><a @click="category = 0">Musician</a></li>
            <li :class="{'is-active': category === 1}"><a @click="category = 1">Album</a></li>
            <li :class="{'is-active': category === 2}"><a @click="category = 2">Song</a></li>
        </ul>
    </div>
    <AdminMusician v-if="category === 0" />
</template>

<script>
import AdminMusician from '@/components/AdminMusician.vue';

export default {
    components: { AdminMusician },
    data(){
        return {
            category: 0
        }
    }
}
</script>