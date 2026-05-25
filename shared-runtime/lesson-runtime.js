(function () {
  const REVEAL_CONFIG = {
    hash: true,
    controls: true,
    progress: true,
    center: true,
    slideNumber: "c/t",
    width: 1440,
    height: 810,
    margin: 0.04,
    transition: "slide",
    backgroundTransition: "fade",
    overview: true,
    touch: true,
    keyboard: true
  };

  const SHARED_UI_HTML = `
    <button
      class="slide-jump-button"
      id="slideJumpToggle"
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-label="Open slide navigator"
      title="Slide navigator"
    >
      <span class="material-symbols-outlined">menu</span>
      <span class="slide-jump-label">Jump to slide</span>
    </button>

    <div class="voiceover-controls is-collapsed" id="voiceoverControls">
      <label class="voiceover-profile" id="voiceoverProfileWrap" hidden>
        <span class="material-symbols-outlined">record_voice_over</span>
        <select class="voiceover-select" id="voiceoverProfile" aria-label="Select narration voice" disabled></select>
      </label>

      <button class="voiceover-button" id="voiceoverAction" type="button" aria-pressed="false" disabled>
        <span class="material-symbols-outlined">volume_up</span>
        <span class="voiceover-label">Load narration</span>
      </button>

      <div class="voiceover-dock">
        <button
          class="voiceover-launcher"
          id="voiceoverLauncher"
          type="button"
          aria-expanded="false"
          aria-label="Show narration controls"
          title="Narration controls"
          disabled
        >
          <span class="material-symbols-outlined">volume_up</span>
        </button>

        <button
          class="voiceover-quick-toggle"
          id="voiceoverQuickToggle"
          type="button"
          aria-label="Pause narration"
          title="Pause narration"
          aria-pressed="true"
          hidden
        >
          <span class="material-symbols-outlined">pause</span>
        </button>
      </div>
    </div>

    <div class="slide-jump-backdrop" id="slideJumpBackdrop"></div>

    <aside class="slide-jump-panel" id="slideJumpPanel" aria-hidden="true">
      <div class="slide-jump-header">
        <div>
          <div class="slide-jump-title">Slide Navigator</div>
          <div class="slide-jump-subtitle">Jump directly to any section</div>
        </div>

        <button class="slide-jump-close" id="slideJumpClose" type="button" aria-label="Close slide navigator">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="slide-jump-body">
        <div class="slide-jump-list" id="slideJumpList"></div>
        <div class="slide-jump-rail" id="slideJumpRail" aria-hidden="true">
          <div class="slide-jump-thumb" id="slideJumpThumb"></div>
        </div>
      </div>
    </aside>
  `;

  function getRevealPlugins() {
    return [window.RevealNotes, window.RevealSearch, window.RevealZoom].filter(Boolean);
  }

  function injectSharedUi(revealRoot) {
    if (revealRoot.querySelector("#slideJumpToggle")) {
      return;
    }

    revealRoot.insertAdjacentHTML("beforeend", SHARED_UI_HTML);
  }

  function initializeReveal(customConfig) {
    if (!window.Reveal) {
      throw new Error("Reveal.js is not available.");
    }

    if (typeof window.Reveal.isReady === "function" && window.Reveal.isReady()) {
      return;
    }

    const plugins = customConfig && customConfig.plugins
      ? customConfig.plugins
      : getRevealPlugins();

    window.Reveal.initialize({
      ...REVEAL_CONFIG,
      ...customConfig,
      plugins
    });
  }

  function init(options = {}) {
    const revealRoot = document.querySelector(".reveal");
    const slidesRoot = document.querySelector(".reveal .slides");

    if (!revealRoot || !slidesRoot) {
      return;
    }

    if (revealRoot.dataset.openRecoveryLessonRuntime === "true") {
      return;
    }

    revealRoot.dataset.openRecoveryLessonRuntime = "true";
    injectSharedUi(revealRoot);
    initializeReveal(options.revealConfig);

    const voiceoverLauncher = document.getElementById("voiceoverLauncher");
    const voiceoverAction = document.getElementById("voiceoverAction");
    const voiceoverLabel = voiceoverAction.querySelector(".voiceover-label");
    const voiceoverControls = document.getElementById("voiceoverControls");
    const voiceoverProfileWrap = document.getElementById("voiceoverProfileWrap");
    const voiceoverProfile = document.getElementById("voiceoverProfile");
    const voiceoverQuickToggle = document.getElementById("voiceoverQuickToggle");
    const voiceoverQuickIcon = voiceoverQuickToggle.querySelector(".material-symbols-outlined");
    const voiceoverAudio = new Audio();
    const voiceoverManifestPath = options.voiceoverManifestPath || "voiceover.json";
    const VOICEOVER_PROFILE_STORAGE_KEY = "openrecovery.voiceoverProfile";
    const NAVIGATION_KEYS = new Set([
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " "
    ]);
    const voiceoverState = {
      enabled: false,
      expanded: false,
      collapseTimer: null,
      currentKey: null,
      currentSegment: null,
      currentCueToken: 0,
      autoAdvanceSuspendedKey: null,
      metadataHandler: null,
      fragmentTimerIds: [],
      isPaused: false,
      defaultProfileId: "default",
      selectedProfileId: "default",
      profiles: [],
      segments: new Map()
    };

    const slideJumpToggle = document.getElementById("slideJumpToggle");
    const slideJumpPanel = document.getElementById("slideJumpPanel");
    const slideJumpBackdrop = document.getElementById("slideJumpBackdrop");
    const slideJumpClose = document.getElementById("slideJumpClose");
    const slideJumpList = document.getElementById("slideJumpList");
    const slideJumpRail = document.getElementById("slideJumpRail");
    const slideJumpThumb = document.getElementById("slideJumpThumb");
    const slideSections = Array.from(document.querySelectorAll(".reveal .slides > section"));

    const slideEntries = slideSections.map((section, index) => {
      const rawTitle = section.getAttribute("data-title") || `Slide ${index + 1}`;
      const title = rawTitle === "Lesson Title" ? "Title Slide" : rawTitle;
      return { index, title };
    });

    voiceoverAudio.preload = "none";

    function getVoiceoverKey(slideId, trigger) {
      return `${slideId}::${trigger}`;
    }

    function getManifestProfiles(manifest) {
      const profiles = Array.isArray(manifest.profiles) ? manifest.profiles : [];
      const validProfiles = profiles
        .filter((profile) => profile && profile.id)
        .map((profile) => ({
          id: String(profile.id),
          label: profile.label || String(profile.id)
        }));

      if (validProfiles.length > 0) {
        return validProfiles;
      }

      return [{
        id: manifest.default_profile_id || "default",
        label: "Narration"
      }];
    }

    function getDefaultProfileId(manifest, profiles) {
      const manifestDefault = manifest.default_profile_id;
      if (manifestDefault && profiles.some((profile) => profile.id === manifestDefault)) {
        return manifestDefault;
      }

      return profiles[0] ? profiles[0].id : "default";
    }

    function readSavedProfileId() {
      try {
        return window.localStorage.getItem(VOICEOVER_PROFILE_STORAGE_KEY);
      } catch (error) {
        return null;
      }
    }

    function saveProfileId(profileId) {
      try {
        window.localStorage.setItem(VOICEOVER_PROFILE_STORAGE_KEY, profileId);
      } catch (error) {
        // Ignore storage failures so playback still works in restricted browsers.
      }
    }

    function getSelectedProfileId() {
      return voiceoverState.selectedProfileId || voiceoverState.defaultProfileId || "default";
    }

    function updateVoiceoverQuickToggle() {
      const shouldShow = voiceoverState.enabled && (Boolean(voiceoverState.currentKey) || voiceoverState.isPaused);
      voiceoverQuickToggle.hidden = !shouldShow;

      if (!shouldShow) {
        return;
      }

      const paused = voiceoverState.isPaused;
      const label = paused ? "Resume narration" : "Pause narration";

      voiceoverQuickToggle.classList.toggle("is-paused", paused);
      voiceoverQuickToggle.setAttribute("aria-label", label);
      voiceoverQuickToggle.setAttribute("title", label);
      voiceoverQuickToggle.setAttribute("aria-pressed", String(!paused));
      voiceoverQuickIcon.textContent = paused ? "play_arrow" : "pause";
    }

    function clearGuidedPlaybackTimers() {
      voiceoverState.fragmentTimerIds.forEach((timerId) => window.clearTimeout(timerId));
      voiceoverState.fragmentTimerIds = [];

      if (voiceoverState.metadataHandler) {
        voiceoverAudio.removeEventListener("loadedmetadata", voiceoverState.metadataHandler);
        voiceoverState.metadataHandler = null;
      }
    }

    function suspendGuidedPlaybackForCurrentCue() {
      if (!voiceoverState.enabled || !voiceoverState.currentKey) {
        return;
      }

      voiceoverState.autoAdvanceSuspendedKey = voiceoverState.currentKey;
      clearGuidedPlaybackTimers();
    }

    function clearVoiceoverCollapseTimer() {
      if (voiceoverState.collapseTimer !== null) {
        window.clearTimeout(voiceoverState.collapseTimer);
        voiceoverState.collapseTimer = null;
      }
    }

    function scheduleVoiceoverCollapse(delay = 1800) {
      clearVoiceoverCollapseTimer();

      voiceoverState.collapseTimer = window.setTimeout(() => {
        voiceoverState.collapseTimer = null;

        if (voiceoverState.enabled) {
          setVoiceoverExpanded(false);
        }
      }, delay);
    }

    function setVoiceoverExpanded(expanded) {
      voiceoverState.expanded = expanded;
      voiceoverControls.classList.toggle("is-collapsed", !expanded);
      voiceoverLauncher.setAttribute("aria-expanded", String(expanded));

      if (!expanded) {
        clearVoiceoverCollapseTimer();
      }
    }

    function resolveSegmentFile(segment) {
      if (segment.file_template) {
        return String(segment.file_template).replace(/\{profile_id\}/g, getSelectedProfileId());
      }

      return segment.file || null;
    }

    function setVoiceoverEnabled(enabled) {
      voiceoverState.enabled = enabled;
      voiceoverAction.setAttribute("aria-pressed", String(enabled));
      voiceoverLabel.textContent = enabled ? "Stop narration" : "Start narration";

      if (enabled) {
        setVoiceoverExpanded(true);
        scheduleVoiceoverCollapse();
      } else {
        clearVoiceoverCollapseTimer();
        clearGuidedPlaybackTimers();
        voiceoverState.autoAdvanceSuspendedKey = null;
        voiceoverState.isPaused = false;
      }

      updateVoiceoverQuickToggle();
    }

    function stopVoiceover() {
      clearGuidedPlaybackTimers();
      voiceoverAudio.pause();
      voiceoverAudio.currentTime = 0;
      voiceoverAudio.removeAttribute("src");
      voiceoverAudio.load();
      voiceoverState.currentKey = null;
      voiceoverState.currentSegment = null;
      voiceoverState.currentCueToken += 1;
      voiceoverState.autoAdvanceSuspendedKey = null;
      voiceoverState.isPaused = false;
      updateVoiceoverQuickToggle();
    }

    function setVoiceoverProfile(profileId, config = {}) {
      const replayCurrentCue = Boolean(config.replayCurrentCue);
      const nextProfileId = voiceoverState.profiles.some((profile) => profile.id === profileId)
        ? profileId
        : voiceoverState.defaultProfileId;

      voiceoverState.selectedProfileId = nextProfileId;
      voiceoverProfile.value = nextProfileId;
      saveProfileId(nextProfileId);

      if (replayCurrentCue && voiceoverState.enabled) {
        stopVoiceover();
        playCurrentVoiceoverCue();
        scheduleVoiceoverCollapse();
      }
    }

    function initializeVoiceoverProfiles(manifest) {
      const profiles = getManifestProfiles(manifest);
      const defaultProfileId = getDefaultProfileId(manifest, profiles);
      const savedProfileId = readSavedProfileId();
      const initialProfileId = profiles.some((profile) => profile.id === savedProfileId)
        ? savedProfileId
        : defaultProfileId;

      voiceoverState.profiles = profiles;
      voiceoverState.defaultProfileId = defaultProfileId;
      voiceoverProfile.innerHTML = profiles.map((profile) => `
        <option value="${profile.id}">${profile.label}</option>
      `).join("");
      voiceoverProfile.disabled = profiles.length < 2;
      voiceoverProfileWrap.hidden = profiles.length < 2;

      setVoiceoverProfile(initialProfileId);
    }

    function getInlineVoiceoverManifest() {
      const inlineManifestNode = document.getElementById("openrecovery-voiceover-manifest");
      if (!inlineManifestNode) {
        return null;
      }

      const rawManifest = inlineManifestNode.textContent.trim();
      if (!rawManifest) {
        return null;
      }

      try {
        return JSON.parse(rawManifest);
      } catch (error) {
        throw new Error(`Invalid inline voiceover manifest JSON: ${error.message}`);
      }
    }

    function loadVoiceoverManifest() {
      try {
        const inlineManifest = getInlineVoiceoverManifest();
        if (inlineManifest) {
          return Promise.resolve(inlineManifest);
        }
      } catch (error) {
        return Promise.reject(error);
      }

      return fetch(voiceoverManifestPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load ${voiceoverManifestPath} (${response.status})`);
          }

          return response.json();
        });
    }

    function getFragmentIndex(fragment) {
      if (!fragment) {
        return -1;
      }

      const slide = fragment.closest("section");
      if (!slide) {
        return -1;
      }

      const fragments = Array.from(slide.querySelectorAll(".fragment"));
      return fragments.indexOf(fragment);
    }

    function getCurrentVoiceoverCue() {
      const currentSlide = window.Reveal.getCurrentSlide();
      if (!currentSlide || !currentSlide.id) {
        return null;
      }

      const visibleFragments = Array.from(currentSlide.querySelectorAll(".fragment.visible"));
      if (visibleFragments.length > 0) {
        const lastVisibleFragment = visibleFragments[visibleFragments.length - 1];
        const fragmentIndex = getFragmentIndex(lastVisibleFragment);
        if (fragmentIndex >= 0) {
          return {
            slideId: currentSlide.id,
            trigger: `fragment-${fragmentIndex}`
          };
        }
      }

      return {
        slideId: currentSlide.id,
        trigger: "slide-enter"
      };
    }

    function slideHasFragmentVoiceover(slideId) {
      return Array.from(voiceoverState.segments.keys()).some((key) =>
        key.startsWith(`${slideId}::fragment-`)
      );
    }

    function scheduleGuidedFragments(segment, playbackKey, cueToken) {
      clearGuidedPlaybackTimers();

      if (segment.trigger !== "slide-enter" || slideHasFragmentVoiceover(segment.slide_id)) {
        return;
      }

      const queueFragments = () => {
        if (voiceoverState.currentCueToken !== cueToken || voiceoverState.currentKey !== playbackKey) {
          return;
        }

        const activeSlide = window.Reveal.getCurrentSlide();
        if (!activeSlide || activeSlide.id !== segment.slide_id) {
          return;
        }

        const hiddenFragments = Array.from(activeSlide.querySelectorAll(".fragment:not(.visible)"));
        if (hiddenFragments.length === 0) {
          return;
        }

        const durationMs = Number.isFinite(voiceoverAudio.duration) ? voiceoverAudio.duration * 1000 : 0;
        const elapsedMs = Math.max(0, Math.min(durationMs, voiceoverAudio.currentTime * 1000));
        const remainingMs = Math.max(0, durationMs - elapsedMs);

        if (remainingMs <= 0) {
          return;
        }

        const leadIn = Math.min(900, Math.max(180, remainingMs * 0.16));
        const tailBuffer = Math.min(900, Math.max(280, remainingMs * 0.14));
        const usableWindow = Math.max(remainingMs - leadIn - tailBuffer, remainingMs * 0.22);

        hiddenFragments.forEach((fragment, index) => {
          const ratio = (index + 1) / (hiddenFragments.length + 1);
          const delay = Math.max(
            150,
            Math.round(Math.min(Math.max(remainingMs - 120, 150), leadIn + usableWindow * ratio))
          );

          const timerId = window.setTimeout(() => {
            if (!voiceoverState.enabled) {
              return;
            }

            if (voiceoverState.currentCueToken !== cueToken || voiceoverState.currentKey !== playbackKey) {
              return;
            }

            if (voiceoverState.autoAdvanceSuspendedKey === playbackKey) {
              return;
            }

            const liveSlide = window.Reveal.getCurrentSlide();
            if (!liveSlide || liveSlide.id !== segment.slide_id) {
              return;
            }

            if (fragment.closest("section") !== liveSlide) {
              return;
            }

            if (liveSlide.querySelector(".fragment:not(.visible)")) {
              window.Reveal.nextFragment();
            }
          }, delay);

          voiceoverState.fragmentTimerIds.push(timerId);
        });
      };

      if (voiceoverAudio.readyState >= 1 && Number.isFinite(voiceoverAudio.duration) && voiceoverAudio.duration > 0) {
        queueFragments();
        return;
      }

      voiceoverState.metadataHandler = () => {
        voiceoverState.metadataHandler = null;
        queueFragments();
      };

      voiceoverAudio.addEventListener("loadedmetadata", voiceoverState.metadataHandler, { once: true });
    }

    function playVoiceoverCue(slideId, trigger) {
      if (!voiceoverState.enabled) {
        return;
      }

      const segmentKey = getVoiceoverKey(slideId, trigger);
      const segment = voiceoverState.segments.get(segmentKey);

      if (!segment) {
        return;
      }

      const audioFile = resolveSegmentFile(segment);
      if (!audioFile) {
        return;
      }

      const playbackKey = `${getSelectedProfileId()}::${segmentKey}`;
      if (voiceoverState.currentKey === playbackKey && !voiceoverAudio.paused) {
        return;
      }

      voiceoverAudio.pause();
      voiceoverAudio.currentTime = 0;
      voiceoverAudio.src = audioFile;
      voiceoverState.currentKey = playbackKey;
      voiceoverState.currentSegment = segment;
      voiceoverState.currentCueToken += 1;
      voiceoverState.autoAdvanceSuspendedKey = null;
      voiceoverState.isPaused = false;
      updateVoiceoverQuickToggle();

      scheduleGuidedFragments(segment, playbackKey, voiceoverState.currentCueToken);

      const playPromise = voiceoverAudio.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.warn("Voiceover playback was blocked or failed.", error);
          stopVoiceover();
          setVoiceoverEnabled(false);
          setVoiceoverExpanded(false);
        });
      }
    }

    function playCurrentVoiceoverCue() {
      const cue = getCurrentVoiceoverCue();
      if (!cue) {
        return;
      }

      const exactKey = getVoiceoverKey(cue.slideId, cue.trigger);
      if (!voiceoverState.segments.has(exactKey) && cue.trigger !== "slide-enter") {
        playVoiceoverCue(cue.slideId, "slide-enter");
        return;
      }

      playVoiceoverCue(cue.slideId, cue.trigger);
    }

    function advanceToNextSlideFromVoiceover() {
      const indices = window.Reveal.getIndices();
      const nextHorizontalIndex = indices.h + 1;

      if (nextHorizontalIndex >= slideEntries.length) {
        return;
      }

      window.Reveal.slide(nextHorizontalIndex, 0);
    }

    function pauseVoiceover() {
      if (!voiceoverState.enabled || voiceoverState.isPaused || !voiceoverState.currentKey) {
        return;
      }

      clearGuidedPlaybackTimers();
      voiceoverAudio.pause();
      voiceoverState.isPaused = true;
      updateVoiceoverQuickToggle();
    }

    function resumeVoiceover() {
      if (
        !voiceoverState.enabled ||
        !voiceoverState.isPaused ||
        !voiceoverState.currentKey ||
        !voiceoverState.currentSegment
      ) {
        return;
      }

      voiceoverState.isPaused = false;
      updateVoiceoverQuickToggle();
      scheduleGuidedFragments(
        voiceoverState.currentSegment,
        voiceoverState.currentKey,
        voiceoverState.currentCueToken
      );

      const playPromise = voiceoverAudio.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.warn("Voiceover resume was blocked or failed.", error);
          voiceoverState.isPaused = true;
          updateVoiceoverQuickToggle();
        });
      }
    }

    function isFormControl(target) {
      return target instanceof HTMLElement && (
        target.isContentEditable ||
        ["BUTTON", "INPUT", "OPTION", "SELECT", "TEXTAREA"].includes(target.tagName)
      );
    }

    voiceoverAudio.addEventListener("ended", () => {
      const completedKey = voiceoverState.currentKey;
      clearGuidedPlaybackTimers();
      voiceoverState.currentKey = null;
      voiceoverState.currentSegment = null;
      voiceoverState.isPaused = false;
      updateVoiceoverQuickToggle();

      if (!voiceoverState.enabled || !completedKey) {
        return;
      }

      if (voiceoverState.autoAdvanceSuspendedKey === completedKey) {
        return;
      }

      advanceToNextSlideFromVoiceover();
    });

    loadVoiceoverManifest()
      .then((manifest) => {
        initializeVoiceoverProfiles(manifest);

        (manifest.segments || []).forEach((segment) => {
          const key = getVoiceoverKey(segment.slide_id, segment.trigger);
          voiceoverState.segments.set(key, segment);
        });

        voiceoverLauncher.disabled = false;
        voiceoverAction.disabled = false;
        voiceoverLabel.textContent = "Start narration";
        setVoiceoverExpanded(false);
      })
      .catch((error) => {
        console.warn("Narration manifest unavailable.", error);
        voiceoverLabel.textContent = window.location.protocol === "file:"
          ? "Narration unavailable in file preview"
          : "Narration unavailable";
      });

    voiceoverProfile.addEventListener("change", () => {
      setVoiceoverProfile(voiceoverProfile.value, { replayCurrentCue: true });
    });

    voiceoverLauncher.addEventListener("click", () => {
      if (voiceoverLauncher.disabled) {
        return;
      }

      setVoiceoverExpanded(!voiceoverState.expanded);
    });

    voiceoverAction.addEventListener("click", () => {
      if (voiceoverAction.disabled) {
        return;
      }

      if (voiceoverState.enabled) {
        stopVoiceover();
        setVoiceoverEnabled(false);
        return;
      }

      setVoiceoverEnabled(true);
      playCurrentVoiceoverCue();
    });

    voiceoverQuickToggle.addEventListener("click", () => {
      if (!voiceoverState.enabled) {
        return;
      }

      if (voiceoverState.isPaused) {
        resumeVoiceover();
      } else {
        pauseVoiceover();
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!voiceoverState.expanded || voiceoverControls.contains(event.target)) {
        return;
      }

      setVoiceoverExpanded(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && voiceoverState.expanded) {
        setVoiceoverExpanded(false);
      }
    });

    function renderSlideJumpList() {
      const currentSlide = window.Reveal.getIndices().h;

      slideJumpList.innerHTML = slideEntries.map((entry) => `
        <button class="slide-jump-item${entry.index === currentSlide ? " is-active" : ""}" type="button" data-slide-index="${entry.index}">
          <span class="slide-jump-number">${entry.index + 1}</span>
          <span>
            <span class="slide-jump-item-title">${entry.title}</span>
            <span class="slide-jump-hint">Go to slide ${entry.index + 1}</span>
          </span>
        </button>
      `).join("");

      slideJumpList.querySelectorAll(".slide-jump-item").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          suspendGuidedPlaybackForCurrentCue();
          closeSlideJump();
          window.Reveal.slide(Number(button.dataset.slideIndex));
        });
      });

      window.requestAnimationFrame(updateSlideJumpScrollbar);
    }

    function updateSlideJumpScrollbar() {
      const maxScrollTop = Math.max(0, slideJumpList.scrollHeight - slideJumpList.clientHeight);
      const hasOverflow = maxScrollTop > 2;

      slideJumpRail.classList.toggle("is-scrollable", hasOverflow);
      slideJumpRail.classList.toggle("is-top", hasOverflow && slideJumpList.scrollTop <= 2);
      slideJumpRail.classList.toggle(
        "is-bottom",
        hasOverflow && slideJumpList.scrollTop >= maxScrollTop - 2
      );

      if (!hasOverflow) {
        slideJumpThumb.style.height = "100%";
        slideJumpThumb.style.top = "0";
        return;
      }

      const thumbHeight = Math.max(
        36,
        Math.round((slideJumpList.clientHeight / slideJumpList.scrollHeight) * slideJumpRail.clientHeight)
      );
      const available = Math.max(0, slideJumpRail.clientHeight - thumbHeight);
      const top = Math.round((slideJumpList.scrollTop / maxScrollTop) * available);

      slideJumpThumb.style.height = `${thumbHeight}px`;
      slideJumpThumb.style.top = `${top}px`;
    }

    function jumpSlideListFromRail(event) {
      const rect = slideJumpRail.getBoundingClientRect();
      const clickOffset = event.clientY - rect.top;
      const ratio = rect.height > 0 ? clickOffset / rect.height : 0;
      const maxScrollTop = Math.max(0, slideJumpList.scrollHeight - slideJumpList.clientHeight);

      slideJumpList.scrollTo({
        top: maxScrollTop * Math.min(1, Math.max(0, ratio)),
        behavior: "smooth"
      });
    }

    function openSlideJump() {
      renderSlideJumpList();
      slideJumpPanel.classList.add("is-open");
      slideJumpBackdrop.classList.add("is-open");
      slideJumpPanel.setAttribute("aria-hidden", "false");
      slideJumpToggle.setAttribute("aria-expanded", "true");
      window.requestAnimationFrame(updateSlideJumpScrollbar);
    }

    function closeSlideJump() {
      slideJumpPanel.classList.remove("is-open");
      slideJumpBackdrop.classList.remove("is-open");
      slideJumpPanel.setAttribute("aria-hidden", "true");
      slideJumpToggle.setAttribute("aria-expanded", "false");
    }

    slideJumpToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      suspendGuidedPlaybackForCurrentCue();

      if (slideJumpPanel.classList.contains("is-open")) {
        closeSlideJump();
      } else {
        openSlideJump();
      }
    });

    slideJumpClose.addEventListener("click", (event) => {
      event.stopPropagation();
      closeSlideJump();
    });

    slideJumpBackdrop.addEventListener("click", closeSlideJump);
    slideJumpList.addEventListener("scroll", updateSlideJumpScrollbar);
    slideJumpRail.addEventListener("click", jumpSlideListFromRail);
    window.addEventListener("resize", () => {
      if (slideJumpPanel.classList.contains("is-open")) {
        updateSlideJumpScrollbar();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && slideJumpPanel.classList.contains("is-open")) {
        closeSlideJump();
      }

      if (event.key.toLowerCase() === "j" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();

        if (slideJumpPanel.classList.contains("is-open")) {
          closeSlideJump();
        } else {
          openSlideJump();
        }
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!voiceoverState.enabled || event.defaultPrevented) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (!NAVIGATION_KEYS.has(event.key) || isFormControl(event.target)) {
        return;
      }

      suspendGuidedPlaybackForCurrentCue();
    });

    const revealControls = document.querySelector(".reveal .controls");
    if (revealControls) {
      revealControls.addEventListener("pointerdown", () => {
        suspendGuidedPlaybackForCurrentCue();
      });
    }

    const revealProgress = document.querySelector(".reveal .progress");
    if (revealProgress) {
      revealProgress.addEventListener("pointerdown", () => {
        suspendGuidedPlaybackForCurrentCue();
      });
    }

    window.Reveal.on("slidechanged", () => {
      if (slideJumpPanel.classList.contains("is-open")) {
        renderSlideJumpList();
      }

      if (voiceoverState.enabled) {
        stopVoiceover();
        const currentSlide = window.Reveal.getCurrentSlide();
        if (currentSlide && currentSlide.id) {
          playVoiceoverCue(currentSlide.id, "slide-enter");
        }
      }
    });

    window.Reveal.on("fragmentshown", (event) => {
      if (!voiceoverState.enabled || !event.fragment) {
        return;
      }

      const currentSlide = window.Reveal.getCurrentSlide();
      if (!currentSlide || !currentSlide.id) {
        return;
      }

      const fragmentIndex = getFragmentIndex(event.fragment);
      if (fragmentIndex >= 0) {
        playVoiceoverCue(currentSlide.id, `fragment-${fragmentIndex}`);
      }
    });

    slidesRoot.addEventListener("click", (event) => {
      if (event.defaultPrevented) {
        return;
      }

      if (event.target instanceof Element && event.target.closest("a, button, input, textarea, select")) {
        return;
      }

      suspendGuidedPlaybackForCurrentCue();
      window.Reveal.next();
    });
  }

  window.OpenRecoveryLessonRuntime = {
    init
  };
})();
