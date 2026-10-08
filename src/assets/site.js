/* Mytor marketing site: mobile menu, illustrative voice demo, sample lookup, demo-request form. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- language preference (remembered only on this device; used for the bare homepage) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[hreflang]");
    if (!a) return;
    try { localStorage.setItem("mytor-lang", a.getAttribute("hreflang")); } catch (err) {}
  });

  /* ---------- mobile menu ---------- */
  var menuBtn = $(".menu-btn");
  var nav = $("#site-nav");
  if (menuBtn && nav) {
    var label = $("[data-menu-label]", menuBtn);
    var setOpen = function (open, focusBack) {
      menuBtn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      label.textContent = open ? menuBtn.dataset.labelClose : menuBtn.dataset.labelOpen;
      if (!open && focusBack) menuBtn.focus();
    };
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open) { var first = $("a", nav); if (first) first.focus(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
    });
    window.matchMedia("(min-width: 1040px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  /* ---------- voice demo (illustrative only: no microphone, no network, no records) ---------- */
  $$("[data-vdemo]").forEach(function (root) {
    var screens = $$(".vscreen", root);
    var steps = $$(".vstep", root);
    var live = $("[data-vlive]", root);
    var next = $("[data-vnext]", root);
    var prev = $("[data-vprev]", root);
    var play = $("[data-vplay]", root);
    var cap = $("[data-vcap]", root);
    var total = screens.length;
    var current = 1;
    var timer = null;

    function show(n, announce) {
      current = Math.max(1, Math.min(total, n));
      root.setAttribute("data-step", String(current));
      screens.forEach(function (s, i) { s.classList.toggle("is-active", i + 1 === current); });
      steps.forEach(function (b, i) {
        if (i + 1 === current) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
        b.classList.toggle("is-done", i + 1 < current);
      });
      prev.disabled = current === 1;
      var last = current === total;
      next.firstChild.nodeValue = last ? next.dataset.labelRestart : next.dataset.labelNext;
      var t = steps[current - 1];
      // Visible caption for narrow screens, where the step list collapses to numbers.
      cap.firstChild.textContent = current + "/" + total + " · " + $("b", t).textContent;
      cap.lastChild.textContent = $(".vtxt span", t).textContent;
      if (announce) live.textContent = current + "/" + total + ". " + $("b", t).textContent + ". " + $(".vtxt span", t).textContent;
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      play.lastElementChild.textContent = play.dataset.labelPlay;
      play.setAttribute("aria-pressed", "false");
    }
    steps.forEach(function (b) {
      b.addEventListener("click", function () { stop(); show(+b.dataset.goto, true); });
    });
    next.addEventListener("click", function () { stop(); show(current === total ? 1 : current + 1, true); });
    prev.addEventListener("click", function () { stop(); show(current - 1, true); });
    play.setAttribute("aria-pressed", "false");
    play.addEventListener("click", function () {
      if (timer) { stop(); return; }
      if (current === total) show(1, true);
      play.lastElementChild.textContent = play.dataset.labelPause;
      play.setAttribute("aria-pressed", "true");
      timer = setInterval(function () {
        if (current >= total) { stop(); return; }
        show(current + 1, true);
      }, reduceMotion ? 4200 : 3000);
    });
    show(1, false);
  });

  /* ---------- sample lookup (filters fictional rows on the page) ---------- */
  var lookupInput = $("[data-lookup-input]");
  if (lookupInput) {
    var rows = $$("[data-lookup-list] li");
    var empty = $("[data-lookup-empty]");
    var status = $("[data-lookup-status]");
    var norm = function (s) { return s.toLowerCase().replace(/[\s+\-()]/g, ""); };
    lookupInput.addEventListener("input", function () {
      var q = norm(lookupInput.value);
      var n = 0;
      rows.forEach(function (li) {
        var hit = !q || norm(li.dataset.q).indexOf(q) !== -1;
        li.hidden = !hit;
        if (hit) n++;
      });
      empty.hidden = n !== 0;
      status.textContent = q ? status.dataset.prefix + " " + n : "";
    });
  }

  /* ---------- demo-request form ---------- */
  var form = $("#demo-form");
  if (form) {
    var msg = JSON.parse($("#form-i18n").textContent);
    var endpoint = (form.dataset.endpoint || "").trim();
    var summary = $("[data-summary]", form);
    var result = $("[data-result]", form);
    var submit = $("[data-submit]", form);
    var submitLabel = submit.firstChild.nodeValue;

    var setError = function (name, text) {
      var input = form.elements[name];
      var err = $("#f-" + name + "-err");
      if (text) { input.setAttribute("aria-invalid", "true"); err.textContent = text; err.hidden = false; }
      else { input.removeAttribute("aria-invalid"); err.textContent = ""; err.hidden = true; }
    };
    var phoneOk = function (v) {
      var d = v.replace(/\D/g, "");
      return (d.length === 12 && d.indexOf("998") === 0) || d.length === 9;
    };
    var validate = function () {
      var errs = [];
      ["name", "phone", "city"].forEach(function (n) {
        var v = form.elements[n].value.trim();
        var e = !v ? msg.errors.required : (n === "phone" && !phoneOk(v) ? msg.errors.phone : "");
        setError(n, e);
        if (e) errs.push(n);
      });
      var cErr = form.elements.consent.checked ? "" : msg.errors.consent;
      setError("consent", cErr);
      if (cErr) errs.push("consent");
      return errs;
    };
    var showResult = function (kind, title, text) {
      result.className = "form-result is-" + kind;
      result.innerHTML = "";
      var h = document.createElement("h3"); h.textContent = title;
      var p = document.createElement("p"); p.textContent = text;
      result.appendChild(h); result.appendChild(p);
      result.hidden = false;
      result.focus();
    };

    // Re-validate a field once the person fixes it.
    form.addEventListener("input", function (e) {
      var n = e.target.name;
      if (e.target.getAttribute("aria-invalid") === "true" && n) { validate(); }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      result.hidden = true;
      var errs = validate();
      if (errs.length) {
        summary.textContent = msg.errors.summary;
        summary.hidden = false;
        form.elements[errs[0]].focus();
        return;
      }
      summary.hidden = true;

      if (!endpoint) {
        // Not connected: be explicit that nothing was sent or stored.
        showResult("warn", msg.notConnectedTitle, msg.notConnectedText);
        return;
      }
      if (form.elements.website.value) return; // honeypot

      var payload = {
        name: form.elements.name.value.trim(),
        shop: form.elements.shop.value.trim() || null,
        city: form.elements.city.value.trim(),
        phone: form.elements.phone.value.trim(),
        branches: form.elements.branches.value || null,
        note: form.elements.note.value.trim() || null,
        consent: true,
        lang: form.dataset.lang,
        page: location.pathname,
      };
      submit.disabled = true;
      submit.firstChild.nodeValue = msg.sending;
      var ctrl = "AbortController" in window ? new AbortController() : null;
      var to = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl ? ctrl.signal : undefined,
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          showResult("success", msg.successTitle, msg.successText);
        })
        .catch(function () { showResult("error", msg.failTitle, msg.failText); })
        .then(function () {
          if (to) clearTimeout(to);
          submit.disabled = false;
          submit.firstChild.nodeValue = submitLabel;
        });
    });
  }
})();
