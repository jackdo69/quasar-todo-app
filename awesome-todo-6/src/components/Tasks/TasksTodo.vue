<template>
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut absolute-top">
<div>
<list-header
  v-if="!settings.showTasksInOneList"
  bgColor="bg-orange-4">Todo</list-header>

  <q-list
    
    separator
    bordered>

    <task v-for="(task, key) in tasksTodo"
      :task="task"
      :key="key"
      :id="key"></task>
  </q-list>

</div>
</transition>

  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['tasksTodo'],
    components: {
        'task': require('components/Tasks/Task.vue').default,
        'list-header': require('components/Shared/ListHeader.vue').default
    },
    computed: {
      ...mapGetters('settings',['settings'])
    }
}
</script>

<style>

</style>