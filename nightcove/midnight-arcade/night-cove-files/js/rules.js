/* Pure case rules: no DOM, storage, timers, or network access. */
(function (root) {
  "use strict";

  const game = root.NC_CASE;
  const total = game.deductions.length;
  const exhibitIds = new Set(game.exhibits.map((exhibit) => exhibit.id));

  function stage(state) {
    return Math.min(state.solved.length, total - 1);
  }

  function available(exhibit, state) {
    return Boolean(exhibit && exhibit.stage <= stage(state));
  }

  function defaults() {
    return {
      version: 2,
      caseId: game.id,
      started: false,
      seen: [],
      pins: [],
      solved: [],
      notes: "",
      timeline: [...game.initialTimeline],
      chronology: false,
      completed: false,
      fragment: false,
      hints: {},
      sound: false,
      largeText: false,
    };
  }

  function isCompatible(input) {
    return Boolean(input && input.caseId === game.id && input.version === 2);
  }

  function validTimeline(order) {
    return (
      Array.isArray(order) &&
      order.length === game.chronology.length &&
      new Set(order).size === game.chronology.length &&
      order.every((id) => game.chronology.includes(id))
    );
  }

  function timelineCorrect(order) {
    return validTimeline(order) && order.every((id, index) => id === game.chronology[index]);
  }

  function restore(input) {
    const clean = defaults();
    if (!isCompatible(input)) return clean;

    clean.started = input.started === true;

    // Keep only an unbroken sequence of recognised, reachable findings.
    for (const deduction of game.deductions) {
      if (
        !Array.isArray(input.solved) ||
        !input.solved.includes(deduction.id) ||
        !deduction.requires.every((id) => clean.solved.includes(id))
      )
        break;
      clean.solved.push(deduction.id);
    }

    for (const key of ["seen", "pins"]) {
      clean[key] = Array.isArray(input[key])
        ? [
            ...new Set(
              input[key].filter(
                (id) =>
                  exhibitIds.has(id) &&
                  available(
                    game.exhibits.find((item) => item.id === id),
                    clean,
                  ),
              ),
            ),
          ]
        : [];
    }

    clean.notes = typeof input.notes === "string" ? input.notes.slice(0, 16000) : "";
    if (validTimeline(input.timeline)) clean.timeline = [...input.timeline];
    clean.chronology =
      clean.solved.length === total && input.chronology === true && timelineCorrect(clean.timeline);
    clean.completed = clean.chronology && input.completed === true;
    clean.fragment = clean.completed && input.fragment === true;

    for (const deduction of game.deductions) {
      const level = input.hints?.[deduction.id];
      clean.hints[deduction.id] = Number.isInteger(level) ? Math.max(0, Math.min(3, level)) : 0;
    }

    clean.sound = input.sound === true;
    clean.largeText = input.largeText === true;
    return clean;
  }

  function checkDeduction(id, answer, sources, state) {
    const deduction = game.deductions.find((item) => item.id === id);
    if (!deduction || !deduction.requires.every((item) => state.solved.includes(item))) {
      return {
        ok: false,
        message: "Follow the preceding lead before making this finding.",
      };
    }

    if (answer !== deduction.answer) {
      return {
        ok: false,
        message:
          "That explanation contradicts a source or assumes more than the evidence establishes. Recheck observation, interpretation, and timing.",
      };
    }

    const chosen = Array.isArray(sources) ? [...new Set(sources)] : [];
    const supported =
      chosen.length === deduction.sources.length &&
      deduction.sources.every(
        (sourceId) => chosen.includes(sourceId) && state.pins.includes(sourceId),
      );
    if (!supported) {
      return {
        ok: false,
        message: `Cite exactly ${deduction.sources.length} relevant pinned sources. Each part of the explanation needs support; citing the entire wall is not a supported comparison.`,
      };
    }

    return { ok: true, message: deduction.finding };
  }

  function checkFinal(answers, state) {
    if (state.solved.length !== total || !state.chronology || !timelineCorrect(state.timeline)) {
      return {
        ok: false,
        message: "Complete the supported findings and check the chronology before submitting.",
      };
    }

    const failed = game.finalQuestions.find(
      (question) =>
        answers[question.name] !== question.answer ||
        (question.source && !state.pins.includes(question.answer)),
    );
    if (failed) {
      return {
        ok: false,
        message: `Review this part of the reconstruction: ${failed.label}. Use the findings and cite the appropriate pinned source.`,
      };
    }

    return {
      ok: true,
      message: "Reconstruction supported. The corrected record is ready.",
    };
  }

  root.NC_RULES = {
    defaults,
    stage,
    available,
    isCompatible,
    restore,
    timelineCorrect,
    checkDeduction,
    checkFinal,
  };
})(typeof window !== "undefined" ? window : globalThis);
