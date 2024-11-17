<script setup>
import { ref } from "vue";

const props = defineProps({
  student: Object,
}); // recieve student and all of the data from it so that we can use it 

const emit = defineEmits(["arrived-or-left", "delete-student"]);

const isStudentPresent = ref(props.student.present);
// because we shouldn't modify props, we created a new ref based on the initial value of props.student.present. isStudentPresent will update as the checkbox is checked and unchecked

const notifyArrivedOrLeft = () => {
  // tell parent the student arrived or left. Emit event
  emit("arrived-or-left", props.student, isStudentPresent.value);
};
// when isStudentPresent is changed, we us v-on:change to call notifyArrivedOrLeft this message to emit a message to the parent component which is StudentTable.vue. the message is carrying the original student prop that was sent to the component(the component we are looking at is StudentRow.vue) as well as the current value of isStudentPresent. it is sent to the parent component (the parent component is StudentTable.vue)

const confirmThenDeleteStudent = () => {
  emit('delete-student', props.student)
}
</script>

<template>
  <tr
    class="align-middle"
    v-bind:class="{
      present: student.present,
      absent: !student.present,
    }"
  >
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <input
        type="checkbox"
        v-model="isStudentPresent"
        v-on:change="notifyArrivedOrLeft"
      />
      <span class="mx-3" v-if="student.present">Here!</span>
      <span class="mx-3" v-else>Not Present</span>
    </td>
    <td>
      <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
        <i class="bi bi-trash-fill"></i>Delete
      </button>
    </td>
  </tr>
</template>

<style scoped>
.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}
</style>
