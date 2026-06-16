<script>
    import {GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowRight} from 'phosphor-svelte';
    import Portrait from '../../static/portrait.png';
    import { writings } from '../lib/writings.js';
    import { navigate } from '../lib/router.svelte.js';

    const recentWritings = writings.slice(0, 5);

    function handleWritingClick(e, id) {
        e.preventDefault();
        navigate(`/writings/${id}`);
    }

    function handleViewAll(e) {
        e.preventDefault();
        navigate('/writings');
    }
</script>

<div class="container">
    <section class="hero">
        <div class="hero-content">
            <h1>Hey, I'm Braeden 👋</h1>
            <p class="role">Software Developer & Systems Enthusiast</p>
            <p class="bio-short">
                I'm a software developer based in Fort Worth, Texas. I enjoy building clean, 
                efficient applications and exploring the depths of systems programming and 
                homelab infrastructure.
            </p>

            <div class="social-links">
                <a href="https://github.com/BraedenSmith29" target="_blank" rel="noopener noreferrer">
                    <GithubLogo size={20}/> GitHub
                </a>
                <a href="https://www.linkedin.com/in/braedensmith29/" target="_blank" rel="noopener noreferrer">
                    <LinkedinLogo size={20}/> LinkedIn
                </a>
                <a href="mailto:braedensmith629@gmail.com">
                    <EnvelopeSimple size={20}/> Email
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

            <section class="writing-section">
                <div class="section-header">
                    <h2>Recent Writing</h2>
                    <a href="#/writings" class="view-all" onclick={handleViewAll}>View all articles <ArrowRight size={14} /></a>
                </div>
                <ul class="article-list">
                    {#each recentWritings as entry}
                        <li>
                            <span class="date">{entry.date}</span>
                            <a href="#/writings/{entry.id}" onclick={(e) => handleWritingClick(e, entry.id)}>{entry.title}</a>
                        </li>
                    {/each}
                </ul>
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
                    <li>Reading <em>"The Soul of a New Machine"</em> by Tracy Kidder.</li>
                </ul>
            </section>

            <section class="contact-section">
                <h2>Get in touch</h2>
                <p>Always open to interesting projects or just a friendly chat about tech.</p>
                <a href="mailto:braedensmith629@gmail.com" class="accent-link">braedensmith629@gmail.com</a>
            </section>
        </aside>
    </section>
</div>

<style>
    .hero {
        display: flex;
        align-items: flex-start;
        gap: 4rem;
        margin-bottom: 4rem;
        padding-bottom: 4rem;
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
        font-family: var(--header-font);
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

    .writing-section {
        margin-top: 4rem;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1.5rem;
    }

    .view-all {
        font-size: 0.9rem;
        color: var(--accent-color);
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .article-list {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0 1.5rem;
    }

    .article-list li {
        display: contents;
    }

    .date {
        grid-column: 1;
        margin-bottom: 1rem;
        font-size: 0.85rem;
        color: var(--muted-color);
        font-family: monospace;
    }

    .article-list a {
        grid-column: 2;
        margin-bottom: 1rem;
        font-size: 1.05rem;
        color: var(--text-color);
        text-decoration: underline;
        text-decoration-color: rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
    }

    .article-list a:hover {
        text-decoration-color: var(--accent-color);
        color: var(--accent-color);
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

    @media (max-width: 900px) {
        .content-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
        }

        .hero {
            flex-direction: column-reverse;
            gap: 2rem;
            text-align: center;
            align-items: center;
        }

        .hero-content {
            text-align: center;
        }

        .bio-short {
            margin-left: auto;
            margin-right: auto;
        }

        .social-links {
            justify-content: center;
        }

        .portrait {
            justify-content: center;
        }
    }
</style>
