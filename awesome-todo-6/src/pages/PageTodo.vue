<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template
        v-if="taskDownloaded">
        <div class="row q-mb-lg">
        <search />
        <sort />
      </div>

      <p
        v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
      >No search resuls results.</p>

      <q-scroll-area class="q-scroll-area-tasks">
        <no-task v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></no-task>

        <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />

        <tasks-completed
          class="q-mb-xl"
          v-if="Object.keys(tasksCompleted).length"
          :tasksCompleted="tasksCompleted"
        />
      </q-scroll-area>

      <div class="absolute-bottom text-center no-pointer-events">
        <q-btn
          class="all-pointer-events"
          @click="showAddTask = true"
          round
          color="primary"
          size="24"
          icon="add"
        />
      </div>
      </template>
      <template v-else>
        <span
          class="absolute-center">
          <q-spinner-ball
        color="amber"
        size="8em"
        :thickness="5"
      /></span>
      </template>
      
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapGetters("settings", ["settings"]),
    ...mapState("tasks", ["search", 'taskDownloaded'])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
    "no-task": require("components/Tasks/NoTask.vue").default,
    search: require("components/Tasks/Tools/Search.vue").default,
    sort: require("components/Tasks/Tools/Sort.vue").default
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  }
};
</script>

<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
