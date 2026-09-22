/*
  TASTE MY NIGHTMARE — FORMSPREE INQUIRY SYSTEM

  Uses Vanilla JS + fetch() because the site is static GitHub Pages
  and already has custom form state / validation.

  Formspree receives normal multipart form fields rather than a nested
  JSON object so each field appears cleanly in the Formspree dashboard
  and notification emails.
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