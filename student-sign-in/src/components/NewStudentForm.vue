<script setup>
import { ref } from "vue";
import { useStudentStore } from "../stores/StudentStore";

const studentStore = useStudentStore()



const newStudentName = ref("");
const newStarID = ref("");

const formErrors = ref([]);


const addStudent = () => {
    formErrors.value = [] // clear errors array

    // if there is no value for newStudentName, add to errors
    if (!newStudentName.value) {
        formErrors.value.push('Student name must be entered ')
    }
    
    if (!newStarID.value) {
        formErrors.value.push('StarID must be entered')
    }

    // if the length of formErrors is 0, there are no errors. 
    if (formErrors.value.length == 0) {
        let student = { name: newStudentName.value, starID: newStarID.value, present: false} 
        
        // TODO add student

        studentStore.addNewStudent(student)

        newStudentName.value = '' // clear form input so a new student ma be added
        newStarID.value = '' 
    }
}


</script>

<template>
  <div id="new-student-form-errors" class="m-2">
    <div class="alert alert-danger" v-if="formErrors.length > 0">
      <li v-for="error in formErrors" v-bind:key="error">
        {{ error }}
      </li>
    </div>
  </div>

  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <input id="name" class="form-control" v-model.trim="newStudentName" />
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <input id="starID" class="form-control" v-model.trim="newStarID" />
    </div>

    <button class="btn btn-primary" v-on:click="addStudent">Add</button>
  </div>
</template>

<style scoped>
/* CSS for this component here */
</style>
