/*
  TASTE MY NIGHTMARE — FORMSPREE INQUIRY SYSTEM

  Uses Vanilla JS + fetch() because the site is static GitHub Pages
  and already has custom form state / validation.

  Formspree receives normal multipart form fields rather than a nested
  JSON object so each field appears cleanly in the Formspree dashboard
  and notification emails.

  This version also adds multiple real file uploads to BOTH inquiry
  forms without replacing or redesigning the HTML pages.
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
     FILE UPLOADS

     Formspree limits:
     - up to 10 files per submission
     - up to 25 MB per file
     - up to 100 MB total request size

     The file field is injected here so your existing inquiry HTML
     does not have to be replaced or redesigned.
     ========================================================= */

  const MAX_FILES =
    10;

  const MAX_FILE_BYTES =
    25 * 1024 * 1024;

  const MAX_TOTAL_FILE_BYTES =
    100 * 1024 * 1024;


  function installUploadStyles() {
    if (
      document.getElementById(
        "tmnInquiryUploadStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement(
        "style"
      );

    style.id =
      "tmnInquiryUploadStyles";

    style.textContent = `
      .tmn-file-upload-field {
        margin-top: 2px;
      }

      .tmn-file-upload-field > small {
        display: block;
        line-height: 1.55;
        opacity: 0.68;
      }

      .tmn-file-upload-field input[type="file"] {
        min-height: 58px;
        padding: 9px 10px;
        cursor: pointer;
      }

      .tmn-file-upload-field input[type="file"]::file-selector-button {
        min-height: 38px;
        margin-right: 12px;
        padding: 8px 12px;
        border: 1px solid currentColor;
        border-radius: inherit;
        color: inherit;
        background: transparent;
        font: 700 0.63rem/1 "DM Mono", monospace;
        letter-spacing: 0.07em;
        cursor: pointer;
      }

      .tmn-file-upload-summary,
      .tmn-file-upload-error {
        margin: 0;
        font: 0.6rem/1.6 "DM Mono", monospace;
        letter-spacing: 0.035em;
      }

      .tmn-file-upload-summary {
        opacity: 0.72;
      }

      .tmn-file-upload-error {
        color: #ff6363;
      }

      .inquiry-nightware .tmn-file-upload-field input[type="file"]::file-selector-button {
        border-color: #75ff52;
        color: #75ff52;
      }

      .inquiry-nightshade .tmn-file-upload-field input[type="file"]::file-selector-button {
        border-color: #9bd3ff;
        color: #dcecff;
      }
    `;

    document.head.appendChild(
      style
    );
  }


  function formatFileSize(
    bytes
  ) {
    if (
      bytes >=
      1024 * 1024
    ) {
      return `${(
        bytes /
        (1024 * 1024)
      ).toFixed(1)} MB`;
    }

    return `${Math.max(
      1,
      Math.round(
        bytes / 1024
      )
    )} KB`;
  }


  function getUploadCopy(
    type
  ) {
    if (
      type ===
      "rendering-room"
    ) {
      return {
        label:
          "UPLOAD PROJECT FILES",

        help:
          "Upload logos, business cards, service menus, photos, PDFs, documents, design files, ZIPs, references, or other project assets. You can choose multiple files.",

        empty:
          "NO FILES SELECTED // LINKS BELOW ARE STILL OPTIONAL"
      };
    }

    return {
      label:
        "UPLOAD PRODUCTION FILES",

      help:
        "Upload moodboards, treatments, shot lists, artwork, reference images, documents, demos, or other production assets. You can choose multiple files.",

      empty:
        "NO FILES SELECTED // LINKS BELOW ARE STILL OPTIONAL"
    };
  }


  function getUploadInput(
    form
  ) {
    return form.querySelector(
      'input[name="projectFiles"]'
    );
  }


  function getSelectedFiles(
    form
  ) {
    const input =
      getUploadInput(
        form
      );

    return input
      ? [...input.files]
      : [];
  }


  function updateFileSummary(
    form
  ) {
    const files =
      getSelectedFiles(
        form
      );

    const summary =
      form.querySelector(
        "[data-file-summary]"
      );

    const type =
      form.dataset
        .inquiryType;

    if (!summary) {
      return;
    }

    if (!files.length) {
      summary.textContent =
        getUploadCopy(
          type
        ).empty;

      return;
    }

    const totalBytes =
      files.reduce(
        (
          total,
          file
        ) =>
          total +
          file.size,
        0
      );

    summary.textContent =
      `${files.length} FILE${
        files.length === 1
          ? ""
          : "S"
      } SELECTED // ${formatFileSize(
        totalBytes
      )} TOTAL // ${files
        .map(
          (file) =>
            file.name
        )
        .join(" • ")}`;
  }


  function setFileError(
    form,
    message = ""
  ) {
    const error =
      form.querySelector(
        "[data-file-error]"
      );

    if (error) {
      error.textContent =
        message;
    }
  }


  function validateFiles(
    form
  ) {
    const files =
      getSelectedFiles(
        form
      );

    setFileError(
      form,
      ""
    );

    if (
      files.length >
      MAX_FILES
    ) {
      setFileError(
        form,
        `MAXIMUM ${MAX_FILES} FILES PER INQUIRY.`
      );

      return false;
    }

    const oversized =
      files.find(
        (file) =>
          file.size >
          MAX_FILE_BYTES
      );

    if (oversized) {
      setFileError(
        form,
        `${oversized.name} IS OVER THE 25 MB PER-FILE LIMIT.`
      );

      return false;
    }

    const totalBytes =
      files.reduce(
        (
          total,
          file
        ) =>
          total +
          file.size,
        0
      );

    if (
      totalBytes >
      MAX_TOTAL_FILE_BYTES
    ) {
      setFileError(
        form,
        "THE SELECTED FILES EXCEED THE 100 MB TOTAL UPLOAD LIMIT."
      );

      return false;
    }

    return true;
  }


  function installFileUpload(
    form
  ) {
    const type =
      form.dataset
        .inquiryType;

    const copy =
      getUploadCopy(
        type
      );

    form.enctype =
      "multipart/form-data";

    const field =
      document.createElement(
        "label"
      );

    field.className =
      "field tmn-file-upload-field";

    field.innerHTML = `
      <span>${copy.label}</span>

      <small>
        ${copy.help}
        Maximum 10 files, 25 MB each.
      </small>

      <input
        type="file"
        name="projectFiles"
        multiple
      >

      <p
        class="tmn-file-upload-summary"
        data-file-summary
      >
        ${copy.empty}
      </p>

      <p
        class="tmn-file-upload-error"
        data-file-error
        aria-live="polite"
      ></p>
    `;


    /*
      Rendering Room:
      put real uploads directly before the existing file/Drive links.

      Nightshade:
      put uploads directly before the reference/moodboard links.
    */

    const preferredAnchor =
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


    const fallbackAnchor =
      form
        .querySelector(
          'textarea[name="referenceLinks"]'
        )
        ?.closest(
          "label"
        );


    const anchor =
      preferredAnchor ||
      fallbackAnchor;


    if (anchor) {
      anchor.before(
        field
      );
    } else {
      const sections =
        form.querySelectorAll(
          ".form-section"
        );

      const lastSection =
        sections[
          sections.length - 1
        ];

      lastSection?.appendChild(
        field
      );
    }


    const input =
      getUploadInput(
        form
      );

    input?.addEventListener(
      "change",
      () => {
        updateFileSummary(
          form
        );

        validateFiles(
          form
        );
      }
    );


    updateFileSummary(
      form
    );
  }


  installUploadStyles();

  forms.forEach(
    (form) => {
      installFileUpload(
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
    const firstError =
      Array.isArray(
        data?.errors
      )
        ? data.errors[0]
        : null;

    const code =
      firstError?.code ||
      data?.code ||
      "";

    if (
      code ===
      "NO_FILE_UPLOADS"
    ) {
      return (
        "FILE UPLOADS ARE NOT ENABLED FOR THIS FORMSPREE FORM / PLAN."
      );
    }

    if (
      code ===
      "TOO_MANY_FILES"
    ) {
      return (
        "TOO MANY FILES WERE ATTACHED. THE LIMIT IS 10 FILES PER INQUIRY."
      );
    }

    if (
      code ===
      "FILES_TOO_BIG"
    ) {
      return (
        "ONE OR MORE FILES ARE TOO LARGE. THE LIMIT IS 25 MB PER FILE."
      );
    }

    if (firstError) {
      return (
        firstError.message ||
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


          const filesAreValid =
            validateFiles(
              form
            );


          if (
            !form.checkValidity() ||
            !hasProjectType ||
            !filesAreValid
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