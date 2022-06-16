<script setup>
import { reactive, ref, computed } from "vue";
import Tesseract from "tesseract.js";

// === Vars ======== //
const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

// === Reactive Vars === //
const value = ref(50);

const currentStatus = ref(null);
const drawer = ref(null);
const status = reactive({});
const gradient = reactive({
  radial: false,
  colors: [
    {
      color: "#6546f7",
      offset: "0",
      opacity: "1",
    },
    {
      color: "lime",
      offset: "100",
      opacity: "0.6",
    },
  ],
});

// ====== Computed Variables ===== //
const isInitial = computed(() => currentStatus.value === STATUS_INITIAL);

const isSaving = computed(() => currentStatus.value === STATUS_SAVING);

const isSuccess = computed(() => currentStatus.value === STATUS_SUCCESS);

const isFailed = computed(() => currentStatus.value === STATUS_FAILED);

const progress = computed(() => Math.floor(status.progress * 100));

/**
 * Tesseract Setup
 * @input - image to covert via OCR
 */
/* Tesseract.recognize("C:/Users/akillian/Desktop/sampleText.jpg").progress(function (packet) {
    console.info(packet);
  })
  .then(function (result) {
    console.log(result.text);
  }); */

/**
 * OCR
 * @params - event
 */

function ocr(event) {
  Tesseract.workerOptions.workerPath = "http://localhost:8080/static/worker.js";
  Tesseract.workerOptions.langPath = "http://localhost:8080/static/";

  Tesseract.recognize(event)
    .progress((status) => {
      this.status = status;
    })
    .then((result) => {
      this.currentStatus = STATUS_SUCCESS;
      this.status = result;
    })
    .catch((error) => {
      this.currentStatus = STATUS_FAILED;
      this.status = error;
    });
}
</script>

<template>
  <div class="pure-menu pure-menu-horizontal">
    <a href="#" class="pure-menu-heading pure-menu-link">Simple OCR</a>

    <span v-if="isSuccess || isFailed" class="menu-bar">
      <ul class="pure-menu-list menu-bar-list">
        <li class="pure-menu-item">
          <a @click="reset" href="#" class="pure-menu-link tooltip"
            ><i class="fa-solid fa-rotate"></i
            ><span class="tooltiptext">refresh</span></a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="save" href="#" class="pure-menu-link tooltip"
            ><i class="fa-solid fa-floppy-disk"></i
            ><span class="tooltiptext">save</span></a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="drive" href="#" class="pure-menu-link tooltip"
            ><i class="fa-solid fa-upload"></i
            ><span class="tooltiptext">file_upload</span></a
          >
        </li>
      </ul>
    </span>
  </div>
  <!-- ========== End menu bar ================ -->

  <img alt="OCR logo" src="../assets/img/ocr_logo.jpg" />

  <!-- ========= Image File Input Markup ==========================  -->
  <div class="pure-g">
    <div v-if="isInitial" class="pure-u-3-5 container">
      <form enctype="multipart/form-data" novalidate>
        <h1>Uploadimage</h1>
        <div class="dropbox">
          <input
            type="file"
            :name="'document'"
            :disabled="isSaving"
            @change="filesChange($event.target.files)"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file here to begin<br />
            or click to browse
          </p>
        </div>
      </form>
    </div>
    <div v-if="isSaving" class="container"></div>
  </div>

  <!-- ========= End Main content ======================  -->

  <!-- ============= Progress Bar ====================== -->
  <ve-progress
    :progress="value"
    :size="425"
    :angle="-90"
    :color="gradient"
    animation="rs 1500 500"
    font-size="2.5rem"
  />

  <!-- ============= Results Markup ==================== -->
  <div v-if="isSuccess || isFailed" class="results-container">
    <label for="result">Result</label>
    <textarea
      id="result"
      v-model="status.text"
      class="results-box"
      rows="50"
      cols="80"
      placeholder="Translated text here"
    >
    </textarea>
  </div>
  <!-- ============= End Results Markup ================ -->

  <footer><span>&copy; 2022 - Alan Killian &lt;@akillian&gt;</span></footer>
</template>

<style scoped>
.pure-menu-horizontal {
  display: flex; /* flexbox for main menu */
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: -50px;
}

a.pure-menu-link {
  flex-grow: 0.1;
}

.menu-bar {
  flex-grow: 0.3;
}

.menu-bar .pure-menu-list.menu-bar-list {
  display: flex; /* flexbox for the menu list */
  flex-wrap: nowrap;
  justify-content: space-around;
}

.container {
  margin: 0 auto;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: transparent;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba(
    255,
    255,
    255,
    0.1
  ); /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 0.9rem;
  text-align: center;
  padding: 50px 0;
}

label {
  display: block;
  font-size: 1.5rem;
  margin: 15px 0;
}

footer {
  margin: 15px 0;
}

/* ========== Tool tip stylings ============ */
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  top: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
}

/* Create arrow */
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
