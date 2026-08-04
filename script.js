(() => {
  'use strict';

  const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/eduardo.caride0121@gmail.com';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const toast = document.getElementById('toast');

  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  };

  const showToast = (message, isError = false) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle('is-error', isError);
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 5200);
  };

  const closeNavigation = () => {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  };

  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  menuButton?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.forEach((link) => link.addEventListener('click', closeNavigation));

  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-38% 0px -54%', threshold: 0.01 });
    sections.forEach((section) => activeObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  const slides = [...document.querySelectorAll('.portrait-slide')];
  const dots = [...document.querySelectorAll('[data-slide]')];
  let currentSlide = 0;
  let sliderTimer = null;

  const showSlide = (index) => {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === currentSlide));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === currentSlide));
  };

  const restartSlider = () => {
    window.clearInterval(sliderTimer);
    sliderTimer = window.setInterval(() => showSlide(currentSlide + 1), 5200);
  };

  document.querySelector('[data-prev]')?.addEventListener('click', () => { showSlide(currentSlide - 1); restartSlider(); });
  document.querySelector('[data-next]')?.addEventListener('click', () => { showSlide(currentSlide + 1); restartSlider(); });
  dots.forEach((dot) => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slide)); restartSlider(); }));
  if (slides.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) restartSlider();

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project-card[data-category]')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      projects.forEach((project) => {
        const categories = project.dataset.category.split(' ');
        project.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
      });
      track('portfolio_filter', { filter_name: filter });
    });
  });

  const resumeModal = document.getElementById('resume-modal');
  const openResume = () => {
    track('resume_view', { content_type: 'resume_modal' });
    if (resumeModal?.showModal) {
      resumeModal.showModal();
      document.body.classList.add('modal-open');
    } else {
      window.open('assets/Eduardo-Caride-Sato-Resume.pdf', '_blank', 'noopener');
    }
  };
  document.querySelectorAll('[data-open-resume]').forEach((button) => button.addEventListener('click', openResume));
  document.querySelector('[data-close-resume]')?.addEventListener('click', () => resumeModal?.close());
  resumeModal?.addEventListener('close', () => document.body.classList.remove('modal-open'));
  resumeModal?.addEventListener('click', (event) => {
    if (event.target === resumeModal) resumeModal.close();
  });

  const cases = {
    approval: {
      category: 'NETSUITE WORKFLOW',
      title: 'Approval workflow redesign',
      summary: 'A maintainable approval structure that preserves business controls while reducing unnecessary routing complexity.',
      challenge: 'The approval logic had grown across many states, transitions, repeated actions, and exceptions. Processing was slower and support teams could not easily explain why a request followed a specific path.',
      approach: 'Map the actual policy first, identify duplicated logic, separate validation from approval routing, consolidate states, and move unsuitable logic into a focused SuiteScript component only where it improved clarity.',
      result: 'A clearer approval model with easier troubleshooting, more predictable routing, less maintenance risk, and better confidence during future changes.'
    },
    integration: {
      category: 'INTEGRATION ARCHITECTURE',
      title: 'Multi-system integration hub',
      summary: 'Reliable synchronization between NetSuite and external platforms with visibility beyond the happy path.',
      challenge: 'Records moved across systems, but failures were difficult to classify and ownership was unclear. A successful request did not always mean the business transaction was complete or reconciled.',
      approach: 'Define source-of-truth rules, validation boundaries, idempotent behavior, retry strategy, structured error messages, monitoring views, and a reconciliation process for financially important records.',
      result: 'More dependable data movement, faster exception handling, clearer support ownership, and a design that could be extended without creating hidden operational risk.'
    },
    revenue: {
      category: 'FINANCE REPORTING',
      title: 'High-volume revenue viewer',
      summary: 'A finance-friendly reporting experience for large NetSuite datasets and background processing.',
      challenge: 'The required financial detail was too large and complex for a simple synchronous Suitelet page. Users needed filtering, trustworthy totals, progress visibility, and exportable results.',
      approach: 'Separate the user interface from Map/Reduce processing, store request parameters and run tokens, paginate results, expose job status, and generate controlled exports after processing completes.',
      result: 'A scalable reporting workflow that gives finance users better self-service while protecting script governance, response time, and result accuracy.'
    },
    intercompany: {
      category: 'FINANCE AUTOMATION',
      title: 'Intercompany journal automation',
      summary: 'A guided creation process for complex multi-entity journals with validation before record creation.',
      challenge: 'Manual journals required careful subsidiary, account, entity, currency, and balancing decisions. Small mistakes created rework and slowed finance review.',
      approach: 'Build a service layer for reusable lookups and validation, provide a preview of proposed lines, verify balancing and required entities, then create records only after explicit confirmation.',
      result: 'A more controlled process with fewer preventable entry errors, clearer review, and reusable logic that can support future transaction automation.'
    },
    workorder: {
      category: 'WEB + NETSUITE',
      title: 'External work-order portal',
      summary: 'A practical web-to-NetSuite experience for submitting structured work orders and related line details.',
      challenge: 'Operational users needed a simple external form while NetSuite required validated customer, job, parent work-order, part, and labor records in the correct sequence.',
      approach: 'Expose customer and job reference data through a read RESTlet, validate submitted JSON through a separate create RESTlet, create the parent first, and then associate line records using the returned internal ID.',
      result: 'Less duplicate entry, a clearer user experience, testable API contracts, and a foundation for future status updates or customer self-service.'
    },
    migration: {
      category: 'DATA MIGRATION',
      title: 'Controlled ERP data migration',
      summary: 'Repeatable data movement with validation, reconciliation, and business sign-off built into the process.',
      challenge: 'Source data contained inconsistent references, formatting differences, missing relationships, and balances that needed to reconcile after import.',
      approach: 'Profile source data, define transformation rules, validate master references, separate errors from accepted rows, test in sandbox, reconcile totals, and preserve an auditable migration log.',
      result: 'A safer migration process with clearer exceptions, repeatable test cycles, and stronger confidence that imported records matched the intended business data.'
    }
  };

  const caseModal = document.getElementById('case-modal');
  const caseNodes = {
    category: document.getElementById('case-category'),
    title: document.getElementById('case-title'),
    summary: document.getElementById('case-summary'),
    challenge: document.getElementById('case-challenge'),
    approach: document.getElementById('case-approach'),
    result: document.getElementById('case-result')
  };

  document.querySelectorAll('[data-case]').forEach((button) => {
    button.addEventListener('click', () => {
      const caseStudy = cases[button.dataset.case];
      if (!caseStudy || !caseModal) return;
      Object.keys(caseNodes).forEach((key) => { caseNodes[key].textContent = caseStudy[key]; });
      caseModal.showModal();
      document.body.classList.add('modal-open');
      track('case_study_view', { case_study: button.dataset.case });
    });
  });
  document.querySelectorAll('[data-close-case]').forEach((button) => button.addEventListener('click', () => caseModal?.close()));
  caseModal?.addEventListener('close', () => document.body.classList.remove('modal-open'));
  caseModal?.addEventListener('click', (event) => { if (event.target === caseModal) caseModal.close(); });

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => track(element.dataset.track, { link_url: element.href || '' }));
  });

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitButton = contactForm?.querySelector('.submit-button');

  const updateStatus = (message, type = '') => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status${type ? ` is-${type}` : ''}`;
  };

  const validateForm = () => {
    if (!contactForm) return false;
    let valid = true;
    contactForm.querySelectorAll('[required]').forEach((field) => {
      const fieldValid = field.checkValidity();
      field.classList.toggle('is-invalid', !fieldValid);
      valid = fieldValid && valid;
    });
    return valid;
  };

  contactForm?.addEventListener('input', (event) => {
    if (event.target.matches('[required]')) event.target.classList.remove('is-invalid');
  });

  contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      updateStatus('Please complete every required field before sending.', 'error');
      contactForm.querySelector('.is-invalid')?.focus();
      return;
    }

    if (contactForm.elements._honey?.value) return;

    submitButton.disabled = true;
    submitButton.classList.add('is-loading');
    updateStatus('Sending your message securely…');

    const payload = new FormData(contactForm);
    payload.set('_subject', `Portfolio inquiry: ${payload.get('topic')} — ${payload.get('name')}`);
    payload.append('Submitted from', window.location.href);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
        signal: controller.signal
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === 'false' || result.success === false) {
        throw new Error(result.message || 'The message service returned an error.');
      }

      contactForm.reset();
      updateStatus('Message sent successfully. Eduardo will receive it at eduardo.caride0121@gmail.com.', 'success');
      showToast('Thank you. Your project inquiry was sent successfully.');
      track('generate_lead', { form_name: 'portfolio_contact', project_type: payload.get('topic') });
    } catch (error) {
      const isTimeout = error.name === 'AbortError';
      updateStatus('The direct form could not complete. Use the email link below to send the same inquiry.', 'error');
      showToast(isTimeout ? 'The form timed out. Please use the direct email link.' : 'Message not sent. Please use the direct email link.', true);

      const name = encodeURIComponent(contactForm.elements.name.value.trim());
      const topic = encodeURIComponent(contactForm.elements.topic.value || 'Portfolio inquiry');
      const message = encodeURIComponent(contactForm.elements.message.value.trim());
      const email = encodeURIComponent(contactForm.elements.email.value.trim());
      const fallback = document.createElement('a');
      fallback.href = `mailto:eduardo.caride0121@gmail.com?subject=${topic}&body=Hello%20Eduardo%2C%0A%0A${message}%0A%0AFrom%3A%20${name}%0AReply%20email%3A%20${email}`;
      fallback.textContent = 'Send directly by email →';
      fallback.className = 'article-link';
      fallback.style.display = 'inline-block';
      fallback.style.marginTop = '8px';
      formStatus.append(document.createElement('br'), fallback);
      track('contact_form_error', { error_type: isTimeout ? 'timeout' : 'submission_error' });
    } finally {
      window.clearTimeout(timeout);
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
    }
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
