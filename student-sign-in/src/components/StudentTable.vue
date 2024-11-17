<script setup>
import { useStudentStore } from "../stores/StudentStore.js";

import { storeToRefs } from "pinia";

import { computed } from "vue";

import StudentRow from "./StudentRow.vue"

const studentStore = useStudentStore(); // reference to the store imported from studentstore.js
const { sortedStudents, studentCount } = storeToRefs(studentStore); // convert things in store to refs in the script
const deleteStudent = (student) => {
  studentStore.deleteStudent(student);
};
const arrivedOrLeft = (student, isStudentPresent) => {
    student.present = isStudentPresent
    studentStore.arrivedOrLeft(student)
} // includes the original value of student as well as their present boolean value true or false

const pluralStudentMessage = computed ( () => {
    if (studentCount.value ==1){
        return 'There is 1 student in class'
    } else {
        return `There are ${studentCount.value} students in class`
    }
})



</script>

<template>
  <div id="student-list-table" class="m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted"> {{ pluralStudentMessage }} </h5>

    <div id="student-table">
      <table class="table">
        <thead>
          <tr class="align-middle">
            <th>Name</th>
            <th>StarID</th>
            <th>Present?</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <StudentRow 
          v-for="student in sortedStudents"
          v-bind:student="student" v-on:arrived-or-left="arrivedOrLeft"
          v-on:delete-student="deleteStudent"
          ></StudentRow> <!-- is first student in v-bind line is the prop in StudentRow.vue. the second one is the individual student in sortedStudents -->
          <!-- studentrow uses v-for to create one student row for each student in the list of sorted students. v-bind to send student object to each student row component which is saved in a prop called student. StudentRow.vue recieves the prop and saves it as student so we can access its data -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
#student-table {
  max-height: 500px;
  overflow: scroll;
}

th,
td {
  width: 25%;
  text-align: center;
}


</style>
