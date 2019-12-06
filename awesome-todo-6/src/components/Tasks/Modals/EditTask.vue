<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name ref="modalTaskName" :name.sync="taskToSubmit.name"></modal-task-name>

        <modal-due-date :dueDate.sync="taskToSubmit.dueDate"></modal-due-date>

        <modal-due-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate"></modal-due-time>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task";

export default {
  mixins: [mixinAddEditTask],
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {}
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  },

  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>
