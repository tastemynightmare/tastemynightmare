/*
  TASTE MY NIGHTMARE — SHARED INQUIRY FORM LOGIC

  - validates required fields
  - requires at least one service/project type
  - displays character counters
  - blocks basic bot honeypot submissions
  - POSTs JSON when an endpoint is configured
  - if no endpoint is configured yet, saves the completed inquiry
    as a .txt draft instead of pretending it was submitted
*/

(function () {
  const forms = document.querySelectorAll(".tmn-inquiry-form");

  if (!forms.length) return;

  document.querySelectorAll("textarea[data-count-target]").forEach((field) => {
    const target = document.getElementById(field.dataset.countTarget);

    const updateCount = () => {
      if (target) target.textContent = field.value.length;
    };

    field.addEventListener("input", updateCount);
    updateCount();
  });

  function getCheckedValues(form, name) {
    return [...form.querySelectorAll(`input[name="${name}"]:checked`)]
      .map((input) => input.value);
  }

  function collectFormData(form) {
    const data = {};
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if (key === "companyWebsite") continue;

      if (data[key] !== undefined) {
        data[key] = Array.isArray(data[key])
          ? [...data[key], value]
          : [data[key], value];
      } else {
        data[key] = value;
      }
    }

    data.projectType = getCheckedValues(form, "projectType");
    data.assets = getCheckedValues(form, "assets");

    return data;
  }

  function humanizeKey(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  }

  function makeTextDraft(type, data) {
    const heading =
      type === "rendering-room"
        ? "NIGHTWARE // RENDERING ROOM INQUIRY"
        : "NIGHTSHADE PRODUCTIONS // SHOOT INQUIRY";

    const lines = [
      heading,
      "=".repeat(heading.length),
      "",
      `Submitted: ${new Date().toLocaleString()}`,
      ""
    ];

    Object.entries(data).forEach(([key, value]) => {
      if (value === "" || value == null) return;
      if (Array.isArray(value) && value.length === 0) return;

      lines.push(`${humanizeKey(key)}:`);
      lines.push(Array.isArray(value) ? value.join(", ") : String(value));
      lines.push("");
    });

    return lines.join("\n");
  }

  function downloadDraft(type, data) {
    const content = makeTextDraft(type, data);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    const stamp = new Date().toISOString().slice(0, 10);
    const fileName =
      type === "rendering-room"
        ? `nightware-inquiry-${stamp}.txt`
        : `nightshade-inquiry-${stamp}.txt`;

    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function setStatus(form, message, type = "") {
    const status = form.querySelector(".inquiry-status");

    if (!status) return;

    status.textContent = message;
    status.classList.remove("is-error", "is-success");

    if (type) {
      status.classList.add(`is-${type}`);
    }
  }

  function validateProjectTypes(form) {
    const checked = getCheckedValues(form, "projectType");
    const error = form.querySelector('[data-error-for="projectType"]');

    if (!checked.length) {
      if (error) error.textContent = "SELECT AT LEAST ONE PROJECT / SERVICE TYPE.";
      return false;
    }

    if (error) error.textContent = "";
    return true;
  }

  async function submitToEndpoint(endpoint, payload) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let responseBody = null;

    try {
      responseBody = await response.json();
    } catch (_) {
      responseBody = null;
    }

    if (!response.ok) {
      throw new Error(
        responseBody?.error ||
        responseBody?.message ||
        `Submission failed (${response.status}).`
      );
    }

    return responseBody;
  }

  forms.forEach((form) => {
    form.addEventListener("change", () => {
      validateProjectTypes(form);
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const type = form.dataset.inquiryType;
      const button = form.querySelector(".inquiry-submit");
      const honeypot = form.querySelector('input[name="companyWebsite"]');

      setStatus(form, "");

      if (honeypot?.value) {
        form.reset();
        return;
      }

      const hasProjectType = validateProjectTypes(form);

      if (!form.checkValidity() || !hasProjectType) {
        form.reportValidity();
        setStatus(
          form,
          "CHECK THE REQUIRED FIELDS BEFORE SUBMITTING.",
          "error"
        );
        return;
      }

      const data = collectFormData(form);

      const payload = {
        inquiryType: type,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
        data
      };

      const endpoint =
        window.TMN_INQUIRY_ENDPOINTS?.[type]?.trim() || "";

      if (!endpoint) {
        downloadDraft(type, data);

        setStatus(
          form,
          "FORM DESIGN IS WORKING. DELIVERY IS NOT CONNECTED YET, SO THIS INQUIRY WAS SAVED AS A TEXT DRAFT.",
          "success"
        );
        return;
      }

      try {
        if (button) button.disabled = true;

        setStatus(form, "TRANSMITTING INQUIRY...");

        await submitToEndpoint(endpoint, payload);

        form.reset();

        form.querySelectorAll("textarea[data-count-target]").forEach((field) => {
          field.dispatchEvent(new Event("input"));
        });

        setStatus(
          form,
          type === "rendering-room"
            ? "RENDER REQUEST RECEIVED. NIGHTWARE WILL REVIEW THE PROJECT."
            : "SHOOT INQUIRY RECEIVED. NIGHTSHADE WILL REVIEW AVAILABILITY AND SCOPE.",
          "success"
        );
      } catch (error) {
        console.error("TMN inquiry submission error:", error);

        setStatus(
          form,
          error.message || "THE INQUIRY COULD NOT BE SENT. PLEASE TRY AGAIN.",
          "error"
        );
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
})();