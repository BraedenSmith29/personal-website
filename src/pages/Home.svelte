<script>
    import {GithubLogo, LinkedinLogo, EnvelopeSimple} from 'phosphor-svelte';
    import Portrait from '../../static/portrait.png';
</script>

<div class="container">
    <section class="hero">
        <div class="hero-content">
            <h1>Hi, I'm Braeden.</h1>
            <p class="role">Full Stack Software Developer</p>
            <p class="bio-short">
                Software Developer with 2+ years of experience shipping production web applications.
                Passionate about building things users love to use.
            </p>

            <div class="social-links">
                <a href="https://github.com/BraedenSmith29" target="_blank" rel="noopener noreferrer">
                    <GithubLogo size={24}/>
                </a>
                <a href="https://www.linkedin.com/in/braedensmith29/" target="_blank" rel="noopener noreferrer">
                    <LinkedinLogo size={24}/>
                </a>
                <a href="mailto:braedensmith629@gmail.com">
                    <EnvelopeSimple size={24}/>
                </a>
            </div>
        </div>

        <div class="portrait">
            <img src={Portrait} alt="Braeden Smith"/>
        </div>
    </section>

<!--    <section class="about-extended">-->
<!--        <h2>My Philosophy</h2>-->
<!--        <p>-->
<!--            My guiding principle is that software is built for humans, and it should be developed with them in mind.-->
<!--            For me, good technology should never get in the way. It should stand by people and let them do what-->
<!--            they came to do, just easier.-->
<!--        </p>-->
<!--        <p>-->
<!--            The same goes for the code base, which should be designed to make iteration and impact easy.-->
<!--            I keep this in mind whenever I'm working on a system. Clean code and good collaboration-->
<!--            aren't just buzzwords to me. They really make a difference for the developer and the end user.-->
<!--        </p>-->
<!--    </section>-->

<!--    <section class="video-resume">-->
<!--        <h2>Video Resume</h2>-->
<!--        <div class="video-placeholder">-->
<!--            <p>Video resume coming soon...</p>-->
<!--            &lt;!&ndash; <video controls src="/video-resume.mp4"></video> &ndash;&gt;-->
<!--        </div>-->
<!--    </section>-->
</div>

<style>
    .hero {
        display: flex;
        align-items: center;
        gap: 4rem;
        margin-bottom: 6rem;
    }

    .hero-content {
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 0.5rem;
    }

    .role {
        font-size: 1.5rem;
        color: var(--accent-color);
        font-family: var(--header-font);
        margin-bottom: 1.5rem;
    }

    .bio-short {
        font-size: 1.1rem;
        color: var(--text-color);
        max-width: 500px;
        margin-bottom: 2rem;
    }

    .social-links {
        display: flex;
        gap: 1.5rem;
    }

    .social-links a {
        color: var(--muted-color);
        transition: color 0.2s;
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
        max-width: 400px;
        object-fit: cover;
        border-radius: 1rem;
        box-shadow: 20px 20px 0px var(--accent-color);
        background-color: var(--muted-color);
    }

    .about-extended {
        margin-bottom: 6rem;
    }

    .about-extended h2 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }

    .about-extended p {
        font-size: 1.1rem;
    }

    .video-resume h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }

    .video-placeholder {
        aspect-ratio: 16 / 9;
        background: rgba(122, 162, 247, 0.1);
        border: 2px dashed var(--muted-color);
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--muted-color);
    }

    @media (max-width: 800px) {
        .hero {
            flex-direction: column-reverse;
            gap: 2rem;
            text-align: center;
        }

        .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            font-size: 3rem;
        }

        .portrait {
            display: flex;
            justify-content: center;
        }

        .portrait img {
            width: 150px;
            height: 150px;
            box-shadow: 10px 10px 0px var(--accent-color);
        }
    }
</style>
