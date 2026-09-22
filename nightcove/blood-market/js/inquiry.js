/*
  TASTE MY NIGHTMARE — FORMSPREE INQUIRY SYSTEM

  Uses Vanilla JS + fetch() because the site is static GitHub Pages
  and already has custom form state / validation.

  Formspree receives the questionnaire as normal form fields.

  Actual project files are collected separately through Dropbox File
  Requests. This avoids Formspree's paid attachment feature while still
  giving clients a direct upload button inside the branded inquiry flow.
*/

(function () {
  const forms =
    document.querySelectorAll(
      ".tmn-inquiry-form"
    );

  if (!forms.length) {
    return;
  }


  /* =========================================================
     CLIENT FILE DELIVERY — DROPBOX FILE REQUESTS

     Formspree handles the questionnaire.
     Dropbox File Requests handle actual project files.

     Visitors do NOT need a Dropbox account to upload through a
     Dropbox File Request.

     The request URLs live in inquiry-config.js so they can be changed
     later without touching either inquiry page.
     ========================================================= */

  function getUploadConfig(
    type
  ) {
    const urls =
      window.TMN_FILE_REQUEST_URLS ||
      {};

    if (
      type ===
      "rendering-room"
    ) {
      return {
        title:
          "UPLOAD PROJECT FILES",

        button:
          "OPEN SECURE FILE UPLOAD ↗",

        copy:
          "Upload logos, business cards, menus, photos, PDFs, documents, design files, ZIPs, references, and other project assets.",

        url:
          (
            urls["rendering-room"] ||
            ""
          ).trim()
      };
    }

    return {
      title:
        "UPLOAD PRODUCTION FILES",

      button:
        "OPEN SECURE FILE UPLOAD ↗",

      copy:
        "Upload moodboards, treatments, shot lists, artwork, reference images, documents, demos, and other production assets.",

      url:
        (
          urls["nightshade-productions"] ||
          ""
        ).trim()
    };
  }


  function installUploadStyles() {
    if (
      document.getElementById(
        "tmnDropboxUploadStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement(
        "style"
      );

    style.id =
      "tmnDropboxUploadStyles";

    style.textContent = `
      .tmn-external-upload {
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      .tmn-external-upload__label {
        margin: 0;
        font: 800 0.63rem/1.4 "DM Mono", monospace;
        letter-spacing: 0.1em;
      }

      .tmn-external-upload__copy,
      .tmn-external-upload__note {
        margin: 0;
        line-height: 1.6;
        opacity: 0.72;
      }

      .tmn-external-upload__copy {
        font-size: 0.82rem;
      }

      .tmn-external-upload__note {
        font: 0.6rem/1.6 "DM Mono", monospace;
        letter-spacing: 0.04em;
      }

      .tmn-external-upload__button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 52px;
        padding: 12px 16px;
        text-decoration: none;
        font: 900 0.68rem/1 "DM Mono", monospace;
        letter-spacing: 0.08em;
        transition: transform .16s ease, filter .16s ease;
      }

      .tmn-external-upload__button:hover {
        transform: translateY(-2px);
        filter: brightness(1.07);
      }

      .tmn-external-upload__button.is-disabled {
        pointer-events: none;
        opacity: 0.42;
      }

      .tmn-upload-status {
        display: grid;
        gap: 10px;
        margin: 2px 0 0;
        padding: 0;
        border: 0;
      }

      .tmn-upload-status legend {
        margin-bottom: 2px;
        font: 800 0.63rem/1.4 "DM Mono", monospace;
        letter-spacing: 0.1em;
      }

      .tmn-upload-status label {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        cursor: pointer;
        line-height: 1.45;
      }

      .tmn-upload-status input {
        margin-top: 3px;
      }

      .inquiry-nightware .tmn-external-upload {
        border: 1px solid rgba(117,255,82,.22);
        background: rgba(117,255,82,.035);
      }

      .inquiry-nightware .tmn-external-upload__label,
      .inquiry-nightware .tmn-upload-status legend {
        color: #75ff52;
      }

      .inquiry-nightware .tmn-external-upload__button {
        border: 1px solid #75ff52;
        color: #061005;
        background: #75ff52;
      }

      .inquiry-nightshade .tmn-external-upload {
        border: 1px solid rgba(155,211,255,.22);
        border-radius: 6px;
        background: rgba(106,185,255,.035);
      }

      .inquiry-nightshade .tmn-external-upload__label,
      .inquiry-nightshade .tmn-upload-status legend {
        color: #9bd3ff;
      }

      .inquiry-nightshade .tmn-external-upload__button {
        border: 1px solid #dcecff;
        border-radius: 5px;
        color: #06131f;
        background: linear-gradient(135deg, #e5f3ff, #80c3ff);
      }
    `;

    document.head.appendChild(
      style
    );
  }


  function installExternalUpload(
    form
  ) {
    const type =
      form.dataset
        .inquiryType;

    const config =
      getUploadConfig(
        type
      );

    const wrapper =
      document.createElement(
        "div"
      );

    wrapper.className =
      "tmn-external-upload";


    const isConnected =
      /^https:\/\/(www\.)?dropbox\.com\/request\//i
        .test(
          config.url
        );


    wrapper.innerHTML = `
      <p class="tmn-external-upload__label">
        ${config.title}
      </p>

      <p class="tmn-external-upload__copy">
        ${config.copy}
      </p>

      <a
        class="tmn-external-upload__button${isConnected ? "" : " is-disabled"}"
        ${isConnected
          ? `href="${config.url}" target="_blank" rel="noopener"`
          : `href="#" aria-disabled="true"`}
      >
        ${isConnected
          ? config.button
          : "FILE REQUEST LINK NOT CONNECTED"}
      </a>

      <p class="tmn-external-upload__note">
        The upload opens in a new tab. Return here after the files finish uploading.
      </p>

      <fieldset class="tmn-upload-status">
        <legend>FILE STATUS *</legend>

        <label>
          <input
            type="radio"
            name="fileStatus"
            value="Files uploaded through Dropbox"
            required
          >
          <span>I uploaded my project files.</span>
        </label>

        <label>
          <input
            type="radio"
            name="fileStatus"
            value="No files to upload yet"
            required
          >
          <span>I do not have files to upload yet.</span>
        </label>

        <label>
          <input
            type="radio"
            name="fileStatus"
            value="Files will be sent later"
            required
          >
          <span>I will send the files later.</span>
        </label>
      </fieldset>
    `;


    /*
      Rendering Room:
      place the Dropbox uploader before the existing File / Drive Links.

      Nightshade:
      place it before Reference / Moodboard Links.

      Existing link fields stay as OPTIONAL backup methods.
    */

    const anchor =
      type ===
      "rendering-room"
        ? form
            .querySelector(
              'textarea[name="assetLinks"]'
            )
            ?.closest(
              "label"
            )
        : form
            .querySelector(
              'textarea[name="referenceLinks"]'
            )
            ?.closest(
              "label"
            );


    if (anchor) {
      anchor.before(
        wrapper
      );
    } else {
      const sections =
        form.querySelectorAll(
          ".form-section"
        );

      const target =
        sections[
          Math.max(
            0,
            sections.length - 2
          )
        ];

      target?.appendChild(
        wrapper
      );
    }
  }


  installUploadStyles();

  forms.forEach(
    (form) => {
      installExternalUpload(
        form
      );
    }
  );


  /* =========================================================
     CHARACTER COUNTERS
     ========================================================= */

  document
    .querySelectorAll(
      "textarea[data-count-target]"
    )
    .forEach(
      (field) => {
        const target =
          document.getElementById(
            field.dataset.countTarget
          );

        const updateCount =
          () => {
            if (target) {
              target.textContent =
                field.value.length;
            }
          };

        field.addEventListener(
          "input",
          updateCount
        );

        updateCount();
      }
    );


  /* =========================================================
     HELPERS
     ========================================================= */

  function getCheckedValues(
    form,
    name
  ) {
    return [
      ...form.querySelectorAll(
        `input[name="${name}"]:checked`
      )
    ].map(
      (input) =>
        input.value
    );
  }


  function setStatus(
    form,
    message,
    type = ""
  ) {
    const status =
      form.querySelector(
        ".inquiry-status"
      );

    if (!status) {
      return;
    }

    status.textContent =
      message;

    status.classList.remove(
      "is-error",
      "is-success"
    );

    if (type) {
      status.classList.add(
        `is-${type}`
      );
    }
  }


  function validateProjectTypes(
    form
  ) {
    const checked =
      getCheckedValues(
        form,
        "projectType"
      );

    const error =
      form.querySelector(
        '[data-error-for="projectType"]'
      );

    if (!checked.length) {
      if (error) {
        error.textContent =
          "SELECT AT LEAST ONE PROJECT / SERVICE TYPE.";
      }

      return false;
    }

    if (error) {
      error.textContent =
        "";
    }

    return true;
  }


  function getServiceMeta(
    type
  ) {
    if (
      type ===
      "rendering-room"
    ) {
      return {
        service:
          "Nightware // The Rendering Room",

        subject:
          "Nightware // Rendering Room Inquiry",

        success:
          "RENDER REQUEST RECEIVED. NIGHTWARE WILL REVIEW THE PROJECT."
      };
    }

    return {
      service:
        "Nightshade Productions",

      subject:
        "Nightshade Productions // Shoot Inquiry",

      success:
        "SHOOT INQUIRY RECEIVED. NIGHTSHADE WILL REVIEW AVAILABILITY AND SCOPE."
    };
  }


  function getFormspreeError(
    data,
    fallback
  ) {
    if (
      Array.isArray(
        data?.errors
      ) &&
      data.errors.length
    ) {
      return (
        data.errors[0]
          ?.message ||
        fallback
      );
    }

    return (
      data?.error ||
      data?.message ||
      fallback
    );
  }


  /* =========================================================
     FORMSPREE SUBMISSION
     ========================================================= */

  async function submitToFormspree(
    endpoint,
    form,
    type
  ) {
    const meta =
      getServiceMeta(
        type
      );

    const formData =
      new FormData(
        form
      );

    formData.delete(
      "companyWebsite"
    );

    formData.set(
      "subject",
      meta.subject
    );

    formData.set(
      "service",
      meta.service
    );

    formData.set(
      "inquiryType",
      type
    );

    formData.set(
      "submittedAt",
      new Date()
        .toISOString()
    );

    formData.set(
      "pageUrl",
      window.location.href
    );


    const response =
      await fetch(
        endpoint,
        {
          method:
            "POST",

          body:
            formData,

          headers: {
            "Accept":
              "application/json"
          }
        }
      );


    let data =
      null;

    try {
      data =
        await response.json();
    } catch (_) {
      data =
        null;
    }


    if (!response.ok) {
      throw new Error(
        getFormspreeError(
          data,
          `Submission failed (${response.status}).`
        )
      );
    }


    return data;
  }


  /* =========================================================
     FORM EVENTS
     ========================================================= */

  forms.forEach(
    (form) => {

      form.addEventListener(
        "change",
        () => {
          validateProjectTypes(
            form
          );
        }
      );


      form.addEventListener(
        "submit",
        async (
          event
        ) => {

          event.preventDefault();


          const type =
            form.dataset
              .inquiryType;


          const endpoint =
            window
              .TMN_INQUIRY_ENDPOINTS
              ?.[type]
              ?.trim() ||
            "";


          const button =
            form.querySelector(
              ".inquiry-submit"
            );


          const honeypot =
            form.querySelector(
              'input[name="companyWebsite"]'
            );


          setStatus(
            form,
            ""
          );


          if (
            honeypot?.value
          ) {
            form.reset();
            return;
          }


          const hasProjectType =
            validateProjectTypes(
              form
            );


          if (
            !form.checkValidity() ||
            !hasProjectType
          ) {
            form.reportValidity();

            setStatus(
              form,
              "CHECK THE REQUIRED FIELDS BEFORE SUBMITTING.",
              "error"
            );

            return;
          }


          if (!endpoint) {
            setStatus(
              form,
              "FORM DELIVERY IS NOT CONFIGURED.",
              "error"
            );

            return;
          }


          try {
            if (button) {
              button.disabled =
                true;
            }


            setStatus(
              form,
              "TRANSMITTING INQUIRY..."
            );


            await submitToFormspree(
              endpoint,
              form,
              type
            );


            form.reset();


            form
              .querySelectorAll(
                "textarea[data-count-target]"
              )
              .forEach(
                (field) => {
                  field.dispatchEvent(
                    new Event(
                      "input"
                    )
                  );
                }
              );


            setStatus(
              form,
              getServiceMeta(
                type
              ).success,
              "success"
            );


          } catch (error) {

            console.error(
              "TMN Formspree submission error:",
              error
            );


            setStatus(
              form,
              error.message ||
              "THE INQUIRY COULD NOT BE SENT. PLEASE TRY AGAIN.",
              "error"
            );


          } finally {

            if (button) {
              button.disabled =
                false;
            }

          }
        }
      );
    }
  );
})();