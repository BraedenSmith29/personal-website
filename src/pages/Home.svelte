<script lang="ts">
    import {GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon} from 'phosphor-svelte';
    import Portrait from '/portrait.png';
</script>

<div class="container">
    <section class="hero">
        <div class="hero-content">
            <h1>Hey, I'm Braeden 👋</h1>
            <p class="role">Software Developer & Systems Enthusiast</p>
            <p class="bio-short">
                I'm a software developer at <a href="https://www.caterpillar.com/" class="company-link">Caterpillar</a>
                based in Fort Worth, Texas. I enjoy building clean, efficient applications and exploring
                the depths of systems programming and homelab infrastructure.
            </p>

            <div class="social-links">
                <a href="https://github.com/BraedenSmith29" target="_blank" rel="noopener noreferrer">
                    <GithubLogoIcon size={20}/> GitHub
                </a>
                <a href="https://www.linkedin.com/in/braedensmith29/" target="_blank" rel="noopener noreferrer">
                    <LinkedinLogoIcon size={20}/> LinkedIn
                </a>
                <a href="mailto:braedensmith629@gmail.com">
                    <EnvelopeSimpleIcon size={20}/> Email
                </a>
            </div>
        </div>

        <div class="portrait">
            <img src={Portrait} alt="Braeden Smith"/>
        </div>
    </section>

    <section class="content-grid">
        <div class="main-column">
            <section class="about-section">
                <h2>About</h2>
                <p>
                    I've spent the last few years working across the stack, from frontend interfaces
                    to backend microservices. My approach to software is rooted in simplicity and
                    reliability. I believe that the best code is the code that's easiest to delete
                    and even easier to understand.
                </p>
                <p>
                    Currently, I'm diving deeper into the Go ecosystem and experimenting with
                    low-level systems architecture. When I'm not behind a keyboard, you can
                    usually find me tinkering with my homelab or reading a good book on
                    engineering history.
                </p>
            </section>

            <section class="contact-section">
                <h2>Get in touch</h2>
                <p>Always open to interesting projects or just a friendly chat about tech.</p>
                <a href="mailto:braedensmith629@gmail.com" class="accent-link">braedensmith629@gmail.com</a>
            </section>
        </div>

        <aside class="side-column">
            <section class="now-section">
                <h2>Now</h2>
                <p class="now-subtitle">What I'm focused on at the moment.</p>
                <ul class="now-list">
                    <li>Working on <strong>AniMap</strong> to visualize complex series relationships.</li>
                    <li>Learning more about <strong>distributed systems</strong> and consensus algorithms.</li>
                    <li>Optimizing my <strong>homelab</strong> for better power efficiency.</li>
                </ul>
            </section>
        </aside>
    </section>
</div>

<style>
    .hero {
        display: flex;
        align-items: flex-start;
        gap: 4rem;
        margin-bottom: 3rem;
        padding-bottom: 3rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .hero-content {
        flex: 2;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 0.25rem;
        letter-spacing: -0.02em;
    }

    .role {
        font-size: 1.25rem;
        color: var(--accent-color);
        font-family: var(--header-font), serif;
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    .bio-short {
        font-size: 1.15rem;
        color: var(--text-color);
        max-width: 600px;
        margin-bottom: 2rem;
        line-height: 1.7;
    }

    .company-link {
        color: var(--accent-color);
        display: inline-block;
        margin: 0 0.1em;
    }

    .company-link:hover {
        text-decoration: underline;
    }

    .social-links {
        display: flex;
        gap: 2rem;
    }

    .social-links a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-color);
        font-weight: 500;
        font-size: 0.95rem;
    }

    .social-links a:hover {
        color: var(--accent-color);
    }

    .portrait {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .portrait img {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        filter: grayscale(20%);
    }

    .content-grid {
        display: grid;
        grid-template-columns: 1.8fr 1fr;
        gap: 5rem;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: var(--text-color);
    }

    .about-section p {
        font-size: 1.05rem;
        margin-bottom: 1.25rem;
        line-height: 1.7;
        color: var(--muted-color);
    }

    .now-section {
        background: #fafafa;
        padding: 2rem;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.03);
    }

    .now-subtitle {
        font-size: 0.9rem;
        color: var(--muted-color);
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    .now-list {
        list-style: none;
        padding: 0;
    }

    .now-list li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 1rem;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--text-color);
    }

    .now-list li::before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--accent-color);
    }

    .contact-section {
        margin-top: 4rem;
    }

    .contact-section p {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: var(--muted-color);
    }

    .accent-link {
        color: var(--accent-color);
        font-weight: 600;
        text-decoration: underline;
    }
</style>
