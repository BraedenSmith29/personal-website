<script>
    import { LinkedinLogo, EnvelopeSimple } from 'phosphor-svelte';
</script>

<div class="container">
    <header class="contact-header">
        <h1>Contact</h1>
        <p class="blurb">
            I'm always interested in talking about new projects, work opportunities, or just general systems nerdery.
        </p>
    </header>

    <div class="contact-links">
        <a href="mailto:braedensmith629@gmail.com" class="contact-item">
            <EnvelopeSimple size={24} />
            <span>braedensmith629@gmail.com</span>
        </a>

        <a href="https://www.linkedin.com/in/braedensmith29/" target="_blank" rel="noopener noreferrer" class="contact-item">
            <LinkedinLogo size={24} />
            <span>LinkedIn</span>
        </a>
    </div>
</div>

<style>
    .contact-header {
        margin-bottom: 2.5rem;
        max-width: 600px;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: var(--primary-color);
    }

    .blurb {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--text-color);
    }

    .contact-links {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--primary-color);
        text-decoration: none;
        font-size: 1.1rem;
        width: fit-content;
        transition: color 0.2s ease;
    }

    .contact-item:hover {
        color: var(--secondary-color);
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }
        
        .blurb {
            font-size: 1.1rem;
        }
    }
</style>
