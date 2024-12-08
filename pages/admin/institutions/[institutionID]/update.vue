<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb fs-5 mb-5">
            <NuxtLink
              to="/university"
              class="breadcrumb-item text-decoration-none"
              style="color: #46468f"
            >
              List of universities
            </NuxtLink>
            <NuxtLink
              :to="`/university/${uniID}`"
              class="breadcrumb-item text-decoration-none"
              style="color: #46468f"
            >
              University profile
            </NuxtLink>
            <li class="breadcrumb-item active" aria-current="page">
              Update profile
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-12 mb-3">
          <div class="row mb-5">
            <div class="col-12 mb-3">
              <label for="school-name" class="text-secondary"
                >School name</label
              >
              <input
                type="text"
                class="form-control"
                id="school-name"
                v-model="school_name"
              />
            </div>
            <div class="col-12 mb-3">
              <label for="school-address" class="text-secondary"
                >School address</label
              >
              <input
                type="text"
                class="form-control"
                id="school-address"
                v-model="school_address"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="school-email" class="text-secondary"
                >School email</label
              >
              <input
                type="email"
                class="form-control"
                id="school-email"
                v-model="school_email"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="school-phone-number" class="text-secondary"
                >School phone number</label
              >
              <input
                type="text"
                class="form-control"
                id="school-phone-number"
                v-model="school_phone_number"
              />
            </div>
          </div>
          <div class="row">
            <div class="fw-bold text-secondary mb-3">Contact person</div>
            <div class="col-12 mb-3">
              <label for="contact-name" class="text-secondary">Name</label>
              <input
                type="text"
                class="form-control"
                id="contact-name"
                v-model="contact_name"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="contact-position" class="text-secondary"
                >Position</label
              >
              <input
                type="text"
                class="form-control"
                id="contact-position"
                v-model="contact_position"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="contact-phone-number" class="text-secondary"
                >Phone number</label
              >
              <input
                type="text"
                class="form-control"
                id="contact-phone-number"
                v-model="contact_phone_number"
              />
            </div>
            <div class="col-8 mb-3">
              <label for="contact-email" class="text-secondary">Email</label>
              <input
                type="email"
                class="form-control"
                id="contact-email"
                v-model="contact_email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <NuxtLink :to="`/university/${uniID}`">
        <div
          class="btn px-5 py-2 me-4"
          style="background-color: #e5e5e5; color: #46468f"
        >
          Cancel
        </div>
      </NuxtLink>
      <NuxtLink :to="`/university/${uniID}`">
        <button
          @click="updateSchoolAndContactPerson()"
          class="btn text-light px-5 py-2"
          style="background-color: #46468f"
        >
          Confirm
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "main",
});

const route = useRoute();
const uniID = route.params.uniID;

const { schools } = useSchools();
const { contact_person } = useContactPersons();

const school = schools[uniID];
const contact = contact_person[school.contactPersonID];

// Refs to hold the input values
const school_name = ref("");
const school_address = ref("");
const school_email = ref("");
const school_phone_number = ref("");

const contact_name = ref("");
const contact_position = ref("");
const contact_email = ref("");
const contact_phone_number = ref("");

school_name.value = school.schoolName;
school_address.value = school.address;
school_email.value = school.email;
school_phone_number.value = school.phoneNumber;

contact_name.value = contact.name;
contact_position.value = contact.positionTitle;
contact_email.value = contact.email;
contact_phone_number.value = contact.phoneNumber;

const updateSchoolAndContactPerson = computed(() => {
  const schoolID = uniID;
  const contactPersonID = schools[schoolID].contactPersonID;

  // Update the school's data
  schools[schoolID].schoolName = school_name.value;
  schools[schoolID].address = school_address.value;
  schools[schoolID].email = school_email.value;
  schools[schoolID].phoneNumber = school_phone_number.value;

  // Update the contact person's data
  contact_person[contactPersonID].name = contact_name.value;
  contact_person[contactPersonID].positionTitle = contact_position.value;
  contact_person[contactPersonID].email = contact_email.value;
  contact_person[contactPersonID].phoneNumber = contact_phone_number.value;
});
</script>
