<script>
	import { DownloadSimple, Briefcase, GraduationCap, Code } from 'phosphor-svelte';

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
		technologies: ['React', 'jQuery', 'SvelteKit', 'Ruby on Rails', 'Docker', 'Bash', 'Git', 'GitHub', 'GitLab', 'Azure DevOps']
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
	<header class="resume-header">
		<h1>Resume</h1>
		<div class="cv-downloads">
			<a href="/resume.pdf" class="btn-download" download>
				<DownloadSimple size={20} />
				<span>Download CV (Pretty)</span>
			</a>
			<a href="/resume-ats.pdf" class="btn-download outline" download>
				<DownloadSimple size={20} />
				<span>Download CV (ATS Friendly)</span>
			</a>
		</div>
	</header>

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
		<div class="timeline">
			{#each experience as job}
				<div class="job-card">
					<div class="job-header">
						<div class="job-title-company">
							<h3>{job.title}</h3>
							<p class="company">{job.company} • {job.location}</p>
						</div>
						<span class="dates">{job.dates}</span>
					</div>
					{#if job.tech}
						<div class="job-tech">
							{#each job.tech as t}
								<span class="tech-pill">{t}</span>
							{/each}
						</div>
					{/if}
					<ul class="job-points">
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
		<div class="edu-card">
			<div class="edu-header">
				<h3>{education.institution}</h3>
				<span class="dates">Graduated {education.graduated}</span>
			</div>
			<p class="degree">{education.degree}</p>
			<p class="minor">Minor: {education.minor}</p>
			<p class="gpa">GPA: {education.gpa}</p>
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
		margin-bottom: 2rem;
		color: var(--accent-color);
	}

	.section-title h2 {
		margin-bottom: 0;
		font-size: 2rem;
		color: var(--text-color);
	}

	.skills-section, .experience-section, .education-section {
		margin-bottom: 6rem;
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
		background: rgba(122, 162, 247, 0.1);
		color: var(--accent-color);
		padding: 0.4rem 0.8rem;
		border-radius: 2rem;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.job-card {
		border-left: 2px solid rgba(122, 162, 247, 0.2);
		padding-left: 2rem;
		position: relative;
	}

	.job-card::before {
		content: '';
		position: absolute;
		left: -7px;
		top: 0;
		width: 12px;
		height: 12px;
		background: var(--accent-color);
		border-radius: 50%;
	}

	.job-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.job-header h3 {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.company {
		font-family: var(--header-font);
		color: var(--accent-color);
		font-weight: 500;
	}

	.dates {
		font-size: 0.9rem;
		color: var(--muted-color);
		white-space: nowrap;
	}

	.job-tech {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.tech-pill {
		font-size: 0.75rem;
		background: var(--text-color);
		color: var(--bg-color);
		padding: 0.1rem 0.5rem;
		border-radius: 0.25rem;
	}

	.job-points {
		list-style: none;
	}

	.job-points li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}

	.job-points li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--accent-color);
	}

	.edu-card {
		background: var(--card-bg);
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.edu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.degree {
		font-size: 1.1rem;
		font-weight: 500;
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

		.job-header {
			flex-direction: column;
			gap: 0.5rem;
		}

		.cv-downloads {
			flex-direction: column;
			width: 100%;
		}
	}
</style>
