import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStudentStore = defineStore("students", () => {
  const studentList = ref([
    { name: "A. student", starID: "a3224", present: false },
    { name: "C. student", starID: "a3354", present: false },
    { name: "B. student", starID: "a353", present: false },
  ]);

  const mostRecentStudent = ref({}); // empty object

  function addNewStudent(student) {
    studentList.value.push(student); // add new student to end of teh array
  }

  function deleteStudent(studentToDelete) {
    studentList.value = studentList.value.filter((student) => {
      return studentToDelete != student;
    });
    mostRecentStudent.value= {} // reset most recent message
  }

  function arrivedOrLeft(student) {
    mostRecentStudent.value = student;
  }

  const studentCount = computed(() => {
    return studentList.value.length;
  });

  const sortedStudents = computed(() => {
    return studentList.value.toSorted((s1, s2) => {
      return s1.name.localeCompare(s2.name);
    });
  });

  return {
    // reactive data
    studentList,
    mostRecentStudent,

    //functions
    addNewStudent,
    deleteStudent,
    arrivedOrLeft,

    //computed properties
    studentCount,
    sortedStudents,
  };
});
