<template>
  <q-item
    @click="updateTask({id: id, updates: {completed: !task.completed}})"
    v-touch-hold:1000.mouse="showEditTaskModal"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        v-html="$options.filters.searchHighlight(task.name, search)"
        :class="{ 'text-strikethrough' : task.completed }"
      ></q-item-label>
    </q-item-section>
    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate | niceDate}}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn @click.stop="showEditTaskModal" flat round dense color="primary" icon="edit" />

        <q-btn @click.stop="promptToDelete(id)" flat round dense color="red" icon="delete" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task :id="id" :task="task" @close="showEditTask = false"></edit-task>
    </q-dialog>
  </q-item>
</template>

<script>
import { date } from "quasar";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      showEditTask: false
    };
  },
  props: ["task", "id"],
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask.vue").default
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime() {
      if (this.settings.show12HourTimeFormat) {
        return date.formatDate(
          this.task.dueDate + " " + this.task.dueTime,
          "h:mmA"
        );
      }
      return this.task.dueTime;
    }
  },
  filters: {
    niceDate(val) {
      return date.formatDate(val, "MMM Do");
    },
    searchHighlight(val, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        return val.replace(searchRegExp, match => {
          return '<span class="bg-yellow-6">' + match + "</span>";
        });
      }
      return val;
    }
  }
};
</script>

<style>
</style>
