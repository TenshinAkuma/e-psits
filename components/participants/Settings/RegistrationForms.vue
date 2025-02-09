<template>
	<section>
		<h4 class="fw-bold">Registration Forms</h4>
		<hr />
		<dl class="row gy-5">
			<!-- Entry Form -->
			<dt class="col-sm-4">Entry Form</dt>
			<dd class="col-sm-8 d-flex gap-2">
				<div class="w-100">
					<div class="hstack gap-2">
						<input
							class="form-control"
							type="file"
							@change="
								HandleFileChange($event, 'entry_form')
							"
							accept=".pdf" />
						<button
							class="btn btn-success hstack gap-3"
							:disabled="!files.entry_form"
							@click="UploadFile('entry_form')">
							<span
								v-if="buttonsLoading.entry_form"
								class="spinner-border spinner-border-sm"
								aria-hidden="true"></span>
							<span role="status">Upload</span>
						</button>
					</div>
				</div>
			</dd>

			<!-- coe of Registration -->
			<dt class="col-sm-4">coe of Registration</dt>
			<dd class="col-sm-8 d-flex gap-2">
				<div class="w-100">
					<div class="hstack gap-2">
						<input
							class="form-control"
							type="file"
							@change="HandleFileChange($event, 'coe')" />
						<button
							class="btn btn-success hstack gap-3"
							:disabled="!files.coe"
							@click="UploadFile('coe')">
							<span
								v-if="buttonsLoading.coe"
								class="spinner-border spinner-border-sm"
								aria-hidden="true"></span>
							<span role="status">Upload</span>
						</button>
					</div>

					<br />

					<img
						v-if="previews.coe"
						:src="previews.coe"
						class="rounded-3 w-100" />
					<p
						v-if="previews.coe && !isImage(files.coe)"
						class="text-danger fs-7">
						📄 {{ files.coe.name }}
					</p>
				</div>
			</dd>

			<!-- School ID -->
			<dt class="col-sm-4">School ID</dt>
			<dd class="col-sm-8 d-flex gap-2">
				<div class="w-100">
					<div class="hstack gap-2">
						<input
							class="form-control"
							type="file"
							@change="
								HandleFileChange($event, 'school_id')
							" />
						<button
							class="btn btn-success hstack gap-3"
							:disabled="!files.school_id"
							@click="UploadFile('school_id')">
							<span
								v-if="buttonsLoading.school_id"
								class="spinner-border spinner-border-sm"
								aria-hidden="true"></span>
							<span role="status">Upload</span>
						</button>
					</div>

					<br />

					<img
						v-if="previews.school_id"
						:src="previews.school_id"
						class="rounded-3 w-100" />
					<p
						v-if="
							previews.school_id &&
							!isImage(files.school_id)
						"
						class="text-danger fs-7">
						📄 {{ files.school_id.name }}
					</p>
				</div>
			</dd>
		</dl>
		{{ ParticipantData }}
	</section>
</template>

<script setup>
	const client = useSupabaseClient();
	const props = defineProps({
		participant: {
			type: Object,
			required: true,
		},
	});

	const ParticipantData = toRef(props, "participant");
	const errMsg = ref("");

	const files = ref({
		entry_form: null,
		coe: null,
		school_id: null,
	});

	const previews = ref({
		entry_form: null,
		coe: null,
		school_id: null,
	});

	const buttonsLoading = ref({
		entry_form: false,
		coe: false,
		school_id: false,
	});

	// Handle File Selection & Generate Preview
	async function HandleFileChange(event, fieldName) {
		const file = event.target.files[0];
		if (!file) {
			return;
		}

		const filePath = `${fieldName}/${ParticipantData.value?.id}_${fieldName}`;

		const { data: uploadData, error: uploadError } = await client.storage
			.from("registration_files")
			.upload(filePath, file, { upsert: true });

		const { data: fileData, error: fileError } = client.storage
			.from("registration_files")
			.getPublicUrl(uploadData.path);

		// const registrationFile = {};
		// registrationFile[fieldName] = fileData.publicUrl;

		const { error: participantFileError } = await client
			.from("participants")
			.update({ [fieldName]: fileData.publicUrl })
			.eq("id", ParticipantData.value?.id);

		files.value[fieldName] = file;
		// Generate a preview URL for images
		if (isImage(file)) {
			previews.value[fieldName] = URL.createObjectURL(file);
		} else {
			previews.value[fieldName] = null;
		}
	}

	const isImage = (file) => file && file.type.startsWith("image/");

	// // Upload File to Supabase Storage
	// async function UploadFile(fieldName) {
	// 	const file = files.value[fieldName];
	// 	if (!file) return;

	// 	const filePath = `uploads/${Date.now()}_${file.name}`;

	// 	const { data: uploadData, error: uploadError } = await client.storage
	// 		.from("registration_files")
	// 		.upload(filePath, file);

	// 	const { data: fileData, error: fileError } = await client.storage
	// 		.from("registration_files")
	// 		.getPublicUrl(uploadData.path);

	// 	const { error: participantFileError } = await client
	// 		.from("participants")
	// 		.update({ [fieldName]: fileData.getPublicUrl })
	// 		.eq("id", ParticipantData.value?.id);

	// 	if (error) {
	// 		alert("Upload Failed: " + error.message);
	// 	} else {
	// 		alert("File Uploaded Successfully!");
	// 	}
	// }
</script>

<style></style>
