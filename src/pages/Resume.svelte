<script>
	import { Briefcase, GraduationCap, Code, User } from 'phosphor-svelte';

	const summary = "Software Developer with 2+ years of experience shipping production web applications. Experienced across the full stack with a focus on performance, reliability, and clean system design. Passionate about building things people users love to use.";

	const experience = [
		{
			company: 'Paycom',
			title: 'Software Developer III',
			location: 'Irving, TX',
			dates: 'June 2024 - February 2026',
			tech: ['PHP', 'JavaScript', 'React', 'SQL'],
			points: [
				'Led development and release of a critical new feature integrating I-9 and E-Verify employment verification into the onboarding process, securing contracts worth upwards of $3 million.',
				'Redesigned a legacy customer dashboard using React and a modern services architecture, enhancing usability and speed on a critical high-traffic page.',
				'Substantially reduced response times and improved job queue efficiency by optimizing several high-impact processes to run ~25x faster through parallelization.',
				'Ensured safe, high-quality releases by thoroughly validating new code through manual and unit testing.',
				'Partnered with customer support to rapidly diagnose and resolve customer-reported bugs and configuration issues.'
			]
		},
		{
			company: 'Marathon Petroleum Company',
			title: 'Applications Developer Intern',
			location: 'San Antonio, TX',
			dates: 'August 2022 - December 2022',
			tech: ['C#', '.NET'],
			points: [
				'Led a team of interns to develop a new invoicing website using .NET Blazor, earning first place in a term-long hackathon.',
				'Built a webpage with .NET Blazor to aggregate customer credit limit data and generate formatted Excel reports, saving accounting teams dozens of hours each quarter.',
				'Enhanced an internal cost reporting platform by implementing key feature upgrades and resolving critical defects.',
				'Partnered with subject matter experts and analysts to ensure complete understanding of user requirements.'
			]
		},
		{
			company: 'Texas A&M University - Help Desk Central',
			title: 'Student Coordinator (Shift Supervisor)',
			location: 'College Station, TX',
			dates: 'March 2021 - May 2024',
			points: [
				'Supervised 15-20 technicians and served as the primary escalation point in a high-volume IT support center.',
				'Designed and led training initiatives for new hires, improving onboarding efficiency and technical consistency.'
			]
		}
	];

	const skills = {
		languages: ['PHP', 'TypeScript/JavaScript', 'SQL', 'HTML/CSS', 'C#', 'Java', 'Go', 'C++', 'Python', 'Ruby'],
		technologies: ['React', 'jQuery', 'SvelteKit', 'Ruby on Rails', 'Docker', 'Bash', 'Git', 'GitHub', 'GitLab']
	};

	const education = {
		institution: 'Texas A&M University',
		degree: 'Bachelor of Science in Computer Science',
		minor: 'Engineering Project Management',
		location: 'College Station, TX',
		graduated: 'May 2024',
		gpa: '3.826'
	};
</script>

<div class="container">
	<section class="summary-section">
		<div class="section-title">
			<User size={24} />
			<h2>Summary</h2>
		</div>
		<div class="summary-text">
			<p>{summary}</p>
		</div>
	</section>

	<section class="skills-section">
		<div class="section-title">
			<Code size={24} />
			<h2>Skills</h2>
		</div>
		<div class="skills-grid">
			<div class="skill-group">
				<h3>Languages</h3>
				<div class="tags">
					{#each skills.languages as lang}
						<span class="tag">{lang}</span>
					{/each}
				</div>
			</div>
			<div class="skill-group">
				<h3>Technologies</h3>
				<div class="tags">
					{#each skills.technologies as tech}
						<span class="tag">{tech}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="experience-section">
		<div class="section-title">
			<Briefcase size={24} />
			<h2>Experience</h2>
		</div>
		<div class="resume-list">
			{#each experience as job}
				<div class="resume-item">
					<div class="resume-item-header">
						<div class="job-info">
							<h3 class="job-title">{job.title}</h3>
							<p class="company">{job.company} • {job.location}</p>
						</div>
						<span class="dates">{job.dates}</span>
					</div>
					{#if job.tech}
						<div class="tech-stack">
							{#each job.tech as t}
								<span class="tech-tag">{t}</span>
							{/each}
						</div>
					{/if}
					<ul class="resume-points">
						{#each job.points as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<section class="education-section">
		<div class="section-title">
			<GraduationCap size={24} />
			<h2>Education</h2>
		</div>
		<div class="resume-item">
			<div class="resume-item-header">
				<h3 class="institution">{education.institution}</h3>
				<span class="dates">Graduated {education.graduated}</span>
			</div>
			<p class="degree">{education.degree}</p>
			<div class="edu-meta">
				<span>{education.minor}</span>
				<span class="separator">•</span>
				<span>GPA: {education.gpa}</span>
				<span class="separator">•</span>
				<span>{education.location}</span>
			</div>
		</div>
	</section>
</div>

<style>
	.resume-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4rem;
	}

	.cv-downloads {
		display: flex;
		gap: 1rem;
	}

	.btn-download {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--accent-color);
		color: white;
		padding: 0.75rem 1.25rem;
		border-radius: 0.5rem;
		font-weight: 500;
		font-size: 0.9rem;
	}

	.btn-download.outline {
		background: transparent;
		border: 1px solid var(--accent-color);
		color: var(--accent-color);
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
		color: var(--accent-color);
	}

	.section-title h2 {
		margin-bottom: 0;
		font-size: 2rem;
		color: var(--text-color);
	}

	.skills-section, .experience-section, .education-section, .summary-section {
		margin-bottom: 3rem;
	}

	.summary-text {
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--text-color);
		max-width: 800px;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	.skill-group h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.tag {
		background: rgba(0, 0, 0, 0.05);
		color: var(--accent-color);
		padding: 0.4rem 0.8rem;
		border-radius: 2rem;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.resume-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.resume-item {
		padding: 1.5rem;
		margin: 0 -1.5rem;
		transition: background-color 0.2s ease;
		position: relative;
	}

	.resume-item:hover {
		background-color: rgba(0, 0, 0, 0.03);
		border-radius: 8px;
	}

	.resume-item:not(:last-child)::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(0, 0, 0, 0.05);
	}

	.resume-item-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.5rem;
		gap: 1rem;
	}

	.job-title, .institution {
		font-size: 1.5rem;
		margin-bottom: 0;
	}

	.company {
		font-family: var(--header-font);
		color: var(--accent-color);
		font-weight: 500;
		font-size: 1.1rem;
		margin-top: 0.25rem;
		margin-bottom: 0;
	}

	.dates {
		font-size: 0.9rem;
		color: var(--muted-color);
		font-weight: 500;
		white-space: nowrap;
	}

	.tech-stack {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1.3rem;
	}

	.tech-tag {
		font-size: 0.75rem;
		color: var(--muted-color);
		font-weight: 500;
		background: rgba(0, 0, 0, 0.05);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
	}

	.resume-points {
		list-style: none;
	}

	.resume-points li {
		position: relative;
		padding-left: 1.25rem;
		margin-bottom: 0.5rem;
		color: var(--text-color);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.resume-points li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--muted-color);
		opacity: 0.5;
	}

	.degree {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.edu-meta {
		color: var(--muted-color);
		font-size: 0.95rem;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.edu-meta .separator {
		opacity: 0.5;
	}

	@media (max-width: 800px) {
		.resume-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}

		.resume-item-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.cv-downloads {
			flex-direction: column;
			width: 100%;
		}

		.edu-meta {
			flex-wrap: wrap;
		}
	}
</style>
