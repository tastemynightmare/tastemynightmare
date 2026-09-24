/*
  TASTE MY NIGHTMARE — INQUIRY SYSTEM
  ====================================

  FINAL CLIENT INTAKE FLOW:

  STEP 1
  -> Questionnaire submits to Formspree.

  STEP 2
  -> Only AFTER Formspree confirms receipt does the Dropbox
     File Request button unlock.

  This prevents a client from uploading files to Dropbox and leaving
  before Taste My Nightmare receives the actual project inquiry.
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
     DROPBOX FILE-REQUEST CONFIG
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
          "STEP 2 // UPLOAD PROJECT FILES",

        lockedButton:
          "SUBMIT INQUIRY TO UNLOCK FILE UPLOAD",

        unlockedButton:
          "OPEN SECURE FILE UPLOAD ↗",

        lockedCopy:
          "Complete and submit the inquiry first. Once the inquiry is received, your secure project-file upload will unlock here.",

        unlockedCopy:
          "Inquiry received. Now upload logos, business cards, menus, photos, PDFs, documents, design files, ZIPs, references, and other project assets.",

        url:
          (
            urls["rendering-room"] ||
            ""
          ).trim()
      };
    }


    return {
      title:
        "STEP 2 // UPLOAD PRODUCTION FILES",

      lockedButton:
        "SUBMIT INQUIRY TO UNLOCK FILE UPLOAD",

      unlockedButton:
        "OPEN SECURE FILE UPLOAD ↗",

      lockedCopy:
        "Complete and submit the inquiry first. Once the inquiry is received, your secure production-file upload will unlock here.",

      unlockedCopy:
        "Inquiry received. Now upload moodboards, treatments, shot lists, artwork, reference images, documents, demos, and other production assets.",

      url:
        (
          urls["nightshade-productions"] ||
          ""
        ).trim()
    };
  }


  function isDropboxRequestConnected(
    url
  ) {
    return (
      /^https:\/\/(www\.)?dropbox\.com\/request\//i
        .test(
          url
        )
    );
  }


  /* =========================================================
     DROPBOX GATE STYLES
     ========================================================= */

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
        margin-top: 18px;
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
        transition:
          transform .16s ease,
          filter .16s ease,
          opacity .16s ease;
      }

      .tmn-external-upload__button:hover:not(.is-disabled) {
        transform: translateY(-2px);
        filter: brightness(1.07);
      }

      .tmn-external-upload__button.is-disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.42;
      }

      .inquiry-nightware .tmn-external-upload {
        border: 1px solid rgba(117,255,82,.22);
        background: rgba(117,255,82,.035);
      }

      .inquiry-nightware .tmn-external-upload__label {
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

      .inquiry-nightshade .tmn-external-upload__label {
        color: #9bd3ff;
      }

      .inquiry-nightshade .tmn-external-upload__button {
        border: 1px solid #dcecff;
        border-radius: 5px;
        color: #06131f;
        background:
          linear-gradient(
            135deg,
            #e5f3ff,
            #80c3ff
          );
      }
    `;

    document.head.appendChild(
      style
    );
  }


  /* =========================================================
     INSTALL LOCKED STEP 2
     ========================================================= */

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

    wrapper.dataset.uploadGate =
      type;

    wrapper.innerHTML = `
      <p class="tmn-external-upload__label">
        ${config.title}
      </p>

      <p
        class="tmn-external-upload__copy"
        data-upload-copy
      >
        ${config.lockedCopy}
      </p>

      <a
        class="tmn-external-upload__button is-disabled"
        href="#"
        aria-disabled="true"
        tabindex="-1"
        data-upload-button
      >
        ${config.lockedButton}
      </a>

      <p class="tmn-external-upload__note">
        Your questionnaire is sent first. File upload is the second step.
      </p>
    `;


    /*
      Place STEP 2 directly AFTER the submit area.
      Dropbox is not available earlier in the form.
    */

    const submitZone =
      form.querySelector(
        ".form-submit-zone"
      );

    if (submitZone) {
      submitZone.after(
        wrapper
      );
    } else {
      form.appendChild(
        wrapper
      );
    }
  }


  function unlockExternalUpload(
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
      form.querySelector(
        `[data-upload-gate="${type}"]`
      );

    const button =
      wrapper?.querySelector(
        "[data-upload-button]"
      );

    const copy =
      wrapper?.querySelector(
        "[data-upload-copy]"
      );

    if (
      !wrapper ||
      !button
    ) {
      return;
    }


    if (
      !isDropboxRequestConnected(
        config.url
      )
    ) {
      if (copy) {
        copy.textContent =
          "Your inquiry was received, but the file-upload destination is temporarily unavailable. Please contact Taste My Nightmare.";
      }

      button.textContent =
        "FILE UPLOAD TEMPORARILY UNAVAILABLE";

      return;
    }


    if (copy) {
      copy.textContent =
        config.unlockedCopy;
    }

    button.textContent =
      config.unlockedButton;

    button.href =
      config.url;

    button.target =
      "_blank";

    button.rel =
      "noopener";

    button.removeAttribute(
      "aria-disabled"
    );

    button.removeAttribute(
      "tabindex"
    );

    button.classList.remove(
      "is-disabled"
    );


    /*
      Make STEP 2 obvious immediately after Formspree succeeds.
    */

    setTimeout(
      () => {
        wrapper.scrollIntoView({
          behavior:
            "smooth",
          block:
            "center"
        });

        button.focus();
      },
      120
    );
  }


  /* =========================================================
     CHARACTER COUNTERS
     ========================================================= */

  function installCharacterCounters() {
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
  }


  /* =========================================================
     FORM HELPERS
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
          "RENDER REQUEST RECEIVED. NOW UPLOAD YOUR PROJECT FILES BELOW."
      };
    }

    return {
      service:
        "Nightshade Productions",

      subject:
        "Nightshade Productions // Shoot Inquiry",

      success:
        "SHOOT INQUIRY RECEIVED. NOW UPLOAD YOUR PRODUCTION FILES BELOW."
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
     FORMSPREE
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


    /*
      Local bot trap should not clutter Formspree.
    */

    formData.delete(
      "companyWebsite"
    );


    /*
      Formspree metadata.
    */

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

  function installForm(
    form
  ) {
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


        /*
          Silent bot rejection.
        */

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


          /*
            STEP 1:
            Formspree must succeed first.
          */

          await submitToFormspree(
            endpoint,
            form,
            type
          );


          /*
            Formspree has confirmed receipt.
            We can now clear the questionnaire.
          */

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


          /*
            STEP 2:
            Dropbox unlocks ONLY after Formspree success.
          */

          unlockExternalUpload(
            form
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


  /* =========================================================
     START
     ========================================================= */

  installUploadStyles();
  installCharacterCounters();

  forms.forEach(
    (form) => {
      installExternalUpload(
        form
      );

      installForm(
        form
      );
    }
  );
})();