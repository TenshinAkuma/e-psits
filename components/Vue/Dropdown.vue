<template>
	<button
		type="button"
		:class="['btn', buttonClass]"
		data-bs-toggle="dropdown"
		aria-expanded="false"
		data-bs-auto-close="outside"
		data-bs-offset="0,5">
		<div class="dropdown-menu" ref="DropdownRef">
			<div class="dropdown-item fw-bold">
				<slot name="ButtonLabel">
					{{ buttonLabel }}
				</slot>
			</div>

			<slot name="Body">
            <p class="">Dropdown Body</p>
         </slot>

         <slot name="Footer">
            <button type="button" class="btn-primary" @click="closeDropdown">
               Close
            </button>
         </slot>
		</div>
	</button>
</template>

<script setup>
   const DropdownRef = ref(null);
   let Dropdown = null;

   const props = defineProps({
      dropdownId: "Dropdown",
      dropDownTitle: "Dropdown",
      buttonLabel: "Dropdown",
      buttonClass: "btn-primary",
   });

   onMounted(() => {
      if (DropdownRef.value) {
         Dropdown = new bootstrap.Dropdown(DropdownRef.value);
      }
   });

   const closeDropdown = () => {
      if (DropdownRef) {
         Dropdown.hide();
      }
   };

   const openDropdown = () => {
      if (DropdownRef) {
         Dropdown.show();
      }
   };

   defineExpose({
      closeDropdown,
      openDropdown,
   });
</script>

<style></style>
